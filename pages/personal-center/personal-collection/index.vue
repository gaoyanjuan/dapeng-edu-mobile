<template>
  <div>
    <m-navbar title="我的收藏" />

    <div class="tabs-wrap">
      <van-tabs v-model="active" sticky :offset-top="44" @click="onTabsClick">
        <van-tab title="作业">
          <personal-homework-posts pageName="myCollection" />
        </van-tab>
        <van-tab title="作品">
          <personal-works-posts pageName="myCollection" />
        </van-tab>
        <van-tab title="动态">
          <personal-dynamic-posts pageName="myCollection" />
        </van-tab>
        <van-tab title="活动">
          <personal-growth-posts pageName="myCollection" />
        </van-tab>
        <!-- <van-tab title="阅读">
          <personal-reading-posts />
        </van-tab>
        <van-tab title="视频">
          <personal-video-posts />
        </van-tab> -->
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name:'PersonalCollection',
  layout:'navbar',
  data:() => ({
    active: 0,
  }),
  mounted() {
    /**
     * 路由定位
     */
    let query = this.$route.query.type || 'homework'
    let tabs = ['homework','works','dynamic','growth','reading','video']
    this.active = tabs.findIndex(tab => tab === query)
  },
  methods:{
    ...mapMutations('user', [
      'clearUserFavorites'
    ]),
    /**
     * 监听菜单切换事件，
     * 挂载Type参数给路由
     */
    onTabsClick(index) {
      let tabs = ['homework','works','dynamic','growth','reading','video']
      if(this.$route.query.type === tabs[index]) return
      this.$router.replace({ query: { ...this.$route.query, type: tabs[index] } })
    }
  },
  destroyed() {
    this.clearUserFavorites()
  }
}
</script>

<style lang="less" scoped>

.tabs-wrap {
  padding-top: 44px;
}

/deep/.van-tabs {
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #747C80;
  line-height: 20px;
}

/deep/.van-tabs__wrap {
  border-bottom: 1px solid #EAEAEA;

  .van-tab {
    padding: 0 10px;
  }
}

/deep/ .van-tabs__nav {
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0px 1px 0px 0px #EAEAEA;
}

/deep/.van-tab--active {
  font-size: 14px;
  font-family: @dp-font-medium;
  font-weight: 400;
  color: #0CB65B;
  animation: 0.5s appear;
}

/deep/.van-tabs__line {
  width: 26px;
  height: 4px;
  bottom: 15px;
  background: #0CB65B;
  border-radius: 2px;
  background-image: none;
}
</style>