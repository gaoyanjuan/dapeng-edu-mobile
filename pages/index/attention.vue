<template>
  <m-follow />
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  // async asyncData ({route, store}) {
  //   if (process.browser) return {
  //     isServiceload: false
  //   }
  //   try {
  //     if (store.getters['attention/popularUsersGetters'].length === 0) {
  //       await store.dispatch('attention/appendPopularUsers', { count: 5 })
  //     }
  //     if (store.getters['attention/attentionListGetters'].list.length === 0) {
  //       await store.dispatch('attention/appendAttentionList', { page: 1 })
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
        this.$store.dispatch('attention/appendPopularUsers', { count: 5 })
        if(this.$store.getters['user/userInfoGetters']) {
          this.$store.dispatch('attention/queryFollowing', {id: process.env.global.dpUserId}).then(() => {
            this.$store.dispatch('attention/appendAttentionList', { page: 1 })
          })
        } else {
          this.$store.dispatch('attention/appendAttentionList', { page: 1 })
        }
      } catch (error) {}
    }
  },
  methods: {
    ...mapMutations('attention', [
      'clearAttentionLiAst'
    ])
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearAttentionLiAst()
      if(this.$store.getters['user/userInfoGetters']) {
          this.$store.dispatch('attention/queryFollowing', {id: process.env.global.dpUserId}).then(() => {
            this.$store.dispatch('attention/appendAttentionList', { page: 1 })
          })
        } else {
          this.$store.dispatch('attention/appendAttentionList', { page: 1 })
        }
    }
  },
  destroyed() {
    this.clearAttentionLiAst()
  }
}
</script>
