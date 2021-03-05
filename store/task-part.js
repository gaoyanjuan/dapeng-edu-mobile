export default {
  state: () => {
    return {
      taskPartList: {
        list: [],
        status: 'loading',
        pageInfo: {
          page: 1,
          size:10
        }
      },
      taskPartDetails: null,
      browserList: {
        list: [],
        status: 'loading',
        pageInfo: {
          page: 1,
          size:10
        }
      },
      favoriteList: {
        list: [],
        status: 'loading',
        pageInfo: {
          page: 1,
          size:10
        }
      }
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
    appendBrowser(state, payload) {
      state.browserList.list = state.browserList.list.concat(payload.data)
      state.browserList.pageInfo = payload.pageInfo
      if (payload.data.length < state.browserList.pageInfo.size) {
        state.browserList.status = 'over'
      } else {
        state.browserList.status = 'load'
      }
    },
    appendFavorite(state, payload) {
      state.favoriteList.list = state.favoriteList.list.concat(payload.data)
      state.favoriteList.pageInfo = payload.pageInfo
      if (payload.data.length < state.favoriteList.pageInfo.size) {
        state.favoriteList.status = 'over'
      } else {
        state.favoriteList.status = 'load'
      }
    },
    clearTwoList (state) {
      state.favoriteList.list = []
      state.favoriteList.pageInfo.page = 1
      state.favoriteList.status = 'loading'
      state.browserList.list = []
      state.browserList.pageInfo.page = 1
      state.browserList.status = 'loading'
    },
    clearNewTaskList(state) {
      state.taskPartList.list = []
      state.taskPartList.page = 1
      state.taskPartList.status = 'loading'
    }
  },
  actions: {
    /* 当前兼职任务列表 */
    async appendTaskPartList({ commit, state }, params) {
      commit('changeTaskPartListStatus', 'loading')
      const res = await this.$axios.get('part_job/get_item_list.ashx', {
        params: {
          ...params.query,
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
    // 新增当前用户浏览的兼职任务
    async appendBrowses({ commit }, params) {
      const res = await this.$axios.post(`/users/part-jobs/browses/${params.id}`)
      return res
    },
    /** 当前用户浏览的兼职任务列表**/
    async appendBrowser({ commit, state }, params) {
      const res = await this.$axios.get(`/users/part-jobs/browses`, {
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
                course.data[index].item_addtime = res.data.item_addtime
                course.data[index].item_endtime = res.data.item_endtime
                course.data[index].item_fbtime = res.data.item_fbtime
                course.data[index].item_ispay = res.data.item_ispay
                if (index === course.data.length - 1) {
                  const pageInfo = { pages: params.page, size: 10 }
                  commit('appendBrowser', { data: course.data, pageInfo })
                }
              })
            }
          }
        } else {
          const pageInfo = { pages: params.page, size: 10 }
          commit('appendBrowser', { data: course.data, pageInfo })
        }
      })
    },
      /** 当前用户收藏的兼职任务列表**/
    async appendFavorite({ commit }, params) {
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
                  course.data[index].item_addtime = res.data.item_addtime
                  course.data[index].item_endtime = res.data.item_endtime
                  course.data[index].item_fbtime = res.data.item_fbtime
                  course.data[index].item_ispay = res.data.item_ispay
                  if (index === course.data.length - 1) {
                    const pageInfo = { pages: params.page, size: 10 }
                    commit('appendFavorite', { data: course.data, pageInfo })
                  }
                })
              }
            }
          } else {
            const pageInfo = { pages: params.page, size: 10 }
            commit('appendFavorite', { data: course.data, pageInfo })
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
    // 删除当前用户浏览的兼职任务
    async cleartBrowse({ commit }, params) {
      const res = await this.$axios.delete(`/users/part-jobs/browses/${params.id}`)
      return res
    },
  },
  getters: {
    taskPartListGetters(state) {
      return state.taskPartList
    },
    browserGetters(state) {
      return state.browserList
    },
    favoriteGetters(state) {
      return state.favoriteList
    }
  }
}
