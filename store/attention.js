export default {
  state: () => {
    return {
      popularUsersList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 1,
          pages: 1,
          size: 15
        }
      },
      popularUsers: [],
      attentionList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 1,
          pages: 1,
          size: process.env.global.pageSize
        }
      }
    }
  },
  mutations: {
    changeAttentionList (state, payload) {
      const { index, type, value } = payload
      if (state.attentionList.list[index] && state.attentionList.list[index].topic) {
        if (type === 'comment') { 
          state.attentionList.list[index].topic.commentCount += value
        } else if (type === 'collect') {
          state.attentionList.list[index].topic.isCollection = value
        } else if (type === 'love') {
          state.attentionList.list[index].topic.isPraise = value.praise
          state.attentionList.list[index].topic.praiseCount += value.count
        } else if (type === 'attention') {
          state.attentionList.list[index].topic.isAttention = value
        }
      }
    },
    changePopularUsersListFollowStatus (state, payload) {
      state.popularUsersList.list[payload].isFlower = !state.popularUsersList.list[payload].isFlower
    },
    changePopularUsersListStatus (state, payload) {
      state.popularUsersList.status = payload
    },
    appendPopularUsersList (state, payload) {
      state.popularUsersList.list = state.popularUsersList.list.concat(payload.data)
      state.popularUsersList.pageInfo = payload.pageInfo
      if (payload.data.length < state.popularUsersList.pageInfo.size) {
        state.popularUsersList.status = 'over'
      } else {
        state.popularUsersList.status = 'load'
      }
    },
    clearPopularUsersList(state) {
      state.popularUsersList.list = []
      state.popularUsersList.status = 'loading'
      state.popularUsersList.pageInfo.pages = 1
    },
    clearPopularUsers(state) {
      state.popularUsers = []
    },
    changePopularUsersStatus (state, payload) {
      state.popularUsers[payload].isFlower = !state.popularUsers[payload].isFlower
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
    // 关注功能
    async queryFollowing ({ commit }, params) {
      const res = await this.$axios.post(`/following/${params.id}`)
      // commit('appendCommentDetails', res)
      return res
    },
    // 取消关注功能
    async deleteFollowing ({ commit }, params) {
      const res = await this.$axios.delete(`/following/${params.id}`)
      // commit('appendCommentDetails', res)
      return res
    },
    async appendPopularUsersList ({ commit }, params) {
      commit('changePopularUsersListStatus', 'loading')
      const res = await this.$axios.get('/popular-users', { 
        params: {
          ...params,
          size: 15
        }
       })
      const pageInfo = {
        number: params.page,
        size: 15
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
          size: process.env.global.pageSize
        }
      })
      const pageInfo = {
        number: params.page,
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