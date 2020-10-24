<template>
  <div class="fans">
    <div class="fans-navbar-wrap">
      <van-sticky :offset-top="1" :z-index="100">
        <img class="navbar-back-icon" :src="back" @click="onBackEvent"/>
      </van-sticky>
      <van-tabs v-model="$route.query.tab" sticky>
        <van-tab title="关注" name="followers">
          <m-followers />
        </van-tab>
        <van-tab title="粉丝" name="fans">
          <m-fans />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name:'Fans',
  layout:'navbar',
  data: () => ({
    back: require('@/assets/icons/navbar/nav-arrow-back.png'),
  }),
  methods:{
    /** 监听回退 */
    onBackEvent (){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>

.fans-navbar-wrap {
  position: relative;
}

.navbar-back-icon {
  display: block;
  width: 24px;
  height: 25px;
  position: absolute;
  left: 16px;
  top: 8px;
  cursor: pointer;
}

/deep/.van-tabs {
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #747C80;
  line-height: 20px;
}

 /deep/ .van-tabs__nav {
  padding-left: 137px;
  padding-right: 137px;
}

/deep/.van-tab--active {
  font-size: 14px;
  font-family: @dp-font-medium;
  font-weight: 600;
  color: #0CB65B;
  animation: 0.5s appear;
}

/deep/.van-tabs__line {
  width: 16px;
  height: 3px;
  bottom: 15px;
  background: #0CB65B;
  border-radius: 2px;
  background-image: none;
}
</style>