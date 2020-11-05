<template>
  <div>
    <div class="teacher-audio-box" v-if="isAudio">
      <div class="userInfo-box">
        <div>
          {{ teacherName }}
          <img v-if="teacherType === 'VIP' || teacherType === 'CHILD'" src="@/assets/icons/comment/lecturer-tag.png" />
          <img v-else src="@/assets/icons/comment/teacher-tag.png" />
        </div>
      </div>
      <div class="content">
        <the-audio 
          audioType="mobile"
          :audioCount="audioCount" 
          :audioUrl="audioUrl"
          :propIndex="propIndex"
        >
        </the-audio>
      </div>
    </div>
    <div class="teacher-text-box" v-else>
      <div ref="view">
        <span>{{ teacherName }}</span>
        <img v-if="teacherType === 'VIP' || teacherType === 'CHILD'" src="@/assets/icons/comment/lecturer-tag.png" />
        <img v-else src="@/assets/icons/comment/teacher-tag.png" />
        <div ref="text" v-html="$options.filters.formatEmotions(content)"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propIndex:{
      type: Number,
      dafault: 0
    },
    teacherName: {
      type: String,
      default: '多多老师'
    },
    time: {
      type: Number,
      default: 152121218738
    },
    teacherType: {
      type: String,
      default: 'lecturer'
    },
    content: {
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
    }
  },
  mounted () {
    if (!this.isAudio) {
      const height = this.$refs.view.offsetHeight
      for (let i=0; i < this.content.length; i++) {
        this.$refs.text.innerHTML = this.content.substr(0, (i+1))
        if(height < this.$refs.view.scrollHeight) {
          this.$refs.text.innerHTML = this.content.substr(0, i-3) + '...'
          break;
        }
      }
    } 
  },
}
</script>

<style lang="less" scoped>
.teacher-audio-box {
  width: 100%;
  min-height: 52px;
  max-height: 94px;
  background: #F6F6F6;
  border-radius: 8px;
  padding: 16px 6px 16px 16px;
  box-sizing: border-box;
  display: flex;
  &>.userInfo-box {
    display: flex;
    height: 20px;
    flex-direction: column;
    justify-content: space-between;
    &>:nth-child(1) {
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #0CB65B;
      line-height: 20px;
      img {
        margin-left: 2px;
        width: 31px;
        height: 16px;
        vertical-align: middle;
      }
    }
  }
  .content {
    min-height: 20px;
    margin-left: 16px;
    span {
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #18252C;
      line-height: 20px;
    }
  }
}
.teacher-text-box {
  width: 100%;
  min-height: 52px;
  background: #F6F6F6;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
  &>div {
    margin: 16px;
    max-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #0CB65B;
    line-height: 20px;
    &>span {
      float: left;
    }
    &>img {
      float: left;
      margin-top: 2px;
      margin-left: 4px;
      margin-right: 4px;
      width: 31px;
      height: 16px;
      vertical-align: middle;
    }
    &>div {
      font-size: 14px;
      word-break: break-all;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #18252C;
      line-height: 20px;
      /deep/.emotion {
        width: 20px;
        height: 20px;
        vertical-align: text-bottom;
      }
    }
  }
}
</style>