<template>
  <div class="comment" @click="onShowMenus" >
    <div class="comment-header">
      <div class="comment-header-left" @click="toPersonalCenter(user)">
        <headImage
          :headImg="user ? user.avatar : ''"
          imgWidth="33px"
          imgHeight='33px'
        />
        <div class="userinfo-box">
          <div :class="{ 'teacher': isTeacher }">
            {{ user ? user.nickname : '佚名' }}
            <span v-if="isTeacher">
              <img v-if="teacherType === 'VIP' || teacherType === 'CHILD'" src="@/assets/icons/comment/lecturer-tag.png" />
              <img v-else src="@/assets/icons/comment/teacher-tag.png" />
            </span>
          </div>
          <div>{{ commentItem.createTime | commonDate }}</div>
        </div>
      </div>
      <div class="icon-box">
        <div class="comment-icon" v-if="canReply" @click.stop="showCommentPop" >
          <img src="@/assets/icons/comment/comment-icon.png" alt="">
        </div>
        <div class="thumb-box" @click.stop="onLove" >
          <img v-if="isPraise" src="@/assets/icons/comment/comment-favour-true.png" alt="">
          <img v-else src="@/assets/icons/comment/comment-favour.png" alt="">
          <span>{{ praiseCount | studentsCount }}</span>
        </div>
      </div>
    </div>
    <the-audio
      v-if="isAudio"
      audioType="mobile-list"
      :audioCount="audioCount" 
      :audioUrl="audioUrl"
        >
    </the-audio>
    <div class="content" v-else>
      <template v-if="parentUser && replyUser && (parentUser.userId !== replyUser.userId)"><span class="black-text">回复</span><span class="reply-text">{{ parentUser.nickname }}：</span></template>
      <span v-html="$options.filters.formatEmotions(commentItem.content)"></span>
    </div>
    <div v-if="contentImages" class="content-img" @click.stop="showDialogEvent(contentImages)">
      <img :src="contentImages" :alt="contentImages">
    </div>
    <m-comment-popup
      ref="commentPopup"
      :replyUser="commentItem.user"
      :comment="commentPop"
      @sendComment="sendComment"
    />
    <!-- 删除 菜单弹层 -->
    <van-popup v-model="showPopup" round overlay-class="menus__popup" :transition-appear="true" :close-on-click-overlay="false">
      <div class="menus__popup__item" @click.stop="deleteItem">删除</div>
      <div class="menus__popup__item" @click.stop="onShowMenus">取消</div>
    </van-popup>
    <!-- 删除确认弹层 -->
    <van-popup v-model="showConfirmPopup" round class="confirm__menus__popup" :transition-appear="true" @click.stop>
      <div class="popup__item__title">确定删除该评论吗？</div>
      <div class="popup__item">
        <span @click.stop="cancel">取消</span>
        <span @click.stop="confirm">确定</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import audio from '@/assets/icons/comment/audio.png'
