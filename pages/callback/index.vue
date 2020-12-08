<template>
  <div class="loading"></div>
</template>

<script>
import { getUrlParam } from '@/plugins/assist'
import { mapActions } from 'vuex'
export default {
  layout: 'navbar',
  methods: {
    ...mapActions('accesstoken', [
      'getAuthToken'
    ])
  },
  async asyncData ({ redirect, app: { $cookiz } }) {
    if ($cookiz.get('access_token')) {
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
    this.$cookiz.set('access_token', data.access_token)
    this.$cookiz.set('refresh_token', data.refresh_token)
    const redirectUrl = decodeURIComponent(localStorage.getItem('route'))
    window.top.location.replace(this.validateSystemHostName().host + redirectUrl)
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
  background: url("~@/assets/icons/loading.svg") center center no-repeat #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50px 80px;
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
