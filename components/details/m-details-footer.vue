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
      <img class="footer-icon-like" :src="isPraise ? unlike : like" alt="like" @click="onLikeEvent"/>
      <img class="footer-icon-comment" :src="comment" alt="comment" @click="commentPop.show = true"/>
      <img class="footer-icon-collect" :src="isCollection ? uncollect : collect" alt="collect" @click="onCollectEvent"/>
    </div>
    <!-- 评论框弹层 -->
    <m-comment-popup ref="commentPopup" :comment="commentPop" @sendComment="sendComment"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    detailData: {
      type: Object,
      default: () => {
        return null
      }
    },
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
      isPraise: false,
      isCollection: false,
      commentCount: 0,
      praiseCount: 0,
      commentPop: { show: false },
      comment: require('@/assets/icons/posts/posts-comment.png'),
      like: require('@/assets/icons/posts/posts-love.png'),
      unlike: require('@/assets/icons/posts/posts-unlove.png'),
      collect: require('@/assets/icons/posts/posts-star.png'),
      uncollect: require('@/assets/icons/posts/posts-unstar.png')
    }
  },
  computed: {
    ...mapGetters({
      userinfo: 'user/userInfoGetters',
      commentListGetters: 'comment/commentListGetters'
    })
  },
  created () {
    this.commentCount = this.propCommentCount
    this.praiseCount = this.propPraiseCount
    this.isPraise = this.detailData.isPraise
    this.isCollection = this.detailData.isCollection
  },
  methods: {
    ...mapActions({
      queryCollection: 'comment/queryCollection',
      queryDeleteCollection: 'comment/queryDeleteCollection',
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike',
      appendNewComment: 'comment/appendNewComment'
    }),
    ...mapMutations({
      addNewLike: 'comment/addNewLike',
      deleteLike: 'comment/deleteLike'
    }),
    // 打开评论弹窗
    openComment() {
      this.commentPop.show = true
    },
    // 喜欢事件
    onLikeEvent() {
      if (this.isPraise) {
        this.isPraise = false
        this.praiseCount -= 1
        this.queryUnLike({
          id: this.detailData.id,
          type: this.topicType,
          commit: true
        }).catch(() => {
          this.isPraise = true
          this.praiseCount += 1
        })
        this.deleteLike({
          userId: this.userinfo.userId
        })
      } else {
        this.isPraise = true
        this.praiseCount += 1
        this.queryLike({
          id: this.detailData.id,
          type: this.topicType,
          createdId: this.detailData.user.userId,
          contentType: this.contentType,
          commit: true
        }).catch(() => {
          this.isPraise = false
          this.praiseCount -= 1
        })
        this.addNewLike({
          createTime: new Date().getTime(),
          user: {
            ...this.userinfo,
            nickname: this.userinfo.nickName
          }
        })
      }
    },
    // 收藏事件
    onCollectEvent () {
      if(!this.$login()) {
        return 
      }
      if (this.isCollection) {
        this.isCollection = false
        this.queryDeleteCollection({
          id: this.detailData.id,
          type: this.topicType
        }).catch(() => {
          this.isCollection = true
        })
      } else {
        this.isCollection = true
        this.queryCollection({
          id: this.detailData.id,
          type: this.topicType,
          createdId: this.detailData.user.userId,
          contentType: this.contentType
        }).catch(() => {
          this.isCollection = false
        })
      }
    },
    // 评论发送
    sendComment (params) {
      this.appendNewComment({
        ...this.commentListGetters.params,
        content: params,
        label: {
          contentType: this.contentType
        },
        user: this.userinfo
      })
      .then((res) => {
        this.$refs.commentPopup.resetPopup()
        if (!res.data.highRisk) {
          this.$toast('评论成功')
        }
        this.commentCount += 1
      })
      .catch((err) => {
        if (err && err.data && err.data.message) {
          this.$toast(err.data.message)
        }
      })
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