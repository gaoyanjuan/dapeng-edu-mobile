
// 校验用户名
export function validateUserName(userName) {
  var regex = /^(?!dp)(?!\d+$)[\d\u4e00-\u9fffa-zA-Z]{2,12}$/i
  if (regex.test(loginName)) {
    return true
  } else {
    return false
  }
}

// 校验密码
export function validatePassword (password) {
  var regex = /[0-9a-zA-Z]{6,18}$/
  if (regex.test(password)) {
    return true
  } else {
    return false
  }
}

// 校验手机号
export function validateMobile (mobile) {
  var mobileReg = /^1[3-9][0-9]\d{8}$/
  if (mobileReg.test(mobile)) {
    return true
  } else {
    return false
  }
}

// 手机号显示后四位
export function validateMobileCode (mobile) {
  const first = mobile.slice(0, 3)
  const last = mobile.slice(-4, -1)
  return first + '****' + last
}

// 校验是否为空
export function validateEmpty (val) {
  if (val instanceof Array) { 
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}