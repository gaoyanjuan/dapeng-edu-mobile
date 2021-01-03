import qs from 'querystring'

export const state = () => ({
  accessToken: null,
  userInfo: null,
  userTrends: {
    followCount: 0,
    fansCount: 0,
    recommendCount: 0,
    likeCount: 0,
  },
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
  publishReading: {
    list: [],
    status: 'loading',
    pageInfo: {
      count: 0,
      number: 0,
      pages: 1,
      size: process.env.global.pageSize
    }
  },
  publishVideo: {
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
    },
    article: {
      list: [],
      status: 'loading',
      pageInfo: {
        count: 0,
        number: 0,
        pages: 1,
        size: process.env.global.pageSize
      }
    },
    movie: {
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
  userFavorites: {
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
    },
    article: {
      list: [],
      status: 'loading',
      pageInfo: {
        count: 0,
        number: 0,
        pages: 1,
        size: process.env.global.pageSize
      }
    },
    movie: {
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
    if (payload) {
      state.userInfo = { ...payload, nickname: payload.nickname || payload.nickName }
    } else {
      state.userInfo = null
    }
  },
  appendUserTrends (state, payload) {
    state.userTrends = payload.data
  },
  appendUserFollow (state, payload) {
    state.userFollow.list = state.userFollow.list.concat(payload.data)
    state.userFollow.pageInfo = payload.pageInfo
    if (payload.data.length < state.userFollow.pageInfo.size) {
      state.userFollow.status = 'over'
    } else {
      state.userFollow.status = 'load'
    }
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
  appendPublishReading(state, payload) {
    state.publishReading.list = state.publishReading.list.concat(payload.data)
    state.publishReading.pageInfo = payload.pageInfo
    if (payload.data.length < state.publishReading.pageInfo.size) {
      state.publishReading.status = 'over'
    } else {
      state.publishReading.status = 'load'
    }
  },
  clearPublishReading (state) {
    state.publishReading.list = []
    state.publishReading.pageInfo.pages = 1
    state.publishReading.status = 'loading'
  },
  appendPublishVideo(state, payload) {
    state.publishVideo.list = state.publishVideo.list.concat(payload.data)
    state.publishVideo.pageInfo = payload.pageInfo
    if (payload.data.length < state.publishVideo.pageInfo.size) {
      state.publishVideo.status = 'over'
    } else {
      state.publishVideo.status = 'load'
    }
  },
  clearPublishVideo (state) {
    state.publishVideo.list = []
    state.publishVideo.pageInfo.pages = 1
    state.publishVideo.status = 'loading'
  },
  appendUserLikes(state, payload) {
    let type = payload.type.toLocaleLowerCase()
    state.userLikes[type].list = state.userLikes[type].list.concat(payload.res.data)
    state.userLikes[type].pageInfo = payload.pageInfo
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
    state.userLikes.article.list = []
    state.userLikes.article.pageInfo.pages = 1
    state.userLikes.article.status = 'loading'
    state.userLikes.movie.list = []
    state.userLikes.movie.pageInfo.pages = 1
    state.userLikes.movie.status = 'loading'
  },
  deleteUserLikes (state, payload) {
    let type = payload.type.toLocaleLowerCase()
    let index = payload.index
    state.userLikes[type].list.splice(index, 1)
  },
  appendUserFavorites(state, payload) {
    let type = payload.type.toLocaleLowerCase()
    state.userFavorites[type].list = state.userFavorites[type].list.concat(payload.res.data)
    state.userFavorites[type].pageInfo = payload.pageInfo
    if (payload.res.data.length < state.userFavorites[type].pageInfo.size) {
      state.userFavorites[type].status = 'over'
    } else {
      state.userFavorites[type].status = 'load'
    }
  },
  clearUserFavorites (state) {
    state.userFavorites.homework.list = []
    state.userFavorites.homework.pageInfo.pages = 1
    state.userFavorites.homework.status = 'loading'
    state.userFavorites.works.list = []
    state.userFavorites.works.pageInfo.pages = 1
    state.userFavorites.works.status = 'loading'
    state.userFavorites.life.list = []
    state.userFavorites.life.pageInfo.pages = 1
    state.userFavorites.life.status = 'loading'
    state.userFavorites.activity_post.list = []
    state.userFavorites.activity_post.pageInfo.pages = 1
    state.userFavorites.activity_post.status = 'loading'
    state.userFavorites.article.list = []
    state.userFavorites.article.pageInfo.pages = 1
    state.userFavorites.article.status = 'loading'
    state.userFavorites.movie.list = []
    state.userFavorites.movie.pageInfo.pages = 1
    state.userFavorites.movie.status = 'loading'
  },
  deleteUserFavorites(state, payload) {
    let type = payload.type.toLocaleLowerCase()
    let index = payload.index
    state.userFavorites[type].list.splice(index, 1)
  },
  changeFansRedDot(state, payload) {
    state.userFans.list[payload.index].redDot = false
  },
  changeUserLikesStatus(state, payload) {
    let type = payload.type.toLocaleLowerCase()
    state.userLikes[type].status = payload.status
  },
  changeUserFavoritesStatus(state, payload) {
    let type = payload.type.toLocaleLowerCase()
    state.userFavorites[type].status = payload.status
  },
  changeUserFollowStatus(state, payload) {
    state.userFollow.status = payload
  },
  changeUserFansStatus(state, payload) {
    state.userFans.status = payload
  },
  changeListStatus(state, payload) {
    let type = payload
    state[type].status = 'loading'
  }
}

export const actions = {
  async checkToken ({ commit }, params) {
    const res = await this.$axios.get('token/check_token', {
      params: {
        access_token: params
      }
    })
    return res
  },
  async getUserDetails ({ commit, state }) {
    const res = await this.$axios.get('old/users/details')
    .catch((error) => {})
    if (res && res.data) {
      commit('appendUserInfo', res.data)
    }
    return res
  },
  // 查询用户信息
  async appendUserInfo ({ commit }, params) {
    commit('appendUserInfo', params)
  },
  // 修改信息
  async editUserInfo ({ commit }, params) {
    const res = await this.$axios.patch('old/users', params)
    return res
  },
  // 检查用户是否可以注册
  async checkRegisterAble (state, params) {
    const data = await this.$axios.get(`/old/users/account-verify?${qs.stringify(params)}`)
    return data
  },
  // 获取用户互动数据
  async appendUserTrends ({ commit }, params) {
    const res = await this.$axios.get('/users/trends', {
      params: {
        ...params
      }
    })
    .catch(() => {})
    if (res && res.data) {
      commit('appendUserTrends', res)
    }
    return res
  },
  // 用户关注列表
  async appendUserFollow ({ commit }, params) {
    commit('changeUserFollowStatus', 'loading')
    const res = await this.$axios.get('/users/follows', {
      params: {
        ...params
      }
    })
    let payload = {
      data: res.data,
      pageInfo: {
        pages: params.page,
        size: 20
      }
    }
    commit('appendUserFollow', payload)
    return payload
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
  async appendUserFans ({ commit,dispatch }, params) {
    commit('changeUserFansStatus', 'loading')
    await this.$axios.get('/users/fans', {
      params: {
        ...params
      }
    }).then((res) => {
      let list = []
      res.data.forEach((item) => {
        if (item.redDot) {
          list.push(item.userId)
        }
      })
      dispatch('readMyMessages', {
        ids: list
      })
      let payload = {
        data: res.data,
        pageInfo: {
          pages: params.page,
          size: 20
        }
      }
      commit('appendUserFans', payload)
    })
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
  // 用户的发布作业列表
  async appendPublishHomework({ commit }, params = {}) {
    commit('changeListStatus', 'publishHomework')
    const res = await this.$axios.get('/users/homes', {
      params: {
        ...params
      }
    })
    let payload = {
      data: res.data,
      pageInfo: {
        pages: params.page ? params.page : 1,
        size: process.env.global.pageSize
      }
    }
    commit('appendPublishHomework', payload)
    return res
  },
  // 删除作业
  async deleteHomework ({ commit }, params) {
    const res = await this.$axios.delete(`/homes/${params.id}`)
    return res
  },
  // 用户的发布作品列表
  async appendPublishWorks ({ commit }, params) {
    commit('changeListStatus', 'publishWorks')
    const res = await this.$axios.get('/users/works', {
      params: {
        ...params
      }
    })
    let payload = {
      data: res.data,
      pageInfo: {
        pages: params.page,
        size: process.env.global.pageSize
      }
    }
    commit('appendPublishWorks', payload)
    return res
  },
  // 删除作品
  async deleteWorks ({ commit }, params) {
    const res = await this.$axios.delete(`/works/${params.id}`)
    return res
  },
  // 用户的发布动态列表
  async appendPublishDynamic ({ commit }, params) {
    commit('changeListStatus', 'publishDynamic')
    const res = await this.$axios.get('/users/dynamics', {
      params: {
        ...params
      }
    })
    let payload = {
      data: res.data,
      pageInfo: {
        pages: params.page,
        size: process.env.global.pageSize
      }
    }
    commit('appendPublishDynamic', payload)
    return res
  },
  // 删除动态
  async deleteDynamics ({ commit }, params) {
    const res = await this.$axios.delete(`/dynamics/${params.id}`)
    return res
  },
  // 用户的活动帖子列表
  async appendPublishGrowth ({ commit }, params) {
    commit('changeListStatus', 'publishGrowth')
    const res = await this.$axios.get('users/posts', {
      params: {
        ...params
      }
    })
    let payload = {
      data: res.data,
      pageInfo: {
        pages: params.page,
        size: process.env.global.pageSize
      }
    }
    commit('appendPublishGrowth', payload)
    return res
  },
  // 删除活动帖子
  async deletePosts ({ commit }, params) {
    const res = await this.$axios.delete(`/posts/${params.id}`)
    return res
  },
  // 删除阅读
  async deleteReading ({ commit }, params) {
    const res = await this.$axios.delete(`/articles/${params.id}`)
    return res
  },
  // 查询用户的喜欢列表
  async appendUserLikes ({ commit }, params) {
    let statuParams = {
      type: params.type,
      status: 'loading'
    }
    commit('changeUserLikesStatus', statuParams)
    const res = await this.$axios.get('users/likes', {
      params: {
        ...params
      }
    })
    const payload = {
      type: params.type,
      res: res,
      pageInfo: {
        pages: params.page,
        size: process.env.global.pageSize
      }
    }
    commit('appendUserLikes', payload)
    return payload
  },
  // 查询用户的收藏列表
  async appendUserFavorites ({ commit }, params) {
    let statuParams = {
      type: params.type,
      status: 'loading'
    }
    commit('changeUserFavoritesStatus', statuParams)
    const res = await this.$axios.get('users/favorites', {
      params: {
        ...params
      }
    })
    const payload = {
      type: params.type,
      res: res,
      pageInfo: {
        pages: params.page,
        size: process.env.global.pageSize
      }
    }
    commit('appendUserFavorites', payload)
    return payload
  },
  // 用户的发布阅读列表
  async appendPublishReading ({ commit }, params) {
    commit('changeListStatus', 'publishReading')
    const res = await this.$axios.get('users/articles', {
      params: {
        ...params
      }
    })
    let payload = {
      data: res.data,
      pageInfo: {
        pages: params.page,
        size: process.env.global.pageSize
      }
    }
    commit('appendPublishReading', payload)
    return res
  },
  // 用户的发布视频列表
  async appendPublishVideo ({ commit }, params) {
    commit('changeListStatus', 'publishVideo')
    const res = await this.$axios.get('users/movies', {
      params: {
        ...params
      }
    })
    let payload = {
      data: res.data,
      pageInfo: {
        pages: params.page,
        size: process.env.global.pageSize
      }
    }
    commit('appendPublishVideo', payload)
    return res
  },
  // 执行消息阅读操作
  async readMyMessages ({ commit }, params) {
    const res = await this.$axios.put('/messages/read', {
      params: {
        ...params
      }
    })
    return res
  },
   // 查询其他用户的信息
   async queryUserData ({ commit }, params) {
    const res = await this.$axios.get(`old/users/${params.userId}/part`)
    return res.data
  },
  // 查询用户的关注状态
  async appendFollowingStatus(store, params) {
    const res = await this.$axios.get(`/users/${params.id}/follow-status`)
    return res.data
  }
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
  userFavoritesGetters(state) {
    return state.userFavorites
  },
  publishReadingGetters(state) {
    return state.publishReading
  },
  publishVideoGetters(state) {
    return state.publishVideo
  },
}
