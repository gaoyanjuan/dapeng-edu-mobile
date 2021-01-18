const filters = require('./server-filters')

function successLog (params) {
  if (process.browser) {
    return
  }
  console.log(filters.logDate(new Date()), params.config.url, params.status)
}

function errorLog (params) {
  if (process.browser) {
    return
  }
  if (params) {
    if (params.response && params.config) {
      console.error(filters.logDate(new Date()), params.config.url, params.response.status, params.response.data)
    } else {
      console.error(filters.logDate(new Date()), params.config.url, params)
    }
  }
}

function middlewareLog (params, middleware='') {
  if (process.browser) {
    return
  }
  console.log(filters.logDate(new Date()), middleware, params)
}

module.exports = {
  successLog,
  errorLog,
  middlewareLog
}
