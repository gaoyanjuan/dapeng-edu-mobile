export const state = () => ({})

export const mutations = {}

export const actions = {
  // 获取OSS的sts临时授权
  async getMySTS () {
    const res = await this.$axios.get('old/platforms/sts-auth')
    return res
  }
}

export const getters = {}
