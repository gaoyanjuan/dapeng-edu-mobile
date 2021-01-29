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
      // 体验课章节列表
      chaptersList: [],
      // 正式课-直播章节列表
      formalChapters: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: 10
        }
      },
      // 正式课-直播回放章节列表
      formalPlaybackChapters: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: 10
        }
      },
      // 正式课-录播课章节列表
      formalRecordChapters: {
        list: [],
        info: {
          chapterNumber: 0,
          nodeNumber: 0
        },
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: 10
        }
      },
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
    addCourseDetail(state, payload) {
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
    },
    appendFormalChaptersList(state, payload) {
      state.formalChapters.list = state.formalChapters.list.concat(payload.data)
      state.formalChapters.pageInfo = payload.pageInfo
      if (payload.data.length < state.formalChapters.pageInfo.size) {
        state.formalChapters.status = 'over'
      } else {
        state.formalChapters.status = 'load'
      }
    },
    clearFormalChapter (state) {
      state.formalChapters.list = []
      state.formalChapters.pageInfo.pages = 1
      state.formalChapters.status = 'loading'
    },
    changeFormalChapterStatus (state, payload) {
      state.formalChapters.status = payload
    },

    appendPlaybackChaptersList(state, payload) {
      state.formalPlaybackChapters.list = state.formalPlaybackChapters.list.concat(payload.data)
      state.formalPlaybackChapters.pageInfo = payload.pageInfo
      if (payload.data.length < state.formalPlaybackChapters.pageInfo.size) {
        state.formalPlaybackChapters.status = 'over'
      } else {
        state.formalPlaybackChapters.status = 'load'
      }
    },
    clearPlaybackChapter (state) {
      state.formalPlaybackChapters.list = []
      state.formalPlaybackChapters.pageInfo.pages = 1
      state.formalPlaybackChapters.status = 'loading'
    },
    changePlaybackChapterStatus (state, payload) {
      state.formalPlaybackChapters.status = payload
    },

    appendRecordChaptersList(state, payload) {
      state.formalRecordChapters.info.chapterNumber = payload.data.chapterNumber
      state.formalRecordChapters.info.nodeNumber = payload.data.nodeNumber
      state.formalRecordChapters.list = state.formalRecordChapters.list.concat(payload.data.courseVodContents)
      state.formalRecordChapters.pageInfo = payload.pageInfo
      if (payload.data.courseVodContents.length < state.formalRecordChapters.pageInfo.size) {
        state.formalRecordChapters.status = 'over'
      } else {
        state.formalRecordChapters.status = 'load'
      }
    },
    clearRecordChapter (state) {
      state.formalRecordChapters.list = []
      state.formalRecordChapters.pageInfo.pages = 1
      state.formalRecordChapters.status = 'loading'
    },
    changeRecordChapterStatus (state, payload) {
      state.formalRecordChapters.status = payload
    },
  },

  actions: {
     // 查询用户开通课程列表
    async appendUserCourseList({ commit }, params) {
      commit('changeCoursesStatus', 'loading')
      await this.$axios.get('old/courses/open', {
        params: {
          ...params,
          size: 5
        }
      }).then(res => {
        let ids = ''
        res.data.forEach(item => {
          if (item.living) {
            ids += item.liveChannelId + ','
          }
        })
        
        if (ids) {
          this.$axios.get('old/platforms/polyv/get-realtime-viewers', {
            params: {
              channelIds: ids.substr(0, ids.length - 1)
            }
          }).then(views => {
            
            for (let i = 0; i < views.data.length; i++) {
              for (let j = 0; j < res.data.length; j++) {
                if (parseInt(res.data[j].liveChannelId) === views.data[i].channelId) {
                  res.data[j].count = views.data[i].count
                  break
                }
              }
            }

            const pageInfo = { pages: params.page, size: 5 }
            commit('addUserCourseList', { data: res.data, pageInfo })
            return res
          })
        } else {
          const pageInfo = { pages: params.page, size: 5 }
          commit('addUserCourseList', { data: res.data, pageInfo })
          return res
        }
      })
    },
    // 查询用户是否开课
    async isOpenCourse ({ commit }, params) {
      const res = await this.$axios.get(`old/courses/${params.courseId}/is-open-courses`)
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
    },

    //查询期的直播课章节列表
    async appendFormalChapters({ commit }, params) {
      commit('changeFormalChapterStatus', 'loading')
      const res = await this.$axios.get(`old/courses/stages/${params.stageId}/chapters`, {
        params: {
          size: 10,
          page: params.page,
          courseId: params.courseId
        }
      })
      const pageInfo = { pages: params.page, size: 10 }
      commit('appendFormalChaptersList', { data: res.data, pageInfo })
      return res
    },

    //查询期的直播回放章节列表
    async appendPlaybackChapters({ commit }, params) {
      commit('changePlaybackChapterStatus', 'loading')
      const res = await this.$axios.get(`old/courses/stages/${params.stageId}/chapters`, {
        params: {
          size: 10,
          page: params.page,
          courseId: params.courseId
        }
      })
      const pageInfo = { pages: params.page, size: 10 }
      commit('appendPlaybackChaptersList', { data: res.data, pageInfo })
      return res
    },

    // 查询录播课章节列表
    async appendRecordChapters({ commit }, params) {
      commit('changeRecordChapterStatus', 'loading')
      const res = await this.$axios.get(`old/courses/${params.courseId}/vods`, {
        params: {
          page: params.page
        }
      })
      const pageInfo = { pages: params.page, size: 10 }
      commit('appendRecordChaptersList', { data: res.data, pageInfo })
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
    },
    formalChaptersGetters(state) { 
      return state.formalChapters
    },
    playbackChaptersGetters(state) { 
      return state.formalPlaybackChapters
    },
    recordChaptersGetters(state) { 
      return state.formalRecordChapters
    },
  }
}