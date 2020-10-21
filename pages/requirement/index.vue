<template>
  <div>
    <m-requirement-details />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:'Requirement',
  layout:'navbar',
  methods: {
    ...mapActions('homework', [
      'appendRequirementDetails',
      'appendRequirementList'
    ]),
  },
  async asyncData ({route, store, error}) {
    if (process.browser) return {
      isServiceload: false
    }
    try {
      await store.dispatch('homework/appendRequirementDetails', { id: route.query.taskId })
      await store.dispatch('homework/appendRequirementList', {
        page: 1,
        size: 10,
        taskId: route.query.taskId,
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
      this.$store.dispatch('homework/appendRequirementDetails', { id: this.$route.query.taskId })
      this.$store.dispatch('homework/appendRequirementList', {
        page: 1,
        size: 10,
        taskId: this.$route.query.taskId,
      })
    }
  }
}
</script>