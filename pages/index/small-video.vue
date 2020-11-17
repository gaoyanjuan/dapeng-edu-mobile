<template>
  <m-small-video />
</template>

<script>
export default {
  async asyncData ({route, store}) {},
  created () {
    if (process.browser) {
      if (this.$store.getters['colleges/smallVideoCollegesGetters'].length === 1) {
        this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_VIDEO' })
      }
      if (this.$store.getters['video/smallVideoListGetters'].list.length === 0) {
        this.$store.dispatch('video/appendSmallVideoList', { type: this.$route.query.type, collegeId: this.$route.query.college })
      }
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.$store.commit('video/clearSmallVideoList')
      this.$store.dispatch('video/appendSmallVideoList', { type: newQuery.type, collegeId: newQuery.college, page: 1 })
    }
  },
  destroyed () {
    this.$store.commit('video/clearSmallVideoList')
  }
}
</script>
