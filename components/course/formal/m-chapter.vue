<template>
  <div class="chapter-cell" @click="enterLiveRoom">
    <div class="left-side-cloumn">
      <span :class="chapter.haveLearned ? 'chapter-title-learned van-ellipsis':'chapter-title van-ellipsis'">
        {{ chapter.title }}
      </span>

      <div class="chapter-info-wrap">
        <span class="chapter-living-time">
          直播：{{ chapter.startTime | formatLiveTime(chapter.finishTime) }}
        </span>

        <span class="chapter-percentage" v-if="chapter.haveLearned">
          已看 {{chapter.percentage}}%
        </span>
      </div>
    </div>

    <div class="right-side-cloumn">
      <div v-if="chapter.liveStatus === 'FINISH'" class="btn-finish button">已结束</div>
      <div v-if="chapter.liveStatus === 'PLAYBACK'" class="btn-playback button">回放</div>
      <div v-if="chapter.liveStatus === 'UNSTART'" class="btn-unstart button">未开始</div>
      <div v-if="chapter.liveStatus === 'LIVING'"  class="btn-living button">直播中</div>
      <div v-if="chapter.liveStatus === 'SOON_START'" class="btn-living button">即将开始</div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name:'M-Chapter',

  props:{
    chapter:{
      type:Object,
      default:{}
    }
  },

  computed: {
    courseUrl() {
      return this.validateSystemHostName().course_host 
    }, 
  },

  methods:{
    enterLiveRoom() {
      if(this.chapter.liveStatus === 'UNSTART') {
        let time = this.formatTime(this.chapter.startTime)
        this.$toast(`直播开始时间：${time}`)

      } else if (this.chapter.liveStatus === 'FINISH') {
        this.$toast('直播已结束')

      } else {
        window.location.href = `${this.courseUrl}/secure/course/${this.courseId}/live/${params.id}`
      }
    },

    formatTime(time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style lang="less" scoped>
.chapter-cell {
  width: 100%;
  height: 76px;
  padding: 20px 16px;
  background: @dp-white;
  position: relative;
  .l-flex-row();
}

.chapter-cell:not(:first-child) {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 340px;
    height: 1px;
    background: #EEEEEE;
  }
}

.chapter-cell .left-side-cloumn {
  display: flex;
  flex-direction: column;

  .chapter-title {
    max-width: 260px;
    height: 15px;
    font-size: 15px;
    font-family: @medium;
    font-weight: 600;
    color: #18252C;
    line-height: 16px;
  }

  .chapter-title-learned {
    max-width: 260px;
    height: 15px;
    font-size: 15px;
    font-family: @medium;
    font-weight: 600;
    color: #75737E;
    line-height: 16px;
  }

  .chapter-info-wrap {
    display: flex;
    align-items: center;
    flex-direction: row;

    max-width: 260px;
    height: 13px;
    font-size: 13px;
    font-family: @regular;
    font-weight: 400;
    color: #75737E;
    margin-top: 8px;

    .chapter-living-time {
      margin-right: 5px;
    }
  }
}

.chapter-cell .right-side-cloumn {
  font-size: 12px;
  font-family: @medium;
  font-weight: 600;

  .button {
    width: 70px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 17px;
  }

  .btn-finish {
    color: #D1D3D5; 
    border: 1px solid #D1D3D5;
  }

  .btn-playback {
    color: #4C4C4C;
    border: 1px solid #D2D2D2;
  }

  .btn-unstart {
    color: #747C80;
    background-color: rgba(116, 124, 128, 0.1);
  }

  .btn-living {
    color: #0CB65B;
    background: #E5F8EB;
  }
}
</style>