<template>
  <m-homework />
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  // async asyncData ({route, store, error}) {
  //   if (process.browser) return {
  //     isServiceload: false
  //   }
  //   try {
  //     if (store.getters['colleges/taskCollegesGetters'].length === 0) {
  //       await store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_TASK' })
  //     }
  //     if (store.getters['homework/homeworkListGetters'].list.length === 0) {
  //       await store.dispatch('homework/appendHomeworkList', { categoryIds: route.query.college, courseType: route.query.courseType, page: 1 })
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
        if(this.$store.getters['banner/homeworkBannerListGetters'].length === 0) {
          this.$store.dispatch('banner/appendBannerList', { channel: 'HOMEWORK' })
        }
        // if(this.$store.getters['topic/homeworkGetters'].list.length === 0) {
        //   this.$store.dispatch('topic/appendTopicList', {page : 1 ,topicType: 'HOMEWORK' })
        // }
        if (this.$store.getters['colleges/taskCollegesGetters'].length === 1) {
          this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_TASK' })
        }
        if (this.$store.getters['colleges/squareTaskTrialCollegesGetters'].length === 1) {
          this.$store.dispatch('colleges/appendColleges', { collegeType : 'SQUARE_TASK_TRIAL' })
        }
        if (this.$store.getters['homework/homeworkListGetters'].list.length === 0) {
          this.$store.dispatch('homework/appendHomeworkList', { categoryIds: this.$route.query.college, courseType: this.$route.query.courseType, page: 1 })
          // this._squareLoading({ page_area: '作业', page_area_sec:'全部', request_type: '进入页面加载'})
        }
      } catch (error) {}
    }
  },
  watch: {
    '$route.query': function (newQuery, oldQuery) {
      this.clearHomeworkList()
      this.appendHomeworkList({ categoryIds: newQuery.college, courseType: newQuery.courseType, page: 1 })
    }
  },
  beforeRouteLeave (to, from, next) {
    const isDetails =  this.$isDetails(to.name)
    if (!isDetails) {
      this.clearHomeworkList()
    }
    next()
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
