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

    <!-- 底部评论框 -->
    <div class="details-footer-comment-wrap">
      <div class="footer-input" @click="openComment"> 留下你的评论吧 </div>
      <img class="footer-icon-like" :src="like" alt="like" @click="onLikeEvent"/>
      <img class="footer-icon-comment" :src="comment" alt="comment" @click="commentPop.show = true"/>
      <img class="footer-icon-collect" :src="collect" alt="collect" @click="onCollectEvent"/>
    </div>

    <!-- 评论框弹层 -->
    <m-comment-popup :comment="commentPop" @sendComment="sendComment"/>

  </div>
</template>

<script>
export default {
  name:'Video-Page-Details',
  layout:'navbar',
  data:() => ({
    player: null,
    commentSelected: true,
    likeSelected: false,
    commentPop: { show: false },
    comment: require('@/assets/icons/posts/posts-comment.png'),
    like: require('@/assets/icons/posts/posts-love.png'),
    collect: require('@/assets/icons/posts/posts-star.png'),
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
  },
  methods:{
     // 打开评论弹窗
    openComment() {
      this.commentPop.show = true
    },

    // 喜欢事件
    onLikeEvent() { console.log('like') },

    // 收藏事件
    onCollectEvent() { console.log('collect') },

    // 评论发送
    sendComment() { console.log('发送成功') }
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
  padding: 16px 16px 45px;
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


/** footer comment */
.details-footer-comment-wrap {
  width: 375px;
  height: 41px;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;

  display: flex;
  align-items: center;
  padding: 0 16px;

  background-color: @dp-white;
  background-image: url('~@/assets/icons/comment/footer-comment-bg.png');
  background-repeat: no-repeat;
  background-size: 375px 41px;
  background-position: center;

  .footer-icon-like,
  .footer-icon-comment,
  .footer-icon-collect {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  .footer-icon-like,
  .footer-icon-comment {
    margin-right: 20px;
  }
}

.details-footer-comment-wrap .footer-input {
  width: 215px;
  height: 30px;
  line-height: 30px;
  padding-left: 18px;
  margin-right: 16px;
  background: #F7F7F7;
  border-radius: 18px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #A6AEA9;
  cursor: pointer;
}
</style>