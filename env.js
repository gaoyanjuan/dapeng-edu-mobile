module.exports = {
  dev: {
    MODE: 'development',
    REFRESH_TOKEN_URL: 'http://ag.kong.dapeng.lan', // 中台刷新token,验证token有效性
    BASE_URL: 'http://ag.kong.dapeng.lan/pcmove', // 网关广场模块地址
    OLD_BASE_URL: 'http://ag.kong.dapeng.lan/pc', // 网关课程模块地址
    DP_AUTH_URL: 'http://passport.dapeng.lan', // 认证中心外网地址
    DP_AUTH_TOKEN_URL: 'http://passport.dapeng.lan', // 认证中心内网地址
    OSS_URL: 'https://testimage.dapengjiaoyu.com', // oss地址
    TAPI_URL: 'https://tapi.dapengjiaoyu.cn', // 获取订单token
    LOG_API_URL: 'https://tapi.dapengjiaoyu.cn', // 接口日志埋点调用地址
    PROTOCOL: 'https://h5-static.dapengjiaoyu.cn/h5-protocol/#/', //协议地址
    MATOMO_URL: 'https://matomotest.dapengjiaoyu.cn/matomo/matomo/',// Matomo
    LEYU_SERVICE: '//chat.looyuoms.com/chat/chat/p.do?c=20004236&f=10110937&g=10085073&refer=M站',
    LEYU_SIGNUP: '//chat.looyuoms.com/chat/chat/p.do?c=20004236&f=10110937&g=10085048&refer=M站',
    USER_CANCEL_URL: 'https://banner.dapengjiaoyu.com/2020/08/dp_game/dev/logoutAccount/index.html',// 用户注销地址
    M_ORDER_URL: 'https://test-zc.dapengjiaoyu.cn/c/#/myOrder',//M站我的订单地址
    PAY_URL:'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent', // 快捷支付地址
    TOKEN_NAME: 'dptoken_t', // token名称
    MATOMO_SITEID: 19,
    PORT: 3000,
    HOST: '0.0.0.0',
    OSS_BUCKET: 'dapeng-test-image'
  },
  test: {
    MODE: 'test',
    REFRESH_TOKEN_URL: 'http://172.17.207.43:8000', // 中台刷新token,验证token有效性
    PROTOCOL: 'https://h5-static.dapengjiaoyu.com/h5-protocol/#/', //协议地址
    BASE_URL: 'http://172.17.207.43:8000/pcmove', // 网关广场模块地址
    OLD_BASE_URL: 'http://172.17.207.43:8000/pc', // 网关课程模块地址
    DP_AUTH_URL: 'https://auth-test.dapengjiaoyu.cn', // 认证中心外网地址
    DP_AUTH_TOKEN_URL: 'http://172.17.207.43:8081', // 认证中心内网地址
    OSS_URL: 'https://testimage.dapengjiaoyu.com',
    TAPI_URL: 'https://tapi.dapengjiaoyu.cn', // 获取订单token
    LOG_API_URL: 'https://tapi.dapengjiaoyu.cn', // 接口日志埋点调用地址
    MATOMO_URL: 'https://matomotest.dapengjiaoyu.cn/matomo/matomo/',// Matomo
    LEYU_SERVICE: '//chat.looyuoms.com/chat/chat/p.do?c=20004236&f=10110937&g=10085073&refer=M站',
    LEYU_SIGNUP: '//chat.looyuoms.com/chat/chat/p.do?c=20004236&f=10110937&g=10085048&refer=M站',
    USER_CANCEL_URL: 'https://banner.dapengjiaoyu.com/2020/08/dp_game/dev/logoutAccount/index.html',// 用户注销地址
    M_ORDER_URL: 'https://test-zc.dapengjiaoyu.cn/c/#/myOrder',//M站我的订单地址
    PAY_URL:'https://test-zhifu.dapengjiaoyu.cn/#/quickPayMent', // 快捷支付地址
    TOKEN_NAME: 'dptoken_t', // token名称
    MATOMO_SITEID: 19,
    PORT: 3000,
    HOST: '0.0.0.0',
    FAILED_COLOR: '#0CB65B',
    OSS_BUCKET: 'dapeng-test-image'
  },
  pro: {
    MODE: 'production',
    REFRESH_TOKEN_URL: 'http://172.17.255.95', // 中台刷新token,验证token有效性
    PROTOCOL: 'https://h5.dapengjiaoyu.cn/#/', //协议地址(暂时没有用到)
    BASE_URL: 'http://172.17.255.95/pcmove-v1', // 内网网关广场模块地址
    OLD_BASE_URL: 'http://172.17.255.95/pc', // 内网网关课程模块地址
    DP_AUTH_URL: 'https://passport.dapengjiaoyu.cn', // 认证中心外网地址
    DP_AUTH_TOKEN_URL: 'http://passport.c6d5c9583137d428b95524c6fe23a5556.cn-beijing.alicontainer.com', // 认证中心内网地址
    OSS_URL: 'https://image.dapengjiaoyu.com', // oss资源地址
    TAPI_URL: 'http://api-appl.vpc.dapengjiaoyu.cn', // 获取订单token地址
    LOG_API_URL: 'https://api.dapengjiaoyu.cn', // 接口日志埋点调用地址
    MATOMO_URL: 'https://matomo.dapengjiaoyu.cn/matomo/matomo/',// Matomo
    LEYU_SERVICE: '//chat.looyuoms.com/chat/chat/p.do?c=20004236&f=10110937&g=10085073&refer=M站', // 乐语【综合服务客服】
    LEYU_SIGNUP: '//chat.looyuoms.com/chat/chat/p.do?c=20004236&f=10110937&g=10085048&refer=M站', // 乐语【报名咨询客服】
    USER_CANCEL_URL: 'https://banner.dapengjiaoyu.com/2020/08/dp_game/prod/logoutAccount/index.html',// 用户注销地址
    M_ORDER_URL: 'https://zc.dapengjiaoyu.cn/c/#/myOrder',//M站我的订单地址
    PAY_URL: 'https://zhifu.dapengjiaoyu.cn/#/quickPayMent?from=dp-course', // 快捷支付地址
    TOKEN_NAME: 'dptoken', // token名称
    MATOMO_SITEID: 14,
    PORT: 3000,
    HOST: '0.0.0.0',
    FAILED_COLOR: '#0CB65B',
    OSS_BUCKET: 'dapeng-image'
  },
}
