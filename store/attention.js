export default {
  state: () => {
    return {
      popularUsersList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
      popularUsers: [],
      attentionList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: process.env.global.pageSize
        }
      }
    }
  },
  mutations: {
    appendPopularUsersList (state, payload) {
      state.popularUsersList.list = state.popularUsersList.list.concat(payload.data)
      state.popularUsersList.pageInfo = payload.pageInfo
      if (payload.data.length < state.popularUsersList.pageInfo.size) {
        state.popularUsersList.status = 'over'
      } else {
        state.popularUsersList.status = 'load'
      }
    },
    appendPopularUsers (state, payload) {
      state.popularUsers = state.popularUsers.concat(payload.data)
    },
    clearAttentionLiAst (state) {
      state.attentionList.list = []
      state.attentionList.status = 'loading'
      state.attentionList.pageInfo.pages = 1
    },
    changeAttentionListStatus (state, payload) {
      state.attentionList.status = payload
    },
    appendAttentionList (state, payload) {
      state.attentionList.list = state.attentionList.list.concat(payload.data)
      state.attentionList.pageInfo = payload.pageInfo
      if (payload.data.length < state.attentionList.pageInfo.size) {
        state.attentionList.status = 'over'
      } else {
        state.attentionList.status = 'load'
      }
    }
  },
  actions: {
    async appendPopularUsersList ({ commit }, params) {
      const res = await this.$axios.get('/popular-users', { params })
      const pageInfo = {
        pages: params.page,
        size: process.env.global.pageSize
      }
      commit('appendPopularUsersList', { data: res.data, pageInfo })
      return res
    },
    async appendPopularUsers ({ commit }, params) {
      const res = await this.$axios.get('/popular-users/random', { params })
      commit('appendPopularUsers', res)
      return res
    },
    async appendAttentionList({ commit }, params) {
      commit('changeAttentionListStatus', 'loading')
      const res = await this.$axios.get('/feeds', {
        params: {
          ...params,
          size: process.env.global.pageSize,
          filterType: '3,4,8'
        }
      })
      const pageInfo = {
        pages: params.page,
        size: process.env.global.pageSize
      }
      commit('appendAttentionList', { data: res.data, pageInfo })
      return res
    }
  },
  getters: {
    popularUsersListGetters (state) {
      return state.popularUsersList
    },
    popularUsersGetters (state) {
      return state.popularUsers
    },
    attentionListGetters (state) {
      return state.attentionList
    }
  }
}