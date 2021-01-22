import Vue from 'vue'

function squareLoading(params) {

  params.user_id = ''
  const userGetters = $nuxt.$store.getters['user/userInfoGetters']
  if (userGetters && userGetters.userId) {
    params.user_id = userGetters.userId
  }
  
  this.$matomo.setCustomVariable(1, 'squarepage#sp_page_loading', JSON.stringify(params), 'page')
  this.$matomo.trackPageView()
}

// 广场列表加载
Vue.prototype._squareLoading = squareLoading