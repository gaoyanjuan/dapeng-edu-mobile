<template>
  <section class="guide">
    <h1 class="guide-logo">大鹏教育</h1>
    <div class="guide-btn-open-app" @click="openAppEvent">打开APP</div>
  </section>
</template>

<script>
import { appSource } from '@/utils/device-type'
export default {
  name: "AppGuide",
  methods:{
    openAppEvent(){
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
    }
  }
}
</script>

<style lang="less" scoped>

.guide {
  width: 100%;
  height: 44px;
  padding: 6px 16px;
  position: relative;
  z-index: 20;
  background: @dp-white;
  .l-flex-row()
}

.guide-logo {
  width: 96px;
  height: 33px;
  font-size: 24px;
  font-family: @dp-font-medium;
  font-weight: 600;
  color: #18252C;
}

.guide-btn-open-app {
  width: 80px;
  height: 26px;
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 26px;
  text-align: center;
  font-family: @dp-font-medium;
  background-image: url('~@/assets/icons/common/guide-btn-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>