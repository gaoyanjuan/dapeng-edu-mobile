export default {
  state: () => {
    return {
      taskPartList: {
        list: [],
        status: 'loading',

      },
    }
  },
  mutations: {},
  actions: {
    async appendTaskPartList({
      commit,
      state
    }, params) {
      const res = await this.$axios.get('part_job/get_item_list.ashx')
      // commit('appendTaskPartList', res)
      return res
    },
  },
  getters: {}
}
