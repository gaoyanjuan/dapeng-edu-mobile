<template>
  <div>
    <!-- Header Block -->
    <m-navbar title="阅读详情" />
    
    <!-- Body Block -->
    <section class="posts-details-wrap">
      <!-- Title -->
      <div class="posts-title"> 陪我跨年的恐怕只有学习和心中那一缕对优中那一缕</div>

      <!-- Avatar -->
      <m-avatar avatar-style="width:40px; height:40px;"/>

      <!-- Content -->
      <div class="posts-content">
        <div class="posts-inner-text">
          <p>2020年新的挑战新的开始，面对自己的内心，听听自己的内心的声音2020年新的挑战新的开始，面对自己的内心，听听自己的内心的声音</p> 
          <img src="http://image.dapengjiaoyu.cn/2019-12-04/jnxy33nlfr/jnxy33nlfr/1575442449111.jpg" alt="">
          <p>2020年新的挑战新的开始，面对自己的内心，听听自己的内心的声音2020年新的挑战新的开始，面对自己的内心，听听自己的内心的声音</p>
        </div>
        <div class="posts-label">阅读·设计</div>
      </div>
    </section>

    <!-- Footer Block -->
    <section class="posts-comment-wrap">
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
  name:'P-Reading-Details',
  layout:'navbar',
  data:() => ({
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

.posts-details-wrap {
  width: 100%;
  margin-top: 44px;
  padding:16px;
  background-color: @dp-white;
  border-bottom: 15px solid #F8F8F8;
}

.posts-details-wrap .posts-title {
  width: 343px;
  height: 56px;
  font-size: 20px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #18252C;
  line-height: 28px;
  margin-bottom: 12px;
}

.posts-details-wrap .posts-content {
  width: 100%;
  min-height: 300px;
  background-color: @dp-white;
}

.posts-content .posts-inner-text {
  width: 343px;
  height: auto;
  margin-top: 12px;
}

.posts-content .posts-inner-text {
  & > img {
    width: 343px;
    height: 220px;
    border-radius: 8px;
    margin-top: 12px;
    margin-bottom: 12px;
    object-fit: cover;
  }
  & > p {
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #36404A;
    line-height: 24px;
  }
}

.posts-content .posts-label {
  width: 69px;
  height: 24px;
  background: #F7F7F7;
  border-radius: 12px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #465156;
  line-height: 24px;
  text-align: center;
  margin-top: 16px;
}

.posts-comment-wrap {
  padding: 16px 16px 45px;
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