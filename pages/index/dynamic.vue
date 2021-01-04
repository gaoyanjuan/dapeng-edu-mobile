<template>
  <m-dynamic />
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  // async asyncData ({route, store, error}) {
  //   if (process.browser) return {
  //     isServiceload: false
  //   }
  //   try {
  //     if (route.query.type === 'new') {
  //       if (store.getters['dynamic/newDynamicListGetters'].list.length === 0) {
  //         await store.dispatch('dynamic/appendNewDynamicList', {})
  //       }
  //     } else if (route.query.type === 'hot') {
  //       if (store.getters['dynamic/hotDynamicListGetters'].list.length === 0) {
  //         await store.dispatch('dynamic/appendHotDynamicList', {})
  //       }
  //     } else {
  //       if (store.getters['dynamic/newDynamicListGetters'].list.length === 0) {
  //         await store.dispatch('dynamic/appendNewDynamicList', {})
  //       }
  //     }
  //   } catch (err) {
  //     error({ statusCode: err.data.code, message: err.data.message })
  //   }
  // },
  created () {
    if (process.browser) {
      try {
        if(this.$store.getters['banner/lifeBannerListGetters'].length === 0) {
          this.$store.dispatch('banner/appendBannerList', { channel: 'LIFE' })
        }
        if (this.$route.query.type === 'new') {
          if (this.$store.getters['dynamic/newDynamicListGetters'].list.length === 0) {
            this.$store.dispatch('dynamic/appendNewDynamicList', {})
          }
        } else if (this.$route.query.type === 'hot') {
          if (this.$store.getters['dynamic/hotDynamicListGetters'].list.length === 0) {
            this.$store.dispatch('dynamic/appendHotDynamicList', {})
          }
        } else {
          if (this.$store.getters['dynamic/hotDynamicListGetters'].list.length === 0) {
            this.$store.dispatch('dynamic/appendHotDynamicList', {})
          }
        }
      } catch (error) {}
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearNewDynamicList()
      this.clearHotDynamicList()
      if (newQuery.type === 'new') {
        if (this.newDynamicListGetters.list.length === 0) {
          this.appendNewDynamicList({})
        }
      } else if (newQuery.type === 'hot') {
        if (this.hotDynamicListGetters.list.length === 0) {
          this.appendHotDynamicList({})
        }
      }
    }
  },
  methods: {
    ...mapActions('dynamic', [
      'appendNewDynamicList',
      'appendHotDynamicList'
    ]),
    ...mapMutations('dynamic', [
      'clearNewDynamicList',
      'clearHotDynamicList'
    ])
  },
  computed:{
    ...mapGetters('dynamic', [
      'newDynamicListGetters',
      'hotDynamicListGetters'
    ])
  },
  beforeRouteLeave (to, from, next) {
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.clearNewDynamicList()
      this.clearHotDynamicList()
    }
    next()
  }
}
</script>
