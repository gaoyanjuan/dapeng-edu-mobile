
import Vue from 'vue'
import validateSystemHostName from '@/plugins/validate-system-hostname'

function login() {
  if (!$nuxt.$cookiz.get(process.env.TOKEN_NAME)) {
    location.href= `/login?redirect=${encodeURIComponent($nuxt.$route.fullPath)}`
    return false
  } else {
    return true
  }
}
Vue.prototype.$login = login
