<template>
  <div v-if="showFooter.show" class="open-app-wrapper">
    <img class="open-app-btn" :src="openBtn" alt="" @click="openApp"/>
    <img class="close-btn" :src="close" alt="close" @click="onClose"/>
  </div>
</template>

<script>
import { appSource } from '@/utils/device-type'
export default {
  name:'Submit-Open-App',
  props:{
    showFooter:{
      type:Object,
      default:{}
    }
  },
  data:() => ({
    openBtn:require('@/assets/icons/submit/open-app.png'),
    close:require('@/assets/icons/submit/close.png'),
  }),
  methods:{
    /** 唤起APP */
    openApp() {
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
    },
    /** 关闭 */
    onClose() {
      this.$emit('closeFooter')
    }
  }
}
</script>

<style lang="less" scoped>

.open-app-wrapper {
  width: 375px;
  height: 79px;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  background-color: transparent;
  background-image: url('~@/assets/icons/submit/footer-open-app-bg.png');
  background-repeat: no-repeat;
  background-size: 375px 79px;

  .open-app-btn {
    width: 100px;
    height: 52px;
    position: absolute;
    right: 5px;
    bottom: 5px;
    cursor: pointer;
  }

  .close-btn {
    width: 16px;
    height: 16px;
    position: absolute;
    right: 16px;
    bottom: 70px;
    cursor: pointer;
  }
}
</style>