<template>
  <m-small-video />
</template>

<script>
export default {
  async asyncData ({route, store}) {},
  created () {
    if (process.browser) {
      try {
        if (this.$store.getters['colleges/smallVideoCollegesGetters'].length === 1) {
          this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_VIDEO' })
        }
        if (this.$store.getters['video/smallVideoListGetters'].list.length === 0) {
          this.$store.dispatch('video/appendSmallVideoList', { type: this.$route.query.type, collegeId: this.$route.query.college })
        }
      } catch (error) {}
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      if (newQuery.college === this.$store.state.video.activeCollegeId && newQuery.type === oldQuery.type) return
      this.$store.commit('video/clearSmallVideoList')
      this.$store.commit('video/changeActiveCollege', newQuery.college)
      this.$store.dispatch('video/appendSmallVideoList', { type: newQuery.type, collegeId: newQuery.college, page: 1 })
    }
  },
  beforeRouteLeave (to, from, next) {
    // 如果进入详情,就不清除数据
    const isDetails =  this.isDetails(to.name)
    if (!isDetails) {
      this.$store.commit('video/clearSmallVideoList')
    }
    next()
  }
}
</script>
