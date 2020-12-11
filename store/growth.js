export default {
  state: () => {
    return {
      growthList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
      growthDetails: null
    }
  },
  mutations: {
    changeGrowthList (state, payload) {
      const { index, type, value } = payload
      if (state.growthList.list[index]) {
        if (type === 'comment') { 
          state.growthList.list[index].commentCount += value
        } else if (type === 'collect') {
          state.growthList.list[index].isCollection = value
        } else if (type === 'love') {
          state.growthList.list[index].isPraise = value.praise
          state.growthList.list[index].praiseCount += value.count
        } else if (type === 'attention') {
          state.growthList.list[index].isAttention = value
        }
      }
    },
    /** * 添加数据至成长详情  */
    appendGrowthDetails (state, payload) {
      state.growthDetails = payload.data
    },
    clearGrowthDetails (state) {
      state.growthDetails = null
    },
    clearGrowthList (state, payload) {
      state.growthList.list = []
      state.growthList.pageInfo.pages = 1
      state.growthList.status = 'loading'
    },
    changeGrowthListStatus (state, payload) {
      state.growthList.status = payload
    },
    appendGrowthList (state, payload) {
      state.growthList.list = state.growthList.list.concat(payload.data)
      state.growthList.pageInfo = payload.pageInfo
      if (payload.data.length < state.growthList.pageInfo.size) {
        state.growthList.status = 'over'
      } else {
        state.growthList.status = 'load'
      }
    }
  },
  actions: {
    /** * 查询成长详情 */
    async appendGrowthDetails ({ commit }, params) {
      const res = await this.$axios.get(`/posts/${params.id}`)
      commit('appendGrowthDetails', res)
      return res
    },
    async appendGrowthList ({ commit, state }, params) {
      commit('changeGrowthListStatus', 'loading')
      const res = await this.$axios.get('/posts/new-hot/list', {
        params: {
          ...params,
          activityId: '5ebe914525185c00017b7e29',
          size: process.env.global.pageSize,
          page: params.page
        }
      })
      const pageInfo = {
        pages: params.page,
        size: process.env.global.pageSize
      }
      commit('appendGrowthList',  { data: res.data, pageInfo })
      return res
    }
  },
  getters: {
    growthListGetters (state) {
      return state.growthList
    },
    growthDetailsGetters (state) {
      return state.growthDetails
    }
  }
}