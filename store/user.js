export const state = () => ({
  accessToken: null,
  userInfo: null,
  userTrends: {
    followCount: 0,
    fansCount: 0,
    recommendCount: 0,
    likeCount: 0,
    userFollow: {
      list: [],
      status: 'loading',
      pageInfo: {
        count: 0,
        number: 0,
        pages: 1,
        size: process.env.global.pageSize
      }
    },
  },
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
  appendUserTrends (state, payload) {
    state.userTrends = payload.data
  },
  appendUserFollow (state, payload) {
    state.userFollow.list = payload.data
    state.userFollow.pageInfo = payload.pageInfo
    if (payload.data.length < state.userFollow.pageInfo.size) {
      state.userFollow.status = 'over'
    } else {
      state.userFollow.status = 'load'
    }
  },
  appendStudentCode(state, payload) { 
    state.studentCode = payload.data.studentSatusId
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
  // 获取用户信息【主要是获取学籍号】
  async getUserDetail({ commit }, params) {
    const data = await this.$axios.get(`/old/users/details`)
    commit('appendStudentCode', data)
  },
  // 获取用户互动数据
  async appendUserTrends ({ commit }, params) {
    const res = await this.$axios.get('/users/trends', {
      params: {
        ...params
      }
    })
    commit('appendUserTrends', res)
    return res
  },
  // 用户关注列表
  async appendUserFollow ({ commit }, params) {
    const res = await this.$axios.get('/users/follows', {
      params: {
        ...params
      }
    })
    commit('appendUserFollow', res)
    return res
  },
  clearUserFollow (state) {
    state.userFollow.list = []
    state.userFollow.pageInfo.pages = 1
    state.userFollow.status = 'loading'
  },
}

export const getters = {
  accessTokenGetters (state) {
    return state.accessToken
  },
  userInfoGetters (state) {
    return state.userInfo
  },
  userTrendsGetters (state) {
    return state.userTrends
  },
  userFollowGetters(state) {
    return state.userFollow
  },
  studentCodeGetters (state) {
    return state.studentCode
  }
}
