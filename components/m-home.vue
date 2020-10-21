<template>
  <div class="app_wrap">
    <!--菜单导航 -->
    <van-tabs v-model="activeName" sticky @click="onMenusClick" @scroll="onScrollEvent">
      <van-tab title="关注" name="follow" to="/">
        <template v-if="$route.name === 'index'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="推荐" name="hotlists" to="/hotlists">
        <template v-if="$route.name === 'index-hotlists'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="作业" name="homework">
        <template #title>
          <div class="tab-drop-menus-wrap">
            <span>{{dropMenusName}}</span>
            <img class="tab-arrow" v-if="activeName === 'homework'" :src="showDownMenu ? tabUp : tabDown" @click.stop="openDropdownMenu" />
          </div>
        </template>
        <template v-if="$route.name === 'index-homework'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="作品" name="works" to="/works">
        <template v-if="$route.name === 'index-works'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="动态" name="dynamic" to="/dynamic">
        <template v-if="$route.name === 'index-dynamic'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="成长" name="growth" to="/growth">
        <template v-if="$route.name === 'index-growth'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="阅读" name="reading" to="/reading">
        <template v-if="$route.name === 'index-reading'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="视频" name="video" to="/video">
        <template v-if="$route.name === 'index-video'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="小视频" name="short-video" to="/short-video">
        <template v-if="$route.name === 'index-short-video'">
          <nuxt-child />
        </template>
      </van-tab>
    </van-tabs>

    <!-- 下拉菜单筛选 -->
    <div v-show="showDownMenu">
      <div class="tab-drop-down-menus" ref="downMenus" :style="scrollTop">
        <div 
          v-for="item in downMenuOptions"
          :key="item.value"
          :class="dropMenuValue === item.value ? 'menus-item-active' : 'menus-item'"
          @click.stop="onChangeDropMenus(item)"
        >
          {{item.text}}
        </div>
      </div>
    </div>

    <!-- 遮罩弹层 -->
    <van-overlay :show="showDownMenu" @click="showDownMenu = false" z-index='11'/>
  </div>
</template>

<script>
export default {
  name:'M-Home',
  data: () => ({
    showDownMenu: false,
    scrollTop: 'top:88px;',
    activeName: 'follow',
    dropMenusName: '作业',
    dropMenuValue: '',
    downMenuOptions: [
      { text: '全部', value: '' },
      { text: '体验课', value: 'TEST' },
      { text: '正式课', value: 'VIP' },
      { text: '亲子课', value: 'CHILD' },
    ],
    tabUp: require('@/assets/icons/navbar/nav-arrow-up.png'),
    tabDown: require('@/assets/icons/navbar/nav-arrow-down.png'),
  }),
  mounted() {
    /**
     * 路由定位
     */
    const to = this.$route
    if (to.name === 'index') {
      this.activeName = 'follow'
    } else if (to.name === 'index-hotlists') {
      this.activeName = 'hotlists'
    } else if (to.name === 'index-homework') {
      this.activeName = 'homework'
    } else if (to.name === 'index-growth') {
      this.activeName = 'growth'
    } else if (to.name === 'index-dynamic') {
      this.activeName = 'dynamic'
    } else if (to.name === 'index-works') {
      this.activeName = 'works'
    } else if (to.name === 'index-reading') {
      this.activeName = 'reading'
    } else if (to.name === 'index-video') {
      this.activeName = 'video'
    } else if (to.name === 'index-short-video') {
      this.activeName = 'short-video'
    }

    /***
     * 下拉菜单选择定位
     */
    if (to.query.courseType) {
      this.setDownMenusPosition(to)
    }
  },
  methods:{
    /** 打开下拉菜单 */
    openDropdownMenu(){
      this.showDownMenu = !this.showDownMenu
    },

    /** 
     * 点击切换导航菜单 ；
     * 导航按钮-作业比较特殊；
     * HTML结构未设置路由跳转；
     * 而是转为this.$router.replace；
     * 这样做是避免路由双执行的报错；
     * 另外，作业下还有按钮筛选；
     * 也是为了参数缓存；
    */
    onMenusClick(name, title) {
      if(name === 'homework') {
        if(this.$route.name === 'index-homework') {
          this.showDownMenu = !this.showDownMenu
          return
        }
        this.$router.replace({
          path: '/homework',
          query: {
            ...this.$route.query,
            courseType: this.dropMenuValue
          }
        })
      }
      if(name !== 'homework') {
        this.showDownMenu = false
      }
    },

    /** 监听切换下拉菜单事件 */
    onChangeDropMenus(params) {
      this.dropMenusName = params.text
      if(params.text === '全部') {
        this.dropMenusName = '作业'
      }
      this.dropMenuValue = params.value
      this.showDownMenu = !this.showDownMenu
      if(this.$route.query.courseType === params.value) return
      this.$router.replace({ query: { ...this.$route.query, courseType: params.value } })
    },

    /** 监听滚动，仅在Sticky模式下生效*/
    onScrollEvent(params) {
      if(params.scrollTop > 30) {
        this.scrollTop = 'top:44px;'
      } else {
        this.scrollTop = 'top:'+ (88 - params.scrollTop) +'px;'
      }
    },

    /***下拉菜单选择定位 */
    setDownMenusPosition(to) {
      this.downMenuOptions.forEach(element => {
        if (element.value === to.query.courseType) {
          this.dropMenuValue = element.value
          if(element.text === '全部') {
            this.dropMenusName = '作业'
          } else {
            this.dropMenusName = element.text
          }
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>

.app_wrap {
  width: 100%;
  min-height: calc(100vh - 94px);
  background: @dp-white;
  box-sizing: border-box;
}


/deep/ .van-tabs__wrap {
  padding-left: 8px;
  position: relative;
  background-color: @dp-white;
  z-index: 13;
}

@media (max-width: 330px)  {
  /deep/ .van-tabs__wrap {
    padding-left: 8px;
    position: relative;
    background-color: @dp-white;
    z-index: 13;
  }
}

/deep/ .van-tab__text--ellipsis {
  overflow: visible;
}

.tab-drop-menus-wrap {
  width: max-content;
  position: relative;
  display: flex;
  align-items: center;
  z-index: 13;
}

.tab-arrow {
  position: absolute;
  width: 6px;
  height: 4px;
  right: -10px;
  z-index: 13;
}

.tab-drop-down-menus {
  position: fixed;
  top: 44px;
  width: 375px;
  height: 68px;
  padding: 0 16px;
  background: @dp-white;
  z-index: 13;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menus-item {
  width: 78px;
  height: 36px;
  background: #F5F5F5;
  border-radius: 8px;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
}

.menus-item-active {
  width: 78px;
  height: 36px;
  background: rgba(12, 182, 91, 0.1);
  border-radius: 8px;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #0CB65B;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
}
</style>
