export const state = () => ({
  activitiesList: {
    list: [],
    pageInfo: null
  }
})

export const mutations = {
  appendActivities (state, payload) {
    state.activitiesList.list = payload.data
    state.activitiesList.pageInfo = payload.pageInfo
  }
}

export const actions = {
  async appendActivities({ commit }, payload) {
    const data  = await this.$axios.get(`/activitys?linkContentTypes=${payload.linkContentTypes}&page=${payload.page}&size=${payload.size}`)
    commit('appendActivities', data)
    return data
  }
}

export const getters = {
  activitiesGetters (state) {
    return state.activitiesList
  }
}
