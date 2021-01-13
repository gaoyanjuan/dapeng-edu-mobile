export default {
  state: () => { 
    return {
      // 课程列表
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
      // 章节列表
      chaptersList: [],
      // 课程详情
      courseDetail: null,
      // 正式学院列表
      formalCollegeList: [],
      // 可看期列表
      stage: {
        liveStage: [],
        playbackStage: []
      }
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
    },
    addFormalCollegeList(state, payload) {
      payload.forEach(element => {
        element.name = element.name.replace(/学院/, '')
      })
      state.formalCollegeList = payload
    },
    addStages(state, payload) {
      state.stage.liveStage = payload.liveStage
      state.stage.playbackStage = payload.playbackStage
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

    // 查询我的正式课学院列表
    async appendFormalCollegeList({ commit }, params) { 
      const res = await this.$axios.get(`old/courses/college`)
      commit('addFormalCollegeList', res.data)
      return res
    },

    // 查询用户可看期
    async appendStages({ commit }, params) {
      const res = await this.$axios.get(`old/courses/stages`, {
        params: {
          ...params
        }
      })
      commit('addStages', res.data)
      return res
    }
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
    },
    formalCollegeListGetters(state) { 
      return state.formalCollegeList
    },
    liveStageGetters(state) { 
      return state.stage.liveStage
    },
    playbackStageGetters(state) { 
      return state.stage.playbackStage
    }
  }
}