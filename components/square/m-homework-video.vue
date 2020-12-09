<template>
  <div class="homework-video-wrap" @click="toDetail">
    <img class="video-img" :src="videoImg || defaultImg" @error="$errorImg()" alt="作业视频封面图">
    <img class="video-play-img" :src="videoPlay" alt="视频播放按钮">
  </div>  
</template>
<script>
export default {
  props: {
    videoImg:{
      type: String,
      require: true,
      default: null
    }
  },
  data() {
    return {
      videoPlay: require('@/assets/icons/posts/video-play.png'),
      defaultImg: require('@/assets/icons/common/photos-bg.png'),
    }
  },

  methods:{
    toDetail() {
      this.$emit('toDetail')
    }
  }
}
</script>
<style lang="less" scoped>
.homework-video-wrap {
  position: relative;
  width: 227px;
  height: 302px;
  .video-img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
  .video-play-img {
    width: 60px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
  
</style>
