const cookie = require('cookie')
const log = require('../../utils/log-utils')
const env = require('../../env')

export default function (req, res, next) {
  const tokenName = env[process.env.MODE].TOKEN_NAME
  log.middlewareLog('/api/logout')
  try {
    if (process.env.MODE === 'dev') {
      res.setHeader('Set-Cookie', cookie.serialize(tokenName, '', {
        expires: new Date(),
        path: '/'
      }))
    } else {
      res.setHeader('Set-Cookie', cookie.serialize(tokenName, '', {
        expires: new Date(),
        path: '/',
        domain: '.dapengjiaoyu.cn'
      }))
    }
    res.statusCode = 200
    res.end()
  } catch (error) {
    console.error(error)
  }
  return
}