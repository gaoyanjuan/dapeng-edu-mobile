export const state = () => ({
  accessToken: null,
  userInfo: null,
  studentCode: null
})

export const mutations = {
  /** * 添加数据至Banner列表  */
  appendAccessToken (state, payload) {
    state.accessToken = payload
  },
  appendUserInfo (state, payload) {
    state.userInfo = payload
  },
  appendStudentCode(state, payload) { 
    state.studentCode = payload
  }
}

export const actions = {
   /** * 查询Banner 列表 */
  async appendUserInfo ({ commit }, params) {
    commit('appendUserInfo', params)
  },
  // 查询登录用户的学籍号
  async queryStudentCode({ commit }, params) {
    const res = await this.$axios.get(`old/users/details`)
    commit('appendStudentCode', res)
  },
}

export const getters = {
  accessTokenGetters (state) {
    return state.accessToken
  },
  userInfoGetters (state) {
    return state.userInfo
  },
  studentCodeGetters (state) {
    return state.studentCode
  },
}
