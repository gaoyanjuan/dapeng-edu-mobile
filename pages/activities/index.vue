<template>
  <div>
    <m-activities />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:'activities',
  async asyncData ({route, store, error}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      await store.dispatch('activities/appendActivities', {
        linkContentTypes: 'ACTIVITY_POST,WORKS,HOMEWORK,LIFE',
        page: 1,
        size: 10
      })
      return {
        isServiceload: true
      }
    } catch (err) {
      error({ statusCode: err.data.code, message: err.data.message })
    }
  },
  created () {
    if (process.browser && !this.isServiceload) {
      this.$store.dispatch('activities/appendActivities', {
        linkContentTypes: 'ACTIVITY_POST,WORKS,HOMEWORK,LIFE',
        page: 1,
        size: 10
      })
    }
  }
}
</script>