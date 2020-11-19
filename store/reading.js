export const state = () => ({
  readingList: {
    list: [],
    status: 'loading',
    pageInfo: {
      count: 0,
      number: 0,
      pages: 1,
      size: process.env.global.pageSize
    }
  },
  readingDetails:null
})

export const mutations = {
  clearReadingList (state) {
    state.readingList.list = []
    state.readingList.status = 'loading'
    state.readingList.pageInfo.pages = 1
  },
  changeReadingListStatus (state, payload) {
    state.readingList.status = payload
  },
  appendReadingList (state, payload) {
    state.readingList.list = state.readingList.list.concat(payload.data)
    state.readingList.pageInfo = payload.pageInfo
    if (payload.data.length < state.readingList.pageInfo.size) {
      state.readingList.status = 'over'
    } else {
      state.readingList.status = 'load'
    }
  },
  /** * 添加数据至阅读详情  */
  appendReadingDetails(state, payload) {
    state.readingDetails = payload.data
  },
  clearReadingDetails (state) {
    state.readingDetails = null
  }
}

export const actions = {
  /** * 查询阅读 列表 */
  async appendReadingList({ commit }, params) {
    commit('changeReadingListStatus', 'loading')
    const res = await this.$axios.get('/articles', {
      params: {
        ...params,
        size: process.env.global.pageSize,
      }
    })
    const pageInfo = {
      pages: params.page,
      size: process.env.global.pageSize
    }
    commit('appendReadingList', { data: res.data, pageInfo })
    return res
  },
  /** * 查询作品详情 */
  async appendReadingDetails({ commit }, params) {
    const res = await this.$axios.get(`/articles/${params.id}`)
    commit('appendReadingDetails', res)
    return res
  }
}

export const getters = {
  readingListGetters (state) {
    return state.readingList
  },
  readingDetailsGetters(state) {
    return state.readingDetails
  }
}
