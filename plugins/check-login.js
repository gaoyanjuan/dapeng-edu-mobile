
import Vue from 'vue'

function login() {
  if (!this.$store.getters['user/userInfoGetters']) {
    this.$router.push('/login')
    return false
  } else {
    return true
  }
}
Vue.prototype.$login = login
