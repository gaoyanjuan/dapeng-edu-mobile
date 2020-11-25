import path from 'path'
const env = require('./env')
const global = require('./plugins/global')

export default {
  target: 'server',
  server: {
    port: env[process.env.MODE].PORT,
    host: env[process.env.MODE].HOST
  },
  env: {
    global: global,
    zhifuUrl: env[process.env.MODE].DP_ZHIFU, // 快捷支付链接地址
    mBaseUrl:env[process.env.MODE].DP_M_URL, // m站地址
    authUrl: env[process.env.MODE].DP_AUTH_URL, // 中台登录地址
    ossUrl: env[process.env.MODE].OSS_URL, // 静态文件地址
    orderUrl: env[process.env.MODE].ORDER_URL, // 我的订单地址
    mode: env[process.env.MODE].MODE
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
      { property: 'og:url', content: 'http://newpc.dapengjiaoyu.cn/' },
      { property: 'og:image', content: 'http://newpc.dapengjiaoyu.cn/dapeng/img/wx-qr.af8e7b1.jpg' },
      { property: 'og:description', content: '大鹏教育专注于职业设计人才的技能培训，大鹏教育的课程涵盖了设计培训行业各个领域，包括UI设计，平面设计、网页设计、PS培训、电商美工、广告设计等21门课程类型,帮助数十万学员成功就业' },
      { property: 'og:site_name', content: '大鹏教育职业技能培训' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        hid: 'player',
        type: 'text/javascript',
        src: '//player.polyv.net/script/player.js'
      },
      {
        src: 'http://pv.sohu.com/cityjson?ie=utf-8'
      },
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
    { src: '~/plugins/axios' },
    { src: '~/plugins/clipboard.js', ssr: false },
    { src: '~/plugins/vue-inject.js'},
    { src: '~/plugins/root-font-size.js', ssr: false},
    { src: '~/plugins/amfe-flexble.js', ssr: false},
    { src: '~/plugins/swiper.js', ssr: false},
    { src: '~/plugins/touch-emulator.js', ssr: false},
    { src: '~/plugins/validate-system-hostname', ssr: false },
    { src: '~/plugins/vant', ssr: true},
    { src: '~/plugins/head-image.js', ssr: true },
    { src: '~/plugins/filters.js', ssr: true },
    { src: '~/plugins/toast.js', ssr: true },
    { src: '~/plugins/animate.js', ssr: true },
    { src: '~/plugins/check-login.js', ssr: true },
  ],

  components: true,

  buildModules: [],

  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api/token/get_token': {
      target: env[process.env.MODE].DP_AUTH_URL, // 目标接口域名
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
    filenames: process.env.MODE !== 'dev' ? { css: '[contenthash].css' } : { css: '[name].css' } ,
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
      'vant',
      'dayjs',
      'swiper',
      'vue-awesome-swiper',
      'xss',
      'image-size',
      'js-cookie',
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
          '*.dapeng.lan'
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
          'http:'
        ],
        'font-src': [
          `data:`,
          '*.dapengjiaoyu.cn',
          '*.dapengjiaoyu.com',
          '*.yzcdn.cn'
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
          '*.baidu.com'
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
          '*.talk99.cn'
        ],
        'connect-src': ["'self'", '*.aliyuncs.com', '*.polyv.net', '*.videocc.net', '*.baidu.com', '*.talk99.cn'],
        'form-action': ["'self'"],
        'frame-ancestors': ['*.dapengjiaoyu.cn', '*.dapengjiaoyu.com', '*.talk99.cn', '*.jiain.net', '*.localhost'],
        'object-src': ["'none'"],
        'base-uri': ["'self'"],
        'media-src': ['*.videocc.net', '*.polyv.net', `data:`, '*.dapengjiaoyu.cn', '*.dapengjiaoyu.com']
      }
    },
    addMeta: true
  }
}
