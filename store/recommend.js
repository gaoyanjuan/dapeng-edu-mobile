export default {
  state: () => {
    return {
      recommendList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 1,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
    }
  },
  mutations: {
    changeRecommendList (state, payload) {
      const { index, type, value } = payload
      if (state.recommendList.list[index] && state.recommendList.list[index].recommendTopic) {
        if (type === 'comment') { 
          state.recommendList.list[index].recommendTopic.commentCount += value
        } else if (type === 'collect') {
          state.recommendList.list[index].recommendTopic.isCollection = value
        } else if (type === 'love') {
          state.recommendList.list[index].recommendTopic.isPraise = value.praise
          state.recommendList.list[index].recommendTopic.praiseCount += value.count
        } else if (type === 'attention') {
          state.recommendList.list[index].recommendTopic.isAttention = value
        }
      }
    },
    clearRecommendList (state) {
      state.recommendList.list = []
      state.recommendList.status = 'loading'
      state.recommendList.pageInfo.pages = 1
    },
    changeRecommendListStatus (state, payload) {
      state.recommendList.status = payload
    },
    appendRecommendList (state, payload) {
      state.recommendList.list = state.recommendList.list.concat(payload.data)
      state.recommendList.pageInfo = payload.pageInfo
      if (payload && payload.data && payload.data.length < state.recommendList.pageInfo.size) {
        state.recommendList.status = 'over'
      } else {
        state.recommendList.status = 'load'
      }
    }
  },
  actions: {
    async appendRecommendList({ commit }, params) {
      commit('changeRecommendListStatus', 'loading')
      const res = await this.$axios.get('/recommend', {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      })
      const pageInfo = {
        number: params.page,
        size: process.env.global.pageSize
      }
      commit('appendRecommendList', { data: res.data, pageInfo })
      return res
    },
  },
  getters: {
    recommendListGetters (state) {
      return state.recommendList
    }
  }
}
