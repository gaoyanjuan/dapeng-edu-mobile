const cookie = require('cookie')
const log = require('../../utils/log-utils')
const env = require('../../env')

export default function (req, res, next) {
  const tokenName = env[process.env.MODE].TOKEN_NAME
  log.middlewareLog('/api/logout')
  try {
    res.setHeader('Set-Cookie', [
      cookie.serialize(tokenName, '', {
        domain: '.dapengjiaoyu.cn',
        expires: new Date(),
        path: '/'
      }),
      cookie.serialize(tokenName, '', {
        expires: new Date(),
        path: '/'
      })
    ])
    res.statusCode = 200
    res.end()
  } catch (error) {
    console.error(error)
  }
  return
}