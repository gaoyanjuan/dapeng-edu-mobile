export const state = () => ({
  bannerList:[]
})

export const mutations = {
  /** * 添加数据至Banner列表  */
  appendBannerList (state, payload) {
    state.bannerList = payload.data
  },
}

export const actions = {
   /** * 查询Banner 列表 */
   async appendBannerList ({ commit }, params) {
    const res = await this.$axios.get('/common/banners', {
      params: {
        ...params
      }
    })
    commit('appendBannerList', res)
  },
}

export const getters = {
  bannerListGetters (state) {
    return state.bannerList
  },
}
