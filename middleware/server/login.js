/**
 * 用户登录回调处理: http://localhost:3000/callback?code=K2BlgI&state=1%2aPASSWORD
 */
const axios = require('../../utils/server-axios')
const env = require('../../env')
const url = require('url')
const jwtDecode = require('jwt-decode')
const cookie = require('cookie')
const log = require('../../utils/log-utils')
const btoa = require('btoa')
const hostData = require('../../plugins/validate-system-hostname')
// 登录secret获取,开发环境读取文件,线上环境 pm2 注入
let clientData
if (process.env.MODE === 'dev') {
  clientData = `${hostData.default().CLIENT_ID}:${hostData.default().CLIENT_SECRET}`
} else {
  clientData = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
}

export default function (req, res, next) {
  log.middlewareLog(`/callback${req.url}`)

  const tokenName = env[process.env.MODE].TOKEN_NAME
  const dpAuthTokenUrl = env[process.env.MODE].DP_AUTH_TOKEN_URL

  //获取url中code
  const code = url.parse(req.url, true).query.code
  let state = url.parse(req.url, true).query.state
  const host = req.headers.host
  const login_way = decodeURIComponent(state).split('*')[1]
  state = login_way ? login_way : 'AUTOLOGIN'

  //1.根据code获取认证数据(数据模拟)
  axios.post(`${dpAuthTokenUrl}/oauth/token?code=${code}&grant_type=authorization_code&redirect_uri=//${host}/callback`, {}, {
    headers: {
      Authorization: `Basic ${btoa(clientData)}`
    }
  })
  .then((tokenData) => {
    log.successLog(tokenData)

    //2.解析token:  https://www.npmjs.com/package/jwt-decode
    let decodedData = jwtDecode(tokenData.data.access_token)

    //3.设置cookie: https://www.npmjs.com/package/cookie
    if (process.env.MODE === 'dev') {
      res.setHeader('Set-Cookie', [
        cookie.serialize(tokenName, decodedData.jti, {
          httpOnly: true,
          expires: new Date(decodedData.exp * 1000),
          path: '/'
        }),
        cookie.serialize('redirect_url', '', { expires: new Date(0) }),
        cookie.serialize('NotLogged', '', { expires: new Date(0) }),
        cookie.serialize('isLogin', true),
        cookie.serialize('matomo', state)
      ])
    } else {
      res.setHeader('Set-Cookie', [
        cookie.serialize(tokenName, decodedData.jti, {
          httpOnly: true,
          domain: '.dapengjiaoyu.cn',
          expires: new Date(decodedData.exp * 1000),
          path: '/'
        }),
        cookie.serialize('redirect_url', '', { expires: new Date(0) }),
        cookie.serialize('NotLogged', '', { expires: new Date(0) }),
        cookie.serialize('isLogin', true),
        cookie.serialize('matomo', state)
      ])
    }
    const cookies = cookie.parse(req.headers.cookie || '')
    const redirectUrl = cookies.redirect_url
    res.statusCode = 302
    res.setHeader('Location', redirectUrl || '/')
    res.end()
    return
  }).catch((error) => {
    log.errorLog(error)

    res.statusCode = 302
    res.setHeader('Location', '/')
    res.end()
    return
  })
}
