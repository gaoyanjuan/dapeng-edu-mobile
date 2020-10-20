<template>
  <div>
    <m-homework />
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
      if (store.getters['colleges/taskCollegesGetters'].length === 0) {
        await store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_TASK' })
      }
      if (store.getters['homework/homeworkListGetters'].list.length === 0) {
        await store.dispatch('homework/appendHomeworkList', { categoryIds: route.query.college, courseType: route.query.courseType, page: 1 })
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
      if (this.$store.getters['colleges/taskCollegesGetters'].length === 0) {
        this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_TASK' })
      }
      if (this.$store.getters['homework/homeworkListGetters'].list.length === 0) {
        this.$store.dispatch('homework/appendHomeworkList', { categoryIds: this.$route.query.college, courseType: this.$route.query.courseType, page: 1 })
      }
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearHomeworkList()
      this.appendHomeworkList({ categoryIds: newQuery.college, courseType: newQuery.courseType, page: 1 })
    }
  },
  destroyed () {
    this.clearHomeworkList()
  },
  methods:{
    ...mapActions('homework', [
      'appendHomeworkList'
    ]),
    ...mapMutations('homework', [
      'clearHomeworkList'
    ])
  }
}
</script>
