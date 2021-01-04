import { waterFallImgPromise } from '@/utils/util.js'

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
      state.labelList.list = state.labelList.list.concat(payload.data)
      state.labelList.pageInfo = payload.pageInfo
      if (payload.data.length < state.labelList.pageInfo.size) {
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
      if (res.status === 200) {
        commit('appendLabelCount', res)
        commit('appendLabelData', res)
      } else {
        commit('appendLabelCount', {
          data: {
            participationCount: 0,
            browseCount: 0
          }
        })
        commit('appendLabelData', {
          data: {
            id: '0',
            name: '佚名'
          }
        })
      }
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
        const promiseList = []
        if (params.topicType === 'VIDEO') {
          for (let index = 0; index < res.data.length; index++) {
            promiseList.push(waterFallImgPromise(res.data, index, 174))
          }
          await Promise.all(promiseList)
        }
        commit('appendLabelList', { data: res.data, pageInfo })
      }
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
