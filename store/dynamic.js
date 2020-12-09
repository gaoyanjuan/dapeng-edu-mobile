export default {
  state: () => {
    return {
      newDynamicList: {
        list: [],
        status: 'loading',
        page: 1
      },
      hotDynamicList: {
        list: [],
        status: 'loading',
        page: 1
      },
      dynamicDetails:null
    }
  },
  mutations: {
    changeNewDynamicListStatus (state, payload) {
      state.newDynamicList.status = payload
    },
    appendNewDynamicList (state, payload) {
      state.newDynamicList.list = state.newDynamicList.list.concat(payload.data)
      state.newDynamicList.page = payload.page + 1
      if (payload.data.length < process.env.global.pageSize) {
        state.newDynamicList.status = 'over'
      } else {
        state.newDynamicList.status = 'load'
      }
    },
    clearNewDynamicList(state) {
      state.newDynamicList.list = []
      state.newDynamicList.page = 1
      state.newDynamicList.status = 'loading'
    },
    clearHotDynamicList(state) {
      state.hotDynamicList.list = []
      state.hotDynamicList.page = 1
      state.hotDynamicList.status = 'loading'
    },
    changeHotDynamicListStatus (state, payload) {
      state.hotDynamicList.status = payload
    },
    appendHotDynamicList (state, payload) {
      state.hotDynamicList.list = state.hotDynamicList.list.concat(payload.data)
      state.hotDynamicList.page = payload.page + 1
      if (payload.data.length < process.env.global.pageSize) {
        state.hotDynamicList.status = 'over'
      } else {
        state.hotDynamicList.status = 'load'
      }
    },
    /** * 添加数据至动态详情  */
    appendDynamicDetails(state, payload) {
      state.dynamicDetails = payload.data
    },
    clearDynamicDetails(state, payload) {
      state.dynamicDetails = null
    }
  },
  actions: {
     // 新增动态浏览量
     async appendDynamicBrowse({ commit }, params) {
      const res = await this.$axios.put(`/dynamics/${params.id}/browse?topicType=LIFE`)
      return res
    },
    /** * 查询动态详情 */
    async appendDynamicDetails({ commit }, params) {
      const res = await this.$axios.get(`/dynamic/${params.id}`)
      commit('appendDynamicDetails', res)
      return res
    },
    // 查询最新动态
    async appendNewDynamicList ({ commit, state }, params) {
      commit('changeNewDynamicListStatus', 'loading')
      const res = await this.$axios.get('/dynamic/newest', {
        params: {
          ...params,
          size: process.env.global.pageSize,
          page: state.newDynamicList.page
        }
      })
      commit('appendNewDynamicList', { data: res.data, page: state.newDynamicList.page })
      return res
    },
    // 查询最热动态
    async appendHotDynamicList ({ commit, state }, params) {
      commit('changeHotDynamicListStatus', 'loading')
      const res = await this.$axios.get('/dynamic/hot', {
        params: {
          ...params,
          size: process.env.global.pageSize,
          page: state.hotDynamicList.page
        }
      })
      commit('appendHotDynamicList', { data: res.data, page: state.hotDynamicList.page })
      return res
    }
  },
  getters: {
    newDynamicListGetters (state) {
      return state.newDynamicList
    },
    hotDynamicListGetters (state) {
      return state.hotDynamicList
    },
    dynamicDetailsGetters(state) {
      return state.dynamicDetails
    }
  }
}