<template>
  <div v-if="courseDetail">
    <!-- 试学课章节 -->
    <template v-if="isOpenCourse">
      <m-trial-course-chapter v-if="type === 'TRIAL'" :chapter="courseDetail"/>
    
      <!-- 正式课章节 -->
      <m-formal-course-chapter v-else-if="type === 'VIP'" :chapter="courseDetail"/>
    </template>
    <template v-else>
      <not-have-course :courseInfo="courseDetail" />
    </template>
  </div>
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
    if(store.getters['user/userInfoGetters'] && store.getters['user/userInfoGetters'].userId) {
      // 试学课查询章节失败,说明用户没有课程权限
      if (route.query.type === 'TRIAL' && store.getters['course/chaptersListGetters'].length === 0) {
        try {
          await store.dispatch('course/appendTrialChapters', { courseId: route.query.courseId })
          return {
            isOpenCourse: true
          }
        } catch (error) {
          return {
            isOpenCourse: false
          }
        }
      } else {
        // 正式课查询接口,查看用户是否拥有课程权限
        const res = await store.dispatch('course/isOpenCourse', { courseId: route.query.courseId })
        if (res && res.data) {
          return {
            isOpenCourse: true
          }
        } else {
          return {
            isOpenCourse: false
          }
        }
      }
    }
  },

  async mounted() {
    if(!this.$login()) return
    
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
