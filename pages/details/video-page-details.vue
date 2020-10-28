<template>
  <div>
    <!-- Header Block -->
    <m-navbar :title="$route.query.type === 'small'? '小视频详情':'视频详情'" />

    <!-- Player Block -->
    <div class="video-posts-player">
      <div id="player"></div>
    </div>
    
    <!-- Body Block -->
    <section class="video-posts-details-wrap">
      <m-avatar avatar-style="width:40px; height:40px;"/>

      <div class="video-posts-content">
        陪我跨年的恐怕只有学习和心中那一缕对优中那一缕
      </div>

      <div class="video-posts-label">视频</div>
    </section>

    <!-- Footer Block -->
    <section class="video-posts-comment-wrap">
      <m-tabs>
        <m-tab-item :selected="commentSelected" name="评论" :count="0">
          <!-- <m-comment-list /> -->
        </m-tab-item>
        <m-tab-item :selected="likeSelected" name="喜欢" :count="0">
          <!-- <m-like-list /> -->
        </m-tab-item>
      </m-tabs>
    </section>

  </div>
</template>

<script>
export default {
  name:'Video-Page-Details',
  layout:'navbar',
  data:() => ({
    player: null,
    commentSelected: true,
    likeSelected: false
  }),
  created () {
    if (this.$route.query.type && this.$route.query.type === 'like') {
      this.likeSelected = true
      this.commentSelected = false
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.player = polyvPlayer({
        wrap: '#player',
        width: '100%',
        height: '211px',
        vid: '88083abbf5bcf1356e05d39666be527a_8'
      })
    })
  }
}
</script>

<style lang="less" scoped>

/deep/ .pv-video-player {
  height: 221px !important;
  width: 375px !important;
}

.video-posts-player {
  margin-top: 44px;
}

.video-posts-comment-wrap {
  padding: 16px;
}

.video-posts-details-wrap {
  width: 100%;
  padding: 16px;
  background-color: @dp-white;
  border-bottom: 15px solid #F8F8F8;
}

.video-posts-content {
  width: 100%;
  min-height: 28px;
  font-size: 20px;
  font-family: @semibold;
  font-weight: 600;
  color: #18252C;
  line-height: 28px;
  margin-top: 16px;
}

.video-posts-label {
  width: 40px;
  height: 24px;
  background: #F7F7F7;
  border-radius: 12px;

  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #465156;
  line-height: 24px;
  margin-top: 16px;
  text-align: center;
}
</style>