<template>
  <div>
    <m-tabs>
      <m-tab-item selected="true" name="评论" :count="detailsGetters.commentCount">
        <m-comment-list :contentType="contentType" :courseType="courseType" />
      </m-tab-item>
      <m-tab-item name="喜欢" :count="detailsGetters.praiseCount">
        <m-like-list />
      </m-tab-item>
    </m-tabs>
    <!-- 底部评论框 -->
    <div class="details-footer-comment-wrap">
      <div class="footer-input" @click="openComment"> 留下你的评论吧 </div>
      <img class="footer-icon-like" :src="detailsGetters.isPraise ? unlike : like" alt="like" @click="onLikeEvent"/>
      <img class="footer-icon-comment" :src="comment" alt="comment" @click="openComment"/>
      <img class="footer-icon-collect" :src="detailsGetters.isCollection ? uncollect : collect" alt="collect" @click="onCollectEvent"/>
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
    isGrowth: {
      type: String,
      default: ''
    },
    contentType: {
      type: String,
      default: ''
    },
    courseType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      commentPop: { show: false },
      comment: require('@/assets/icons/posts/posts-comment.png'),
      like: require('@/assets/icons/posts/posts-love.png'),
      unlike: require('@/assets/icons/posts/posts-unlove.png'),
      collect: require('@/assets/icons/posts/posts-star.png'),
      uncollect: require('@/assets/icons/posts/posts-unstar.png'),
      commentFlag: true
    }
  },
  computed: {
    ...mapGetters({
      detailsGetters: 'details/detailsGetters',
      userinfo: 'user/userInfoGetters',
      commentListGetters: 'comment/commentListGetters'
    }),
    functionName () {
      return this.$getFunctionName(this.$store.state.listType)
    }
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
      changeIsPraise: 'details/changeIsPraise',
      changeIsCollection: 'details/changeIsCollection',
      changeCommentCount: 'details/changeCommentCount',
      changePraiseCount: 'details/changePraiseCount',
      addNewLike: 'comment/addNewLike',
      deleteLike: 'comment/deleteLike'
    }),
    // 打开评论弹窗
    openComment() {
      if(!this.$login()) { return }
      this.commentPop.show = true
    },
    // 喜欢事件
    onLikeEvent() {
      if(!this.$login()) {
        return 
      }
      if (this.detailsGetters.isPraise) {
        this.changeIsPraise(false)
        this.changePraiseCount(this.detailsGetters.praiseCount - 1)
        this.$store.commit(`${this.functionName}`, {
          index: this.$store.state.propIndex,
          type: 'love',
          value: {
            praise: false,
            count: -1
          }
        })
        this.queryUnLike({
          id: this.isGrowth === 'growth' ? this.detailData.tagsId : this.detailData.id,
          type: this.topicType,
          commit: true
        }).catch(() => {
          this.changeIsPraise(true)
          this.changePraiseCount(this.detailsGetters.praiseCount + 1)
          this.$store.commit(`${this.functionName}`, {
            index: this.$store.state.propIndex,
            type: 'love',
            value: {
              praise: true,
              count: 1
            }
          })
        })
        this.deleteLike({
          userId: this.userinfo.userId
        })
      } else {
        this.changeIsPraise(true)
        this.changePraiseCount(this.detailsGetters.praiseCount + 1)
        this.$store.commit(`${this.functionName}`, {
          index: this.$store.state.propIndex,
          type: 'love',
          value: {
            praise: true,
            count: 1
          }
        })
        this.queryLike({
          id: this.isGrowth === 'growth' ? this.detailData.tagsId : this.detailData.id,
          type: this.topicType,
          createdId: this.detailData.user.userId,
          contentType: this.contentType,
          commit: true
        }).catch(() => {
          this.changeIsPraise(false)
          this.changePraiseCount(this.detailsGetters.praiseCount - 1)
          this.$store.commit(`${this.functionName}`, {
            index: this.$store.state.propIndex,
            type: 'love',
            value: {
              praise: false,
              count: -1
            }
          })
        })
        this.addNewLike({
          createTime: new Date().getTime(),
          user: {
            ...this.userinfo,
            nickname: this.userinfo.nickname
          }
        })
      }
    },
    // 收藏事件
    onCollectEvent () {
      if(!this.$login()) {
        return 
      }
      if (this.detailsGetters.isCollection) {
        this.changeIsCollection(false)
        this.$store.commit(`${this.functionName}`, {
          index: this.$store.state.propIndex,
          type: 'collect',
          value: false
        })
        this.queryDeleteCollection({
          id: this.isGrowth === 'growth' ? this.detailData.tagsId : this.detailData.id,
          type: this.topicType
        }).catch(() => {
          this.changeIsCollection(true)
          this.$store.commit(`${this.functionName}`, {
            index: this.$store.state.propIndex,
            type: 'collect',
            value: true
          })
        })
      } else {
        this.changeIsCollection(true)
        this.$store.commit(`${this.functionName}`, {
          index: this.$store.state.propIndex,
          type: 'collect',
          value: true
        })
        this.queryCollection({
          id: this.isGrowth === 'growth' ? this.detailData.tagsId : this.detailData.id,
          type: this.topicType,
          createdId: this.detailData.user.userId,
          contentType: this.contentType
        }).catch(() => {
          this.changeIsCollection(false)
          this.$store.commit(`${this.functionName}`, {
            index: this.$store.state.propIndex,
            type: 'collect',
            value: false
          })
        })
      }
    },
    // 评论发送
    sendComment (params) {
      if(!this.commentFlag) return false
      this.commentFlag = false
      this.appendNewComment({
        ...this.commentListGetters.params,
        content: params,
        label: {
          contentType: this.contentType
        },
        user: this.userinfo,
        commit: true
      })
      .then(({status, data}) => {
        this.commentFlag = true
        this.$refs.commentPopup.resetPopup()
        if (!data.highRisk && data.id) {
          this.$toast('评论成功')
          this.changeCommentCount(this.detailsGetters.commentCount + 1)
          this.$store.commit(`${this.functionName}`, {
            index: this.$store.state.propIndex,
            type: 'comment',
            value: 1
          })
        }
      })
      .catch((error) => {
        this.commentFlag = true
        if (error && error.data && error.data.message) {
          this.$toast(error.data.message)
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