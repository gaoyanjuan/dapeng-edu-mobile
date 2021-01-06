import path from 'path'
const env = require('./env')
const global = require('./plugins/global')
const timestamp = new Date().getTime()
let isDev = true
if (process.env.MODE === 'pro' || process.env.MODE === 'test') {
  isDev = false
}

export default {
  target: 'server',
  server: {
    port: env[process.env.MODE].PORT,
    host: env[process.env.MODE].HOST
  },
  env: {
    global: global,
    zhifuUrl: env[process.env.MODE].DP_ZHIFU, // 快捷支付链接地址
    mBaseUrl: env[process.env.MODE].DP_M_URL, // m站地址
    courseUrl: env[process.env.MODE].DP_COURSE_URL, //4.0课程
    authUrl: env[process.env.MODE].DP_AUTH_URL, // 中台登录地址
    ossUrl: env[process.env.MODE].OSS_URL, // 静态文件地址
    orderUrl: env[process.env.MODE].ORDER_URL, // 我的订单地址
    mode: env[process.env.MODE].MODE,
    TOKEN_NAME: env[process.env.MODE].TOKEN_NAME, // token名称
    protocol: env[process.env.MODE].PROTOCOL, //协议地址
    ossBucket: env[process.env.MODE].OSS_BUCKET, // oss的bucket
    leyuUrl: env[process.env.MODE].LEYU_SERVICE, // 乐语【综合服务客服】
    leyuSignUrl: env[process.env.MODE].LEYU_SIGNUP, // 乐语【报名咨询客服】
    userCancelUrl: env[process.env.MODE].USER_CANCEL_URL // 用户注销地址
  },
  head: {
    title: '大鹏教育-高品质的设计师在线教育',
    meta: [
      { name: 'renderer', content:'webkit'},
      { name: 'x5-fullscreen', content: 'true' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'},
      { keywords: '大鹏教育,大鹏教育培训,设计师培训学校,大鹏教育职业技能培训' },
      {
        hid: 'description',
        name: 'description',
        content: '大鹏教育专注于职业设计人才的技能培训，大鹏教育的课程涵盖了设计培训行业各个领域，包括UI设计，平面设计、网页设计、PS培训、电商美工、广告设计等21门课程类型,帮助数十万学员成功就业'
      },
      { property: 'og:title', content: ' 大鹏教育-高品质的设计师在线教育' },
      { property: 'og:type', content: '大鹏教育,大鹏教育培训,设计师培训学校,大鹏教育职业技能培训' },
      { property: 'og:url', content: 'http://www.dapengjiaoyu.cn/' },
      { property: 'og:image', content: 'https://image.dapengjiaoyu.cn/ijjctyun.png' },
      { property: 'og:description', content: '大鹏教育专注于职业设计人才的技能培训，大鹏教育的课程涵盖了设计培训行业各个领域，包括UI设计，平面设计、网页设计、PS培训、电商美工、广告设计等21门课程类型,帮助数十万学员成功就业' },
      { property: 'og:site_name', content: '大鹏教育职业技能培训' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://image.dapengjiaoyu.cn/ijjctyun.png' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: 'https://image.dapengjiaoyu.cn/ijjctyun.png' }
    ],
    script: [
      {
        hid: 'player',
        type: 'text/javascript',
        src: '//player.polyv.net/script/player.js'
      },
      {
        hid: 'ncpc',
        type: 'text/javascript',
        src: 'https://g.alicdn.com/sd/ncpc/nc.js?t=2015052012'
      }
    ]
  },

  loading: {
    height: '3px',
    color: '#0CB65B',
    failedColor: env[process.env.MODE].FAILED_COLOR
  },

  css: [
    'assets/css/dp-reset.css',
    'assets/css/dp-global.css',
    'swiper/css/swiper.css'
  ],

  plugins: [
    { src: '~/plugins/baidutj.js', ssr: false },
    { src: '~/plugins/axios' },
    { src: '~/plugins/loading.js', ssr: false },
    { src: '~/plugins/clipboard.js', ssr: false },
    { src: '~/plugins/vue-inject.js'},
    { src: '~/plugins/root-font-size.js', ssr: false},
    { src: '~/plugins/amfe-flexble.js', ssr: false},
    { src: '~/plugins/swiper.js', ssr: false},
    { src: '~/plugins/touch-emulator.js', ssr: false},
    { src: '~/plugins/validate-system-hostname', ssr: true },
    { src: '~/plugins/vant', ssr: true},
    { src: '~/plugins/head-image.js', ssr: true },
    { src: '~/plugins/filters.js', ssr: true },
    { src: '~/plugins/toast.js', ssr: true },
    { src: '~/plugins/animate.js', ssr: true },
    { src: '~/plugins/check-login.js', ssr: true },
    { src: '~/plugins/anchor-utils.js', ssr: true }
  ],

  components: true,

  buildModules: [],

  serverMiddleware: [
    '~/middleware/server/auth.js'
  ],

  modules: [
    '@nuxtjs/device',
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    ['nuxt-matomo', {
      matomoUrl: 'https://matomotest.dapengjiaoyu.cn/matomo/matomo/',
      siteId: 19,
      debug: true
    }],
  ],

  router: {
    middleware: ['matomo'],
  },

  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api/buriedPoint/log': {
      target: env[process.env.MODE].LOG_API_URL, // 日志接口调用地址
      pathRewrite: {
        '^/api/buriedPoint/log': '/api/buriedPoint/log',
        changeOrigin: true
      }
    },
    '/api/token/check_token': {
      target: env[process.env.MODE].REFRESH_TOKEN_URL, // 验证token
      pathRewrite: {
        '^/api/token/check_token': '/jti',
        changeOrigin: true
      }
    },
    '/api/token/get_token': {
      target: env[process.env.MODE].DP_AUTH_TOKEN_URL, // 目标接口域名
      pathRewrite: {
        '^/api/token/get_token': '/oauth/token',
        changeOrigin: true
      }
    },
    '/api/token/refresh_token': {
      target: env[process.env.MODE].REFRESH_TOKEN_URL, // 目标接口域名
      pathRewrite: {
        '^/api/token/refresh_token': '/auth/oauth/token',
        changeOrigin: true
      }
    },
    '/api/old': {
      target: env[process.env.MODE].OLD_BASE_URL, // 目标接口域名
      pathRewrite: {
        '^/api/old': '/',
        changeOrigin: true
      }
    },
    '/api': {
      target: env[process.env.MODE].BASE_URL, // 目标接口域名
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
        changeOrigin: true // 表示是否跨域
      }
    },
  },
  /**
   * CSS全局变量
   */
  styleResources: {
    less: [
      // less 变量
      './assets/less/vars.less',
      // mixins 函数
      './assets/less/mixins.less'
    ]
  },

  /**
   * Close Nuxt Telemetry Module
   * https://github.com/nuxt/telemetry
   */
  telemetry: false,
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[contenthash].' + timestamp + '.js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[contenthash].' + timestamp + '.js',
      css: ({ isDev }) => isDev ? '[name].css' : '[contenthash].' + timestamp + '.css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].' + timestamp + '.[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].' + timestamp + '.[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].' + timestamp + '.[ext]'
    },
    postcss: {
      preset: {
        autoprefixer: true
      }
    },
    optimization: {
			splitChunks:{
        minSize: 10000,
        maxSize: 200000
      }
		},
    extractCSS: {
      ignoreOrder: true
    },
    extend(config, ctx) {
      if (ctx.isClient) {
        config.devtool = 'eval-source-map'
      }
    },
    vendor: [ // 插件单独打包设置
      'vue',
      'axios',
      'cookie-universal-nuxt',
      'vant',
      'dayjs',
      'swiper',
      'vue-awesome-swiper',
      'xss',
      'image-size',
      'jwt-decode',
      '@vant/touch-emulator',
      'animate.css'
    ],
    publicPath: '/dapeng',
    /**
     * 如果插件位于node_modules并导出模块，
     * 需要将其添加到transpile构建选项：
     */
    transpile: [/vant.*?less/],
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 37.5,
          propList: ['*']
        }
      },
      preset: {
        autoprefixer: {
          overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8']
        }
      }
    },
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            style: (name) => {
              return `${name}/style/less.js`
            },
          },
          'vant',
        ],
      ],
    },
    /**
     *  Reset vant默认主题
     */
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import "${path.join(
              __dirname,
              './assets/less/revant.less'
            )}";`,
          },
        },
      },
    },
  },
  render: {
    compressor: false,
    /**
     * Content Security Policy
     * @author wangkangzhen
     * @description 主要添加img、font、script规则，如遇规则不匹配情况使用default-src规则，不在白名单设置规则内资源不允许被执行
     * @argument 主要白名单资源域名有：*.dapengjiaoyu.cn、*.dapengjiaoyu.com、*.polyv.net、*.videocc.net、*.baidu.com、*.talk99.cn、*.jiain.net、*.aliyuncs.com
     */
    csp: {
      hashAlgorithm: 'sha256',
      policies: {
        'default-src': [
          "'self'",
          '*.polyv.net',
          '*.dapeng.lan',
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          '*.talk99.cn'
        ],
        'frame-src': [
          '*.polyv.net',
          '*.dapeng.lan',
          '*.talk99.cn',
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com'
        ],
        'img-src': [
          "'self'",
          `data:`,
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          `blob:`,
          '*.aliyuncs.com',
          '*.baidu.com',
          '*.polyv.net',
          '*.videocc.net',
          '*.bdimg.com',
          '*.jiain.net',
          '*.alicdn.com',
          '*.aliyun.com',
          'http:'
        ],
        'font-src': [
          `data:`,
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          '*.yzcdn.cn',
          '*.alicdn.com'
        ],
        'worker-src': [
          "'self'",
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          `blob:`
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          '*.jiain.net',
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
        ],
        'script-src-elem': [
          "'self'",
          '*.polyv.net',
          '*.jiain.net',
          '*.talk99.cn',
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          '*.sohu.com',
          "'unsafe-inline'",
          '*.baidu.com',
          '*.alicdn.com',
          '*.aliyun.com',
          '*.aliapp.org',
          '*.taobao.com'
        ],
        'script-src': [
          "'self'",
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          "'unsafe-eval'",
          "'unsafe-inline'",
          '*.polyv.net',
          '*.baidu.com',
          '*.jiain.net',
          '*.talk99.cn',
          '*.alicdn.com',
          '*.aliyun.com'
        ],
        'connect-src': [
          "'self'",
          '*.aliyuncs.com',
          '*.polyv.net',
          '*.videocc.net',
          '*.baidu.com',
          '*.talk99.cn',
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          '*.alicdn.com',
          '*.aliyun.com',
          '*.aliapp.org'
        ],
        'form-action': ["'self'", '*.dapengjiaoyu.cn', '*.dapengjiaoyu.com',],
        'frame-ancestors': ['*.dapengjiaoyu.cn', '*.dapeng.lan',  '*.127.0.0.1','*.dapengjiaoyu.com', '*.talk99.cn', '*.jiain.net', '*.localhost'],
        'object-src': [
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          'http:'
        ],
        'base-uri': ["'self'"],
        'media-src': ['*.videocc.net', '*.polyv.net', `data:`, '*.dapengjiaoyu.cn', '*.dapengjiaoyu.com', 'http:']
      }
    },
    addMeta: true
  }
}
