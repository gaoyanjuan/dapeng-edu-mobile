function validateSystemHostName () {
  const localPCParam = {
    client_id: 'pc',
    client_secret: 'COm6AqoH'
  }
  const testPCParam = {
    client_id: 'b4cd9c34',
    client_secret: 'VXAaTFh8yv'
  }
  const prodPCParam = {
    client_id: 'Dd8fbbB5',
    client_secret: 'tz9Yfdtn6w'
  }
  if (process.browser) {
    localPCParam.host = `${location.protocol}//${location.host}`
    localPCParam.course_host = `${location.protocol}//127.0.0.1:1111`
    testPCParam.host = `${location.protocol}//${location.host}`
    testPCParam.course_host = `${location.protocol}//${location.host}/dp-course`
    prodPCParam.host = `${location.protocol}//${location.host}`
    testPCParam.course_host = `${location.protocol}//${location.host}/dp-course`
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
