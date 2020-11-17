<template>
  <div>
    <m-comment-details />
  </div>
</template>

<script>
export default {
  title: '评论详情页',
  layout: 'navbar',
  async asyncData ({route, store, error}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      await store.dispatch('comment/queryCommentDetails', {
        id: route.query.id
      })
      await store.dispatch('comment/queryRepliesList', {
        id: route.query.id,
        page: 1
      })
      return {
        isServiceload: true 
      }
    } catch (err) {
      error({ statusCode: err.data.code, message: err.data.message })
    }
  },
  created () {
    if (process.browser && !this.isServiceload) {
      this.$store.dispatch('comment/queryCommentDetails', {
        id: this.$route.query.id
      })
      this.$store.dispatch('comment/queryRepliesList', {
        id: this.$route.query.id,
        page: 1
      })
    }
  }
}
</script>