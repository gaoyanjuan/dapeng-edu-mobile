<template>
  <div class="course-chapter-wrap">
    <div class="course-img-wrap">
      <img :src="blank" alt="课程封面" />
    </div>
    <div class="course-info-wrap">
      <div class="course-title">
        <div class="video-homework-warp">
          <img :src="videoHomework" alt="视频作业" />
        </div>
        <div class="course-name">影楼设计行业实战课影楼设计行业实战课</div>
      </div>
      <div class="teach-time">授课时间：2020.06.08 10:00</div>
      <div class="teacher-name">
        授课老师：付付老师
      </div>
    </div>
    <div class="submit-button-group">
      <div v-if="!submit" class="submit-button" @click="submitHomework">
        交作业
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
  data() {
    return {
      blank: require('@/assets/icons/square/video-posts-cover.png'),
      videoHomework: require('@/assets/icons/homework/video-homework.png'),
      hasSubmitImg: require('@/assets/icons/square/hotlists-unfollow.png'),
      submit: false,
      appPopParams: {
        show: false
      }
    }
  },
  methods: {
    submitHomework() {
      this.appPopParams.show = true
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
      margin: 4px 0;
      font-size: 14px;
      color: #75737e;
      font-family: @dp-font-regular;
    }
    .teacher-name {
      font-size: 14px;
      color: #75737e;
      font-family: @dp-font-regular;
    }
  }
  .submit-button-group {
    align-self: center;
    width: 46px;
    height: 24px;
    margin-left: 30px;
    .submit-button {
      width: 46px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #0cb65b;
      border-radius: 4px;
      font-size: 12px;
      color: #fff;
      font-family: @dp-font-regular;
    }
    .has-submit-button {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
