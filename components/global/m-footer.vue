<template>
  <van-tabbar v-model="active" z-index="10" @change="onChangeTabs">
    <van-tabbar-item name="home">
      <a :href="mBaseUrl"><span class="tabbar-btn-text-active">返回官网</span></a>
      <template #icon="props">
        <a :href="mBaseUrl"><img :src="props.active ? home.active : home.active" /></a>
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="square" to="/">
      <span>广场</span>
      <template #icon="props">
        <img :src="props.active ? square.active : square.inactive" />
      </template>
    </van-tabbar-item>
    <div class="submit">
      <img :src="upload.active" />
    </div>
    <van-tabbar-item name="activities" to="/activities">
      <span>活动</span>
      <template #icon="props">
        <img :src="props.active ? activities.active : activities.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="personal-center" to="/personal-center">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? mine.active : mine.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    baseUrl: process.env.baseUrl,
    mBaseUrl : process.env.mBaseUrl,
    active: 'square',
    home: {
      active: require('@/assets/icons/tabbar/bar-home.png'),
    },
    square: {
      active: require('@/assets/icons/tabbar/bar-square-active.png'),
      inactive: require('@/assets/icons/tabbar/bar-square.png'),
    },
    upload: {
      active: require('@/assets/icons/tabbar/bar-submit.png'),
    },
    activities: {
      active: require('@/assets/icons/tabbar/bar-activity-active.png'),
      inactive: require('@/assets/icons/tabbar/bar-activity.png'),
    },
    mine: {
      active: require('@/assets/icons/tabbar/bar-mine-active.png'),
      inactive: require('@/assets/icons/tabbar/bar-mine.png'),
    },
  }),
  mounted() {
    /**
     * 路由定位
     */
    const to = this.$route || { name: 'index' }
    if (to.name === 'index') {
      this.active = 'square'
    } else if (to.name === 'home') {
      this.active = 'home'
    } else if (to.name === 'activities') {
      this.active = 'activities'
    } else if (to.name === 'personal-center') {
      this.active = 'personal-center'
    }
  },
  methods:{
    /***
     * 返回官网暂不能点击，切换状态保持不变
     */
    onChangeTabs(tab){
      if(tab === 'home'){
        this.active = this.$route.name
        if(this.$route.name === 'index') {
          this.active = 'square'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-tabbar--fixed {
  width: 100%;
  height: 50px;
  box-shadow: 0px -2px 8px 0px rgba(0, 0, 0, 0.05);
  background-image: url('~@/assets/icons/tabbar/bar-tabbar-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

/deep/ .van-tabbar-item {
  height: 50px;
  font-family: @dp-font-medium;
  font-weight: 600;
}

.submit {
  flex: 1;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > img {
    width: 37px;
    height: 37px;
  }
}

.tabbar-btn-text-active {
  color: #0CB65B;
}

</style>
