export const state = () => ({})

export const mutations = {}

export const actions = {
  // 获取OSS的sts临时授权
  async getMySTS () {
    const res = await this.$axios.get('old/platforms/sts-auth')
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
}

export const getters = {}
