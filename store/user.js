export const state = () => ({
  accessToken: null,
  userInfo: null,
  userTrends: {
    followCount: 0,
    fansCount: 0,
    recommendCount: 0,
    likeCount: 0,
  },
  studentCode: null,
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
  userFans: {
    list: [],
    status: 'loading',
    pageInfo: {
      count: 0,
      number: 0,
      pages: 1,
      size: process.env.global.pageSize
    }
  },
  userHomesRecommend: {
    list: [],
    status: 'loading',
    pageInfo: {
      count: 0,
      number: 0,
      pages: 1,
      size: process.env.global.pageSize
    }
  },
  publishHomework: {
    list: [],
    status: 'loading',
    pageInfo: {
      count: 0,
      number: 0,
      pages: 1,
      size: process.env.global.pageSize
    }
  },
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
    state.userFollow.list = state.userFollow.list.concat(payload.data)
    state.userFollow.list.forEach((item)=>{
      item.isAttention = true
    })
    state.userFollow.pageInfo = payload.pageInfo
    if (payload.data.length < state.userFollow.pageInfo.size) {
      state.userFollow.status = 'over'
    } else {
      state.userFollow.status = 'load'
    }
  },
  appendStudentCode(state, payload) { 
    state.studentCode = payload.data.studentSatusId
  },
  clearUserFollow (state) {
    state.userFollow.list = []
    state.userFollow.pageInfo.pages = 1
    state.userFollow.status = 'loading'
  },
  setUserFollowStatus(state, payload) {
    let data = payload.data
    if(data === 'userFollow') {
      state.userFollow.list[payload.index].isAttention = payload.flag
    }else if(data === 'userFans') {
      state.userFans.list[payload.index].isAttention = payload.flag
    }
  },
  appendUserFans (state, payload) {
    state.userFans.list = state.userFans.list.concat(payload.data)
    state.userFans.pageInfo = payload.pageInfo
    if (payload.data.length < state.userFans.pageInfo.size) {
      state.userFans.status = 'over'
    } else {
      state.userFans.status = 'load'
    }
  },
  clearUserFans (state) {
    state.userFans.list = []
    state.userFans.pageInfo.pages = 1
    state.userFans.status = 'loading'
  },
  appendUserHomesRecommend (state, payload) {
    state.userHomesRecommend.list = state.userHomesRecommend.list.concat(payload.data)
    state.userHomesRecommend.pageInfo = payload.pageInfo
    if (payload.data.length < state.userHomesRecommend.pageInfo.size) {
      state.userHomesRecommend.status = 'over'
    } else {
      state.userHomesRecommend.status = 'load'
    }
  },
  clearUserHomesRecommend (state) {
    state.userHomesRecommend.list = []
    state.userHomesRecommend.pageInfo.pages = 1
    state.userHomesRecommend.status = 'loading'
  },
  appendPublishHomework(state, payload) {
    state.publishHomework.list = state.publishHomework.list.concat(payload.data)
    state.publishHomework.pageInfo = payload.pageInfo
    if (payload.data.length < state.publishHomework.pageInfo.size) {
      state.publishHomework.status = 'over'
    } else {
      state.publishHomework.status = 'load'
    }
  },
  clearPublishHomework (state) {
    state.publishHomework.list = []
    state.publishHomework.pageInfo.pages = 1
    state.publishHomework.status = 'loading'
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
  // 关注
  async followingUser (store, params) {
    const res = await this.$axios.post(`/following/${params.id}`)
    return res
  },
  // 取消关注
  async cancelFollowingUser (store, params) {
    const res = await this.$axios.delete(`/following/${params.id}`)
    return res
  },
  // 用户粉丝列表
  async appendUserFans ({ commit }, params) {
    const res = await this.$axios.get('/users/fans', {
      params: {
        ...params
      }
    })
    commit('appendUserFans', res)
    return res
  },
  // 用户推荐作业列表
  async appendUserHomesRecommend ({ commit }, params) {
    const res = await this.$axios.get('users/homes/recommend', {
      params: {
        ...params
      }
    })
    commit('appendUserHomesRecommend', res)
    return res
  },
  // 用户的发布作业列表
  async appendPublishHomework ({ commit }, params) {
    const res = await this.$axios.get('/users/homes', {
      params: {
        ...params
      }
    })
    commit('appendPublishHomework', res)
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
  userTrendsGetters (state) {
    return state.userTrends
  },
  studentCodeGetters (state) {
    return state.studentCode
  },
  userFollowGetters(state) {
    return state.userFollow
  },
  userFansGetters(state) {
    return state.userFans
  },
  userHomesRecommendGetters(state) {
    return state.userHomesRecommend
  },
  publishHomeworkGetters(state) {
    return state.publishHomework
  },
}
