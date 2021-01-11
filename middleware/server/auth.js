const env = require('../../env')
const cookie = require('cookie')
const filters = require('../../utils/server-filters')
const axios = require('../../utils/server-axios')
const whiteUrlList = require('../../utils/white-url-list')

export default function (req, res, next) {
  const tokenName = env[process.env.MODE].TOKEN_NAME
  const dpAuthTokenUrl = env[process.env.MODE].REFRESH_TOKEN_URL // 中台校验token地址

  const cookies = cookie.parse(req.headers.cookie || '')

  if (cookies[tokenName] && req.url.indexOf('/api/') == -1 && (req.url === '/' || whiteUrlList.some((ele) => req.url.indexOf(ele) !== -1))) {

    console.log(filters.logDate(new Date()), 'auth',req.url)

    axios.get(`${dpAuthTokenUrl}/jti?access_token=${cookies[tokenName]}`)
    .then((checkTokenRes) => {
      // token有效
      console.log(filters.logDate(new Date()), `${dpAuthTokenUrl}/jti`, checkTokenRes.status)
      next()
    })
    .catch((error) => {
      // token失效
      if (error) {
        if (error.response) {
          console.error(filters.logDate(new Date()), error.config.url, error.response.status, error.response.data)
        } else {
          console.error(filters.logDate(new Date()), error.config.url, error)
        }
      }
      let type = 'failure'
      if (error.response && error.response.data && error.response.data.state === 1001) {
        type = 'displacement'
      }
      if (process.env.MODE === 'dev') {
        res.setHeader('Set-Cookie', cookie.serialize(tokenName, '', {
          expires: new Date() 
        }))
      } else {
        res.setHeader('Set-Cookie', cookie.serialize(tokenName, '', {
          path: '/',
          domain: '.dapengjiaoyu.cn',
          expires: new Date() 
        }))
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
