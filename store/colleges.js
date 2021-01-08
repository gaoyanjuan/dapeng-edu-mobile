export default {
  state: () => {
    return {
      colleges: [],
      taskColleges: [
        { id: '', name: '全部' }
      ], // 作业
      workColleges: [
        { id: '', name: '全部' }
      ], // 作品
      readingColleges: [
        { id: '', name: '全部' }
      ], // 阅读
      homeworkColleges: [
        { id: '', name: '全部' }
      ], // 提交作业
      videoColleges: [
        { id: '', name: '全部' }
      ], // 视频
      smallVideoColleges: [
        { id: '', name: '全部' }
      ], // 小视频
      squareTaskTrialColleges: [
        { id: '', name: '全部' }
      ],
      submitWorkColleges: [] // 提交作品
    }
  },
  mutations: {
    appendColleges(state, payload) {
      if (!(Array.isArray(payload.data))) return false
      payload.data.forEach(element => {
        element.name = element.name.replace(/学院/, '')
      })
      if (payload.collegeType === 'SQUARE_TASK') {
        state.taskColleges = state.taskColleges.concat(payload.data)
      } else if (payload.collegeType === 'SQUARE_VIDEO') {
        state.smallVideoColleges = state.smallVideoColleges.concat(payload.data)
      } else if (payload.collegeType === 'SQUARE_MOVIE') {
        state.videoColleges = state.videoColleges.concat(payload.data)
      } else if (payload.collegeType === 'SQUARE_WORK') {
        state.workColleges = state.workColleges.concat(payload.data)
      } else if (payload.collegeType === 'SQUARE_ARTICLE') {
        state.readingColleges = state.readingColleges.concat(payload.data)
      } else if (payload.collegeType === 'RELEASE_TASK') {
        state.homeworkColleges = state.homeworkColleges.concat(payload.data)
      } else if (payload.collegeType === 'RELEASE_WORK') {
        state.submitWorkColleges = payload.data
      } else if (payload.collegeType === 'SQUARE_TASK_TRIAL') {
        state.squareTaskTrialColleges = state.squareTaskTrialColleges.concat(payload.data)
      }  else {
        state.colleges = payload.data
      }
    }
  },
  actions: {
    async appendColleges ({ commit }, params) {
      const res = await this.$axios.get('/colleges', { params })
      commit('appendColleges', { data :res.data, collegeType: params.collegeType })
      return res
    }
  },
  getters: {
    smallVideoCollegesGetters (state) {
      return state.smallVideoColleges
    },
    submitWorkCollegesGetters (state) {
      return state.submitWorkColleges
    },
    taskCollegesGetters (state) {
      return state.taskColleges
    },
    workCollegesGetters (state) {
      return state.workColleges
    },
    readingCollegesGetters (state) {
      return state.readingColleges
    },
    homeworkCollegesGetters (state) {
      return state.homeworkColleges
    },
    squareTaskTrialCollegesGetters (state) {
      return state.squareTaskTrialColleges
    },
    videoCollegesGetters (state) {
      return state.videoColleges
    },
  }
}