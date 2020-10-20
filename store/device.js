export default {
  state: () => {
    return {
      audioActive: null
    }
  },
  mutations: {
    appendAudioActive(state, val) {
      state.audioActive = val
    }
  },
  getters: {
    audioActiveGetters(state) {
      return state.audioActive
    }
  },
  actions: {}
}