<template>
  <div class="loading"></div>
</template>

<script>
import { getUrlParam } from '@/plugins/assist'
import { mapActions } from 'vuex'
import validateSystemHostName from '@/plugins/validate-system-hostname'
import jwtDecode from 'jwt-decode'

export default {
  layout: 'navbar',
  data:()=> ({
    state:'PASSWORD'
  }),
  async asyncData ({ redirect, app: { $cookiz } }) {
    if ($cookiz.get(validateSystemHostName().token_name)) {
      redirect('/')
    }
  },
  async mounted () {
    if (this.$cookiz.get(this.validateSystemHostName().token_name) && window.top) {
      window.top.location.replace(this.validateSystemHostName().host)
    }
    const fullPath = this.$route.fullPath
    const code = getUrlParam(fullPath, '?', 'code')
    const state = getUrlParam(fullPath, '?', 'state')
    let login_way = decodeURIComponent(state).split('*')[1]
    this.state = login_way ? login_way : 'AUTOLOGIN'
    // return
    const { data } = await this.getAuthToken({
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${this.validateSystemHostName().host}/callback`
    })
    const token = jwtDecode(data.refresh_token)

    // ************* 登录埋点  Start*************
    this.$matomo.setUserId(token.sub)
    let userData = {'user_id':token.sub, 'ztxx_dl_dlfs': this.state}
    this.$matomo.setCustomVariable(1, 'ztxx#ztxx_dl', JSON.stringify(userData))
    this.$matomo.trackPageView()
    // ************* 登录埋点 End*************

    const expiresTime = new Date(token.exp * 1000)
    if (process.env.mode === 'development') {
      this.$cookiz.set(this.validateSystemHostName().token_name, data.access_token, {
        expires: expiresTime
      })
    } else {
      this.$cookiz.set(this.validateSystemHostName().token_name, data.access_token, {
        expires: expiresTime,
        path: '/',
        domain: '.dapengjiaoyu.cn'
      })
    }
    // this.$cookiz.set('refresh_token', data.refresh_token)
    this.$cookiz.set('isLogin', true, {
      path: '/'
    })
    const query = window.top.location.search.split('redirect=')[1]
    if (query) {
      const route = decodeURIComponent(query)
      window.top.location.replace(this.validateSystemHostName().host + route)
    } else {
      window.top.location.replace(this.validateSystemHostName().host)
    }
  },
  methods: {
    ...mapActions('accesstoken', [
      'getAuthToken'
    ])
  }
}
</script>

<style lang='less' scoped>

.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  background: url("~@/assets/icons/loading.gif") center center no-repeat #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 172px 36px;
  animation: load 1.04s ease infinite;
  -webkit-animation: load 1.04s ease infinite;
}

@keyframes load {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}

@-webkit-keyframes load {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
</style>
