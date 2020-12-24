module.exports = {
  dev: {
    MODE: 'development',
    REFRESH_TOKEN_URL: 'http://ag.kong.dapeng.lan', // 中台的刷新接口地址
    DP_COURSE_URL: 'https://test.dapengjiaoyu.cn/dp-course', // 4.0地址
    DP_ZHIFU: 'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent', // 快捷支付链接地址
    DP_M_URL: 'http://test.m.dapengjiaoyu.cn', // m站地址 (没用了)
    BASE_URL: 'http://ag.kong.dapeng.lan/pcmove', // 网关广场模块地址
    OLD_BASE_URL: 'http://192.168.1.62/pc/api', // 网关课程模块地址
    DP_AUTH_URL: 'http://passport.dapeng.lan', // 中台登录地址
    OSS_URL: 'https://testimage.dapengjiaoyu.com', // oss地址
    TAPI_URL: 'https://tapi.dapengjiaoyu.cn', // 获取订单token
    PROTOCOL: 'https://h5-static.dapengjiaoyu.cn/h5-protocol/#/', //协议地址
    MATOMO_URL: 'https://matomotest.dapengjiaoyu.cn/matomo/matomo/',// Matomo
    MATOMO_SITEID: 19,
    PORT: 3000,
    HOST: '0.0.0.0',
    OSS_BUCKET: 'dapeng-test-image'
  },
  test: {
    MODE: 'test',
    REFRESH_TOKEN_URL: 'http://ag.dev-vpc.dapengjiaoyu.cn',
    DP_COURSE_URL: 'https://test.dapengjiaoyu.cn/dp-course', // 4.0地址
    DP_ZHIFU: 'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent',
    DP_M_URL: 'http://test.m.dapengjiaoyu.cn',  // m站地址 (没用了)
    PROTOCOL: 'https://h5-static.dapengjiaoyu.cn/h5-protocol/#/', //协议地址
    BASE_URL: 'http://172.17.207.43:8000/pcmove', // 网关广场模块地址
    OLD_BASE_URL: 'http://172.17.207.43:8000/pc', // 网关课程模块地址
    DP_AUTH_URL: 'https://auth-test.dapengjiaoyu.cn',
    OSS_URL: 'https://testimage.dapengjiaoyu.com',
    TAPI_URL: 'https://tapi.dapengjiaoyu.cn', // 获取订单token
    ORDER_URL: 'https://test-myorder.dapengjiaoyu.cn/#/order/myOrder', // 订单地址
    MATOMO_URL: 'https://matomotest.dapengjiaoyu.cn/matomo/matomo/',// Matomo
    MATOMO_SITEID: 19,
    PORT: 3000,
    HOST: '0.0.0.0',
    FAILED_COLOR: '#0CB65B',
    OSS_BUCKET: 'dapeng-test-image'
  },
  pro: {
    MODE: 'production',
    REFRESH_TOKEN_URL: 'http://172.17.255.95', // 认证中心刷新token地址
    DP_COURSE_URL: 'https://www.dapengjiaoyu.cn/dp-course', // PC正式站课程模块地址
    DP_ZHIFU: 'https://zhifu.dapengjiaoyu.cn/#/quickPayMent', // 快捷支付链接地址
    DP_M_URL: 'http://m.dapengjiaoyu.cn', // 老m站地址
    PROTOCOL: 'https://h5.dapengjiaoyu.cn/#/', //协议地址
    BASE_URL: 'http://172.17.255.64:8000/pcmove-v1', // 内网网关广场模块地址
    OLD_BASE_URL: 'http://172.17.255.64:8000/pc', // 内网网关课程模块地址
    DP_AUTH_URL: 'https://passport.dapengjiaoyu.cn', // 认证中心获取token地址
    OSS_URL: 'https://image.dapengjiaoyu.com', // oss资源地址
    TAPI_URL: 'http://api-appl.vpc.dapengjiaoyu.cn', // 获取订单token地址
    ORDER_URL: 'https://myorder.dapengjiaoyu.cn/#/order/myOrder', // 订单地址
    MATOMO_URL: 'https://matomo.dapengjiaoyu.cn/matomo/matomo/',// Matomo
    MATOMO_SITEID: 14,
    PORT: 3000,
    HOST: '0.0.0.0',
    FAILED_COLOR: '#0CB65B',
    OSS_BUCKET: 'dapeng-image'
  },
}
