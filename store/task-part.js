export default {
  state: () => {
    return {
      taskPartList: {
        list: [],
        status: 'loading',
        pagerInfo: {
          page: 1,
          size:10
        }
      },
      taskPartDetails: null
    }
  },
  mutations: {
    changeTaskPartListStatus (state, payload) {
      state.taskPartList.status = payload
    },
    appendTaskPartList(state, payload) {
      state.taskPartList.list = state.taskPartList.list.concat(payload.data)
      state.taskPartList.pageInfo = payload.pageInfo
      if (payload.data.length < state.taskPartList.pageInfo.size) {
        state.taskPartList.status = 'over'
      } else {
        state.taskPartList.status = 'load'
      }
    },
    appendTaskPartDetails(state, payload) {
      state.taskPartDetails = payload.data
    }
  },
  actions: {
    async appendTaskPartList({ commit, state }, params) {
      commit('changeTaskPartListStatus', 'loading')
      const res = await this.$axios.get('part_job/get_item_list.ashx', {
        params: {
          size: 10,
          page: params.page
        }
      })
      const pageInfo = {
        pages: params.page,
        size: 10
      }     
      commit('appendTaskPartList', { data: res.data.list, pageInfo })
      return res
    },
    /** * 查询兼职任务详情 */
    async appendTaskPartDetails ({ commit }, params) {
      const res = await this.$axios.get(`part_job/get_item.ashx`, {
        params: {
          itemId: params
        }
      })
      commit('appendTaskPartDetails', res)
      return res
    },
  },
  getters: {
    taskPartListGetters(state) {  
      return state.taskPartList
    },
    taskPartDetailsGetters (state) {
      return state.taskPartDetails
    }
  }
}
