<template>
  <div>
    <van-popup v-model="comment.show" class="comment-wrap">
      <!--header-->
      <div class="header">
        <img
          class="icon-close"
          src="@/assets/icons/work/icon-work-comment-close.png"
          @click.stop="onCloseCommentDialog"
        />
      </div>

      <!--tbody-->
      <div class="tbody">
        <van-field
          ref="commentObj"
          v-model="comment.message"
          rows="4"
          :border="false"
          type="textarea"
          maxlength="150"
          :placeholder="comment.placeholder"
          @input="commentInput"
        ></van-field>
      </div>

      <!--footer-->
      <div class="footer">
        <span class="left-nums_text">{{ commentNums }}/150</span>
        <div class="right-btns_wrap">
          <img
            class="icon-emoji"
            :src="showEmoji ? emojiSelIcon : emojiIcon"
            @click.stop="onOpenEmojiHandle"
          />
          <button
            class="btns"
            :disabled="btnStatus"
            @click="onPublishJobHandle"
          >
            发布
          </button>
        </div>
      </div>

      <!--emoji-->
      <div v-show="showEmoji" class="emoji-wrap">
        <client-only>
          <swiper ref="mySwiper" :options="emojiSwiper" @ready="onSwiperRedied">
            <!--swiperSlide-->
            <swiperSlide v-for="(emoji, i) in emojiList" :key="i">
              <div
                v-for="(item, j) in emoji"
                :key="j"
                class="emoji-item"
                @click.prevent.stop="writeEmoji(item)"
              >
                <img :src="item.url" :alt="item.title" />
              </div>
            </swiperSlide>
            <!--分页-->
            <div slot="pagination" class="swiper-pagination"></div>
          </swiper>
        </client-only>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import emoji from '~/assets/packet/emoji'
