function validateSystemHostName () {
  const localPCParam = {
    client_id: 'local-m5',
    client_secret: 'secret',
    host: `${location.protocol}//${location.host}`
  }
  const testPCParam = {
    client_id: 'e36c78fd',
    client_secret: 'x8BS3cGDiz',
    host: `${location.protocol}//${location.host}`
  }
  if (process.env.MODE === 'test') {
    return testPCParam
  } else {
    return localPCParam
  }
}

import Vue from 'vue'
Vue.prototype.validateSystemHostName = validateSystemHostName