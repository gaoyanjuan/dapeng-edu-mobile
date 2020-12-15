
import Vue from 'vue'
import validateSystemHostName from '@/plugins/validate-system-hostname'

function login() {
  if (!$nuxt.$cookiz.get(validateSystemHostName().token_name)) {
    localStorage.setItem('route', $nuxt.$route.fullPath)
    location.href="/login"
    return false
  } else {
    return true
  }
}
Vue.prototype.$login = login
