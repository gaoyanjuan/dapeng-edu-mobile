import validateSystemHostName from '@/plugins/validate-system-hostname'
import filter from './filters'
import { Dialog } from 'vant'
const log = require('../utils/log-utils')
const HttpAgent = require('agentkeepalive')
const HttpsAgent = require('agentkeepalive').HttpsAgent
import checkLogin  from '../plugins/check-login'

export default function ({ store, redirect, req, route, error, app: { $axios, $cookiz } }) {
  $axios.defaults.httpAgent = new HttpAgent({
    keepAlive: true,
    freeSocketTimeout: 4000,
    maxFreeSockets: 256
  })

  $axios.defaults.httpsAgent = new HttpsAgent({
    keepAlive: true,
    freeSocketTimeout: 4000,
    maxFreeSockets: 256
  })

  $axios.defaults.timeout = 20000

  $axios.interceptors.request.use(config => {
    return config
  })

  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    response => {
      response.pageInfo = {
        count: parseInt(response.headers['x-pagination-count']) || 0,
        number: parseInt(response.headers['x-pagination-number']) || 0,
        pages: parseInt(response.headers['x-pagination-pages']) || 1,
        size: parseInt(response.headers['x-pagination-size']) || process.env.global.pageSize
      }
      log.successLog(response)
      
      // 请求接口数据正常，返回数据
      return response
    },
    error => {
      if (error && error.code === 'ECONNABORTED' && error.message && error.message.indexOf('timeout') !== -1) {
        if (!process.browser) {
          console.error(filter.formatDate(new Date()), error.config.url, '请求超时')
        }
        return error
      }

      log.errorLog(error)

      if (!error || !error.response) {
        return error
      }
      if (error.response.status == 401 && store.getters['user/userInfoGetters'] && store.getters['user/userInfoGetters'].userId) {
        // 用户有登录状态,但是被其他人顶掉了
        if (error.response.data && error.response.data.state === 1001) {
          if (process.browser) {
            removeToken(store, $axios, $cookiz)
            login({ message: '该账号已在其他同类设备登录，如非本人操作，则密码可能已经被泄露，建议立即更换密码' }, redirect)
          }
          // 用户有登录状态,但是refresh_token已经失效
        } else if (error.response.data && error.response.data.error === 'invalid_token') {
          if (process.browser) {
            removeToken(store, $axios, $cookiz)
            login({ message: '登录失效' }, redirect)
          }
        } else {
           // 用户有登录状态,access_token已经失效
          if (process.browser) {
            removeToken(store, $axios, $cookiz)
            login({ message: '登录失效' }, redirect)
          }
        }
      } else if (error.response.status == 401) {
        // 用户cookie中已经没有token,但是页面上有存储的用户信息(cookie在浏览器中自然失效)
        if (store.getters['user/userInfoGetters']) {
          if (process.browser) {
            removeToken(store, $axios, $cookiz)
            login({ message: '登录失效' }, redirect)
          }
        }
      } else if (error.response.status == 409) {
        // http状态500，请求API找不到，重定向到404页面   
        if (error.response.data && error.response.data.code === 404229) {
          redirect('/404')
          return
        } else if (error.response.data && error.response.data.code === 404259) {
          location.reload()
          return
        } else {
          return Promise.reject(error.response)
        }
      }
      return Promise.reject(error.response)   // 返回接口返回的错误信息
    }
  )
}

function refreshToken (store, $cookiz) {
  const hostData = validateSystemHostName()
  const accessToken = $cookiz.get(process.env.TOKEN_NAME)
  // const refreshToken = $cookiz.get('refresh_token')
  return store.dispatch('accesstoken/getRefreshToken', {
    access_token: accessToken,
    // refresh_token: refreshToken,
    redirect_uri: `${hostData.host}/callback`,
    grant_type: 'refresh_token'
  })
}

function removeToken (store, $axios, $cookiz) {
  try {
    $axios.get('/logout').then(() => {
      $cookiz.remove('userinfo', {
        path: '/'
      })
      store.commit('user/appendUserInfo', null)
    }) 
  } catch (error) {
    if (!process.browser) {
      if (error) {
        console.error(filter.formatDate(new Date()), '删除token错误', error)
      }
    }
  }
}

function login(params, redirect) {
  Dialog({
    title: '下线通知',
    confirmButtonText: '重新登录',
    confirmButtonColor: '#00B93B',
    cancelButtonText: '退出',
    showCancelButton: true,
    message: params.message
  }).then(() => {
    const loginUrl = checkLogin.getLoginUrl()
    location.href = loginUrl
  }).catch(() => {
    location.href = '/'
  })
}