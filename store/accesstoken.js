import qs from 'querystring'
export const state = () => ({
})

export const mutations = {
}

export const actions = {
   async getAuthToken ({ commit }, params) {
    const res = await this.$axios({
      url: `/token/get_token?${qs.stringify(params)}`,
      method: 'post'
    })
    return res
  },
  async getRefreshToken ({ commit }, params) {
    const res = await this.$axios({
      url: `/token/refresh_token?${qs.stringify(params)}`,
      method: 'post'
    })
    return res
  }
}

export const getters = {
  accessTokenGetters (state) {
    return state.accessToken
  },
}
