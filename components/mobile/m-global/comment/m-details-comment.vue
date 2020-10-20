<template>
  <div class="comment">
    <div class="comment-header">
      <div class="comment-header-left">
        <headImage
          :headImg="user ? user.avatar : ''"
          imgWidth="33px"
          imgHeight='33px'
        />
        <div class="userinfo-box">
          <div :class="{ 'teacher': isTeacher }">
            {{ user ? user.nickname : '佚名' }}
            <span v-if="isTeacher">
              <img v-if="teacherType === 'VIP' || teacherType === 'CHILD'" src="@/assets/images/common/lecturer-tag.png" />
              <img v-else src="@/assets/images/common/teacher-tag.png" />
            </span>
          </div>
          <div>{{ time | commonDate }}</div>
        </div>
      </div>
      <div class="thumb-box">
        <img src="@/assets/images/icon/common/like.png" alt="">
        <span>{{ thumbNumber | studentsCount }}</span>
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
      <span v-html="$options.filters.formatEmotions(content)"></span>
    </div>
    <div v-if="contentImages" class="content-img" @click="showDialogEvent(contentImages)">
      <img :src="contentImages" :alt="contentImages">
    </div>
  </div>
</template>

<script>
import audio from '@/assets/images/audio-img/mobile/audio.png'
import audioPlay from '@/assets/images/audio-img/mobile/audio.gif'
export default {
  props: {
    user: {
      type: Object,
      default: null
    },
    parentUser: {
      type: Object,
      default: null
    },
    replyUser: {
      type: Object,
      default: null
    },
    time: {
      type: Number,
      default: 0
    },
    thumbNumber: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: ''
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
      audioImg: audio,
      audio: null
    }
  },
  mounted () {
    this.audio = new Audio(this.audioUrl)
  },
  methods: {
    palyAudio () {
      this.audioImg = audioPlay      
      this.audio.play()
      this.audio.addEventListener('ended', () => {
        this.audioImg = audio
      })
    },
    showDialogEvent (img) {
      this.ImagePreview([img])
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
    .thumb-box {
      display: flex;
      align-items: center;
      img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
      }
      span {
        margin-left: 4px;
        margin-right: 2px;
        font-size: 11px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #A6AEA9;
        line-height: 16px;
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
      height: 120px;
      border-radius: 5px;
    }
  }
}

.black-text {
  color: #36404A;
  margin: 0 3px;
}
</style>