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
      if (payload?.data?.length < state.recommendList.pageInfo.size) {
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
          size: process.env.global.pageSize,
          hotTypes: 'JOB,WORK,LIFE'
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
