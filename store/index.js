import { get_cookie } from '@/utils/cookie-tool';
<<<<<<< HEAD
import logo from './modules/logo'
import validateSystemHostName from '@/plugins/validate-system-hostname'
import filter from '@/plugins/filters'
=======
>>>>>>> e079b52df433dcb87f381e5985abc1eba8684972

export default {
  state: () => {
    return {
      listType: '',
      propIndex: 0,
      anchorId: ''
    }
  },
  mutations: {
    changeListData(state, payload) {
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
    },
    // 设置头像
    setUserAvatar(state, payload) {
      state.user.userInfo.avatar = payload
    }
  },
  actions: {
    async nuxtServerInit({commit, dispatch}, {req, app}) {
      //获取服务端cookie
      const access_token = get_cookie(req.headers.cookie, process.env.TOKEN_NAME)
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
  getters: {
    getTagsList: (state) => {
      return state.logo.tagsList
    },
    getSortList: (state) => {
      return state.logo.sortList
    }
  },
  modules: {
    logo
  }
}
