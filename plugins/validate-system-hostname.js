function validateSystemHostName () {
  const localPCParam = {
    CLIENT_ID: 'pc',
    CLIENT_SECRET: 'COm6AqoH'
  }
  const testPCParam = {
    CLIENT_ID: 'b4cd9c34'
  }
  const prodPCParam = {
    CLIENT_ID: 'Dd8fbbB5'
  }
  if (process.browser) {
    localPCParam.host = `//${location.host}`
    localPCParam.course_host = `//127.0.0.1:3001`
    testPCParam.host = `//${location.host}`
    testPCParam.course_host = `//${location.host}/dp-course`
    prodPCParam.host = `//${location.host}`
    testPCParam.course_host = `//${location.host}/dp-course`
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
