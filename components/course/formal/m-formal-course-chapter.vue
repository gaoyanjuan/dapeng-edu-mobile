<template>
  <div class="m-vip-chapter-wrapper">
    <m-navbar :title="chapter.title"></m-navbar>

    <!-- 学管推荐标识LOGO -->
    <img v-if="chapter.learning" :src="recommend" class="navbar-recommend-logo" />
    
    <van-tabs v-model="activeName" sticky offset-top="1.17333rem" @click="onSwitchTab">
      <van-tab title="直播课" name="living">
        <m-living-list />
      </van-tab>
      <van-tab title="直播回放" name="playback">
        <m-playback-list />
      </van-tab>
      <van-tab title="录播课" name="record">
        <m-record-list />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name:'Vip-Chapter',
  props:{
    chapter:{
      type:Object,
      default:{}
    }
  },

  data: ()=> ({
    activeName:'living',
    recommend: require('@/assets/icons/course/recommend.png')
  }),

  mounted() {
    let route = this.$route.query.state || 'living'
    this.activeName = route
  },

  methods: {
    onSwitchTab(name) {
      if(name === this.$route.query.state) return
      this.$router.replace({ query: { ...this.$route.query, state: name } })
    }
  }
}
</script>

<style lang="less" scoped>
.m-vip-chapter-wrapper {
  width: 375px;
  min-height: 100vh;
  background: @dp-white;
}

.navbar-recommend-logo {
  position: fixed;
  top: 0;
  right: 30px;
  width: 45px;
  height: 42px;
  z-index: 2001;
}

/deep/.van-tabs {
  padding-top: 44px;
}

/deep/.van-sticky--fixed {
  transform: translateX(-50%);
}

/deep/.van-tabs__wrap {
  width: 375px;
  height: 40px;
  border-bottom: 1px solid #EEEEEE;
}

/deep/.van-tab {
  font-size: 14px;
  font-family: @regular;
  font-weight: 400;
  color: #747C80;
}

/deep/.van-tab--active {
  font-size: 14px;
  font-family: @medium;
  font-weight: 500;
  color:#00B93B;
}

/deep/.van-tabs__line {
  width: 20px;
  height: 4px;
  bottom: 15px;
  border-radius: 2px;
  background: #00B93B;
  background-image: none;
}
</style>