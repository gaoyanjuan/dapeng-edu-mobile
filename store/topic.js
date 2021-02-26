export default {
  state: () => {
    return {
      attention: {
        list: [],
        cache: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      },
      recommend: {
        list: [],
        cache: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      },
      growth: {
        list: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      },
      homework: {
        list: [],
        cache: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      },
      works: {
        list: [],
        cache: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      },
      dynamic: {
        list: [],
        cache: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      },
      article: {
        list: [],
        cache: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      },
      video: {
        list: [],
        cache: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      },
      movie: {
        list: [],
        cache: [],
        pageInfo: {
          pages: 1,
          size: 5
        }
      }
    }
  },
  mutations: {
    appendTopicList(state, payload) {
      // 关注
      if (payload.topicType === 'ATTENTION') {
        if (payload.pageInfo.pages === 1) { 
          state.attention.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.attention.list = state.attention.cache
          state.attention.pageInfo.pages = 1
        } else {
          state.attention.list = payload.data
          state.attention.pageInfo = payload.pageInfo
        }
      }

      // 推荐
      if (payload.topicType === 'RECOMMEND') {
        if (payload.pageInfo.pages === 1) { 
          state.recommend.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.recommend.list = state.recommend.cache
          state.recommend.pageInfo.pages = 1
        } else {
          state.recommend.list = payload.data
          state.recommend.pageInfo = payload.pageInfo
        }
      }
      
      // 成长
      if (payload.topicType === 'POST') {
        if (payload.pageInfo.pages === 1) { 
          state.growth.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.growth.list = state.growth.cache
          state.growth.pageInfo.pages = 1
        } else {
          state.growth.list = payload.data
          state.growth.pageInfo = payload.pageInfo
        }
      }

      // 作业
      if (payload.topicType === 'HOMEWORK') {
        if (payload.pageInfo.pages === 1) { 
          state.homework.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.homework.list = state.homework.cache
          state.homework.pageInfo.pages = 1
        } else {
          state.homework.list = payload.data
          state.homework.pageInfo = payload.pageInfo
        }
      }

      // 作品
      if (payload.topicType === 'WORKS') {
        if (payload.pageInfo.pages === 1) { 
          state.works.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.works.list = state.works.cache
          state.works.pageInfo.pages = 1
        } else {
          state.works.list = payload.data
          state.works.pageInfo = payload.pageInfo
        }
      }

      // 动态
      if (payload.topicType === 'LIFE') {
        if (payload.pageInfo.pages === 1) { 
          state.dynamic.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.dynamic.list = state.dynamic.cache
          state.dynamic.pageInfo.pages = 1
        } else {
          state.dynamic.list = payload.data
          state.dynamic.pageInfo = payload.pageInfo
        }
      }

      // 阅读
      if (payload.topicType === 'ARTICLE') {
        if (payload.pageInfo.pages === 1) { 
          state.article.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.article.list = state.article.cache
          state.article.pageInfo.pages = 1
        } else {
          state.article.list = payload.data
          state.article.pageInfo = payload.pageInfo
        }
      }

      // 小视频
      if (payload.topicType === 'VIDEO') {
        if (payload.pageInfo.pages === 1) { 
          state.video.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.video.list = state.video.cache
          state.video.pageInfo.pages = 1
        } else {
          state.video.list = payload.data
          state.video.pageInfo = payload.pageInfo
        }
      }

      // 长视频
      if (payload.topicType === 'MOVIE') {
        if (payload.pageInfo.pages === 1) { 
          state.movie.cache = payload.data
        }
        if (payload.data.length === 0) {
          state.movie.list = state.movie.cache
          state.movie.pageInfo.pages = 1
        } else {
          state.movie.list = payload.data
          state.movie.pageInfo = payload.pageInfo
        }
      }
    }
  },
  actions: {
    async appendTopicList ({ commit }, params) {
      const res = await this.$axios.get('/topics', {
        params: {
          ...params,
          size: 5
        }
      })
      const pageInfo = { pages: params.page, size: 5 }
      commit('appendTopicList', {
        data: res.data,
        topicType: params.topicType,
        pageInfo
      })
    }
  },
  getters: {
    attentionGetters (state) {
      return state.attention
    },
    recommendGetters (state) {
      return state.recommend
    },
    growthGetters (state) {
      return state.growth
    },
    homeworkGetters (state) {
      return state.homework
    },
    worksGetters (state) {
      return state.works
    },
    dynamicGetters (state) {
      return state.dynamic
    },
    articleGetters (state) {
      return state.article
    },
    videoGetters (state) {
      return state.video
    },
    movieGetters (state) {
      return state.movie
    }
  }
}