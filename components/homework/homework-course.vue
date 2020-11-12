<template>
  <div class="homework-course-wrap">
    <div class="course-img-wrap">
      <img v-if="!course.coverImg.length" :src="blank" alt="课程封面" />
      <img v-else v-lazy="course.coverImg[0]" alt="课程封面" />
    </div>
    <div class="course-info-wrap">
      <div class="course-title">
        <div class="course-college">{{ course.college | filterCollageName }}</div>
        <div class="course-name"> {{ course.title }} </div>
      </div>
      <div class="teacher-homework-num">累计讲师布置：{{ course.published }}份</div>
      <div class="student-homework-num">
        <span>我已上交：</span>
        <span class="success-num">{{ course.submit }}份</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    course:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      blank: require('@/assets/icons/common/photos-bg.png')
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
      object-fit: cover;
    }
  }
  .course-info-wrap {
    display: flex;
    flex-direction: column;
    height: 73px;
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
        font-family: @dp-font-medium;
      }
      .course-name {
        max-width: 160px;
        font-size: 14px;
        color: #383640;
        font-weight: 600;
        margin-left: 4px;
        font-family: @dp-font-medium;
        .text-ellipsis();
      }
    }
    .teacher-homework-num {
      margin-top: 10px;
      margin-bottom: 13px;
      font-size: 13px;
      color: #75737e;
      font-family: @dp-font-regular;
    }
    .student-homework-num {
      font-size: 13px;
      color: #75737e;
      font-family: @dp-font-regular;
      .success-num {
        color: #00b93b;
      }
    }
  }
}
</style>
