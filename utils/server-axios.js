const axios = require('axios')
const HttpAgent = require('agentkeepalive')
const HttpsAgent = require('agentkeepalive').HttpsAgent

const instance = axios.create({
  timeout: 4000,
  httpAgent: new HttpAgent({
    keepAlive: true,
    freeSocketTimeout: 4000,
    maxFreeSockets: 256
  }),
  httpsAgent: new HttpsAgent({
    keepAlive: true,
    freeSocketTimeout: 4000,
    maxFreeSockets: 256
  })
})

module.exports = instance