import audioPlay from '@/assets/icons/comment/audio.gif'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  props: {
    user: {
      type: Object,
      default: null
    },
    commentIndex: {
      type: Number,
      default: 0
    },
    parentUser: {
      type: Object,
      default: null
    },
    canReply: {
      type: Boolean,
      default: false
    },
    replyUser: {
      type: Object,
      default: null
    },
    commentItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    contentImages: {
      type: String,
      default: ''
    },
    audioUrl: {
      type: String,
      default: ''
    },
    audioCount: {
      type: Number,
      default: 0
    },
    isAudio: {
      type: Boolean,
      default: false
    },
    isTeacher: {
      type: Boolean,
      default: false
    },
    teacherType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      commentPop: { show: false },
      showPopup: false,
      showConfirmPopup: false,
      audioImg: audio,
      audio: null,
      praiseCount: 0,
      isPraise: false,
      commentFlag: true
    }
  },
  computed: {
    ...mapGetters({
      commentDetailsGetters: 'comment/commentDetailsGetters',
      userinfo: 'user/userInfoGetters'
    })
  },
  created () {
    this.isPraise = this.commentItem.isPraise
    this.praiseCount = this.commentItem.praiseCount
  },
  mounted () {
    this.audio = new Audio(this.audioUrl)
  },
  methods: {
    ...mapActions({
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike',
      deleteComment: 'comment/deleteComment',
      appendNewRepliesComment: 'comment/appendNewRepliesComment'
    }),
    ...mapMutations({
      commitNewRepliesComment: 'comment/appendNewRepliesComment',
      deleteReply: 'comment/deleteReply',
      changeReplyCount: 'comment/changeReplyCount'
    }),
    cancel () {
      this.showConfirmPopup = false
    },
    confirm () {
      this.deleteComment({
        id: this.commentItem.id
      })
      this.deleteReply({
        index: this.commentIndex
      })
      this.$toast('删除成功')
      this.changeReplyCount(-1)
      this.showConfirmPopup = false
    },
    deleteItem () {
      this.showPopup = false
      this.showConfirmPopup = true
    },
    onShowMenus () {
      if (this.userinfo && this.user && this.user.userId === this.userinfo.userId) {
        this.showPopup = !this.showPopup
      }
    },
    onLove () {
      if(!this.$login()) {
        return 
      }
      if (this.isPraise) {
        this.isPraise = false
        this.praiseCount -= 1
        this.queryUnLike({
          id: this.commentItem.id,
          type: 'COMMENT'
        }).catch(() => {
          this.isPraise = true
          this.praiseCount += 1
        })
      } else {
        this.isPraise = true
        this.praiseCount += 1
        this.queryLike({
          id: this.commentItem.id,
          type: 'COMMENT',
          createdId: this.commentItem.user.userId,
          contentType: this.$route.query.contentType
        }).catch(() => {
          this.isPraise = false
          this.praiseCount -= 1
        })
      }
    },
    showCommentPop () {
      if(!this.$login()) {
        return 
      }
      if (this.userinfo && this.user && this.user.userId !== this.userinfo.userId) {
        this.commentPop.show = true
      } else {
        this.$toast('不可以对自己回复哦')
      }
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
    palyAudio () {
      this.audioImg = audioPlay      
      this.audio.play()
      this.audio.addEventListener('ended', () => {
        this.audioImg = audio
      })
    },
    showDialogEvent (img) {
      this.ImagePreview([img])
    },
    toPersonalCenter(item) {
      if (!this.$login()) return
      if (item) {
        this.$router.push({
          path: '/personal-center/publish',
          query:{ 
            userId: item.userId
          }
        })
      } else {
         this.$toast('该用户已注销')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .comment-header-left {
      display: flex;
      .userinfo-box {
        margin-left: 12px;
        height: 38px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &>:nth-child(1) {
          font-size: 14px;
          font-family: @dp-font-medium;
          font-weight: 500;
          color: #A3A8AB;
          line-height: 20px;
          img {
            height: 16px;
            widows: 31px;
            vertical-align: middle;
            margin-bottom: 3px;
            margin-left: 4px;
          }
        }
        .teacher {
          color: #0CB65B;
        }
        &>:nth-child(2) {
          font-size: 12px;
          font-family: @dp-font-regular;
          font-weight: 400;
          color: #A6AEA9;
          line-height: 17px;
        }
      }
    }
    .icon-box {
      display: flex;
      align-items: center;
      .comment-icon {
        img {
          width: 20px;
          height: 20px;
        }
        margin-right: 30px;
      }
      .thumb-box {
        display: flex;
        img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        span {
          margin-left: 4px;
          font-size: 12px;
          font-family: @dp-font-medium;
          font-weight: 500;
          color: #A6AEA9;
          line-height: 20px;
        }
      }
    }
  }
  .content {
    margin-top: 14px;
    padding-left: 48px;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #18252C;
    line-height: 20px;
    word-break: break-all;
    /deep/ .emotion {
      width: 20px;
      height: 20px;
      vertical-align: text-bottom;
    }
    .reply-text {
      color: #979CA1;
    }
  }
  .audio-box {
    margin-top: 9px;
    position: relative;
    margin-left: 48px;
    height: 18px;
    width: 63px;
    display: flex;
    align-items: center;
    user-select:none;
    &>img {
      width: 63px;
      height: 18px;
    }
    &>span {
        position: absolute;
        right: 6px;
        font-size: 12px;
        font-family: @dp-font-medium;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 18px;
      }
  }
  .content-img {
    margin-top: 8px;
    margin-left: 48px;
    height: 120px;
    img {
      width: 120px;
      height: 120px;
      border-radius: 5px;
      object-fit: cover;
    }
  }
}

.black-text {
  color: #36404A;
  margin: 0 3px;
}


/** menus-popup */
.comment /deep/.van-popup {
  width: 284px;
  height: 92px;
  overflow: hidden;
}

/deep/.van-popup--center.van-popup--round {
  border-radius: 8px;
}

.van-popup .menus__popup__item {
  width: 100%;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #18252C;
  text-align: center;
  border-bottom: 1px solid #F7F7F7;
  cursor: pointer;
}

.van-popup .menus__popup__item:active {
  background-color:#f2f3f5;
}

.confirm__menus__popup  {
  width: 283px !important;
  height: 137px !important;
  border-radius: 6px !important;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.popup__item__title {
  height: 96px;
  font-size: 16px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #363D35;
  line-height: 22px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.popup__item {
  height: 40px;
  border-top: solid 1px #D8D8D8;
  display: flex;
  justify-content: space-around;
  align-items: center;
  :first-child {
    color: #5A5A5A;
    border-right: solid 1px #D8D8D8;
  }
  &>span {
    height: 40px;
    width: 140px;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #0CB65B;
    line-height: 40px;
  }
}
</style>