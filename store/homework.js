export default {
  state: () => {
    return {
      homeworkList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
      homeworkDetails: null,
      requirementDetails: null,
      requirementList: {
        list: [],
        courseType: '',
        load: 'load'
      },
      openCourses: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 1,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
      trialsCourses: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 1,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
      stagesList: [],
      vipCourses: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 1,
          pages: 1,
          size: process.env.global.pageSize
        }
      }
    }
  },
  mutations: {
    changeHomeworkList (state, payload) {
      const { index, type, value } = payload
      if (state.homeworkList.list[index]) {
        if (type === 'comment') { 
          state.homeworkList.list[index].commentCount += value
        } else if (type === 'collect') {
          state.homeworkList.list[index].isCollection = value
        } else if (type === 'love') {
          state.homeworkList.list[index].isPraise = value.praise
          state.homeworkList.list[index].praiseCount += value.count
        } else if (type === 'attention') {
          state.homeworkList.list[index].isAttention = value
        }
      }
    },
    clearHomeworkList (state) {
      state.homeworkList.list = []
      state.homeworkList.pageInfo.pages = 1
      state.homeworkList.status = 'loading'
    },
    changeHomeworkListStatus (state, payload) {
      state.homeworkList.status = payload
    },
    appendHomeworkList (state, payload) {
      state.homeworkList.list = state.homeworkList.list.concat(payload.data)
      state.homeworkList.pageInfo = payload.pageInfo
      if (payload.data.length < state.homeworkList.pageInfo.size) {
        state.homeworkList.status = 'over'
      } else {
        state.homeworkList.status = 'load'
      }
    },
    /** * 添加数据至作业详情  */
    appendHomeworkDetails(state, payload) {
      state.homeworkDetails = payload.data
    },
    clearHomeworkDetails (state) {
      state.homeworkDetails = null
    },
    // 查询作业要求详情
    appendRequirementDetails(state, payload) {
      state.requirementDetails = payload.data
      if (state.requirementDetails.coverImg) {
        if (state.requirementDetails.coverImg[0].endsWith(',')) {
          state.requirementDetails.coverImg = state.requirementDetails.coverImg[0].substr(0, state.requirementDetails.coverImg[0].length - 1)
        } else {
          state.requirementDetails.coverImg = state.requirementDetails.coverImg[0]
        }
      }
    },
    clearRequirementDetails (state) {
      state.requirementDetails = null
    },
    // 作业要求下作业任务列表
    appendRequirementList(state, payload) {
      state.requirementList.list = state.requirementList.list.concat(payload.data)
      payload.data.forEach(element => {
        state.requirementList.courseType = element.courseType
      })
      if (payload.data.length < 10) {
        state.requirementList.load = 'over'
      } else {
        state.requirementList.load = 'load'
      }
    },
    changeOpenCoursesStatus (state, payload) {
      state.openCourses.status = payload
    },
    clearOpenCourses (state) {
      state.openCourses.list = []
      state.openCourses.status = 'loading'
      state.openCourses.pageInfo = {
        count: 0,
        number: 1,
        pages: 1,
        size: process.env.global.pageSize
      }
    },
    // 查询提交作业，体验课和正式课课程列表
    appendOpenCourses(state, payload) {
      if (payload.clear) { state.openCourses.list = [] }
      state.openCourses.list = state.openCourses.list.concat(payload.data)
      state.openCourses.pageInfo = payload.pageInfo
      if (payload.data.length < state.openCourses.pageInfo.size) {
        state.openCourses.status = 'over'
      } else {
        state.openCourses.status = 'load'
      }
    },

    clearTrialsCourses (state) {
      state.trialsCourses.list = []
      state.trialsCourses.status = 'loading'
      state.trialsCourses.pageInfo = {
        count: 0,
        number: 1,
        pages: 1,
        size: process.env.global.pageSize
      }
    },

    changeTrialsCoursesStatus (state, payload) {
      state.trialsCourses.status = payload
    },
    
    // 查询学员体验课作业任务列表
    appendTrialsCourses(state, payload) {
      state.trialsCourses.list = state.trialsCourses.list.concat(payload.data)
      state.trialsCourses.pageInfo = payload.pageInfo
      if (payload.data.length < state.trialsCourses.pageInfo.size) {
        state.trialsCourses.status = 'over'
      } else {
        state.trialsCourses.status = 'load'
      }
    },

    // 查询用户提交作业时的期列表
    appendStagesList(state, payload) {
      state.stagesList = payload.data
    },
    
    clearStagesList (state) {
      state.stagesList = []
    },


    changeVipCoursesStatus (state, payload) {
      state.vipCourses.status = payload
    },

    clearVipCourses (state) {
      state.vipCourses.list = []
      state.vipCourses.status = 'loading'
      state.vipCourses.pageInfo = {
        count: 0,
        number: 1,
        pages: 1,
        size: process.env.global.pageSize
      }
    },

    // 查询用户提交作业时的期列表
    async appendVipCourses(state, payload) { 
      state.vipCourses.list = state.vipCourses.list.concat(payload.data)
      state.vipCourses.pageInfo = payload.pageInfo
      if (payload.data.length < state.vipCourses.pageInfo.size) {
        state.vipCourses.status = 'over'
      } else {
        state.vipCourses.status = 'load'
      }
    }
  },
  actions: {
    async appendHomeworkList({ commit }, params) {
      if (params.courseType && params.courseType === 'CHILD') delete params.categoryIds
      commit('changeHomeworkListStatus', 'loading')
      const res = await this.$axios.get('/homes', {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      })
      const pageInfo = {
        pages: params.page,
        size: process.env.global.pageSize
      }
      commit('appendHomeworkList', { data: res.data, pageInfo })
      return res
    },
    /** * 查询作业详情 */
    async appendHomeworkDetails({ commit }, params) {
      const res = await this.$axios.get(`/homes/${params.id}`)
      commit('appendHomeworkDetails', res)
      return res
    },
    // 查询作业要求详情
    async appendRequirementDetails({ commit }, params) {
      const res = await this.$axios.get(`/homes/task/${params.id}`)
      if (res.status === 200) {
        commit('appendRequirementDetails', res)
      }
    },
    // 作业要求下作业任务列表
    async appendRequirementList({ commit }, params) {
      const res = await this.$axios.get('/homes/task/job-list', {
        params: {
          ...params,
          collation: 2
        }
      })
      commit('appendRequirementList', res)
      return res
    },

    // 抄作业投诉
    async appendComplaint(state, params) {
      const res = await this.$axios.post(`/homes/${params.taskId}/plagiarism`, params.data)
      return res
    },
    
    // 查询提交作业，体验课和正式课课程列表
    async appendOpenCourses({ commit }, params) {
      commit('changeOpenCoursesStatus', 'loading')
      await this.$axios.get('/courses/open', {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      }).then(course => {
        if (course.status === 200 && course.data.length) {
          let ids = ''
          course.data.forEach( element => {
            ids += element.id + ','
          })
          
          this.$axios.get('/courses/tasks-count', {
            params: {
              courseIds: ids.substr(0, ids.length - 1),
              courseType: params.type
            }
          }).then(res => {
            course.data.forEach((item, index) => {
              item.published = res.data[index].published
              item.submit = res.data[index].submit
            })
            const pageInfo = { pages: params.page, size: 10 }
            commit('appendOpenCourses', { data: course.data, pageInfo, clear: params.clear })
            return course.data
          })
        } else {
          const pageInfo = { pages: params.page, size: 10 }
          commit('appendOpenCourses', { data: course.data, pageInfo, clear: params.clear })
          return course.data
        }
      })
    },

    // 查询学员体验课作业任务列表
    async appendTrialsCourses({ commit }, params) {
      commit('changeTrialsCoursesStatus', 'loading')
      const res = await this.$axios.get(`/trials-courses/${params.id}/tasks`, {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      })
      const pageInfo = { pages: params.page, size: 10 }
      commit('appendTrialsCourses', { data: res.data, pageInfo})
      return res
    },

    // 查询用户提交作业时的期列表
    async appendStagesList({ commit }, params) {
      const res = await this.$axios.get(`/users/stages`, {
        params: { ...params }
      })
      commit('appendStagesList', { data: res.data})
      return res
    },

    // 查询期下作业任务列表
    async appendVipCourses({ commit }, params) {
      commit('changeVipCoursesStatus', 'loading')
      const res = await this.$axios.get(`/stages/${params.id}/tasks`, {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      })
      const pageInfo = { pages: params.page, size: 10 }
      commit('appendVipCourses', { data: res.data, pageInfo})
      return res
    },
  },
  getters: {
    homeworkListGetters(state) {
      return state.homeworkList
    },
    homeworkDetailsGetters(state) {
      return state.homeworkDetails
    },
    requirementDetailsGetters(state) {
      return state.requirementDetails
    },
    requirementListGetters(state) {
      return state.requirementList
    },
    openCoursesGetters (state) {
      return state.openCourses
    },
    trialsCoursesGetters(state) {
      return state.trialsCourses
    },
    stagesListGetters(state) { 
      return state.stagesList
    },
    vipCoursesGetters(state) { 
      return state.vipCourses
    }
  }
}
