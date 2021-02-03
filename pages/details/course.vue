<template>
  <div v-if="courseDetail">
    <template v-if="isOpenCourse">
      <!-- 解决页面加载失败问题,通过改变dom树引起页面重新渲染 -->
      <div class="show-div" v-if="showDiv"></div>
      <!-- 试学课章节 -->
      <m-trial-course-chapter v-if="type === 'TRIAL'" :chapter="courseDetail"/>
    
      <!-- 正式课章节 -->
      <m-formal-course-chapter v-else-if="type === 'VIP'" :chapter="courseDetail" :show-record="record"/>

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
    record: true,
    showDiv: false,
    isOpenCourse: true,
    courseDetail: null
  }),

  computed: {

    ...mapGetters('course',[
      'chaptersListGetters'
    ]),

    type() {
      return this.$route.query.type
    },

    courseId() {
      return this.$route.query.courseId
    }
  },

  async mounted() {
    if(!this.$login()) return

     // 试学课查询章节失败,说明用户没有课程权限
    if (this.type === 'TRIAL' && this.chaptersListGetters.length === 0) {
      try {
        await this.appendTrialChapters({ courseId: this.courseId })
      } catch (error) {
        this.isOpenCourse = false
      }

      await this.appendCourseDetail(this.courseId).then(res => {
        this.courseDetail = res.data
      })

    } else {

      const res = await this.appendCourseDetail(this.courseId)
      this.courseDetail = res.data

      if(this.courseDetail.openStatus === 'UNCONFIRMED') {
        this.$router.replace('/empty')
        return
      }

      // 正式课查询接口,查看用户是否拥有课程权限
      const result = await this.checkOpenCourse({ courseId: this.courseId })
      if (result && !result.data) {
        this.isOpenCourse = false
      }
    }

    try {
      // 查看是否存在录播
      await this.appendRecordChapters({page: 1, courseId: this.courseId }).then(res => {
        // 只做查询，清空store
        // this.clearRecordChapter()
        
        if(!res.data.courseVodContents.length) {
          this.record = false
        }
      })
    } catch (error) {
      this.isOpenCourse = false
    }

    // 解决页面加载失败问题,通过改变dom树引起页面重新渲染
    setTimeout(() => {
      this.showDiv = true
    }, 500)
  },
  methods:{
    ...mapActions('course', [
      'appendCourseDetail',
      'appendTrialChapters',
      'appendRecordChapters',
      'checkOpenCourse'
    ]),

    ...mapMutations('course', [
      'clearChaptersList',
      'clearRecordChapter'
    ])
  },

  beforeDestroy() {
    this.clearChaptersList()
  }
}
</script>

<style lang="less" scoped>
.show-div {
  height: 1px;
}
</style>