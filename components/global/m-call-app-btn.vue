<template>
  <section class="call-app-btn-wrap" @click="openAppEvent">打开APP</section>
</template>

<script>
import { openInApp } from '@/utils/device-type'
export default {
  name:'M-Call-App-Btn',
  methods:{
    openAppEvent(){
      openInApp()
    }
  }
}
</script>

<style lang="less" scoped>
.call-app-btn-wrap {
  width: 155px;
  height: 73px;
  // width: 140px;
  // height: 42px;
  background: transparent;
  background-image: url('~@/assets/icons/newyear/call-app-big-btn-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 73px;
  // background: linear-gradient(270deg, #0CB65B 0%, #1CDC94 100%);
  // box-shadow: 0px 4px 10px 0px rgba(0, 111, 52, 0.2);
  // border-radius: 22px;

  font-size: 22px;
  font-family: @semibold;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 73px;
  text-align: center;
  // text-shadow: 0px 4px 10px rgba(0, 111, 52, 0.2);

  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
