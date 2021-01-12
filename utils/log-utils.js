const filters = require('./server-filters')

function successLog (params) {
  console.log(filters.logDate(new Date()), params.config.url, params.status)
}

function errorLog (params) {
  if (params) {
    if (params.response) {
      console.error(filters.logDate(new Date()), params.config.url, params.response.status, params.response.data)
    } else {
      console.error(filters.logDate(new Date()), params.config.url, params)
    }
  }
}

function middlewareLog (params, middleware='') {
  console.log(filters.logDate(new Date()), middleware, params)
}

module.exports = {
  successLog,
  errorLog,
  middlewareLog
}
