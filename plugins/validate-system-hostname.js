function validateSystemHostName () {
  const localPCParam = {
    client_id: 'local-m5',
    client_secret: 'secret'
  }
  const testPCParam = {
    client_id: 'e36c78fd',
    client_secret: 'x8BS3cGDiz'
  }
  if (process.browser) {
    localPCParam.host = `${location.protocol}//${location.host}`
    testPCParam.host = `${location.protocol}//${location.host}`
  }
  if (process.env.mode === 'test') {
    return testPCParam
  } else {
    return localPCParam
  }
}

import Vue from 'vue'
Vue.prototype.validateSystemHostName = validateSystemHostName