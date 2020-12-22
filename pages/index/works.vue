<template>
  <m-works />
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'Works',
  // async asyncData ({route, store, error}) {
  //   if (process.browser) return {
  //     isServiceload: false
  //   }
  //   try {
  //     if (store.getters['colleges/workCollegesGetters'].length === 1) {
  //       await store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_WORK' })
  //     }
  //     if (store.getters['work/workListGetters'].list.length === 0) {
  //       await store.dispatch('work/appendWorkList', { categoryIds: route.query.college, page: 1 })
  //     }
  //     return {
  //       isServiceload: true
  //     }
  //   } catch (err) {
  //     error({ statusCode: err.data.code, message: err.data.message })
  //   }
  // },
  created () {
    if (process.browser) {
      try {
        if(this.$store.getters['banner/worksBannerListGetters'].length === 0) {
          this.$store.dispatch('banner/appendBannerList', { channel: 'WORKS' })
        }
        if (this.$store.getters['colleges/workCollegesGetters'].length === 1) {
          this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_WORK' })
        }
        if (this.$store.getters['work/workListGetters'].list.length === 0) {
          this.$store.dispatch('work/appendWorkList', { categoryIds: this.$route.query.college, page: 1 })
        }
      } catch (error) {}
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearWorkList()
      this.appendWorkList({ categoryIds: newQuery.college, page: 1 })
    }
  },
  beforeRouteLeave (to, from, next) {
    // 如果进入详情,就不清除数据
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.clearWorkList()
    }
    next()
  },
  methods:{
    ...mapActions('work', [
      'appendWorkList'
    ]),
    ...mapMutations('work', [
      'clearWorkList'
    ])
  }
}
</script>
