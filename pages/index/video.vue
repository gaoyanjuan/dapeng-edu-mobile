<template>
  <m-video />
</template>

<script>
export default {
  async asyncData ({route, store}) {},
  created () {
    if (process.browser) {
      try {
        if(this.$store.getters['banner/movieBannerListGetters'].length === 0) {
          this.$store.dispatch('banner/appendBannerList', { channel: 'MOVIE' })
        }
        if (this.$store.getters['colleges/videoCollegesGetters'].length === 1) {
          this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_MOVIE' })
        }
        if (this.$store.getters['video/videoListGetters'].list.length === 0) {
          this.$store.dispatch('video/appendVideoList', { collegeId: this.$route.query.college, page: 1 })
          // this._squareLoading({ page_area: '视频', page_area_sec:'全部', request_type: '进入页面加载'})
        } 
      } catch (error) {}
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.$store.commit('video/clearVideoList')
      this.$store.dispatch('video/appendVideoList', { collegeId: newQuery.college, page: 1 })
    }
  },
  methods:{},
  beforeRouteLeave (to, from, next) {
    // 如果进入详情,就不清除数据
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.$store.commit('video/clearVideoList')
    }
    next()
  }
}
</script>
