/***
 * 服务端运行环境
 */

function authEnv () {
  const localPCParam = {
    dp_auth_token_url: 'http://ag.kong.dapeng.lan', // 网关内网地址
  }
  const testPCParam = {
    dp_auth_token_url: 'http://172.17.207.43:8000', // 网关内网地址
  }
  const prodPCParam = {
    dp_auth_token_url: 'http://172.17.255.95', // 网关内网地址
  }
  if (process.env.MODE === 'test') {
    return testPCParam
  } else if (process.env.MODE === 'production') {
    return prodPCParam
  } else {
    return localPCParam
  }
}

module.exports = authEnv
