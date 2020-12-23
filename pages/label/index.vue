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
    }
  },
  watch: {},
  destroyed () {},
  methods:{}
}
</script>

<style lang="less" scoped>

</style>