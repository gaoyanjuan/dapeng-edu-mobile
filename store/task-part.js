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
      taskPartDetails: null,
      activeUserList: {
        list: [],
        status: 'loading',
        pagerInfo: {
          page: 1,
          size:10
        }
      },
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
    },
    appendActiveUser(state, payload) {
      state.activeUserList.list = state.activeUserList.list.concat(payload.data)
      state.activeUserList.pageInfo = payload.pageInfo
      if (payload.data.length < state.activeUserList.pageInfo.size) {
        state.activeUserList.status = 'over'
      } else {
        state.activeUserList.status = 'load'
      }
    },
  },
  actions: {
    /* 当前兼职任务列表 */
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
    /** 查询兼职任务详情 **/
    async appendTaskPartDetails ({ commit }, params) {
      const res = await this.$axios.get(`part_job/get_item.ashx`, {
        params: {
          itemId: params
        }
      })
      commit('appendTaskPartDetails', res)
      return res
    },
    /** 当前用户浏览的兼职任务列表**/
    async appendActiveUser({ commit, state }, params) {
      const res = await this.$axios.get(`/users/part-jobs/collects`, {
        params: {
          size: 10,
          page: params.page
        }
      }).then((course) => {
        if (course.status === 200 && course.data.length) {
          for (let index = 0; index < course.data.length; index++) {
            if (course.data[index].id !== 'undefined') { 
              let id = course.data[index].id
              this.$axios.get('part_job/get_item.ashx', { params: { itemid: id } }).then(res => {
                course.data[index].item_name = res.data.item_name
                course.data[index].item_money = res.data.item_money
                course.data[index].item_state = res.data.item_state
                course.data[index].item_type = res.data.item_type
                course.data[index].item_ispay = res.data.item_ispay
              })
            }
          }
          const pageInfo = { pages: params.page, size: 10 }
          commit('appendActiveUser', { data: course.data, pageInfo })
          return course.data
        } else {
          const pageInfo = { pages: params.page, size: 10 }
          commit('appendActiveUser', { data: course.data, pageInfo })
          return course.data
        }
      })
    },
    
    // 新增当前用户收藏的兼职任务
    async appendCollect({ commit }, params) {
      const res = await this.$axios.post(`/users/part-jobs/collects/${params.id}`)
      return res
    },
    // 当前用户取消收藏兼职任务
    async delCollect({ commit }, params) {
      const res = await this.$axios.delete(`/users/part-jobs/collects/${params.id}`)
      return res
    },
    // 校验当前用户是否收藏兼职任务
    async verifyCollect({ commit }, params) {
      const res = await this.$axios.get(`/users/part-jobs/collects/check/${params.id}`)
      return res
    },
    // 清空当前用户浏览的兼职任务
    async delBrowse({ commit }, params) {
      const res = await this.$axios.delete(`/users/part-jobs/browses`)
      return res
    },
  },
  getters: {
    taskPartListGetters(state) {
      return state.taskPartList
    },
    activeUserGetters(state) {
      console.log(state.activeUserList);
      return state.activeUserList
    }
  }
}
