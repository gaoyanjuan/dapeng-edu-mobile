
import Vue from 'vue'
import validateSystemHostName from '@/plugins/validate-system-hostname'

function login() {
  if (!$nuxt.$cookiz.get(validateSystemHostName().token_name)) {
    location.href= `/login?redirect=${encodeURIComponent($nuxt.$route.fullPath)}`
    return false
  } else {
    return true
  }
}
Vue.prototype.$login = login
