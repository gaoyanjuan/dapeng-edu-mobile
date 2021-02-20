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
        if(this.$store.getters['banner/attentionBannerListGetters'].length === 0) {
          this.$store.dispatch('banner/appendBannerList', { channel: 'ATTENTION' })
        }
        if (this.$store.getters['attention/popularUsersGetters'].length === 0) {
          this.$store.dispatch('attention/appendPopularUsers', { count: 5 })
          // this._squareLoading({ page_area: '关注', page_area_sec:'', request_type: '进入页面加载'})
        }
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
      'clearAttentionLiAst',
      'clearPopularUsers'
    ])
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearAttentionLiAst()
      this.clearPopularUsers()
      if(this.$store.getters['user/userInfoGetters']) {
        this.$store.dispatch('attention/queryFollowing', {id: process.env.global.dpUserId}).then(() => {
          this.$store.dispatch('attention/appendAttentionList', { page: 1 })
        })
      } else {
        this.$store.dispatch('attention/appendAttentionList', { page: 1 })
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.clearAttentionLiAst()
      this.clearPopularUsers()
    }
    next()
  }
}
</script>
