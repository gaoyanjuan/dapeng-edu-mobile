export default {
  state: () => { 
    return {
      courseList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: 5
        }
      },
      courseDetail: null
    }
  },

  mutations: {
    addUserCourseList (state, payload) {
      state.courseList.list = state.courseList.list.concat(payload.data)
      state.courseList.pageInfo = payload.pageInfo
      if (payload.data.length < state.courseList.pageInfo.size) {
        state.courseList.status = 'over'
      } else {
        state.courseList.status = 'load'
      }
    },
    clearCourseList (state,) {
      state.courseList.list = []
      state.courseList.pageInfo.pages = 1
      state.courseList.status = 'loading'
    },
    changeCoursesStatus (state, payload) {
      state.courseList.status = payload
    },
  },

  actions: {
     // 查询用户开通课程列表
    async appendUserCourseList({ commit }, params) {
      commit('changeCoursesStatus', 'loading')
      const res = await this.$axios.get('old/courses/open', {
        params: {
          ...params,
          size: 5
        }
      })
      const pageInfo = { pages: params.page, size: 5 }
      commit('addUserCourseList', { data: res.data, pageInfo })
      return res
    },
  },

  getters: {
    userCourseListGetters (state) {
      return state.courseList
    },
  }
}