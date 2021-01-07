
import Vue from 'vue'

function login() {
  if ($nuxt.$store.getters['user/userInfoGetters'] && $nuxt.$store.getters['user/userInfoGetters'].userId) {
    return true
  } else {
    console.log($nuxt.$route)
    const url = getLoginUrl()
    location.href= url
    return false
  }
}

function getLoginUrl () {
  const config = {
    clientId: $nuxt.validateSystemHostName().client_id,
    redirect_uri: `${$nuxt.validateSystemHostName().host}/callback`,
    state: 1
  }
  const url = `${process.env.authUrl}/oauth/authorize?response_type=code&display=mobile&client_id=`
  return (
    url +
    config.clientId +
    '&redirect_uri=' +
    config.redirect_uri +
    '&state=' +
    config.state
  )
}

Vue.prototype.$login = login
