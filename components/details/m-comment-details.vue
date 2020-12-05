<template>
  <div>
    <m-navbar :title="`${commentDetailsGetters.replyCount ? commentDetailsGetters.replyCount : '0'}条回复`"/>
    <div class="page">
      <div v-if="commentDetailsGetters.type">
        <div class="comment-box" >
          <m-details-comment
            :user="commentDetailsGetters.user"
            :canReply="true"
            :commentItem="commentDetailsGetters"
            :isTeacher="commentDetailsGetters.type === 'MARK'"
            :isAudio="commentDetailsGetters.ext ? commentDetailsGetters.ext.approvedType === 'AUDIO' : false"
            :audioUrl="commentDetailsGetters.ext ? commentDetailsGetters.ext.approvedAudioUrl : ''"
            :audioCount="commentDetailsGetters.ext ? commentDetailsGetters.ext.approvedAudioLength : 0"
            :teacherType="$route.query.courseType"
            :contentImages="(commentDetailsGetters.imgInfo instanceof Array) && commentDetailsGetters.imgInfo.length > 0 ? commentDetailsGetters.imgInfo[0].url : ''"
          />
        </div>
        <div class="line"></div>
        <div class="replies-title">全部回复</div>
      </div>
      <section class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="-没有更多了-"
          loading-text="正在努力加载"
          @load="onLoad"
        >
          <div class="replies-box">
            <div class="replies-comment-box" v-for="(item, index) in repliesGetters.data" :key="item.id">
              <m-details-comment
                :user="item.user"
                :commentIndex="index"
                :parentUser="item.parentUser"
                :replyUser="commentDetailsGetters.user"
                :commentItem="item"
                :contentImages="(item.imgInfo instanceof Array) && item.imgInfo.length > 0 ? item.imgInfo[0].url : ''"
              />
            </div>
          </div>
        </van-list>
      </section>
    </div>
    <!-- 底部评论框 -->
    <div class="details-footer-comment-wrap">
      <div class="footer-input" @click="openComment"> 留下你的评论吧 </div>
    </div>
    <m-comment-popup ref="commentPopup" v-if="commentDetailsGetters.user" :replyUser="commentDetailsGetters.user" :comment="commentPop" @sendComment="sendComment"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      commentPop: { show: false },
      loading: false,
      finished: false,
      commentFlag: true
    }
  },
  computed: {
    ...mapGetters({
      userinfo: 'user/userInfoGetters',
      commentDetailsGetters: 'comment/commentDetailsGetters',
      repliesGetters: 'comment/repliesGetters'
    })
  },
  watch: {
    'repliesGetters.status': function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
        this.loading = false
      }
    }
  },
  destroyed () {
    this.clearRepliesList()
  },
  methods: {
    ...mapActions({
      queryRepliesList: 'comment/queryRepliesList',
      appendNewRepliesComment: 'comment/appendNewRepliesComment'
    }),
    ...mapMutations({
      clearRepliesList: 'comment/clearRepliesList',
      commitNewRepliesComment: 'comment/appendNewRepliesComment',
      changeReplyCount: 'comment/changeReplyCount'
    }),
    openComment () {
      if(!this.$login()) {
        return 
      }
      this.commentPop.show = true
    },
    sendComment (text) {
      if(!this.commentFlag) return false
      this.commentFlag = false
      this.appendNewRepliesComment({
        label: {
          contentType: this.$route.query.contentType
        },
        content: text,
        id: this.commentDetailsGetters.id,
        user: this.userinfo,
        commit: true
      })
      .then(({status, data}) => {
        if (status === 201) {
          this.commentFlag = true
          this.$refs.commentPopup.resetPopup()
          if (!data.highRisk) {
            this.commitNewRepliesComment({
              ...data,
              isPraise: false,
              isRecommend: false,
              praiseCount: 0,
              parentId: this.commentDetailsGetters.id,
              parentUser: {
                ...this.commentDetailsGetters.user
              },
              user: {
                ...this.userinfo
              }
            })
            this.changeReplyCount(1)
            this.$toast('评论成功')
          }
        } else {
          this.commentFlag = true
          if (data && data.message) {
            this.$toast(data.message)
          }
        }
      })
    },
    onLoad () {
      if (this.repliesGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.repliesGetters.status === 'loading') return false
      const newStartTime = this.repliesGetters.data.slice(-1)[0].createTime
      this.queryRepliesList({
        id: this.$route.query.id,
        startTime: newStartTime
      }).then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 0 16px;
  padding-top: 33px;
  .comment-box {
    margin-top: 33px;
  }
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
  width: 340px;
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

.replies-title {
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 14px;
  font-family: @dp-font-medium;
  font-weight: 500;
  color: #18252C;
  line-height: 20px;
}
.list {
  padding-bottom: 65px;
}
.replies-box {
  &>:nth-child(1) {
    padding-top: 0px;
  }
  &>div {
    padding-top: 36px;
  }
}
.line {
  margin-top: 17px;
  width: 100%;
  height: 1px;
  background: #EBEFEA;
  border-radius: 0px;
}
.finally {
  text-align: center;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #D1D3D5;
  line-height: 20px;
  padding-bottom: 126px;
  padding-top: 28px;
}
</style>