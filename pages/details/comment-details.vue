<template>
  <div>
    <m-comment-details />
  </div>
</template>

<script>
export default {
  title: '评论详情页',
  layout: 'tabbar',
  async asyncData ({route, store}) {
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
    } catch (error) {
      error({ statusCode: error.data.code, message: error.data.message })
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