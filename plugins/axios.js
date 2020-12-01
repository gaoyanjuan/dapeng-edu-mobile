import { getcookiesInServer } from '@/utils/cookie-tool'
import Vue from 'vue'
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
      const clientData = `${Vue.prototype.validateSystemHostName().client_id}:${Vue.prototype.validateSystemHostName().client_secret}`
      config.headers.Authorization = `Basic ${btoa(clientData)}`
    } else if ($cookiz.get('access_token')) { 
      config.headers.Authorization = `Bearer ${$cookiz.get('access_token')}`
    } else if (getcookiesInServer(req).access_token) {
      config.headers.Authorization = `Bearer ${getcookiesInServer(req).access_token}`
    }
    return config
  })
  // 是否正在刷新的标记
  let isRefreshing = false
  // 重试队列，每一项将是一个待执行的函数形式
  let requests = []
  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    response => {
      response.pageInfo = {
        count: parseInt(response.headers['x-pagination-count']) || 0,
        number: parseInt(response.headers['x-pagination-number']) || 0,
        pages: parseInt(response.headers['x-pagination-pages']) || 1,
        size: parseInt(response.headers['x-pagination-size']) || process.env.global.pageSize
      }
      return response
    },
    error => {
      if (error && error.code === 'ECONNABORTED' && error.message && error.message.indexOf('timeout') !== -1) {
        const date = new Date()
        console.error({
          'url': error.config.url,
          'date': filter.formatDate(date),
          'message': '请求超时'
        })
        return error
      }
      if (!error || !error.response) {
        return error
      }
      if (error.response.status == 401 && $cookiz.get('access_token')) {
        if (error.response.data && error.response.data.state === 1001) {
          if (process.browser) {
            removeToken(store, $cookiz)
            login({ message: '该账号已在其他同类设备登录，如非本人操作，则密码可能已经被泄露，建议立即更换密码' }, redirect)
          }
        } else if (error.response.data && error.response.data.error === 'invalid_token') {
          if (process.browser) {
            removeToken(store, $cookiz)
            login({ message: '登录失效' }, redirect)
          }
        } else {
          if (!isRefreshing) {
            isRefreshing = true
            return refreshToken(store, $cookiz).then(res => {
              $cookiz.set('access_token', res.data.access_token, {
                expires: new Date(refreshToken.exp * 1000)
              })
              $cookiz.set('refresh_token', res.data.refresh_token, {
                expires: new Date(refreshToken.exp * 1000)
              })
              // 已经刷新了token，将所有队列中的请求进行重试
              requests.forEach(cb => cb(res.data.access_token))
              isRefreshing = false
              requests = []
              return $axios(error.config)
            }).catch(res => {
              if (process.browser) {
                removeToken(store, $cookiz)
                login({ message: '登录失效' }, redirect)
              }
            })
          } else {
            // 正在刷新token，将返回一个未执行resolve的promise
            return new Promise((resolve) => {
              // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
              requests.push((token) => {
                error.config.headers.Authorization = `Bearer ${token}`
                resolve($axios(error.config))
              })
            })
          }
        }
        console.log(error.response.data , '服务端接口错误信息')
      } else if (error.response.status == 401) {
        console.log(error.response.data , '服务端接口错误信息')
      } else if (error.response.status == 409) {
        // http状态500，请求API找不到，重定向到404页面   
        if (error.response.data && error.response.data.code === 404229) {
          redirect('/404')
          return
        } else if (error.response.data && error.response.data.code === 404259) {
          location.reload()
          return
        } else {
          console.log(error.response , '服务端接口错误信息')
          return Promise.reject(error.response)
        }
      }
      console.log(error.response , '服务端接口错误信息')
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
    confirmButtonText: '去登录',
    confirmButtonColor:'#00B93B',
    message: params.message
  }).then(() => {
    redirect('/login')
  })
}