<template>
  <m-growth />
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  // async asyncData ({route, store, error}) {
  //   if (process.browser) return {
  //     isServiceload: false
  //   }
  //   try {
  //     if (route.query.type) {
  //       await store.dispatch('growth/appendGrowthList', { type: route.query.type, page: 1 })
  //     } else {
  //       await store.dispatch('growth/appendGrowthList', { type: 'HOTTEST', page: 1 })
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
        if(this.$store.getters['banner/postBannerListGetters'].length === 0) {
          this.$store.dispatch('banner/appendBannerList', { channel: 'POST' })
        }
        if (this.$route.query.type) {
          this.$store.dispatch('growth/appendGrowthList', { type: this.$route.query.type, page: 1 })
        } else {
          this.$store.dispatch('growth/appendGrowthList', { type: 'HOTTEST', page: 1 })
        }
      } catch (error) {}
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      if (newQuery.type) {
        this.clearGrowthList()
        this.appendGrowthList({ type: newQuery.type, page: 1 })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.clearGrowthList()
    }
    next()
  },
  methods: {
    ...mapActions('growth', [
      'appendGrowthList'
    ]),
    ...mapMutations('growth', [
      'clearGrowthList'
    ])
  }
}
</script>
