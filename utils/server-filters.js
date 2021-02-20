const dayjs = require('dayjs')

function logDate (date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
  logDate
}
