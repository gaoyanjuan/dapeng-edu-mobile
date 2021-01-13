<template>
  <div class="m-trial-chapter-wrapper">
    <m-navbar :title="chapter.title"></m-navbar>
    
    <div class="chapter-list">
      <template v-for="(chapter, index) in chaptersListGetters">
        
        <div :key="index">
          <div class="chapter-time">
            <span class="time-dot"></span>
            <span class="time"> {{ chapter.time | formatLiveDate}} </span>
          </div>

          <ul class="timeline">

            <li class="timeline-item" v-for="item in chapter.liveChapters" :key="item.id">
              <div class="timeline-content">
                
                <span class="timeline-title van-ellipsis"> {{ item.title }} </span>
                <span class="timeline-live-time">
                  直播时间 {{ item.startTime | formatChapterTime(item.finishTime) }}
                </span>
                
                <div class="timeline-footer"> 
                  <div class="footer-left-side">
                    <img class="avatar" :src="item.teacher.avatar" alt="avatar" />
                    <span class="nickname"> {{ item.teacher.nickname }} </span>
                  </div>

                  <div class="footer-right-side" @click="onClick(item)">
                    <div v-if="item.liveStatus === 'LIVING'"  class="btn-living">直播中</div>
                    <div v-if="item.liveStatus === 'SOON_START'" class="btn-living">即将开始</div>
                    <div v-if="item.liveStatus === 'UNSTART'" class="btn-unstart">未开始</div>
                    <div v-if="item.liveStatus === 'FINISH'" class="btn-end">已结束</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'Trial-Chapter',

  props:{
    chapter:{
      type:Object,
      default:{}
    }
  },

  data: () => ({}),

  computed: {
    ...mapGetters('course', [
      'chaptersListGetters'
    ])
  },

  methods:{
    onClick(params) {
      if(params.liveStatus === 'UNSTART') {
        let time = this.formatTime(params.startTime)
        this.$toast(`直播开始时间：${time}`)

      } else if (params.liveStatus === 'FINISH') {
        this.$toast('当前直播已结束')
      }
    },

    formatTime(time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style lang="less" scoped>
.m-trial-chapter-wrapper {
  width: 375px;
  height: 100vh;
  background: #F8F8F8;
}

.chapter-list {
  padding: 60px 16px;

  :last-child {
    .timeline:before {
      bottom: 0;
    }
  }
}

.chapter-time {
  display: flex;
  align-items: center;
  width: 100%;
  height: 17px;
}

.chapter-time .time-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: #0CB65B;
}

.chapter-time .time {
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #747C80;
}

.timeline {
  position: relative;
  margin-top: 15px;
}

.timeline:before {
	content: '';
	position: absolute;
	top: -19px;
	bottom: -15px;
	width: 2px;
	background: #E7E9E9;
	left: 3px;
}

.timeline-item {
	position: relative;
	padding-left: 15px;
	list-style: none;
	margin-bottom: 12px;
}
	
.timeline-content {
  position: relative;
  width: 327px;
  height: 115px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 8px;
}

.timeline-title {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  font-size: 16px;
  font-family: @medium;
  font-weight: 600;
  color: #18252C;
}

.timeline-live-time {
  line-height: 17px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #747C80;
  margin-top: 4px;
}

.timeline-footer {
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}

.footer-left-side {
  display: flex;
  align-items: center;

  .avatar {
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 4px;
  }

  .nickname {
    font-size: 14px;
    font-family: @semibold;
    font-weight: 600;
    color: #36404A;
  }
}

.footer-right-side .btn-living {
  width: 70px;
  height: 28px;
  font-size: 12px;
  font-family: @medium;
  font-weight: 600;
  color: #0CB65B;
  text-align: center;
  line-height: 28px;
  background: #E5F8EB;
  border-radius: 17px;
}

.footer-right-side .btn-end {
  width: 70px;
  height: 28px;
  font-size: 12px;
  font-family: @medium;
  font-weight: 500;
  color: #D1D3D5;
  text-align: center;
  line-height: 28px;
  border-radius: 17px;
  border: 1px solid #D1D3D5;
}

.footer-right-side .btn-unstart {
  width: 70px;
  height: 28px;
  font-size: 12px;
  font-family: @medium;
  font-weight: 500;
  color: #747C80;
  text-align: center;
  line-height: 28px;
  background: #F1F1F2;
  border-radius: 17px;
}
</style>
