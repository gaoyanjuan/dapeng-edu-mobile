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
        if (this.$store.getters['recommend/recommendListGetters'].list.length === 0) {
          this.$store.dispatch('recommend/appendRecommendList', { page : 1 })
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
  destroyed () {
    // this.clearRecommendList()
  },
}
</script>
