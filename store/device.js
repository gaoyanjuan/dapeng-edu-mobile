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
  actions: {
     // 获取APP版本及下载链接
     async getAppInfo({ commit }) {
      const res = await this.$axios.get('/app-version')
      return JSON.parse(res.data.content)
    },
  }
}