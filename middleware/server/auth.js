const validateSystemHostName = require('../../plugins/validate-system-hostname')
const authEnv = require('../../utils/server-env')
const cookie = require('cookie')
const dayjs = require('dayjs')
const axios = require('../../utils/server-axios')
const excludeUrlList = require('../../utils/exclude-url')

const tokenName = validateSystemHostName.default().token_name
const dpAuthTokenUrl = authEnv().dp_auth_token_url

export default function (req, res, next) {
  const cookies = cookie.parse(req.headers.cookie || '')
  console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), req.url)
  if (cookies[tokenName] && req.url.indexOf('/api/') == -1 && !excludeUrlList.some((ele) => req.url.indexOf(ele) !== -1)) {
    axios.get(`${dpAuthTokenUrl}/jti?access_token=${cookies[tokenName]}`)
    .then((checkTokenRes) => {
      // token有效
      console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), checkTokenRes.config.url, checkTokenRes.status)
      next()
    })
    .catch((error) => {
      // token失效
      if (error) {
        if (error.response) {
          console.error(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), error.config.url, error.response.status, error.response.data)
        } else {
          console.error(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), error.config.url, error)
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
