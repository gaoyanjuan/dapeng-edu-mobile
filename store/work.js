export default {
  state: () => {
    return {
      workList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
      worksDetails:null
    }
  },
  mutations: {
    clearWorkList (state) {
      state.workList.list = []
      state.workList.status = 'loading'
      state.workList.pageInfo.pages = 1
    },
    changeWorkListStatus (state, payload) {
      state.workList.status = payload
    },
    appendWorkList (state, payload) {
      state.workList.list = state.workList.list.concat(payload.data)
      state.workList.pageInfo = payload.pageInfo
      if (payload.data.length < state.workList.pageInfo.size) {
        state.workList.status = 'over'
      } else {
        state.workList.status = 'load'
      }
    },
    /** * 添加数据至作品详情  */
    appendWorksDetails(state, payload) {
      state.worksDetails = payload.data
    },
    clearWorksDetails (state) {
      state.worksDetails = null
    }
  },
  actions: {
    async appendWorkList ({ commit }, params) {
      commit('changeWorkListStatus', 'loading')
      const res = await this.$axios.get('/works', {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      })
      const pageInfo = {
        pages: params.page,
        size: process.env.global.pageSize
      }
      commit('appendWorkList', { data: res.data, pageInfo })
      return res
    },
    /** * 查询作品详情 */
    async appendWorksDetails({ commit }, params) {
      const res = await this.$axios.get(`/works/${params.id}`)
      commit('appendWorksDetails', res)
      return res
    }
  },
  getters: {
    workListGetters (state) {
      return state.workList
    },
    worksDetailsGetters(state) {
      return state.worksDetails
    }
  }
}