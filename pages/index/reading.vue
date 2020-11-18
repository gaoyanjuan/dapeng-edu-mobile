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
      if (this.$store.getters['colleges/readingCollegesGetters'].length === 1) {
        this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_ARTICLE' })
      }
      if (this.$store.getters['reading/readingListGetters'].list.length === 0) {
        this.$store.dispatch('reading/appendReadingList', { collegeId: this.$route.query.college, page: 1 })
      }
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearReadingList()
      this.appendReadingList({ collegeId: newQuery.college, page: 1 })
    }
  },
  destroyed () {
    this.clearReadingList()
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
