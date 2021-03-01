<template>
  <van-sticky>
    <section class="m-call-app-wrapper">

      <div class="left-side-cloumn">
        <img class="logo" :src="logo" alt="logo" />
        <div class="logo-info">
          <span>大鹏教育</span>
          <span>学我想学 找到生活的热情</span>
        </div>
      </div>
      
      <div class="right-side-cloumn">
        <!--打开APP-->
        <div class="btn-call-app" @click="openAppEvent">打开APP</div>
      </div>
    </section>
  </van-sticky>
</template>

<script>
import { openInApp } from '@/utils/device-type'
export default {
  name:'M-Call-App',
  data: () => ({
    logo: require('@/assets/icons/callapp/dp-design.png')
  }),
  methods:{
    openAppEvent(){
      openInApp()
    }
  }
}
</script>

<style lang="less" scoped>
.m-call-app-wrapper {
  width: 375px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  margin-bottom: 2px;
  background: #FFFFFF;
  // background-image: url('~@/assets/icons/newyear/call-app-bg.png');
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.05);
}

.m-call-app-wrapper .left-side-cloumn {
  display: flex;
  align-items: center;

  .logo {
    width: 38px;
    height: 38px;
    //  width: 46px;
    // height: 47px;
  }

  .logo-info {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
  }

  .logo-info span:first-child {
    font-size: 15px;
    font-family: @semibold;
    font-weight: 600;
    color: #18252C;
    line-height: 21px;
  }

  .logo-info span:last-child {
    font-size: 10px;
    font-family: @regular;
    font-weight: 400;
    color: #747C80;
    line-height: 17px;
  }
}

.m-call-app-wrapper .right-side-cloumn {
  display: flex;
  align-items: center;

  .btn-call-app {
    width: 88px;
    height: 34px;
    font-size: 14px;
    font-family: @semibold;
    font-weight: 600;
    color: #0CB65B;
    line-height: 34px;
    text-align: center;
    border-radius: 18px;
    border: 1px solid #0CB65B;
    // width: 96px;
    // height: 42px;
    // background: transparent;
    // background-image: url('~@/assets/icons/newyear/call-app-btn-bg.png');
    // background-repeat: no-repeat;
    // background-size: 96px 42px;

    &:active {
      background: rgb(235, 233, 233);
    }
  }
}
</style>
