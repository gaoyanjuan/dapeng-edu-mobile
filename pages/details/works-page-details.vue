<template>
  <div>
    <m-works-page-details />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  title: '作品详情页',
  layout: 'navbar',
  async asyncData ({route, store, error}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      await store.dispatch('work/appendWorksDetails', { id: route.query.id })
      await store.dispatch('comment/queryCommentList', {
        topicId:route.query.id,
        topicType: 'WORKS'
      })
      await store.dispatch('comment/queryLikesList', {
        id:route.query.id,
        type: 'WORKS',
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
      this.$store.dispatch('work/appendWorksDetails', { id: this.$route.query.id })
      this.$store.dispatch('comment/queryCommentList', {
        topicId: this.$route.query.id,
        topicType: 'WORKS'
      })
      this.$store.dispatch('comment/queryLikesList', {
        id: this.$route.query.id,
        type: 'WORKS',
        page: 1
      })
    }
  },
  destroyed () {
    this.$store.commit('work/clearWorksDetails')
  }
}
</script>