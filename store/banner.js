export const state = () => ({
  // ATTENTION | 关注
  attentionBannerList: [],
  // RECOMMEND| 推荐
  recommendBannerList: [],
  // HOMEWORK | 作业
  homeworkBannerList: [],
  // LIFE  | 动态
  lifeBannerList: [],
  // WORKS | 作品
  worksBannerList: [],
  // POST  | 成长
  postBannerList: [],
  // ARTICLE  | 阅读
  articleBannerList: [],
  // VIDEO | 小视频
  videoBannerList: [],
  // MOVIE | 长视频
  movieBannerList: [],
})

export const mutations = {
  /** * 添加数据至Banner列表  */
  appendBannerList(state, payload) {
    if (payload.type === 'ATTENTION') { 
      state.attentionBannerList = payload.data.data
    }
    if (payload.type === 'RECOMMEND') { 
      state.recommendBannerList = payload.data.data
    }
    if (payload.type === 'HOMEWORK') { 
      state.homeworkBannerList = payload.data.data
    }
    if (payload.type === 'LIFE') { 
      state.lifeBannerList = payload.data.data
    }
    if (payload.type === 'WORKS') { 
      state.worksBannerList = payload.data.data
    }
    if (payload.type === 'POST') { 
      state.postBannerList = payload.data.data
    }
    if (payload.type === 'ARTICLE') { 
      state.articleBannerList = payload.data.data
    }
    if (payload.type === 'VIDEO') { 
      state.videoBannerList = payload.data.data
    }
    if (payload.type === 'MOVIE') { 
      state.movieBannerList = payload.data.data
    }
  }
}

export const actions = {
  /** 
    * 查询Banner 列表
  */
  async appendBannerList({ commit }, params) {
    const res = await this.$axios.get('/common/banners', {
      params: {
        ...params
      }
    })
    commit('appendBannerList', {data: res, type: params.channel})
  },
}

export const getters = {
  attentionBannerListGetters (state) {
    return state.attentionBannerList
  },
  recommendBannerListGetters (state) {
    return state.recommendBannerList
  },
  homeworkBannerListGetters (state) {
    return state.homeworkBannerList
  },
  lifeBannerListGetters (state) {
    return state.lifeBannerList
  },
  worksBannerListGetters (state) {
    return state.worksBannerList
  },
  postBannerListGetters (state) {
    return state.postBannerList
  },
  articleBannerListGetters (state) {
    return state.articleBannerList
  },
  videoBannerListGetters (state) {
    return state.videoBannerList
  },
  movieBannerListGetters (state) {
    return state.movieBannerList
  },
}
