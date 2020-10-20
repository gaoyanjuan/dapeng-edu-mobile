export const state = () => ({
  accessToken: null,
  userInfo: null
})

export const mutations = {
  /** * 添加数据至Banner列表  */
  appendAccessToken (state, payload) {
    state.accessToken = payload
  },
  appendUserInfo (state, payload) {
    state.userInfo = payload
  },
}

export const actions = {
   /** * 查询Banner 列表 */
  async appendUserInfo ({ commit }, params) {
    const res = await this.$axios.get('/users/token', {
      params: {
        ...params
      }
    })
    // Cookies.set('token','bbr')
    commit('appendUserInfo', res.data)
    return res.data
  },
}

export const getters = {
  accessTokenGetters (state) {
    return state.accessToken
  },
  userInfoGetters (state) {
    return state.userInfo
  },
}
