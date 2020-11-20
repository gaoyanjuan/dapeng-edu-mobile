module.exports = {
  dev: {
    MODE: 'development',
    DP_URL: 'https://pc-dev.dapengjiaoyu.cn',
    DP_ZHIFU: 'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent',
    DP_M_URL: 'http://test.m.dapengjiaoyu.cn',
    BASE_URL: 'http://ag.kong.dapeng.lan/pcmove',
    OLD_BASE_URL: 'http://192.168.1.62/pc/api', //oldpc接口
    DP_AUTH_URL: 'http://passport.dapeng.lan',
    REFRESH_TOKEN_URL: 'http://ag.kong.dapeng.lan',
    OSS_URL: 'https://testimage.dapengjiaoyu.com',
    PORT: 3000,
    HOST: '127.0.0.1'
  },
  test: {
    MODE: 'test',
    REFRESH_TOKEN_URL: 'http://ag.dev-vpc.dapengjiaoyu.cn',
    DP_URL: 'https://test.dapengjiaoyu.cn/dp-course',
    DP_ZHIFU: 'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent',
    DP_M_URL: 'http://test.m.dapengjiaoyu.cn',
    BASE_URL: 'http://ag.dev-vpc.dapengjiaoyu.cn/pcmove', // 阿里云测试内网地址
    OLD_BASE_URL: 'http://ag.dev-vpc.dapengjiaoyu.cn/pc',
    DP_AUTH_URL: 'https://auth-test.dapengjiaoyu.cn',
    OSS_URL: 'https://testimage.dapengjiaoyu.com',
    TAPI_URL: 'https://tapi.dapengjiaoyu.cn',
    ORDER_URL: 'https://test-myorder.dapengjiaoyu.cn/#/order/myOrder',
    PORT: 3000,
    HOST: '0.0.0.0',
    FAILED_COLOR:'red'
  },
  internal: {
    MODE: 'internal',
    DP_URL: 'https://pc-dev.dapengjiaoyu.cn',
    DP_ZHIFU: 'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent',
    DP_M_URL: 'http://test.m.dapengjiaoyu.cn',
    BASE_URL:'http://ag.dev-vpc.dapengjiaoyu.cn/pc-move' // 阿里云测试内网地址
    // BASE_URL:'http://kong.c6931e4ccfe9c4db9b6f2d0e812b1f18b.cn-beijing.alicontainer.com/pc-move' // 阿里云测试外网地址
  },
  pro: {
    MODE: 'production',
    DP_URL: 'https://www.dapengjiaoyu.cn',
    DP_ZHIFU: 'https://zhifu.dapengjiaoyu.com/#/quickPayMent',
    DP_M_URL: 'http://m.dapengjiaoyu.cn',
    BASE_URL: 'http://pc-move-appl.dev.dapengjiaoyu.cn', // 外网后端地址
    OSS_URL: 'https://image.dapengjiaoyu.com',
    PORT: 80,
    HOST: '0.0.0.0'
  },
}
