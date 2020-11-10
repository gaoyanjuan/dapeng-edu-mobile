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
  // 查询用户信息
  async appendUserInfo ({ commit }, params) {
    commit('appendUserInfo', params)
  },
  // 检查用户是否可以注册
  async checkRegisterAble (state, params) {
    const data = await this.$axios.get(`/old/users/account-verify?${qs.stringify(params)}`)
    return data
  },
  // 获取用户信息
  async getUserDetail (state, params) {
    const data = await this.$axios.get(`/old/users/details`)
    return data
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
