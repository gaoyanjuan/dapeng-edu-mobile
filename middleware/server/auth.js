const env = require('../../env')
const cookie = require('cookie')
const log = require('../../utils/log-utils')
const axios = require('../../utils/server-axios')
const whiteUrlList = require('../../utils/white-url-list')

export default function (req, res, next) {
  const tokenName = env[process.env.MODE].TOKEN_NAME
  const dpAuthTokenUrl = env[process.env.MODE].REFRESH_TOKEN_URL // 中台校验token地址

  const cookies = cookie.parse(req.headers.cookie || '')

  log.middlewareLog(req.url)

  if (cookies[tokenName] && req.url.indexOf('/api/') == -1 && (req.url === '/' || whiteUrlList.some((ele) => req.url.indexOf(ele) !== -1))) {

    log.middlewareLog(req.url, 'auth')

    axios.get(`${dpAuthTokenUrl}/jti`, {
      headers: {
        'Cookie': `${tokenName}=${cookies[tokenName]}`
      }
    })
    .then((checkTokenRes) => {
      // token有效
      checkTokenRes.config.url = `${dpAuthTokenUrl}/jti`
      log.successLog(checkTokenRes)
      next()
    })
    .catch((error) => {
      // token失效
      log.errorLog(error)

      let type = 'failure'
      if (error.response && error.response.data && error.response.data.state === 1001) {
        type = 'displacement'
      }
      if (process.env.MODE === 'dev') {
        res.setHeader('Set-Cookie', cookie.serialize(tokenName, '', {
          expires: new Date()
        }))
      } else {
        res.setHeader('Set-Cookie', [
          cookie.serialize(tokenName, '', {
            domain: '.dapengjiaoyu.cn',
            expires: new Date(0),
            path: '/'
          }),
          cookie.serialize(tokenName, '', {
            expires: new Date(0),
            path: '/'
          })
        ])
      }
      const locationURL = `/login/invalid-login?type=${type}`
      res.statusCode = 302
      res.setHeader('Location', locationURL)
      res.end()
      return
    })
  } else {
    next()
  }
}
