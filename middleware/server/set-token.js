const cookie = require('cookie')
const url = require('url')
const log = require('../../utils/log-utils')
const env = require('../../env')

export default function (req, res, next) {
  log.middlewareLog('/api/set-token')
  
  const tokenName = env[process.env.MODE].TOKEN_NAME

  const query = url.parse(req.url, true).query

  try {
    if (process.env.MODE === 'dev') {
      res.setHeader('Set-Cookie', cookie.serialize(tokenName, query.jti, {
        httpOnly: true,
        expires: new Date(query.exp * 1000),
        path: '/'
      }))
    } else {
      res.setHeader('Set-Cookie', cookie.serialize(tokenName, query.jti, {
        httpOnly: true,
        domain: '.dapengjiaoyu.cn',
        expires: new Date(query.exp * 1000),
        path: '/'
      }))
    }
    res.statusCode = 200
    res.end()
  } catch (error) {
    console.error(error)
  }
  return
}