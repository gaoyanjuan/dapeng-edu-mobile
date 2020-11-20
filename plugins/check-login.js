
import Vue from 'vue'

function login() {
  if (!$nuxt.$store.getters['user/userInfoGetters']) {
    $nuxt.$router.push('/login')
    return false
  } else {
    return true
  }
}
Vue.prototype.$login = login
