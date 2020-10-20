<template>
  <div>
    <m-growth />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  async asyncData ({route, store}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      if (route.query.type) {
        await store.dispatch('growth/appendGrowthList', { type: route.query.type, page: 1 })
      } else {
        await store.dispatch('growth/appendGrowthList', { type: 'HOTTEST', page: 1 })
      }
      return {
        isServiceload: true
      }
    } catch (error) {
      error({ statusCode: error.data.code, message: error.data.message })
    }
  },
  created () {
    if (process.browser && !this.isServiceload) {
      if (this.$route.query.type) {
        this.$store.dispatch('growth/appendGrowthList', { type: this.$route.query.type, page: 1 })
      } else {
        this.$store.dispatch('growth/appendGrowthList', { type: 'HOTTEST', page: 1 })
      }
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
  destroyed () {
    this.clearGrowthList()
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
