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
  async asyncData ({ redirect, app: { $cookiz } }) {
    if ($cookiz.get(validateSystemHostName().token_name)) {
      redirect('/')
    }
  },
  async mounted () {
    const fullPath = this.$route.fullPath
    const code = getUrlParam(fullPath, '?', 'code')
    const { data } = await this.getAuthToken({
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${this.validateSystemHostName().host}/callback`
    })
    const token = jwtDecode(data.refresh_token)
    const expiresTime = new Date(token.exp * 1000)
    console.log(expiresTime)
    if (process.env.mode === 'development') {
      this.$cookiz.set(this.validateSystemHostName().token_name, data.access_token, {
        expires: expiresTime
      })
    } else {
      this.$cookiz.set(this.validateSystemHostName().token_name, data.access_token, {
        expires: expiresTime,
        domain: '.dapengjiaoyu.cn'
      })
    }
    // this.$cookiz.set('refresh_token', data.refresh_token)
    this.$cookiz.set('isLogin', true)
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
