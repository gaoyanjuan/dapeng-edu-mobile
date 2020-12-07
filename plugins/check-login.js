
import Vue from 'vue'

function login() {
  if (!$nuxt.$cookiz.get('access_token')) {
    localStorage.setItem('route', $nuxt.$route.fullPath)
    location.href="/login"
    return false
  } else {
    return true
  }
}
Vue.prototype.$login = login
