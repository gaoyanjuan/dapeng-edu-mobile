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
  // 发送验证码
  async sendCode (state, params) {
    const res = await this.$axios.get(`/old/sms/send-code?${qs.stringify(params)}`)
    return res
  },
  // 对比验证码
  async checkCode (state, params) {
    const res = await this.$axios.get(`/old/sms/check-code?${qs.stringify(params)}`)
    return res
  },
  // 注册用户
  async userRegister (state, params) {
    const res = await this.$axios.post(`/old/users/register?${qs.stringify(params)}`)
    return res
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
