import { waterFallImgPromise } from '@/utils/util.js'

export default {
  state: () => {
    return {
      videoList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
      smallVideoList: {
        list: [],
        status: 'loading',
        pageInfo: {
          count: 0,
          number: 0,
          pages: 1,
          size: process.env.global.pageSize
        }
      },
      videoDetails: null
    }
  },
  mutations: {
    clearSmallVideoList (state) {
      state.smallVideoList.list = []
      state.smallVideoList.status = 'loading'
      state.smallVideoList.pageInfo.pages = 1
    },
    changeSmallVideoStatus (state, payload) {
      state.smallVideoList.status = payload
    },
    appendSmallVideoList (state, payload) {
      state.smallVideoList.list = state.smallVideoList.list.concat(payload.data)
      state.smallVideoList.pageInfo = payload.pageInfo
      if (payload.data.length < state.smallVideoList.pageInfo.size) {
        state.smallVideoList.status = 'over'
      } else {
        state.smallVideoList.status = 'load'
      }
    },
    clearVideoList (state) {
      state.videoList.list = []
      state.videoList.status = 'loading'
      state.videoList.pageInfo.pages = 1
    },
    changeVideoListStatus (state, payload) {
      state.videoList.status = payload
    },
    appendVideoList (state, payload) {
      state.videoList.list = state.videoList.list.concat(payload.data)
      state.videoList.pageInfo = payload.pageInfo
      if (payload.data.length < state.videoList.pageInfo.size) {
        state.videoList.status = 'over'
      } else {
        state.videoList.status = 'load'
      }
    },
    appendVideoDetails (state, payload) {
      state.videoDetails = payload.data
    },
    clearVideoDetails (state) {
      state.videoDetails = null
    },
    // 更改列表页点赞数据
    changeListPraisesCount(state, payload) {
      state.videoList.list[payload.index].praiseCount+=payload.count
    },
    // 更改详情页点赞数据
    changeDetailPraisesCount(state, payload) {
      state.videoDetails.praiseCount+=payload
    }
  },
  actions: {
    async appendSmallVideoList ({ commit }, params) {
      commit('changeSmallVideoStatus', 'loading')
      const res = await this.$axios.get('/videos', {
        params: {
          ...params,
          size: 12
        }
      })
      const promiseList = []
      for (let index = 0; index < res.data.length; index++) {
        promiseList.push(waterFallImgPromise(res.data, index, 174))
      }
      await Promise.all(promiseList)
      commit('appendSmallVideoList', res)
      return res
    },
    async appendVideoList ({ commit }, params) {
      commit('changeVideoListStatus', 'loading')
      const res = await this.$axios.get('/movies', {
        params: {
          ...params,
          size: process.env.global.pageSize
        }
      })
      const pageInfo = {
        pages: params.page,
        size: process.env.global.pageSize
      }
      commit('appendVideoList', { data: res.data, pageInfo })
    },
    async appendVideoDetails ({ commit }, params) {
      const res = await this.$axios.get(`/movies/${params.id}`)
      commit('appendVideoDetails', res)
    }
  },
  getters: {
    smallVideoListGetters (state) {
      return state.smallVideoList
    },
    videoListGetters (state) {
      return state.videoList
    },
    videoDetailsGetters (state) {
      return state.videoDetails
    }
  }
}