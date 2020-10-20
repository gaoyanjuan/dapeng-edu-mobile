export default {
  state: () => {
    return {
      colleges: [],
      taskColleges: [], // 作业
      workColleges: [
        { id: '', name: '全部' }
      ] // 作品
    }
  },
  mutations: {
    appendColleges(state, payload) {
      if (!(Array.isArray(payload.data))) return false
      payload.data.forEach(element => {
        element.name = element.name.replace(/学院/, '')
      })
      if (payload.collegeType === 'SQUARE_TASK') {
        state.taskColleges = payload.data
      } else if (payload.collegeType === 'SQUARE_WORK') {
        state.workColleges = state.workColleges.concat(payload.data)
      } else {
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
    taskCollegesGetters (state) {
      return state.taskColleges
    },
    workCollegesGetters (state) {
      return state.workColleges
    }
  }
}