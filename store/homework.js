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
    }
  },
  mutations: {
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
      state.requirementDetails.coverImgSamll = state.requirementDetails.coverImg[0]
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
    appendOpenCourses (state, payload) {
      state.openCourses.list = state.openCourses.list.concat(payload.data)
      state.openCourses.pageInfo = payload.pageInfo
      if (payload.data.length < state.openCourses.pageInfo.size) {
        state.openCourses.status = 'over'
      } else {
        state.openCourses.status = 'load'
      }
    },
  },
  actions: {
    async appendHomeworkList({ commit }, params) {
      if (params.courseType && params.courseType === 'CHILD') delete params.categoryIds
      commit('changeHomeworkListStatus', 'loading')
      const res = await this.$axios.get('/homes', {
        params: {
          ...params,
          size: process.env.global.pageSize,
          jobType: 'TEXT'
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
      const res = await this.$axios.post(`/homes/${params.taskId}/plagiarism`, params)
      return res
    },
    
    // 查询提交作业，体验课和正式课课程列表
    async appendOpenCourses ({ commit }, params) {
      commit('changeOpenCoursesStatus', 'loading')
      await this.$axios.get('/courses/open', {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      }).then(course => {
        if (course.status === 200 && course.data.length) {
          let ids = ''
          course.data.forEach(element => {
            ids += element.college.id + ','
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
            commit('appendOpenCourses', { data: course.data, pageInfo })
            return course.data
          })
        } else { 
          const pageInfo = { pages: params.page, size: 10 }
          commit('appendOpenCourses', { data: course.data, pageInfo })
          return course.data
        }
      })
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
  }
}
