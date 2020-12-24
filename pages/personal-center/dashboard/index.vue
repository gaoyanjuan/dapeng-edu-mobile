<template>
  <div class="fans">

    <!-- 关注和粉丝列表 -->
    <div v-if="$route.query.type !== 'recommend'" class="fans-navbar-wrap">
      <van-sticky :offset-top="1" :z-index="100">
        <img class="navbar-back-icon" :src="back" @click="onBackEvent"/>
      </van-sticky>
      <van-tabs v-model="activeName" sticky @click="onTabsClick">
        <van-tab :title=" interactionNews ? '关注' : 'TA的关注'" name="attention">
          <m-followers v-if="activeName === 'attention'" />
        </van-tab>
        <van-tab :title="interactionNews ? '粉丝' : 'TA的粉丝'" name="fans">
          <m-fans v-if="activeName === 'fans'" />
        </van-tab>
      </van-tabs>
    </div>

    <!-- 我的推荐列表 -->
    <div v-else>
      <personal-recommend />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'Dashboard',
  layout:'navbar',
  data: () => ({
    activeName:'attention',
    back: require('@/assets/icons/navbar/nav-arrow-back.png'),
   interactionNews: true
  }),
  mounted(){
    /**
     * 路由定位
     */
    this.activeName = this.$route.query.type || 'attention'
    if (this.$route.query.userId === this.userInfoGetters.userId) {
      this.interactionNews = true
    } else {
      this.interactionNews = false
    }
  },
  computed: {
    ...mapGetters('user',[
      'userInfoGetters'
    ])
  },
  methods:{
    /** 监听回退 */
    onBackEvent (){
      this.$router.go(-1)
    },
    /**
     * 监听菜单切换事件，
     * 挂载Type参数给路由
     */
    onTabsClick(name) {
      let tabs = ['attention','fans']
      if(this.$route.query.type === name) return
      this.$router.replace({ query: { ...this.$route.query, type: name } })
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
/deep/ .van-tab__text--ellipsis {
  width: 60px;
  text-align: center;
}

</style>