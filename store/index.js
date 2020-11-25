import { get_cookie } from '@/utils/cookie-tool';

export default {
  state: () => {
    return {}
  },
  mutations: {},
  actions: {
    async nuxtServerInit({commit, dispatch}, {req, app}) {
      //获取服务端cookie
      const access_token = get_cookie(req.headers.cookie, 'access_token')
      if (access_token) {
        const userinfo = app.$cookiz.get('userinfo')
        if (userinfo) {
          commit('user/appendUserInfo', userinfo)
        } else {
          await dispatch('user/getUserDetails').then((res) => {
            app.$cookiz.set('userinfo', res.data)
          })
        }
      } else {
        commit('user/appendUserInfo', null)
        app.$cookiz.remove('userinfo')
      }
    }
  },
  getters: {}
}
