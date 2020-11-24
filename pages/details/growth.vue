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
  async asyncData ({route, store, error}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      await store.dispatch('growth/appendGrowthDetails', { id: route.query.id }).then((res) => {
        if (res && res.data) {
          store.commit('details/changeIsPraise', res.data.isPraise)
          store.commit('details/changeIsCollection', res.data.isCollection)
          store.commit('details/changeCommentCount', res.data.commentCount)
          store.commit('details/changePraiseCount', res.data.praiseCount)
        }
      })
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
    } catch (err) {
      error({ statusCode: err.data.code, message: err.data.message })
    }
  },
  created () {
    if (process.browser && !this.isServiceload) {
      this.$store.dispatch('growth/appendGrowthDetails', { id : this.$route.query.id }).then((res) => {
        if (res && res.data) {
          this.$store.commit('details/changeIsPraise', res.data.isPraise)
          this.$store.commit('details/changeIsCollection', res.data.isCollection)
          this.$store.commit('details/changeCommentCount', res.data.commentCount)
          this.$store.commit('details/changePraiseCount', res.data.praiseCount)
        }
      })
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