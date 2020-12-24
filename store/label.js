export default {
  state: () => {
    return {
      labelData: null,
      labelCount: null,
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
    changeLabelList (state, payload) {
      const { index, type, value } = payload
      if (state.labelList.list[index]) {
        if (type === 'comment') { 
          state.labelList.list[index].commentCount += value
        } else if (type === 'collect') {
          state.labelList.list[index].isCollection = value
        } else if (type === 'love') {
          state.labelList.list[index].isPraise = value.praise
          state.labelList.list[index].praiseCount += value.count
        } else if (type === 'attention') {
          state.labelList.list[index].isAttention = value
        }
      }
    },
    appendLabelCount(state, payload) {
      state.labelCount = payload.data
    },
    changeLabelListStatus (state, payload) {
      state.labelList.status = payload
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
    },
    clearLabelData (state) {
      state.labelData = null
    },
    clearLabelCount (state) {
      state.labelCount = null
    }
  },
  actions: {
    async appendLabelCount({ commit }, params) {
      const res = await this.$axios.get(`/labels/${params.id}/count`)
      commit('appendLabelCount', res)
      return res
    },
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
    labelCountGetters (state) {
      return state.labelCount
    },
    labelListGetters (state) {
      return state.labelList
    },
    labelDataGetters (state) {
      return state.labelData
    }
  }
}
