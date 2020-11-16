<template>
  <div>
    <m-tabs>
      <m-tab-item selected="true" name="评论" :count="commentCount">
        <m-comment-list :contentType="contentType" />
      </m-tab-item>
      <m-tab-item name="喜欢" :count="praiseCount">
        <m-like-list />
      </m-tab-item>
    </m-tabs>
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
  props: {
    topicType: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: ''
    },
    propCommentCount: {
      type: Number,
      default: 0
    },
    propPraiseCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      commentCount: 0,
      praiseCount: 0,
      commentPop: { show: false },
      comment: require('@/assets/icons/posts/posts-comment.png'),
      like: require('@/assets/icons/posts/posts-love.png'),
      collect: require('@/assets/icons/posts/posts-star.png')
    }
  },
  created () {
    this.commentCount = this.propCommentCount
    this.praiseCount = this.propPraiseCount
  },
  methods: {
    // 打开评论弹窗
    openComment() {
      this.commentPop.show = true
    },
    // 喜欢事件
    onLikeEvent() {
      console.log(this.topicType)
      console.log(this.contentType)
    },
    // 收藏事件
    onCollectEvent () {
      
    },
    // 评论发送
    sendComment (params) {
      console.log(params)
    }
  }
}
</script>

<style lang="less" scoped>
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