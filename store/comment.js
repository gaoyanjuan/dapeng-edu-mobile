const pageSize = 20

export default {
  state: () => {
    return {
      commentList: {
        data: [],
        status: 'loading',
        params: null,
        pageInfo: null
      },
      likesList: {
        data: [],
        status: 'loading',
        params: null,
        pageInfo: null
      },
      replies:{
        data: [],
        status: 'loading',
        pageInfo: null
      },
      commentDetails: {}
    }
  },
  mutations: {
    clearCommentList (state) {
      state.commentList.data = []
      state.commentList.status = 'loading'
      state.commentList.params = null
      state.commentList.pageInfo = null
    },
    changeCommentListStatus (state, payload) {
      state.commentList.status = payload.status
      state.commentList.params = payload.params
    },
    appendCommentList (state, payload) {
      state.commentList.data = state.commentList.data.concat(payload.data)
      state.commentList.pageInfo = payload.pageInfo
      if (payload.data.length < pageSize) {
        state.commentList.status = 'over'
      } else {
        state.commentList.status = 'load'
      }
    },
    clearLikesList (state) {
      state.likesList.data = []
      state.likesList.status = 'loading'
      state.likesList.params = null
      state.likesList.pageInfo = null
    },
    changeLikesListStatus (state, payload) {
      state.likesList.status = payload.status
      state.likesList.params = payload.params
    },
    appendLikesList (state, payload) {
      state.likesList.data = state.likesList.data.concat(payload.data)
      state.likesList.pageInfo = payload.pageInfo
      if (payload.data.length < pageSize) {
        state.likesList.status = 'over'
      } else {
        state.likesList.status = 'load'
      }
    },
    clearRepliesList (state) {
      state.replies.data = []
      state.replies.status = 'loading'
      state.replies.pageInfo = null
      state.commentDetails = {}
    },
    changeRepliesListStatus (state, payload) {
      state.replies.status = payload.status
    },
    appendRepliesList (state, payload) {
      state.replies.data = state.replies.data.concat(payload.data)
      state.replies.pageInfo = payload.pageInfo
      if (payload.data.length < pageSize) {
        state.replies.status = 'over'
      } else {
        state.replies.status = 'load'
      }
    },
    appendCommentDetails (state, payload) {
      state.commentDetails = payload.data
    }
  },
  actions: {
    async queryUnLike ({ commit }, params) {
      const res = this.$axios.delete(`/likes/${params.id}`, { params })
      return res.data
    },
    async queryLike ({ commit }, params) {
      const res = this.$axios.post('/likes', params)
      return res.data
    },
    async queryCommentList ({ commit }, params) {
      commit('changeCommentListStatus', { status: 'loading', params })
      const res = await this.$axios.get(`/common/comments`, {
        params: {
          ...params,
          replyCount: 3,
          queryCount: true,
          size: pageSize
        }
      })
      commit('appendCommentList', { data: res.data, pageInfo: res.pageInfo })
      return res
    },
    async queryLikesList({ commit }, params) {
      commit('changeLikesListStatus', { status: 'loading', params })
      const res = await this.$axios.get(`/common/likes`, { params: {
          ...params,
          size: pageSize
        }
      })
      const pageInfo = {
        pages: params.page,
        size: pageSize
      }
      commit('appendLikesList', { data: res.data, pageInfo })
      return res.data
    },
    async queryRepliesList({ commit }, params) {
      commit('changeRepliesListStatus', { status: 'loading' })
      const res = await this.$axios.get(`/common/comments/${params.id}/replies`, {
        params: {
          ...params,
          size: pageSize
        }
      })
      commit('appendRepliesList', res)
      return res.data
    },
    async queryCommentDetails ({ commit }, params) {
      const res = await this.$axios.get(`/common/comments/${params.id}`, {
        params: {
          ...params
        }
      })
      commit('appendCommentDetails', res)
      return res.data
    }
  },
  getters: {
    commentListGetters (state) {
      return state.commentList
    },
    repliesGetters (state) {
      return state.replies
    },
    commentDetailsGetters (state) {
      return state.commentDetails
    },
    likesListGetters (state) {
      return state.likesList
    }
  }
}