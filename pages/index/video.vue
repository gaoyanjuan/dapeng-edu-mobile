<template>
  <m-video />
</template>

<script>
export default {
  async asyncData ({route, store}) {},
  created () {
    if (process.browser) {
      try {
        if (this.$store.getters['colleges/videoCollegesGetters'].length === 1) {
          this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_MOVIE' })
        }
        if (this.$store.getters['video/videoListGetters'].list.length === 0) {
          this.$store.dispatch('video/appendVideoList', { collegeId: this.$route.query.college, page: 1 })
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
  destroyed () {
    this.$store.commit('video/clearVideoList')
  },
}
</script>
