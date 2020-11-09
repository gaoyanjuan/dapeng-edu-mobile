function validateSystemHostName () {
  const localPCParam = {
    client_id: 'local-m5',
    client_secret: 'secret',
    host: `${location.protocol}//${location.host}`,
    callback: 'http://127.0.0.1:3000',
    refresh_time: 3,
    expect_refresh_time: 4
  }
  const ngxPCParam = {
    client_id: 'b4cd9c34',
    client_secret: 'VXAaTFh8yv',
    host: `${location.protocol}//${location.host}`,
    // callback: `${location.protocol}//${location.host}/callback`,
    pc5_client_id: '0f030d30',
    pc5_client_secret: 'Q5UI4oU+cNZ',
    refresh_time: 25,
    expect_refresh_time: 29
  }
  if (location.host === 'gc-dev.dapengjiaoyu.cn') {
    return ngxPCParam
  } else if (location.host.indexOf('127.0.0.1') !== -1) {
    return localPCParam
  }
}

import Vue from 'vue'
Vue.prototype.validateSystemHostName = validateSystemHostName