<template>
  <div class="comment">
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
      <div class="thumb-box" @click="onLove" >
        <img v-if="isPraise" src="@/assets/icons/comment/comment-favour-true.png" alt="">
        <img v-else src="@/assets/icons/comment/comment-favour.png" alt="">
        <span>{{ praiseCount | studentsCount }}</span>
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
    <div v-if="contentImages" class="content-img" @click="showDialogEvent(contentImages)">
      <img :src="contentImages">
    </div>
    <div class="replies-box" v-if="replyCount > 0" @click="toCommentDetails">
      <div class="replies-item" v-for="(item, index) in replies" :key="index">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
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
      isPraise: false,
      praiseCount: 0,
      replyCount: 0
    }
  },
  created () {
    this.isPraise = this.commentItem.isPraise
    this.praiseCount = this.commentItem.praiseCount
    this.replyCount = this.commentItem.replyCount
  },
  methods: {
    ...mapActions({
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike'
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
          courseType: this.teacherType
        }
      })
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
    .thumb-box {
      display: flex;
      align-items: center;
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
        line-height: 16px;
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
</style>
