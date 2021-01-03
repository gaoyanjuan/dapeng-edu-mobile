const validateSystemHostName = require('../plugins/validate-system-hostname')
const axios = require('axios')
const baseURL = validateSystemHostName.default().baseURL
const HttpAgent = require('agentkeepalive')
const HttpsAgent = require('agentkeepalive').HttpsAgent

const instance = axios.create({
  baseURL,
  timeout: 4000
})

instance.httpAgent = new HttpAgent({
  keepAlive: true,
  freeSocketTimeout: 4000,
  maxFreeSockets: 256
})

instance.httpsAgent = new HttpsAgent({
  keepAlive: true,
  freeSocketTimeout: 4000,
  maxFreeSockets: 256
})

module.exports = instance
