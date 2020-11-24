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
      await store.dispatch('work/appendWorksDetails', { id: route.query.id }).then((res) => {
        if (res && res.data) {
          store.commit('details/changeIsPraise', res.data.isPraise)
          store.commit('details/changeIsCollection', res.data.isCollection)
          store.commit('details/changeCommentCount', res.data.commentCount)
          store.commit('details/changePraiseCount', res.data.praiseCount)
        }
      })
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
      console.log(err)
      // error({ statusCode: err.data.code, message: err.data.message })
    }
  },
  created () {
    if (process.browser && !this.isServiceload) {
      this.$store.dispatch('work/appendWorksDetails', { id: this.$route.query.id }).then((res) => {
        if (res && res.data) {
          this.$store.commit('details/changeIsPraise', res.data.isPraise)
          this.$store.commit('details/changeIsCollection', res.data.isCollection)
          this.$store.commit('details/changeCommentCount', res.data.commentCount)
          this.$store.commit('details/changePraiseCount', res.data.praiseCount)
        }
      })
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