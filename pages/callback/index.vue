<template>
  <div class="loading"></div>
</template>

<script>
import { getUrlParam } from '@/plugins/assist'
import { mapActions } from 'vuex'
import validateSystemHostName from '@/plugins/validate-system-hostname'

export default {
  layout: 'navbar',
  methods: {
    ...mapActions('accesstoken', [
      'getAuthToken'
    ])
  },
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
    if (process.env.mode === 'development') {
      this.$cookiz.set(this.validateSystemHostName().token_name, data.access_token)
    } else {
      this.$cookiz.set(this.validateSystemHostName().token_name, data.access_token, {
        domain: '.dapengjiaoyu.cn'
      })
    }
    // this.$cookiz.set('refresh_token', data.refresh_token)
    this.$cookiz.set('isLogin', true)
    const redirectUrl = decodeURIComponent(localStorage.getItem('route'))
    if (redirectUrl !== 'null') {
      window.top.location.replace(this.validateSystemHostName().host + redirectUrl)
    }  else {
      window.top.location.replace(this.validateSystemHostName().host)
    }
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
