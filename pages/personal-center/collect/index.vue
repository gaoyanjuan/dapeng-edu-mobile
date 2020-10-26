<template>
  <div>
    <m-navbar title="我的收藏" />

    <div class="fancy-tabs-wrap">
      <van-tabs v-model="active" sticky :offset-top="44">
        <van-tab
          v-for="(item, i) in menusList"
          :key="i"
          :title="item.title"
          :to="item.route"
          :replace="true"
        >
          <nuxt-child keep-alive />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name:'Collect',
  layout:'navbar',
  data:() => ({
    active: 0,
    menusList: [{
      title: '作业',
      route: '/personal-center/fancy'
    },{
      title: '作品',
      route: '/personal-center/fancy/works'
    },{
      title: '动态',
      route: '/personal-center/fancy/dynamic'
    },{
      title: '活动',
      route: '/personal-center/fancy/growth'
    },{
      title: '阅读',
      route: '/personal-center/fancy/reading'
    },{
      title: '视频',
      route: '/personal-center/fancy/video'
    }]
  }),
  mounted() {
    /**
     * 路由定位
     */
    switch (this.$route.name) {
      case 'personal-center-fancy-index':
        this.active = 0
        break;
      case 'personal-center-fancy-index-works':
        this.active = 1
        break;
      case 'personal-center-fancy-index-dynamic':
        this.active = 2
        break;
      case 'personal-center-fancy-index-growth':
        this.active = 3
        break;
      case 'personal-center-fancy-index-reading':
        this.active = 4
        break;
      case 'personal-center-fancy-index-video':
        this.active = 5
        break;
      default:
        this.active = 0
        break;
    }
  }
}
</script>

<style lang="less" scoped>

.fancy-tabs-wrap {
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