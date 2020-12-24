<template>
  <m-label />
</template>

<script>
export default {
  layout: 'navbar',
  async asyncData ({route, store}) {},
  created () {
    if (process.browser) {
      if(this.$store.getters['label/labelListGetters'].list.length === 0) {
        this.$store.dispatch('label/appendLabelList', { id: this.$route.query.id, topicType: this.$route.query.topicType, page: 1 })
      }
      this.$store.dispatch('label/appendLabelCount', { id: this.$route.query.id })
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.$store.commit('label/clearLabelList')
      this.$store.dispatch('label/appendLabelList', { id: newQuery.id, topicType: newQuery.topicType, page: 1 })
      if (newQuery.id !== oldQuery.id) {
        this.$store.commit('label/clearLabelCount')
        this.$store.dispatch('label/appendLabelCount', { id: newQuery.id })
      }
    }
  },
  methods:{},
  destroyed () {},
  beforeRouteLeave (to, from, next) {
    // 如果进入详情,就不清除数据
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.$store.commit('label/clearLabelCount')
      this.$store.commit('label/clearLabelList')
    }
    next()
  }
}
</script>

<style lang="less" scoped>

</style>