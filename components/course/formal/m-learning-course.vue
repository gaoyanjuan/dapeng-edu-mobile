<template>
  <div class="learning-course-wrapper" @click="onEnterCourseChapter">

    <!-- 当前在学课程封面图 -->
    <div class="course-cover-row">
      <img class="cover" :src="course.coverImage" alt="cover" />
      <div class="cover-footer">
        <span class="teacher-name"> 讲师：{{course.teacher.nickname}} </span>
        <span class="course-view"> {{course.totalStudent | studentsCount}} 在看</span>
      </div>
    </div>

    <!-- 当前在学课程标题 -->
    <div class="course-title-row">
      <span class="label"></span>
      {{course.title}}
      <span class="stage"> ({{ course.stage.title }}) </span>
    </div>

    <!-- 当前在学课程章节 -->
    <div class="course-chapters-row" v-if="course.liveChapters.length > 0">
      <div class="chapter" v-for="item in course.liveChapters" :key="item.id" @click.stop="enterLiveRoom(item)">
        <div class="left-side-wrap">
          <span class="chapter-title van-ellipsis">{{item.title}}</span>
          <span class="chapter-date">{{ item.startTime | formatLiveTime(item.finishTime) }}</span>
        </div>

        <div class="right-side-wrap">
          <img v-if="item.liveStatus === 'UNSTART'" class="living-status" :src="unstart" />
          <img v-else-if="item.liveStatus === 'SOON_START'" class="living-status" :src="living" />
          <img v-else-if="item.liveStatus === 'LIVING'" class="living-status" :src="living" />
          <img v-else-if="item.liveStatus === 'FINISH'" class="living-status" :src="end" />
          <img v-else-if="item.liveStatus === 'PLAYBACK'" class="living-status" :src="playback" />
          <img class="living-enter" :src="enter" alt="enter"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Learning-Course',

  props:{
    course:{
      type: Object,
      default: {}
    }
  },

  computed:{
    courseUrl() {
      return this.validateSystemHostName().COURSE_HOST 
    },
  },

  data: () => ({
    unstart: require('@/assets/icons/course/unstart.png'),
    end: require('@/assets/icons/course/end.png'),
    living: require('@/assets/icons/course/living.png'),
    playback: require('@/assets/icons/course/playback.png'),
    enter: require('@/assets/icons/course/more.png')
  }),

  methods: {
    enterLiveRoom(params) {
      if(params.liveStatus === 'UNSTART') {
        let time = this.formatTime(params.startTime)
        this.$toast(`直播开始时间：${time}`)

      } else if (params.liveStatus === 'FINISH') {
        this.$toast('当前直播已结束')

      } else if (params.liveStatus === 'PLAYBACK'){
        const url = `/secure/course/playback?courseId=${this.course.id}&stageId=${this.course.stage.id}&v=${params.videoContent.vid}&cid=${params.id}`
        window.location.href = this.courseUrl + url
      
      } else {
        window.location.href = `${this.courseUrl}/secure/course/${this.course.id}/live/${params.id}`
      }
    },

     // 进入课程章节列表
    onEnterCourseChapter() {
      
      if(this.course.openStatus === 'UNCONFIRMED') {
        this.$toast('页面加载异常，请稍后～')
        return false 
      }

      this.$router.push({
        path: '/details/course',
        query:{ 
          type: this.course.type,
          courseId: this.course.id
        }
      })
    },

    formatTime(time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style lang="less" scoped>

.learning-course-wrapper {
  margin-bottom: 12px;
}

.learning-course-wrapper .course-cover-row {
  width: 375px;
  height: 253px;
  position: relative;

  .cover {
    width: 375px;
    height: 253px;
    object-fit: cover;
  }

  .cover-footer {
    width: 375px;
    height: 36px;
    position: absolute;
    bottom: 0;
    padding-left: 16px;
    padding-right: 16px;

    font-size: 12px;
    font-family: @medium;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 36px;

    background: rgba(0, 0, 0, 0.2);
    .l-flex-row();
  }
}

.learning-course-wrapper .course-title-row {
  width: 375px;
  min-height: 40px;
  padding: 16px;
  font-size: 18px;
  font-family: @medium;
  font-weight: 600;
  color: #18252C;
  background: @dp-white;
  border-bottom: 1px solid #F7F7F7;

  .stage {
    font-size: 12px;
  }

  .label {
    width: 56px;
    height: 20px;
    display: inline-block;
    background-image: url('~@/assets/icons/course/learing.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: text-top;
  }
}

.learning-course-wrapper .chapter { 
  width: 375px;
  height: 61px;
  padding: 10px 16px;
  background: #ffffff; 
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:active {
    background: #f3f3f3;
  }
}

.chapter .left-side-wrap {
  display: flex;
  flex-direction: column;

  .chapter-title {
    width: 230px;
    height: 20px;
    font-size: 14px;
    font-family: @medium;
    font-weight: 500;
    color: #465156;
  }

  .chapter-date {
    width: auto;
    height: 17px;
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #A3A8AB;
    margin-top: 4px;
  }
}

.chapter .right-side-wrap {
  display: flex;
  align-items: center;

  .living-status {
    width: 32px;
    height: 15px;
  }

  .living-enter {
    width: 24px;
    height: 24px;
  }
}
</style>
