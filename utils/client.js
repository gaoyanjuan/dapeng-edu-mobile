// Client.js
const OSS = require('ali-oss')

export default function Client (data) {
  // 后端提供数据
  return new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.stsToken,
    bucket: process.env.ossBucket
  })
}
