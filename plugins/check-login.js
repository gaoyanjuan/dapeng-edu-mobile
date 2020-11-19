
import Vue from 'vue'

function login() {
  this.$router.push('/login')
}
Vue.prototype.$login = login
