<template>
  <div class="comment" @click="onShowMenus">
    <div class="comment-header">
      <div class="comment-header-left">
        <headImage
          :headImg="user ? user.avatar : ''"
          imgWidth="40px"
          imgHeight='40px'
        />
        <div :class="isTeacher ? 'teacher-userinfo-box' : 'userinfo-box'">
          <div>
            {{ user ? user.nickname : '佚名' }}
            <template v-if="isTeacher">
              <img v-if="teacherType === 'VIP' || teacherType === 'CHILD'" src="@/assets/icons/comment/lecturer-tag.png" />
              <img v-else src="@/assets/icons/comment/teacher-tag.png" />
            </template>
          </div>
          <div>{{ commentItem.createTime | commonDate }}</div>
        </div>
      </div>
      <div class="icon-box">
        <div class="comment-icon" @click.stop="showCommentPop" >
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
      v-if="isTeacher && isAudio"
      audioType="mobile-list"
      :audioCount="audioCount" 
      :audioUrl="audioUrl"
    >
    </the-audio>
    <div class="content" v-else v-html="$options.filters.formatEmotions(commentItem.content)"></div>
    <div v-if="contentImages" class="content-img" @click.stop="showDialogEvent(contentImages)">
      <img :src="contentImages">
    </div>
    <div class="replies-box" v-if="replyCount > 0" @click.stop="toCommentDetails">
      <div class="replies-item" v-for="(item, index) in repliesList.slice(0,3)" :key="index">
        <span>
          <span>{{ item.user.nickname }}</span><template v-if="user && (item.parentUser.userId !== user.userId)"><span class="black-text" v-if="item.parentUser">回复</span><span v-if="item.parentUser">{{ item.parentUser.nickname }}</span></template><span>：</span>
        </span>
        <a class="replies-item-img" v-if="item.images">
          <img src="@/assets/icons/comment/comment-img-icon.png" alt=""/>
          <span>图片</span>
        </a>
        <span class="replies-item-content" v-html="$options.filters.formatEmotions(item.content)"></span>
      </div>
      <div class="replies-item-count" v-if="replyCount > 3">查看全部{{ replyCount }}条回复</div>
    </div>
    <div class="line"></div>
    <!-- 删除 菜单弹层 -->
    <van-popup v-model="showPopup" round overlay-class="menus__popup">
      <div class="menus__popup__item" @click.stop="deleteItem">删除</div>
      <div class="menus__popup__item" @click.stop="onShowMenus">取消</div>
    </van-popup>
    <!-- 删除确认弹层 -->
    <van-popup v-model="showConfirmPopup" round class="confirm__menus__popup">
      <div class="popup__item__title">确定删除该评论吗？</div>
      <div class="popup__item">
        <span @click.stop="cancel">取消</span>
        <span @click.stop="confirm">确定</span>
      </div>
    </van-popup>
    <!-- 评论框弹层 -->
    <m-comment-popup
      :replyUser="commentItem.user"
      :comment="commentPop"
      @sendComment="sendComment"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    itemIndex: {
      type: Number,
      default: 0
    },
    contentType: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: null
    },
    commentItem: {
      type: Object,
      default: () => {
        return null
      }
    },
    teacherType: {
      type: String,
      default: ''
    },
    isTeacher: {
      type: Boolean,
      default: false
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
    replies: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      commentPop: { show: false },
      showPopup: false,
      showConfirmPopup: false,
      repliesList: [],
      isPraise: false,
      praiseCount: 0,
      replyCount: 0
    }
  },
  computed: {
    ...mapGetters({
      userinfo: 'user/userInfoGetters'
    })
  },
  created () {
    this.isPraise = this.commentItem.isPraise
    this.praiseCount = this.commentItem.praiseCount
    this.replyCount = this.commentItem.replyCount
    this.repliesList = this.replies.slice()
  },
  methods: {
    ...mapActions({
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike',
      deleteComment: 'comment/deleteComment',
      appendNewRepliesComment: 'comment/appendNewRepliesComment'
    }),
    onLove () {
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
          contentType: this.contentType
        }).catch(() => {
          this.isPraise = false
          this.praiseCount -= 1
        })
      }
    },
    showDialogEvent (img) {
      this.ImagePreview([img])
    },
    toCommentDetails () {
      this.$router.push({
        path: '/details/comment-details',
        query: {
          id: this.commentItem.id,
          courseType: this.teacherType,
          contentType: this.contentType
        }
      })
    },
    showCommentPop () {
      if (this.userinfo && this.user && this.user.userId !== this.userinfo.userId) {
        this.commentPop.show = true
      } else {
        this.$toast('不可以对自己回复哦')
      }
    },
    sendComment (text) {
      this.appendNewRepliesComment({
        label: {
          contentType: this.contentType
        },
        content: text,
        id: this.commentItem.id,
        user: this.userinfo
      })
      .then((res) => {
        if (!res.data.highRisk) {
          this.$toast('评论成功')
          this.replyCount += 1
          this.repliesList.unshift({
            ...res.data,
            isPraise: false,
            isRecommend: false,
            praiseCount: 0,
            parentId: this.commentItem.id,
            parentUser: {
              ...this.commentItem.user
            },
            user: {
              ...this.userinfo
            }
          })
        }
      })
      .catch((err) => {
        if (err && err.data && err.data.message) {
          this.$toast(err.data.message)
        }
      })
    },
    cancel () {
      this.showConfirmPopup = false
    },
    confirm () {
      this.deleteComment({
        id: this.commentItem.id,
        index: this.itemIndex,
        commit: true
      })
      this.$toast('删除成功')
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
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  width: 100%;
  padding-bottom: 18px;
  .comment-header {
    display: flex;
    justify-content: space-between;
    .comment-header-left {
      display: flex;
      .teacher-userinfo-box {
        margin-left: 8px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &>:nth-child(1) {
          font-size: 14px;
          font-family: @dp-font-medium;
          font-weight: 500;
          color: #0CB65B;
          line-height: 20px;
          img {
            height: 16px;
            widows: 31px;
            vertical-align: middle;
            margin-bottom: 3px;
            margin-left: 4px;
          }
        }
        &>:nth-child(2) {
          font-size: 12px;
          font-family: @dp-font-regular;
          font-weight: 400;
          color: #A6AEA9;
          line-height: 17px;
        }
      }
      .userinfo-box {
        margin-left: 8px;
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &>:nth-child(1) {
          font-size: 14px;
          font-family: @dp-font-medium;
          font-weight: 500;
          color: #A3A8AB;
          line-height: 20px;
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
        margin-top: 2px;
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
    margin-top: 8px;
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
  }
  .content-img {
    margin-top: 8px;
    margin-left: 48px;
    height: 120px;
    img {
      height: 120px;
      border-radius: 5px;
    }
  }
}
.replies-box {
  background: #F6F6F6;
  border-radius: 4px;
  margin-top: 8px;
  margin-left: 48px;
  padding: 8px;
  .replies-item {
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #A3A8AB;
    line-height: 17px;
    word-break: break-all;
    .replies-item-img {
      margin-right: 2px;
      img {
        width: 12px;
        height: 14px;
        vertical-align: middle;
        padding-bottom: 2px;
        margin-right: 2px;
      }
      font-size: 12px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #588BFF;
      line-height: 17px;
      &:hover {
        color: #2B60D7;
      }
    }
    .replies-item-content {
      font-size: 12px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #36404A;
      line-height: px;
      word-break: break-all;
      /deep/ .emotion {
        width: 20px;
        height: 20px;
        vertical-align: text-bottom;
      }
    }
  }
  .replies-item-count {
    margin-top: 8px;
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #A3A8AB;
    line-height: 17px;
  }
}

.line {
  margin-top: 16px;
  margin-right: 4px;
  height: 1px;
  background: #F7F7F7;
  border-radius: 0px;
}

.black-text {
  color: #36404A;
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
