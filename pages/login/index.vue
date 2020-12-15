<template>
  <div class="login-wrap">
    <iframe
      id="iframe-wrap"
      :src="src"
      :width="width"
      :height="height"
      frameborder="0"
      sandbox="allow-scripts allow-same-origin allow-forms allow-top-navigation allow-pointer-lock allow-popups"
    >
    </iframe>
  </div>
</template>

<script>
import validateSystemHostName from '@/plugins/validate-system-hostname'

export default {
  layout: 'navbar',
  data () {
    return {
      config: {
        // oauth2相关
        clientId: '',
        clientSecret: '',
        // 返回token的url地址
        redirect_uri: '',
        // 页面模板id
        state: '1'
      },
      // iframe的src
      src: '',
      authUrl: process.env.authUrl,
      width: 0,
      height: 0
    }
  },
  async asyncData ({ redirect, app: { $cookiz } }) {
    if ($cookiz.get(validateSystemHostName().token_name)) {
      redirect('/')
    }
  },
  mounted () {
    this.width = document.body.clientWidth
    const ifm = document.getElementById('iframe-wrap')
    this.height = document.body.scrollHeight
    this.config.clientId = this.validateSystemHostName().client_id
    this.config.clientSecret = this.validateSystemHostName().client_secret
    this.config.redirect_uri = `${this.validateSystemHostName().host}/callback`

    // document.body.style.overflow = 'hidden'
    this.src = this.getLoginUrl()
    const clientData = `${this.config.clientId}:${this.config.clientSecret}`
    this.$cookiz.set('client', `${btoa(clientData)}`)

    // postMessage事件对接 （注册、用户协议、隐私政策）
    window.addEventListener('message', (e) => {
      // "reg" 表示跳转注册页
      // "1" 表示跳转  用户协议
      // "2" 表示跳转  隐私协议
      // "forget_pw" 表示弹出找回密码
      const event = e.data
      if (event.type === 'url_click') {
        switch (event.target) {
          case 'reg':
            _this.modifyType('Register')
            break
          case '1':
            _this.toNavigate('AGREE')
            break
          case '2':
            _this.toNavigate('CONCEAL')
            break
          case 'forget_pw':
            _this.forgetPwd()
            break
          default:
            break
        }
      } else if(event.type === 'go_back') {
        window.history.back(-1)
      }
    })
  },
  beforeDestroy () {
    window.frames['iframe-wrap'].contentWindow.postMessage({ type: 'clearStore' }, '*')
    document.body.style.overflow = 'scroll'
  },
  methods: {
    getLoginUrl () {
      const url = `${this.authUrl}/oauth/authorize?response_type=code&display=mobile&client_id=`
      return (
        url +
        this.config.clientId +
        '&redirect_uri=' +
        this.config.redirect_uri +
      '&state=' +
        this.config.state
      )
    },
    forgetPwd () {
      // eslint-disable-next-line no-undef
      doyoo.util.openChat('g=10084846')
      return false
    }
  }
}
</script>

<style>
.login-wrap {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
