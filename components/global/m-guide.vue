<template>
  <section class="guide">
    <h1 class="guide-logo">大鹏教育</h1>
    <div class="guide-btn-open-app" @click="openAppEvent">打开APP</div>
  </section>
</template>

<script>
import { openInApp } from '@/utils/device-type'
export default {
  name: "AppGuide",
  methods:{
    openAppEvent(){
      openInApp()
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
  // background: @dp-white;
  background: transparent;
  background-image: url('~@/assets/icons/newyear/guide-bg.png');
  background-repeat: no-repeat;
  background-size: 375px 44px;
  background-position: center;
  .l-flex-row()
}

.guide-logo {
  width: max-content;
  height: 33px;
  font-size: 24px;
  font-family: @dp-font-medium;
  font-weight: 600;
  color: #18252C;
}

.guide-btn-open-app {
  width: 80px;
  height: 35px;
  // height: 26px;
  font-size: 10px;
  // font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  // line-height: 26px;
  line-height: 33px;
  text-align: center;
  font-family: @dp-font-medium;
  background-image: url('~@/assets/icons/newyear/guide-btn-bg.png');
  // background-image: url('~@/assets/icons/common/guide-btn-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
</style>