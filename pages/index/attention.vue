<template>
  <m-follow />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  async asyncData ({route, store}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      if (store.getters['attention/popularUsersGetters'].length === 0) {
        await store.dispatch('attention/appendPopularUsers', { count: 5 })
      }
      if (store.getters['attention/attentionListGetters'].list.length === 0) {
        await store.dispatch('attention/appendAttentionList', { page: 1 })
      }
      return {
        isServiceload: true
      }
    } catch (err) {
      console.log(err)
    }
  },
  created () {
    if (this.$store.getters['attention/popularUsersGetters'].length === 0) {
      this.$store.dispatch('attention/appendPopularUsers', { count: 5 })
    }
    if (this.$store.getters['attention/attentionListGetters'].list.length === 0) {
      this.$store.dispatch('attention/appendAttentionList', { page: 1 })
    }
  },
}
</script>
