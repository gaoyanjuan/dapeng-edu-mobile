import { get_cookie } from '@/utils/cookie-tool';
import validateSystemHostName from '@/plugins/validate-system-hostname'
import filter from '@/plugins/filters'

export default {
  state: () => {
    return {
      listType: '',
      propIndex: 0,
      anchorId: ''
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
        if (payload.anchorId) {
          state.anchorId = payload.anchorId
        }
      }
    }
  },
  actions: {
    async nuxtServerInit({commit, dispatch}, {req, app}) {
      //获取服务端cookie
      const access_token = get_cookie(req.headers.cookie, validateSystemHostName().token_name)
      if (access_token) {
        await dispatch('user/checkToken', access_token)
        .catch((error) => {
          if (error) {
            if (error.response) {
              console.error(filter.formatDate(new Date()), error.config.url, error.response.status, error.response.data)
            } else {
              console.error(filter.formatDate(new Date()), error.config.url, error)
            }
          }
        })
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
              app.$cookiz.set('userinfo', userinfo, {
                path: '/'
              })
            }
          })
        }
      } else {
        commit('user/appendUserInfo', null)
        app.$cookiz.remove('userinfo', {
          path: '/'
        })
      }
    }
  },
  getters: {}
}
