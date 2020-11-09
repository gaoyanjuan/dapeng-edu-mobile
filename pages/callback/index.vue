<template>
  <div class="wrap">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
import { getUrlParam } from '@/plugins/assist'
import { mapActions } from 'vuex'
import Cookie from 'js-cookie'
export default {
  layout: 'navbar',
  methods: {
    ...mapActions('accesstoken', [
      'getAuthToken'
    ])
  },
  async mounted () {
    const fullPath = this.$route.fullPath
    const code = getUrlParam(fullPath, '?', 'code')
    const { data } = await this.getAuthToken({
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${this.validateSystemHostName().host}/callback`
    })
    Cookie.set('access_token', data.access_token)
    Cookie.set('refresh_token', data.refresh_token)
    const redirectUrl = decodeURIComponent(localStorage.getItem('redirect_url'))
    if (redirectUrl.includes('redirect')) {
      // console.log(redirectUrl)
      window.top.location = redirectUrl.split('redirect=')[1]
    } else {
      window.top.location = `${this.validateSystemHostName().host}`
    }
  }
}
</script>

<style lang='less' scoped>
  .wrap {
    height: 506px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading {
    width: 100px;
    height: 16px;
  }
  .loading span {
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    border-radius: 50%;
    background: lightgreen;
    -webkit-animation: load 1.04s ease infinite;
  }
  .loading span:last-child {
    margin-right: 0px;
  }
  @-webkit-keyframes load {
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  .loading span:nth-child(1){
    -webkit-animation-delay:0.13s;
  }
  .loading span:nth-child(2){
    -webkit-animation-delay:0.26s;
  }
  .loading span:nth-child(3){
    -webkit-animation-delay:0.39s;
  }
  .loading span:nth-child(4){
    -webkit-animation-delay:0.52s;
  }
  .loading span:nth-child(5){
    -webkit-animation-delay:0.65s;
  }
</style>
