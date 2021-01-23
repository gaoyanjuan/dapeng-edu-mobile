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
    localPCParam.HOST = `//${location.host}`
    localPCParam.COURSE_HOST = `//127.0.0.1:3001`
    testPCParam.HOST = `//${location.host}`
    testPCParam.COURSE_HOST = `//${location.host}/dp-course`
    prodPCParam.HOST = `//${location.host}`
    testPCParam.COURSE_HOST = `//${location.host}/dp-course`
  }
  if (process.env.MODE === 'test') {
    return testPCParam
  } else if (process.env.MODE === 'production') {
    return prodPCParam
  } else {
    return localPCParam
  }
}

import Vue from 'vue'
Vue.prototype.validateSystemHostName = validateSystemHostName

export default validateSystemHostName
