<template>
  <section v-if="courseDetail">
    <!-- 试学课章节 -->
    <m-trial-course-chapter v-if="type === 'TRIAL'" :chapter="courseDetail"/>
    
    <!-- 正式课章节 -->
    <m-formal-course-chapter v-else-if="type === 'VIP'" :chapter="courseDetail"/>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'Course',
  layout:'navbar',

  data: ()=> ({
    courseDetail: null
  }),

  computed: {
    ...mapGetters('course', [
      'courseDetailGetters'
    ]),

    type() {
      return this.$route.query.type
    },

    courseId() {
      return this.$route.query.courseId
    }
  },

  async asyncData ({route, store, error}) {
    if (route.query.type === 'TRIAL' && store.getters['course/chaptersListGetters'].length === 0) {
      await store.dispatch('course/appendTrialChapters', { courseId: route.query.courseId })
    }
  },

  async mounted() {
    if (this.courseDetailGetters) {
      this.courseDetail = this.courseDetailGetters
    }

    if(!this.courseDetail) {
      await this.appendCourseDetail(this.courseId).then(res => {
        this.courseDetail = res.data
      })
    }
  },
  methods:{
    ...mapActions('course', [
      'appendCourseDetail',
      'appendTrialChapters'
    ]),

    ...mapMutations('course', [
      'clearChaptersList'
    ])
  },

  beforeDestroy() {
    this.clearChaptersList()
  }
}
</script>
