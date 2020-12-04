<template>
  <section class="call-app-wrapper" :style="`height:${height};margin-top:${marginTop}`">
    <div class="logo"></div>
    <div class="content"></div>
    <div class="bubble-left"></div>
    <div class="bubble-right"></div>

    <div v-if="!wx" class="call-app-btn" @click="onCallApp"> 
      打开大鹏教育APP 
    </div>

    <div v-if="wx" class="guide">
      <span class="txt">点击右上角，选择在浏览器中打开，即可打开大鹏教育APP</span>
      <img class="arrow" :src="arrow" alt="arrow" />
    </div>
  </section>
</template>

<script>
import { openInApp, checkBrowser } from '@/utils/device-type'
export default {
  name:'Call-App',
  layout:'navbar',
  data:() => ({
    wx: true,
    height:'100vh',
    marginTop:'60px',
    arrow:require('@/assets/icons/callapp/arrow.png')
  }),
  mounted(){
    if(checkBrowser()) {
      this.wx = true
      this.marginTop = '60px'
      this.height = 'calc(100vh - 60px)'
    } else {
      this.marginTop = '0px'
      this.height = '100vh'
      this.wx = false
    }
  },
  methods:{
    onCallApp() {
      openInApp()
    }
  }
}
</script>

<style lang="less" scoped>

.call-app-wrapper {
  width: 375px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url('~@/assets/icons/callapp/page-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: fixed;
  overflow: hidden;
}

.logo {
  width: 219px;
  height: 68px;
  margin-top: 68px;
  background-image: url('~@/assets/icons/callapp/logo.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.content {
  width: 297px;
  height: 209px;
  background-image: url('~@/assets/icons/callapp/content.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.call-app-btn {
  width: 200px;
  height: 50px;
  background: #09CB47;
  border-radius: 25px;
  font-size: 15px;
  font-family: @medium;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 50px;
  text-align: center;
  position: absolute;
  bottom: 79px;
}

.guide {
  width: 375px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 23px 9px 30px;
  background-color: #09CB47;
  box-shadow: 0px 2px 10px 0px #45DD70;
  position: fixed;
  top: 0;
}

.guide .txt {
  width: 270px;
  height: 40px;
  font-size: 14px;
  font-family: @medium;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 20px;
}

.guide .arrow {
  width: 44px;
  height: 31px;
}

.bubble-left {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #93E8AE;
  opacity: 0.5;
  position: absolute;
  bottom: 50%;
  left: -40px;
}

.bubble-right {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #93E8AE;
  opacity: 0.5;
  position: absolute;
  bottom: 160px;
  right: -60px;
}

</style>
