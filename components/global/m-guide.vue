<template>
  <section class="guide">
    <h3 class="guide-logo">大鹏教育</h3>

    <div class="guide-btn-open-app" @click="openAppEvent">打开APP</div>

    <div class="guide-inp-search" @click="onSearch">
      <img class="search-icon" :src="search" alt="search" />
      <span class="search-txt">搜索</span>
    </div>
    
    <img class="guide-service" :src="service" alt="service" @click="openServicePop"/>

    <van-badge :content="100" max="99" color="#FF3510">
      <img class="guide-notice" :src="notice" alt="notice" />
    </van-badge>

  </section>
</template>

<script>
import { openInApp } from '@/utils/device-type'
export default {
  name: "AppGuide",

  data:() =>({
    search: require('@/assets/icons/newyear/guide-input-search.png'),
    notice: require('@/assets/icons/newyear/guide-notice.png'),
    service: require('@/assets/icons/newyear/guide-service.png'),
  }),
  methods:{
    openAppEvent(){
      openInApp()
    },

    openServicePop() {
      this.$emit('openServicePop')
    },
    onSearch() {
      this.$router.push({
        path :'search/user'
      })
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
  // background: transparent;
  // background-image: url('~@/assets/icons/newyear/guide-bg.png');
  // background-repeat: no-repeat;
  // background-size: 375px 44px;
  // background-position: center;
  .l-flex-row()
}

.guide-logo {
  width: 102px;
  height: 33px;
  font-size: 24px;
  font-family: @dp-font-medium;
  font-weight: 600;
  color: #18252C;
  margin-right: 5px;
}

.guide-btn-open-app {
  width: 80px;
  // height: 35px;
  height: 26px;
  font-size: 10px;
  // font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 26px;
  // line-height: 33px;
  text-align: center;
  font-family: @dp-font-medium;
  // background-image: url('~@/assets/icons/newyear/guide-btn-bg.png');
  background-image: url('~@/assets/icons/common/guide-btn-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

.guide-inp-search {
  width: 92px;
  height: 27px;
  background-image: url('~@/assets/icons/newyear/guide-input-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 3px 8px 3px 12px;
  margin-right: 10px;
  .l-flex-row();

  .search-icon {
    width: 18px;
    height: 18px;
  }

  .search-txt {
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #E2BAB7;
  }
}

.guide-service {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.van-badge__wrapper {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
}

.guide-notice {
  width: 24px;
  height: 24px;
}
</style>