<template>
  <div>
    <m-homework-page-details />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  title: '作业详情页',
  layout: 'navbar',
  async asyncData ({route, store, error}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      await store.dispatch('homework/appendHomeworkDetails', { id: route.query.id })
      await store.dispatch('comment/queryCommentList', {
        topicId:route.query.id,
        topicType: 'HOMEWORK'
      })
      await store.dispatch('comment/queryLikesList', {
        id:route.query.id,
        type: 'HOMEWORK',
        page: 1
      })
      return {
        isServiceload: true
      }
    } catch(err) {
      error({ statusCode: err.data.code, message: err.data.message })
    }
  },
  created () {
    if (process.browser && !this.isServiceload) {
      this.$store.dispatch('homework/appendHomeworkDetails', { id: this.$route.query.id })
      this.$store.dispatch('comment/queryCommentList', {
        topicId: this.$route.query.id,
        topicType: 'HOMEWORK'
      })
      this.$store.dispatch('comment/queryLikesList', {
        id: this.$route.query.id,
        type: 'HOMEWORK',
        page: 1
      })
    }
  },
  destroyed () {
    this.$store.commit('homework/clearHomeworkDetails')
  }
}
</script>