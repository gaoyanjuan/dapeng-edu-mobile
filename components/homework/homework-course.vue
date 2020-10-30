<template>
  <div class="homework-course-wrap">
    <div class="course-img-wrap">
      <img :src="blank" alt="课程封面" />
    </div>
    <div class="course-info-wrap">
      <div class="course-title">
        <div class="course-college">短视频</div>
        <div class="course-name">影楼设计行业实战课</div>
      </div>
      <div class="teacher-homework-num">累计讲师布置：10份</div>
      <div class="student-homework-num">
        <span>我已上交：</span>
        <span class="success-num">0份</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blank: require('@/assets/icons/square/video-posts-cover.png')
    }
  }
}
</script>
<style lang="less" scoped>
.homework-course-wrap {
  display: flex;
  margin-bottom: 20px;
  .course-img-wrap {
    width: 108px;
    height: 73px;
    border-radius: 4px;
    margin-right: 12px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .course-info-wrap {
    .course-title {
      display: flex;
      align-items: center;
      .course-college {
        padding: 0 6px 0 7px;
        background: rgba(12, 182, 91, 0.1);
        border-radius: 9px;
        font-size: 12px;
        font-weight: 500;
        color: #0cb65b;
      }
      .course-name {
        max-width: 160px;
        font-size: 14px;
        color: #383640;
        font-weight: 600;
        margin-left: 4px;
        line-height: 12px;
        .text-ellipsis();
      }
    }
    .teacher-homework-num {
      margin-top: 10px;
      margin-bottom: 15px;
      font-size: 13px;
      color: #75737e;
    }
    .student-homework-num {
      font-size: 13px;
      color: #75737e;
      .success-num {
        color: #00b93b;
      }
    }
  }
}
</style>
