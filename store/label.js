export default {
  state: () => {
    return {
      labelData: null,
      labelList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: process.env.global.pageSize
        }
      }
    }
  },
  mutations: {
    changeLabelListStatus (state, payload) {
      
    },
    appendLabelData (state, payload) {
      state.labelData = {
        id: payload.data.id,
        name: payload.data.name
      }
    },
    appendLabelList (state, payload) {
      state.labelList.list = state.labelList.list.concat(payload.data.labelInfo)
      state.labelList.pageInfo = payload.pageInfo
      if (payload.data.labelInfo.length < state.labelList.pageInfo.size) {
        state.labelList.status = 'over'
      } else {
        state.labelList.status = 'load'
      }
    },
    clearLabelList (state) {
      state.labelList.list = []
      state.labelList.status = 'loading'
      state.labelList.pageInfo.pages = 1
      state.labelData = null
    }
  },
  actions: {
    async appendLabelList ({ commit }, params) {
      commit('changeLabelListStatus', 'loading')
      const res = await this.$axios.get(`/labels/${params.id}`, {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      })
      const pageInfo = {
        pages: params.page,
        size: process.env.global.pageSize
      }
      if (res.data) {
        commit('appendLabelList', { data: res.data, pageInfo })
      }
      commit('appendLabelData', res)
      return res
    }
  },
  getters: {
    labelListGetters (state) {
      return state.labelList
    },
    labelDataGetters (state) {
      return state.labelData
    }
  }
}
