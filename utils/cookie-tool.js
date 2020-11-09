import Cookie from 'js-cookie'

/**
 * 根据名称获取cookie中的值
 * @param {*} Name 
 */
export function get_cookie(cookie, Name) {
  const search = Name + '='// 查询检索的值
  let returnvalue = ''// 返回值
  if (cookie) {
    let sd = cookie.indexOf(search)
    if (sd!= -1) {
        sd += search.length
        let end = cookie.indexOf(';', sd)
        if (end == -1)
        end = cookie.length
        // unescape() 函数可对通过 escape() 编码的字符串进行解码。
        returnvalue = unescape(cookie.substring(sd, end))
      }
  } 
  return returnvalue
}

/**
 * 获取服务端cookie
 * @param {*} req 
 */
export function getcookiesInServer (req) {
  let service_cookie = {}
  req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
    let parts = val.split('=')
    service_cookie[parts[0].trim()] = (parts[1] || '').trim()
  })
  return service_cookie
}

/**
 * 获取客户端cookie
 * @param {*} key 
 */
export function getcookiesInClient (key) {
  return Cookie.get(key) ? Cookie.get(key) : ''
}
