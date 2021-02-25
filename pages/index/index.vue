<template>
  <m-recommend />
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  // async asyncData ({route, store}) {
  //   if (process.browser) return {
  //     isServiceload: false
  //   }
  //   try {
  //     if (store.getters['recommend/recommendListGetters'].list.length === 0) {
  //       await store.dispatch('recommend/appendRecommendList', { page : 1 })
  //     }
  //     return {
  //       isServiceload: true
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },
  created () {
    if (process.browser) {
      try {
        if(this.$store.getters['banner/recommendBannerListGetters'].length === 0) {
          this.$store.dispatch('banner/appendBannerList', { channel: 'RECOMMEND' })
        }
        if(this.$store.getters['topic/recommendGetters'].list.length === 0) {
          this.$store.dispatch('topic/appendTopicList', {page : 1 ,topicType: 'RECOMMEND' })
        }
        if (this.$store.getters['recommend/recommendListGetters'].list.length === 0) {
          this.$store.dispatch('recommend/appendRecommendList', { page : 1 })
          // this._squareLoading({ page_area: '推荐', page_area_sec:'', request_type: '进入页面加载'})
        }
      } catch (error) {}
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearRecommendList()
      this.appendRecommendList({ page : 1 })
    }
  },
  methods: {
    ...mapMutations('recommend', [
      'clearRecommendList'
    ]),
    ...mapActions('recommend', [
      'appendRecommendList'
    ]),
  },
  beforeRouteLeave (to, from, next) {
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.clearRecommendList()
    }
    next()
  }
}
</script>
