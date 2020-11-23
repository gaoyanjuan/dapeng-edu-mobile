<template>
  <div class="app-submit-wrap">
    <van-popup v-model="appPopParams.show" round class="app-pop" get-container=".app_wrap" :transition-appear="true">
      <div class="app-img-wrap">
        <img :src="appImg" alt="APP" />
      </div>
      <div class="app-tips">网页版暂不支持发布小视频</div>
      <div class="app-tips">同学可以前往APP端发布哟~</div>
      <div class="app-submit-button" @click="openAppEvent">去APP发布</div>
      <div class="app-cancel-button" @click="cancelToApp">取消</div>
    </van-popup>
  </div>
</template>
<script>
import { appSource } from '@/utils/device-type'
export default {
  props: {
    appPopParams: {
      type: Object,
      default: () => {
        show: false
      }
    }
  },
  data() {
    return {
      appImg: require('@/assets/icons/homework/app-homework.png')
    }
  },
  methods: {
    cancelToApp() {
      this.appPopParams.show = false
    },
    openAppEvent() {
      const device = appSource()
      if (device.type === 'ios') {
        location.href = 'https://enroll.dapengjiaoyu.com'
      }
      if (device.type === 'andriod') {
        let ifr = document.createElement('iframe')
        ifr.src = 'dpedu://com.app.zhijin'
        ifr.style.display = 'none'
        document.body.appendChild(ifr)
        // 等待一段时间后，无反应则URL跳转
        setTimeout(() => {
          location.href = 'https://enroll.dapengjiaoyu.com'
        }, 1500)
      }
      this.appPopParams.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.app-pop {
    width: 260px;
    height: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .app-img-wrap {
      margin-top: 26px;
      width: 146px;
      height: 98px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .app-tips {
      font-size: 14px;
      font-weight: 600;
      color: #363d35;
      line-height: 24px;
      font-family: @dp-font-semibold;
    }
    .app-submit-button {
      margin-top: 8px;
      margin-bottom: 12px;
      width: 212px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #fff;
      font-weight: 500;
      background: url('~@/assets/icons/homework/app-button-homework.png')
        no-repeat center center;
      background-size: 100%;
      font-family: @dp-font-medium;
    }
    .app-cancel-button {
      font-size: 12px;
      color: #adadad;
      font-family: @dp-font-regular;
    }
  }
</style>
