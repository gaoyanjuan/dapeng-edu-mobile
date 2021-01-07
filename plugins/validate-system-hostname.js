function validateSystemHostName () {
  const localPCParam = {
    client_id: 'pc',
    token_name: 'dptoken_t',
    client_secret: 'COm6AqoH'
  }
  const testPCParam = {
    client_id: 'b4cd9c34',
    token_name: 'dptoken_t',
    client_secret: 'VXAaTFh8yv'
  }
  const prodPCParam = {
    client_id: 'Dd8fbbB5',
    token_name: 'dptoken',
    client_secret: 'tz9Yfdtn6w'
  }
  if (process.browser) {
    localPCParam.host = `//${location.host}`
    testPCParam.host = `//${location.host}`
    prodPCParam.host = `//${location.host}`
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
