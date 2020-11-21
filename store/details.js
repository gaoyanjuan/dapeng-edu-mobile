export default {
  state: () => {
    return {
      isPraise: false,
      isCollection: false,
      commentCount:0,
      praiseCount:0
    }
  },
  mutations: {
    changeIsPraise (state, payload) {
      state.isPraise = payload
    },
    changeIsCollection (state, payload) {
      state.isCollection = payload
    },
    changeCommentCount (state, payload) {
      state.commentCount = payload
    },
    changePraiseCount (state, payload) {
      state.praiseCount = payload
    }
  },
  getters: {
    detailsGetters (state) {
      return {
        isPraise: state.isPraise,
        isCollection: state.isCollection,
        commentCount: state.commentCount,
        praiseCount: state.praiseCount
      }
    }
  }
}