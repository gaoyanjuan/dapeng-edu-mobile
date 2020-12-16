module.exports = {
  dev: {
    MODE: 'development',
    DP_ZHIFU: 'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent', // 快捷支付链接地址
    DP_M_URL: 'http://test.m.dapengjiaoyu.cn', // m站地址 (没用了)
    DP_COURSE_URL: 'https://test.dapengjiaoyu.cn/dp-course', // 4.0地址
    BASE_URL: 'http://ag.kong.dapeng.lan/pcmove', // 网关地址
    OLD_BASE_URL: 'http://192.168.1.62/pc/api', //oldpc接口 (没用了)
    DP_AUTH_URL: 'http://passport.dapeng.lan', // 中台登录地址
    REFRESH_TOKEN_URL: 'http://ag.kong.dapeng.lan', // 中台的刷新接口地址
    OSS_URL: 'https://testimage.dapengjiaoyu.com', // oss地址
    PORT: 3000,
    HOST: '0.0.0.0',
    OSS_BUCKET: 'dapeng-test-image'
  },
  test: {
    MODE: 'test',
    REFRESH_TOKEN_URL: 'http://ag.dev-vpc.dapengjiaoyu.cn',
    DP_ZHIFU: 'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent',
    DP_M_URL: 'http://test.m.dapengjiaoyu.cn',
    DP_COURSE_URL: 'https://test.dapengjiaoyu.cn/dp-course',
    BASE_URL: 'http://172.17.207.43:8000/pcmove',
    OLD_BASE_URL: 'http://172.17.207.43:8000/pc',

    DP_AUTH_URL: 'https://auth-test.dapengjiaoyu.cn',
    OSS_URL: 'https://testimage.dapengjiaoyu.com',
    TAPI_URL: 'https://tapi.dapengjiaoyu.cn', // 获取订单token
    ORDER_URL: 'https://test-myorder.dapengjiaoyu.cn/#/order/myOrder', // 订单地址
    PORT: 3000,
    HOST: '0.0.0.0',
    FAILED_COLOR: '#0CB65B',
    OSS_BUCKET: 'dapeng-test-image'
  },
  internal: {
    MODE: 'internal',
    DP_ZHIFU: 'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent',
    DP_M_URL: 'http://test.m.dapengjiaoyu.cn',
    BASE_URL:'http://ag.dev-vpc.dapengjiaoyu.cn/pc-move' // 阿里云测试内网地址
    // BASE_URL:'http://kong.c6931e4ccfe9c4db9b6f2d0e812b1f18b.cn-beijing.alicontainer.com/pc-move' // 阿里云测试外网地址
  },
  pro: {
    MODE: 'production',
    DP_ZHIFU: 'https://zhifu.dapengjiaoyu.cn/#/quickPayMent',
    DP_M_URL: 'http://m.dapengjiaoyu.cn',
    DP_COURSE_URL: 'https://www.dapengjiaoyu.cn/dp-course',
    BASE_URL: 'http://pc-move-appl.dev.dapengjiaoyu.cn', // 外网后端地址
    OLD_BASE_URL: 'http://172.17.255.64:8000/pc',
    DP_AUTH_URL: 'http://passport.dapengjiaoyu.cn',
    OSS_URL: 'https://image.dapengjiaoyu.com',
    TAPI_URL: 'http://api-appl.vpc.dapengjiaoyu.cn',
    REFRESH_TOKEN_URL: 'http://172.17.255.64:8000',
    ORDER_URL: 'https://myorder.dapengjiaoyu.cn/#/order/myOrder',
    PORT: 80,
    HOST: '0.0.0.0',
    FAILED_COLOR: '#0CB65B',
    OSS_BUCKET: 'dapeng-image'  
  },
}
