<template>
  <m-reading />
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  // async asyncData ({route, store}) {
  //   if (process.browser) return {
  //     isServiceload: false
  //   }
  //   try {
  //     if (store.getters['colleges/readingCollegesGetters'].length === 1) {
  //       await store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_ARTICLE' })
  //     }
  //     if (store.getters['reading/readingListGetters'].list.length === 0) {
  //       await store.dispatch('reading/appendReadingList', { collegeId: route.query.college, page: 1 })
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
        if(this.$store.getters['banner/articleBannerListGetters'].length === 0) {
          this.$store.dispatch('banner/appendBannerList', { channel: 'ARTICLE' })
        }
        if (this.$store.getters['colleges/readingCollegesGetters'].length === 1) {
          this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_ARTICLE' })
        }
        if (this.$store.getters['reading/readingListGetters'].list.length === 0) {
          this.$store.dispatch('reading/appendReadingList', { collegeId: this.$route.query.college, page: 1 })
          this._squareLoading({ page_area: '阅读', page_area_sec:'全部', request_type: '进入页面加载'})
        }
      } catch (error) {}
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearReadingList()
      this.appendReadingList({ collegeId: newQuery.college, page: 1 })
    }
  },
  beforeRouteLeave (to, from, next) {
    // 如果进入详情,就不清除数据
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.clearReadingList()
    }
    next()
  },
  methods:{
    ...mapActions('reading', [
      'appendReadingList'
    ]),
    ...mapMutations('reading', [
      'clearReadingList'
    ])
  },
}
</script>
