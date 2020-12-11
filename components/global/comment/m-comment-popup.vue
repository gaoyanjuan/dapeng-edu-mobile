<template>
  <div @click.stop="stop">
    <van-popup v-model="comment.show" class="comment-popup-wrap" :transition-appear="true">
      <!-- Comment Header Block -->
      <section class="comment-popup-header">
        <img class="header-icon-close" :src="close" alt="close" @click="comment.show = false"/>
      </section>

      <!-- Comment Body Block -->
      <section class="comment-popup-body">
        <van-field v-model="content" rows="5" :border="false" type="textarea" maxlength="150" :placeholder="placeholderText"></van-field>
      </section>

      <!-- Comment Body Block -->
      <section class="comment-popup-footer">
        <span class="footer-word-nums">{{ content.length }} /150 </span>
        <div class="footer-right-side">
          <img class="footer-emoji-icon" :src="showEmoji ? emojiActive : emoji" alt="emoji" @click="openEmjoi"/>
          <span :class="content.length ? 'footer-send-btn':'footer-send-btn-disabled'" @click="onSendClick">发送</span>
        </div>
      </section>

      <!-- Comment emoji Block -->
      <section class="comment-popup-emoji" v-show="showEmoji">
        <client-only>
          <swiper ref="mySwiper" :options="emojiSwiper" @ready="onSwiperRedied">
            <!--swiperSlide-->
            <swiperSlide v-for="(emoji, i) in emojiList" :key="i">
              <div v-for="(item, j) in emoji" :key="j" class="emoji-item" @click.prevent.stop="writeEmoji(item)">
                <img :src="item.url" :alt="item.title" />
              </div>
            </swiperSlide>
            <!--分页-->
            <div slot="pagination" class="swiper-pagination"></div>
          </swiper>
        </client-only>
      </section>
    </van-popup>
  </div>
</template>

<script>
import emoji from '~/assets/emotion/emoji'
export default {
  name:'Comment-Popup',
  props: {
    comment: {
      type: Object,
      default: {}
    },
    replyUser: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data:() => ({

    // 初始化值
    content:'',
    swiper: null,
    showEmoji: false,
    emojiList: emoji,
    placeholderText: '留下评论吧…',
    // 表情轮播配置
    emojiSwiper: {
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      pagination: {
        el: '.swiper-pagination',
        bulletActiveClass: 'slide_dot_active',
        bulletClass: 'slide_dot'
      }
    },
    
    // 相关图片资源
    close:require('@/assets/icons/comment/close.png'),
    emoji:require('@/assets/icons/comment/emoji.png'),
    emojiActive:require('@/assets/icons/comment/emoji-active.png'),
  }),

  watch:{
    content(oldVal, newVal) {
      if(oldVal.length === 150) {
        document.activeElement.blur()
        this.$toast('评论仅限150个字')
      }
    }
  },

  created () {
    if (this.replyUser) {
      this.placeholderText = `回复 ${this.replyUser.nickname}`
    }
  },
  methods:{
    stop () {},
    // 打开表情轮播
    openEmjoi () {
      this.showEmoji = !this.showEmoji
    },

    // 获取swiper对象
    onSwiperRedied(swiper) {
      this.swiper = swiper
    },

    // 写入表情 
    writeEmoji(emoji) {
      if (this.content.length + (emoji.title.length + 2) <= 150) {
        this.content += `[${emoji.title}]`
      }
    },
    resetPopup () {
      this.content = ''
      this.comment.show = false
    },
    // 发送事件
    onSendClick() {
      this.content = this.content.trim()
      if(this.content.length) {
        this.$emit('sendComment', this.content)
      } else {
        this.$toast('评论内容不可为空')
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>

// 评论容器
.comment-popup-wrap {
  width: 300px !important;
  height: auto !important;
  min-height: 200px;
  padding: 12px;
  background: @dp-white;
  border-radius: 13px;
  overflow: hidden;
}

// 评论框顶部
.comment-popup-header {
  display: flex;
  width: 100%;
  height: 18px;
  align-items: center;
  justify-content: flex-end;

  .header-icon-close {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}

// 评论框内容区
.comment-popup-body {
  .van-field {
    padding: 8px;
  }
}


// 评论框底部
.comment-popup-footer {
  width: 100%;
  height: 24px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .footer-word-nums {
    font-size: 14px;
    font-family: @regular;
    font-weight: 400;
    color: #969696;
  }
}

.comment-popup-footer .footer-right-side{
  display: flex;
  align-items: center;

  .footer-emoji-icon {
    width: 24px;
    height: 24px;
    margin-right: 16px;
    cursor: pointer;
  }
  
  .footer-send-btn {
    font-size: 14px;
    font-family: @regular;
    font-weight: 400;
    color: #0CB65B;
    cursor: pointer;
  }

  .footer-send-btn-disabled{
    font-size: 14px;
    font-family: @regular;
    font-weight: 400;
    color: #A3A8AB;
    cursor: pointer;
  }
}

// 表情轮播
.comment-popup-emoji {
  width: 100%;
  height: 160px;
  margin-top: 14px;
  overflow: hidden;
}

// 重写swiper 样式
.comment-popup-emoji .swiper-container {
  width: 100%;
  height: 160px;

  .swiper-wrapper{
    height: 140px;

    .swiper-slide {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      width: 300px;
      height: 134px;
      position: relative;
      left: 8px;
      cursor: pointer;

      .emoji-item {
        width: 14%;

        & img {
          width: 23px;
          height: 23px;
        }
      }
    }
  }

  /deep/ .swiper-pagination {
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);

    & .slide_dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      margin-right: 8px;
      border-radius: 7px;
      background: rgba(224, 224, 224, 1);
    }

    & .slide_dot_active {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 7px;
      background: rgba(150, 150, 150, 1);
    }
  }
}

</style>