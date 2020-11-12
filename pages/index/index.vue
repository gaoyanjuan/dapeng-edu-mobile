<template>
  <m-recommend />
</template>

<script>
export default {
  async asyncData ({route, store}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      if (store.getters['recommend/recommendListGetters'].list.length === 0) {
        await store.dispatch('recommend/appendRecommendList', { page : 1 })
      }
      return {
        isServiceload: true
      }
    } catch (err) {
      console.log(err)
    }
  },
  created () {
    if (process.browser && !this.isServiceload) {
      if (this.$store.getters['recommend/recommendListGetters'].list.length === 0) {
        this.$store.dispatch('recommend/appendRecommendList', { page : 1 })
      }
    }
  }
}
</script>
