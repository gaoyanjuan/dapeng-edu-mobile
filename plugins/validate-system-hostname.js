function validateSystemHostName () {
  const localPCParam = {
    client_id: 'local-m5',
    token_name: 'access_token_t',
    client_secret: 'secret'
  }
  const testPCParam = {
    client_id: 'e36c78fd',
    token_name: 'access_token_t',
    client_secret: 'x8BS3cGDiz'
  }
  const prodPCParam = {
    client_id: '',
    token_name: 'access_token',
    client_secret: ''
  }
  if (process.browser) {
    localPCParam.host = `${location.protocol}//${location.host}`
    testPCParam.host = `${location.protocol}//${location.host}`
    prodPCParam.host = `${location.protocol}//${location.host}`
  }
  if (process.env.mode === 'test') {
    return testPCParam
  } else if (process.env.mode === 'production') {
    return prodPCParam
  } else {
    return localPCParam
  }
}

import Vue from 'vue'
Vue.prototype.validateSystemHostName = validateSystemHostName

export default validateSystemHostName
