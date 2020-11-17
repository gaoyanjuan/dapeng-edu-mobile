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
  publishWorks: {
    list: [],
    status: 'loading',
    pageInfo: {
      count: 0,
      number: 0,
      pages: 1,
      size: process.env.global.pageSize
    }
  },
  publishDynamic: {
    list: [],
    status: 'loading',
    pageInfo: {
      count: 0,
      number: 0,
      pages: 1,
      size: process.env.global.pageSize
    }
  },
  publishGrowth: {
    list: [],
    status: 'loading',
    pageInfo: {
      count: 0,
      number: 0,
      pages: 1,
      size: process.env.global.pageSize
    }
  },
  userLikes: {
    homework: {
      list: [],
      status: 'loading',
      pageInfo: {
        count: 0,
        number: 0,
        pages: 1,
        size: process.env.global.pageSize
      }
    },
    works: {
      list: [],
      status: 'loading',
      pageInfo: {
        count: 0,
        number: 0,
        pages: 1,
        size: process.env.global.pageSize
      }
    },
    life: {
      list: [],
      status: 'loading',
      pageInfo: {
        count: 0,
        number: 0,
        pages: 1,
        size: process.env.global.pageSize
      }
    },
    activity_post: {
      list: [],
      status: 'loading',
      pageInfo: {
        count: 0,
        number: 0,
        pages: 1,
        size: process.env.global.pageSize
      }
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
  appendPublishWorks(state, payload) {
    if(payload.data instanceof Array) {
      state.publishWorks.list = state.publishWorks.list.concat(payload.data)
    }else {
      state.publishWorks.list = []
    }
    state.publishWorks.pageInfo = payload.pageInfo
    if (payload.data.length < state.publishWorks.pageInfo.size) {
      state.publishWorks.status = 'over'
    } else {
      state.publishWorks.status = 'load'
    }
  },
  clearPublishWorks (state) {
    state.publishWorks.list = []
    state.publishWorks.pageInfo.pages = 1
    state.publishWorks.status = 'loading'
  },
  appendPublishDynamic(state, payload) {
    state.publishDynamic.list = state.publishDynamic.list.concat(payload.data)
    state.publishDynamic.pageInfo = payload.pageInfo
    if (payload.data.length < state.publishDynamic.pageInfo.size) {
      state.publishDynamic.status = 'over'
    } else {
      state.publishDynamic.status = 'load'
    }
  },
  clearPublishDynamic (state) {
    state.publishDynamic.list = []
    state.publishDynamic.pageInfo.pages = 1
    state.publishDynamic.status = 'loading'
  },
  appendPublishGrowth(state, payload) {
    state.publishGrowth.list = state.publishGrowth.list.concat(payload.data)
    state.publishGrowth.pageInfo = payload.pageInfo
    if (payload.data.length < state.publishGrowth.pageInfo.size) {
      state.publishGrowth.status = 'over'
    } else {
      state.publishGrowth.status = 'load'
    }
  },
  clearPublishGrowth (state) {
    state.publishGrowth.list = []
    state.publishGrowth.pageInfo.pages = 1
    state.publishGrowth.status = 'loading'
  },
  appendUserLikes(state, payload) {
    let type = payload.type.toLocaleLowerCase()
    state.userLikes[type].list = state.userLikes[type].list.concat(payload.res.data)
    state.userLikes[type].pageInfo = payload.res.pageInfo
    if (payload.res.data.length < state.userLikes[type].pageInfo.size) {
      state.userLikes[type].status = 'over'
    } else {
      state.userLikes[type].status = 'load'
    }
  },
  clearUserLikes (state) {
    state.userLikes.homework.list = []
    state.userLikes.homework.pageInfo.pages = 1
    state.userLikes.homework.status = 'loading'
    state.userLikes.works.list = []
    state.userLikes.works.pageInfo.pages = 1
    state.userLikes.works.status = 'loading'
    state.userLikes.life.list = []
    state.userLikes.life.pageInfo.pages = 1
    state.userLikes.life.status = 'loading'
    state.userLikes.activity_post.list = []
    state.userLikes.activity_post.pageInfo.pages = 1
    state.userLikes.activity_post.status = 'loading'
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
  // 删除作业
  async deleteHomework ({ commit }, params) {
    const res = await this.$axios.delete(`/homes/${params.id}`)
    return res
  },
  // 用户的发布作品列表
  async appendPublishWorks ({ commit }, params) {
    const res = await this.$axios.get('/users/works', {
      params: {
        ...params
      }
    })
    commit('appendPublishWorks', res)
    return res
  },
  // 删除作品
  async deleteWorks ({ commit }, params) {
    const res = await this.$axios.delete(`/works/${params.id}`)
    return res
  },
  // 用户的发布动态列表
  async appendPublishDynamic ({ commit }, params) {
    const res = await this.$axios.get('/users/dynamics', {
      params: {
        ...params
      }
    })
    commit('appendPublishDynamic', res)
    return res
  },
  // 删除动态
  async deleteDynamics ({ commit }, params) {
    const res = await this.$axios.delete(`/dynamics/${params.id}`)
    return res
  },
  // 用户的活动帖子列表
  async appendPublishGrowth ({ commit }, params) {
    const res = await this.$axios.get('users/posts', {
      params: {
        ...params
      }
    })
    commit('appendPublishGrowth', res)
    return res
  },
  // 删除活动帖子
  async deletePosts ({ commit }, params) {
    const res = await this.$axios.delete(`/posts/${params.id}`)
    return res
  },
  // 查询用户的喜欢列表
  async appendUserLikes ({ commit }, params) {
    const res = await this.$axios.get('users/likes', {
      params: {
        ...params
      }
    })
    const payload = {
      type: params.type,
      res: res
    }
    commit('appendUserLikes', payload)
    return payload
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
  publishWorksGetters(state) {
    return state.publishWorks
  },
  publishDynamicGetters(state) {
    return state.publishDynamic
  },
  publishGrowthGetters(state) {
    return state.publishGrowth
  },
  userLikesGetters(state) {
    return state.userLikes
  },
}
