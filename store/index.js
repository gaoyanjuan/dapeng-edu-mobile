import { get_cookie } from '@/utils/cookie-tool';

export default {
  state: () => {
    return {
      listType: '',
      propIndex: 0
    }
  },
  mutations: {
    changeListData (state, payload) {
      if (payload) {
        if (payload.listType) {
          state.listType = payload.listType
        }
        if (payload.propIndex) {
          state.propIndex = payload.propIndex
        }
      }
    }
  },
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
            if (res && res.data) {
              const { userId, nickname, avatar, dpAccount, mobile, loginName } = res.data
              const userinfo = {
                userId, nickname, avatar, dpAccount, mobile, loginName
              }
              app.$cookiz.set('userinfo', userinfo)
            }
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
