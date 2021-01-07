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
      chaptersList: [],
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
    clearCourseList (state) {
      state.courseList.list = []
      state.courseList.pageInfo.pages = 1
      state.courseList.status = 'loading'
    },
    changeCoursesStatus (state, payload) {
      state.courseList.status = payload
    },
    addCourseDetail (state, payload) {
      state.courseDetail = payload
    },
    appendChaptersList(state, payload) { 
      state.chaptersList = payload
    },
    clearChaptersList(state) { 
      state.chaptersList = []
    }
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

    // 查询课程详情
    async appendCourseDetail({ commit }, params) {
      const res = await this.$axios.get(`old/courses/${params}`)
      commit('addCourseDetail', res.data)
      return res
    },

    // 查询体验课时间轴章节
    async appendTrialChapters({ commit }, params) {
      const res = await this.$axios.get(`old/courses/${params.courseId}/trial-chapters`)
      commit('appendChaptersList', res.data)
      return res
    },
  },

  getters: {
    userCourseListGetters (state) {
      return state.courseList
    },
    courseDetailGetters (state) {
      return state.courseDetail
    },
    chaptersListGetters(state) { 
      return state.chaptersList
    }
  }
}