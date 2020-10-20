<template>
  <div>
    <m-growth-page-details />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  title: '成长详情页',
  layout: 'navbar',
  async asyncData ({route, store}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      await store.dispatch('growth/appendGrowthDetails', { id: route.query.id })
      await store.dispatch('comment/queryCommentList', {
        topicId: route.query.tagsId,
        topicType: route.query.topicType
      })
      await store.dispatch('comment/queryLikesList', {
        id:route.query.tagsId,
        type: route.query.topicType,
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
      this.$store.dispatch('growth/appendGrowthDetails', { id : this.$route.query.id })
      this.$store.dispatch('comment/queryCommentList', {
        topicId: this.$route.query.tagsId,
        topicType: this.$route.query.topicType
      })
      this.$store.dispatch('comment/queryLikesList', {
        id:this.$route.query.tagsId,
        type: this.$route.query.topicType,
        page: 1
      })
    }
  },
  destroyed () {
    this.$store.commit('growth/clearGrowthDetails')
  }
}
</script>