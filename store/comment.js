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
    appendNewRepliesComment (state, payload) {
      state.replies.data.unshift(payload)
      state.replies.data = state.replies.data
    },
    deleteReply (state, payload) {
      state.replies.data.splice(payload.index, 1)
      state.replies.data = state.replies.data
    },
    deleteComment (state, payload) {
      state.commentList.data.splice(payload.index, 1)
      state.commentList.data = state.commentList.data
    },
    appendNewComment (state, payload) {
      if (!payload.data.highRisk) {
        const newComment = {
          ...payload.data,
          user: {
            ...payload.userData,
            nickname: payload.userData.nickname
          },
          praiseCount: 0,
          isPraise: false
        }
        if (state.commentList.data[0] && state.commentList.data[0].type === "MARK") {
          state.commentList.data.splice(1,0,newComment)
          state.commentList.data = state.commentList.data
        } else {
          state.commentList.data.splice(0,0,newComment)
          state.commentList.data = state.commentList.data
        }
      }
    },
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
    deleteLike (state, payload) {
      for (let index = 0; index < state.likesList.data.length; index++) {
        const element = state.likesList.data[index]
        if (element.user.userId === payload.userId) {
          state.likesList.data.splice(index, 1)
          break
        }
      }
    },
    addNewLike (state, payload) {
      state.likesList.data.unshift(payload)
      state.likesList.data = state.likesList.data
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
    async appendNewRepliesComment ({ commit }, params) {
      const res = await this.$axios.post(`/comments/${params.id}/replies`, params)
      return res
    },
    // 删除评论
    async deleteComment ({ commit }, params) {
      const res = await this.$axios.delete(`/comments/${params.id}`)
      if (params.commit) {
        commit('deleteComment', params)
      }
      return res
    },
    // 新增评论
    async appendNewComment ({ commit }, params) {
      const res = await this.$axios.post('/comments', params)
      commit('appendNewComment', { data: res.data, userData: params.user })
      return res
    },
    // 收藏功能
    async queryCollection ({ commit }, params) {
      const res = await this.$axios.post(`/favorites`, {
        ...params
      })
      return res.data
    },
    // 取消收藏功能
    async queryDeleteCollection ({ commit }, params) {
      const res = await this.$axios.delete(`/favorites/${params.id}?type=${params.type}`, {
        ...params
      })
      return res.data
    },
    // 取消点赞
    async queryUnLike ({ commit }, params) {
      const res = this.$axios.delete(`/likes/${params.id}`, { params })
      return res.data
    },
    // 点赞
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