<template>
  <div class="course-card" v-if="!learnStatus" @click="onEnterCourseChapter">
    <div class="course-info-row">

      <img class="course-photo" v-lazy="course.coverImage || defaultImg" alt="course" />
      
      <div class="course-info">

        <div class="course-info-title">
          <img class="live-label" :src="live_label" v-if="showLive"/>
          <span class="title van-ellipsis">{{ course.title }}</span>
        </div>

        <div class="course-live-date" v-if="showLive">
          直播：{{course.liveChapters[0].startTime | formatLiveTime(course.liveChapters[0].finishTime)}}
        </div>

        <div class="course-info-teacher">
          <span v-if="showLive" class="teacher">讲师：{{ course.teacher.nickname }}</span>
          <span v-if="showLive" class="counter">{{ course.count | studentsCount }}人在看</span>
          <span v-else class="counter">{{ course.totalStudent | studentsCount }}人看过</span>
        </div>
      </div>
    </div>

    <div class="course-line-row" v-if="showLive"></div>

    <div class="course-live-row" v-if="showLive">
      <span class="live-title van-ellipsis">{{ course.liveChapters[0].title }}</span>
      <div class="live-btn" @click.stop="onEnterLiveRoom">进入直播间</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name:'M-Course',

  props:{
    course:{
      type:Object,
      default:{}
    }
  },
  
  data: ()=> ({
    live_label: require('@/assets/icons/course/living.png'),
    defaultImg: require('@/assets/icons/common/course-bg.png'),
  }),

  computed:{
    // 当前在学状态
    learnStatus: function() {
      return this.course.learning
    },
    // 当前直播状态
    showLive:function() {
      return this.course.liveChapters.length
    },
    // 课程URL
    courseUrl() {
      return this.validateSystemHostName().COURSE_HOST
    }
  },

  methods:{
    ...mapMutations('course', [
      'addCourseDetail'
    ]),

    // 进入直播间逻辑~~~~
    onEnterLiveRoom() {
      const chapterId = this.course.liveChapters[0].id
      if (this.course.courseType === 'TRIAL') {
        window.location.href = `${this.courseUrl}/secure/course/trial/${this.course.id}/live/${chapterId}`
      } else {
        window.location.href = `${this.courseUrl}/secure/course/${this.course.id}/live/${chapterId}`
      }
    },

    // 进入课程章节列表
    onEnterCourseChapter() {
      
      if(this.course.openStatus === 'UNCONFIRMED') {
        this.$toast('页面加载异常，请稍后～')
        return false 
      }

      this.addCourseDetail(this.course)

      this.$store.commit('changeListData', {
        listType: 'course',
        anchorId: this.course.id
      })
      
      this.$router.push({
        path: '/details/course',
        query:{ 
          type: this.course.type,
          courseId: this.course.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

.course-card {
  width: 375px;
  max-height: 157px;
  padding: 16px;
  background: #FFFFFF;
}

.course-card:not(:first-child) {
  margin-top: 12px;
}

.course-card .course-info-row {
  width: 100%;
  display: flex;
  align-items: center;

  .course-photo {
    width: 100px;
    height: 67px;
    border-radius: 4px;
    object-fit: cover;
  }

  .course-info {
    width: 235px;
    height: 67px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 6px;
  }

  .course-info .course-info-title {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;

    .live-label {
      width: 47px;
      height: 15px;
      margin-right: 6px;
    }

    .title {
      max-width: 182px;
      font-size: 14px;
      font-family: @medium;
      font-weight: 600;
      color: #18252C;
      line-height: 20px;
    }
  }

  .course-info .course-live-date {
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #A3A8AB;
    line-height: 17px;
  }

  .course-info .course-info-teacher {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .teacher,
    .counter {
      font-size: 12px;
      font-family: @regular;
      font-weight: 400;
      color: #A3A8AB;
    }
  }
}

.course-card .course-line-row {
  height: 1px;
  background: #F7F7F7;
  margin-top: 15px;
}

.course-card .course-live-row {
  width: 100%;
  height: 28px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .live-title {
    max-width: 250px;
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #18252C;
    line-height: 17px;
  }

  .live-btn {
    width: 80px;
    height: 28px;
    font-size: 12px;
    font-family: @medium;
    font-weight: 600;
    color: #0CB65B;
    background: rgb(209, 250, 222);
    border-radius: 17px;
    text-align: center;
    line-height: 28px;
  }
}
</style>