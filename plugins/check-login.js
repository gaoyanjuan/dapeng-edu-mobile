
import Vue from 'vue'
import validateSystemHostName from '@/plugins/validate-system-hostname'

function login() {
  if ($nuxt.$store.getters['user/userInfoGetters'] && $nuxt.$store.getters['user/userInfoGetters'].userId) {
    return true
  } else {
    const host = validateSystemHostName().HOST
    $nuxt.$cookiz.set('redirect_url', `${host}${$nuxt.$route.fullPath}`)
    const url = getLoginUrl()
    location.href= url
    return false
  }
}

function getLoginUrl () {
  const config = {
    clientId: $nuxt.validateSystemHostName().CLIENT_ID,
    redirect_uri: `${$nuxt.validateSystemHostName().HOST}/callback`,
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

function logout () {
  return new Promise((resolve) => {
    $nuxt.$axios.get('/logout').then(() => {
      $nuxt.$cookiz.remove('userinfo', {
        path: '/'
      })
      $nuxt.$store.commit('user/appendUserInfo', null)
      resolve(true)
    })
  })
}

Vue.prototype.$login = login
Vue.prototype.$logout = logout
Vue.prototype.$getLoginUrl = getLoginUrl

export default{
  login,
  getLoginUrl
}
