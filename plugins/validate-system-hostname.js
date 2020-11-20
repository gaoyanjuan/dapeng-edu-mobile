function validateSystemHostName () {
  const localPCParam = {
    client_id: 'local-m5',
    client_secret: 'secret',
    host: `${location.protocol}//${location.host}`
  }
  const testPCParam = {
    client_id: 'b4cd9c34',
    client_secret: 'VXAaTFh8yv',
    host: `${location.protocol}//${location.host}`,
    // callback: `${location.protocol}//${location.host}/callback`,
    pc5_client_id: '0f030d30',
    pc5_client_secret: 'Q5UI4oU+cNZ'
  }
  if (process.env.MODE === 'test') {
    return testPCParam
  } else {
    return localPCParam
  }
}

import Vue from 'vue'
Vue.prototype.validateSystemHostName = validateSystemHostName