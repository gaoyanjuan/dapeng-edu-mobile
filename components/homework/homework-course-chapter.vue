<template>
  <div class="course-chapter-wrap">
    <div class="course-img-wrap">
      <img v-lazy="chapter.coverImg ? chapter.coverImg[0] : blank" alt="课程封面" />
    </div>
    <div class="course-info-wrap">
      <div class="course-title">
        <div v-if="chapter.jobType === 'VIDEO'" class="video-homework-warp">
          <img :src="videoHomework" alt="视频作业" />
        </div>
        <div class="course-name"> {{ chapter.title }} </div>
      </div>
      <div class="teach-time">授课时间：{{chapter.teachTime | requireDataH5 }}</div>
      <div class="teacher-name">
        授课老师：{{  chapter.teachNickname }}
      </div>
    </div>
    <div class="submit-button-group" @click="submitHomework">
      <div v-if="!chapter.isSubmit" class="submit-button">
        <img :src="submitImg" />
      </div>
      <div v-else class="has-submit-button">
        <img :src="hasSubmitImg" alt="" />
      </div>
    </div>
    <!-- 去app发布弹窗 -->
    <m-app-submit :appPopParams="appPopParams"></m-app-submit>
  </div>
</template>
<script>
export default {
  props: {
    chapter: {
      type: Object,
      default: function(){}
    }
  },
  data() {
    return {
      blank: require('@/assets/icons/common/photos-bg.png'),
      videoHomework: require('@/assets/icons/homework/video-homework.png'),
      hasSubmitImg: require('@/assets/icons/homework/has-submit-homework.png'),
      submitImg: require('@/assets/icons/homework/submit-homework.png'),
      appPopParams: {
        show: false
      }
    }
  },
  methods: {
    submitHomework() {
      if(this.chapter.jobType === 'VIDEO') {
        this.appPopParams.show = true
        return false
      }
      this.$router.push({
        path: '/requirement',
        query: {
          taskId: this.chapter.taskId,
          type: this.$route.query.courseType
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.course-chapter-wrap {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #eeeeee;
  .course-img-wrap {
    width: 70px;
    height: 70px;
    border-radius: 4px;
    margin-right: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .course-info-wrap {

    width: 190px;

    .course-title {
      display: flex;
      align-items: center;
      .video-homework-warp {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
      .course-name {
        max-width: 160px;
        font-size: 16px;
        color: #383640;
        font-weight: 600;
        margin-left: 3px;
        font-family: @dp-font-medium;
        .text-ellipsis();
      }
    }
    .teach-time {
      max-width: 190px;
      height: 20px;
      margin: 4px 0;
      font-size: 14px;
      color: #75737e;
      font-family: @dp-font-regular;
      .text-ellipsis();
    }
    .teacher-name {
      max-width: 180px;
      font-size: 14px;
      color: #75737e;
      font-family: @dp-font-regular;
      .text-ellipsis();
    }
  }
  .submit-button-group {
    align-self: center;
    width: 46px;
    height: 24px;
    margin-left: 30px;
    .submit-button,
    .has-submit-button {
      img {
        width: 46px;
        height: 24px;
        vertical-align: text-top;
      }
    }
  }
}
</style>