export default {
  name: 'CommentDialog',
  props: {
    comment: {
      type: Object,
      default() {
        return {
          show: false
        }
      }
    },
    mainBody: {
      type: Object,
      default() {}
    }
  },
  data() {
    return {
      swiper: null,
      commentNums: 0,
      btnStatus: true,
      showEmoji: false,
      emojiList: [],
      emojiSwiper: {
        slidesPerView: 1,
        // 修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        // 修改swiper的父元素时，自动初始化swiper
        observeParents: true,
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'slide_dot_active',
          bulletClass: 'slide_dot'
        }
      },
      emojiIcon: require('@/assets/icons/work/icon-emoji.png'),
      emojiSelIcon: require('@/assets/icons/work/icon-emoji-active.png')
    }
  },
  computed: {
    ...mapState({
      user: 'USER_OBJECT'
    })
  },
  watch: {
    // 监听文本评论框
    commentNums(val) {
      val !== 0 ? (this.btnStatus = false) : (this.btnStatus = true)
    }
  },
  mounted() {
    this.emojiList = emoji
  },
  methods: {
    ...mapActions({
      // 添加评论
      addComment: 'work/addComment',
      // 添加回复
      addReply: 'work/addReply'
    }),
    /**
     * 发布评论/回复
     */
    onPublishJobHandle() {
      if (this.mainBody.doCommentStatus) {
        this.mainBody.doCommentStatus = false
        if (this.mainBody && this.mainBody.event === 'reply') {
          this.onReplyHandle()
        } else {
          this.onCommentHandle()
        }
      }
    },
    /**
     * 评论事件
     */
    onCommentHandle() {
      const params = {
        id: this.mainBody.jobcompletionId,
        content: this.comment.message,
        userId: this.user.userId,
        createdBy: this.mainBody.userId,
        type: 4
      }
      if (this.mainBody.commentId) {
        params.commentId = this.mainBody.commentId
      }
      this.addComment(params)
        .then((res) => {
          this.mainBody.doCommentStatus = true
          this.comment.show = false
          if (res.success === 'true') {
            const userInfo = {
              id: res.data.id,
              userId: res.data.user.userId,
              creatTime: res.data.creatTime,
              content: res.data.content,
              jobcompletionId: this.mainBody.jobcompletionId,
              nickname: res.data.user.nickname,
              user: {
                nickname: res.data.user.nickname,
                userId: res.data.user.userId,
                avatar: res.data.user.avatar
              },
              index: this.mainBody.index,
              commentStatus: true,
              parent: '0',
              replieList: []
            }
            this.$emit('updateCommentList', userInfo)
            this.commentNums = 0
            this.comment.message = ''
            this.$toast({
              message: '评论成功!',
              position: 'bottom',
              duration: 1000
            })
          } else {
            this.$toast({
              message: res.msg,
              position: 'bottom',
              duration: 1000
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /**
     * 回复事件
     */
    onReplyHandle() {
      this.addReply({
        id: this.mainBody.comment,
        content: this.comment.message,
        userId: this.user.userId,
        type: 4
      })
        .then((res) => {
          this.mainBody.doCommentStatus = true
          this.comment.show = false
          if (res.success === 'true') {
            this.$emit('updateReplyList', res.data)
            this.commentNums = 0
            this.comment.message = ''
            this.$toast({
              message: '回复成功!',
              position: 'bottom',
              duration: 1000
            })
          } else {
            this.$toast({
              message: res.msg,
              position: 'bottom',
              duration: 1000
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /**
     * 拿到swiper对象
     */
    onSwiperRedied(swiper) {
      this.swiper = swiper
    },
    /**
     * 写入表情
     * 2 === '[]'.ToString().length
     */
    writeEmoji(emoji) {
      if (this.comment.message.length + (emoji.title.length + 2) <= 150) {
        this.comment.message += `[${emoji.title}]`
        this.commentNums = this.comment.message.length
      }
    },
    /**
     * 打开表情包
     */
    onOpenEmojiHandle() {
      this.showEmoji = !this.showEmoji
    },
    /**
     * 关闭评论弹窗
     */
    onCloseCommentDialog() {
      this.comment.show = false
    },
    /**
     * 监听评论input事件
     */
    commentInput() {
      this.commentNums = this.comment.message.length
    }
  }
}
</script>

<style lang="less" scoped>
.comment-wrap {
  width: 343px;
  min-height: 160px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  // header
  & > div.header {
    width: 343px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > img.icon-close {
      width: 24px;
      height: 24px;
      margin-right: 6px;
      cursor: pointer;
    }
  }
  // body
  & > div.tbody {
    /deep/ & > div.van-cell {
      padding: 0 15px;
      font-size: 14px;
      font-family: @fontRegular;
      font-weight: 400;
      color: rgba(54, 64, 74, 1);
      line-height: 20px;
    }
  }
  // footer
  & > div.footer {
    width: 343px;
    height: 24px;
    margin: 10px 0 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    & > span.left-nums_text {
      width: auto;
      font-size: 14px;
      font-family: @fontRegular;
      font-weight: 400;
      color: rgba(90, 90, 90, 1);
      margin-left: 19px;
    }
    & > div.right-btns_wrap {
      display: flex;
      align-items: center;
      margin-right: 17px;
      & > img.icon-emoji {
        width: 24px;
        height: 24px;
        margin-right: 9px;
        cursor: pointer;
      }
      & > button.btns {
        width: auto;
        font-size: 14px;
        font-family: @fontSemibold;
        font-weight: 600;
        border: none;
        padding: 0;
        background-color: @white;
        color: rgba(255, 86, 125, 1);
        cursor: pointer;
      }
      & > button.btns:active {
        color: rgb(228, 124, 148);
      }
      & > button.btns:disabled {
        color: @gray-4;
        cursor: not-allowed;
      }
    }
  }
  // emoji
  & > div.emoji-wrap {
    width: 100%;
    height: 160px;
    overflow: hidden;
    & > div.swiper-container {
      width: 100%;
      height: 160px;
      /deep/ & > div.swiper-wrapper {
        height: 140px;
        & > div.swiper-slide {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          width: 343px;
          height: 134px;
          position: relative;
          left: 15px;
          cursor: pointer;
          & > div.emoji-item {
            width: 14%;
            & > img {
              width: 23px;
              height: 23px;
            }
          }
        }
      }
      /**分页器指示点 */
      /deep/ & > div.swiper-pagination {
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        & > span.slide_dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 8px;
          border-radius: 7px;
          background: rgba(224, 224, 224, 1);
        }
        & > span.slide_dot_active {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 7px;
          background: rgba(150, 150, 150, 1);
        }
      }
    }
  }
}
</style>
