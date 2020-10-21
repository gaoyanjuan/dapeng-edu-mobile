<template>
  <div>
    <m-dynamic-page-details />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  title: '动态详情页',
  layout: 'navbar',
  async asyncData ({route, store, error}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      await store.dispatch('dynamic/appendDynamicDetails', { id: route.query.id })
      await store.dispatch('comment/queryCommentList', {
        topicId:route.query.id,
        topicType: 'LIFE'
      })
      await store.dispatch('comment/queryLikesList', {
        id:route.query.id,
        type: 'LIFE',
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
      this.$store.dispatch('dynamic/appendDynamicDetails', { id : this.$route.query.id })
      this.$store.dispatch('comment/queryCommentList', {
        topicId: this.$route.query.id,
        topicType: 'LIFE'
      })
      this.$store.dispatch('comment/queryLikesList', {
        id: this.$route.query.id,
        type: 'LIFE',
        page: 1
      })
    }
  },
  destroyed () {
    this.$store.commit('dynamic/clearDynamicDetails')
  }
}
</script>