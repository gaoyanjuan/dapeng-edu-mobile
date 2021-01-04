export const state = () => ({
  // 热门标签
  hotLabel: {
    list: [],
    pageInfo: {
      pages: 1,
      size: 20
    }
  },
  // 已选标签
  selLabel: []
})

export const mutations = {
  clearhotLabel (state) {
    state.hotLabel.list = []
  },
  clearSelLabel(state) {
    state.selLabel = []
  },
  appendHotLabel (state, payload) {
    state.hotLabel.list = payload.data
  },
  appendSelLabel(state, payload) {
    payload.forEach(item => {
      state.selLabel.push(item)
    })
  },
  delSelLabel(state, payload) {
    state.selLabel.forEach((item, index) => { 
      if (item.labelId === payload.labelId) { 
        state.selLabel.splice(index, 1)
      }
    })
  }
}

export const actions = {
  // 获取OSS的sts临时授权
  async getMySTS () {
    const res = await this.$axios.get('old/platforms/sts-auth')
    return res
  },

  // 展翅订单查询，是否存在此人
  async getZcAdviser (store, params) {
    const res = await this.$axios.get(`old/platforms/zc/advisers/code?collegeId=${params}`)
    return res
  },

  // 发布作品
  async addNewWorks (store, params) {
    const res = await this.$axios.post('/works', params)
    return res
  },

  // 发布动态
  async addNewDynamic (store, params) {
    const res = await this.$axios.post('/dynamics', params)
    return res
  },

  // 发布作业
  async addNewHomework (store, params) {
    const res = await this.$axios.post('/homes', params)
    return res
  },

  // 修改作业
  async editHomework (store, params) {
    const res = await this.$axios.put(`/homes/${params.id}`, params)
    return res
  },

  // 热门标签
  async getHotLabel({ commit, state }, params) {
    const res = await this.$axios.get(`/labels`, {
      params: {
        ...params,
        page: 1,
        size: 20
      }
    })
    commit('appendHotLabel', res)
    return res
  },

  // 已选标签--添加
  appendSelLabel({ commit, state }, params) { 
    commit('appendSelLabel', params)
  },

  // 已选标签--删除
  delSelLabel({ commit, state }, params) { 
    commit('delSelLabel', params)
  },
}

export const getters = {
  hotLabelGetters (state) {
    return state.hotLabel
  },
  selLabelGetters(state) { 
    return state.selLabel
  }
}
