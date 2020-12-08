import { getcookiesInServer } from '@/utils/cookie-tool'
import validateSystemHostName from '../plugins/validate-system-hostname'
import Vue from 'vue'
import filter from './filters'
import { Dialog } from 'vant'
const btoa = require('btoa')
const HttpAgent = require('agentkeepalive')
const HttpsAgent = require('agentkeepalive').HttpsAgent


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
    if (config.url.startsWith('/token')) {
      const clientData = `${validateSystemHostName().client_id}:${validateSystemHostName().client_secret}`
      config.headers.Authorization = `Basic ${btoa(clientData)}`
    } else if ($cookiz.get('access_token')) {
      config.headers.Authorization = `Bearer ${$cookiz.get('access_token')}`
    } else if (getcookiesInServer(req).access_token) {
      config.headers.Authorization = `Bearer ${getcookiesInServer(req).access_token}`
    }
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
      if (!process.browser) {
        console.log(filter.formatDate(new Date()), response.config.url, response.status)
      }
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
      if (!process.browser) {
        if (error) {
          if (error.response) {
            console.error(filter.formatDate(new Date()), error.config.url, error.response.status, error.response.data)
          } else {
            console.error(filter.formatDate(new Date()), error.config.url, error)
          }
        }
      }
      if (!error || !error.response) {
        return error
      }
      if (error.response.status == 401 && $cookiz.get('access_token')) {
        // 用户有登录状态,但是被其他人顶掉了
        if (error.response.data && error.response.data.state === 1001) {
          removeToken(store, $cookiz)
          if (process.browser) {
            login({ message: '该账号已在其他同类设备登录，如非本人操作，则密码可能已经被泄露，建议立即更换密码' }, redirect)
          } else {
            redirect({ path: '/login/invalid-login', query: { type: 'displacement' } })
          }
          // 用户有登录状态,但是refresh_token已经失效
        } else if (error.response.data && error.response.data.error === 'invalid_token') {
          removeToken(store, $cookiz)
          if (process.browser) {
            login({ message: '登录失效' }, redirect)
          } else {
            redirect({ path: '/login/invalid-login', query: { type: 'failure' } })
          }
        } else {
           // 用户有登录状态,access_token已经失效
          removeToken(store, $cookiz)
          if (process.browser) {
            login({ message: '登录失效' }, redirect)
          } else {
            redirect({ path: '/login/invalid-login', query: { type: 'failure' } })
          }
        }
      } else if (error.response.status == 401) {
        // 用户cookie中已经没有token,但是页面上有存储的用户信息(cookie在浏览器中自然失效)
        if (!$cookiz.get('access_token') && store.getters['user/userInfoGetters']) {
          removeToken(store, $cookiz)
          if (process.browser) {
            login({ message: '登录失效' }, redirect)
          } else {
            redirect({ path: '/login/invalid-login', query: { type: 'failure' } })
          }
        } else {
          // 用户未登录状态下,请求需要登录的接口
          redirect('/login')
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
          return error.response
          // return Promise.reject(error.response)
        }
      }
      return Promise.reject(error.response)   // 返回接口返回的错误信息
    }
  )
}

function refreshToken (store, $cookiz) {
  const hostData = Vue.prototype.validateSystemHostName()
  const accessToken = $cookiz.get('access_token')
  const refreshToken = $cookiz.get('refresh_token')
  return store.dispatch('accesstoken/getRefreshToken', {
    access_token: accessToken,
    refresh_token: refreshToken,
    redirect_uri: `${hostData.host}/callback`,
    grant_type: 'refresh_token'
  })
}

function removeToken (store, $cookiz) {
  try {
    $cookiz.remove('access_token')
    $cookiz.remove('refresh_token')
    $cookiz.remove('userinfo')
    store.dispatch('user/appendUserInfo', null)
  } catch (error) {}
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
    redirect('/login')
  }).catch(() => {
    redirect('/')
  })
}