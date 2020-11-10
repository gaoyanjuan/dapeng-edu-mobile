<template>
  <div class="app_wrap">

    <!--菜单导航 -->
    <van-tabs v-model="activeName" sticky @click="onMenusClick" @scroll="onScrollEvent">
      <van-tab title="关注" name="attention" to="/attention">
        <template v-if="$route.name === 'index-attention'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="推荐" name="recommend" to="/">
        <template v-if="$route.name === 'index'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="作业" name="homework">
        <template #title>
          <div class="tab-drop-menus-wrap">
            <span>{{dropMenusName}}</span>
            <img class="tab-arrow" v-if="activeName === 'homework'" :src="showHomeworkMenu ? tabUp : tabDown" @click.stop="openHomeworkMenu" />
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
      <!-- <van-tab title="阅读" name="reading" to="/reading">
        <template v-if="$route.name === 'index-reading'">
          <nuxt-child />
        </template>
      </van-tab> -->
      <van-tab title="视频" name="video" to="/video">
        <template v-if="$route.name === 'index-video'">
          <nuxt-child />
        </template>
      </van-tab>
      <van-tab title="小视频" name="small-video">
        <template #title>
          <div class="tab-drop-menus-wrap">
            <span>小视频</span>
            <img class="tab-arrow" v-if="activeName === 'small-video'" :src="showVideoMenu ? tabUp : tabDown" @click.stop="openVideoMenu" />
          </div>
        </template>
        <template v-if="$route.name === 'index-small-video'">
          <nuxt-child />
        </template>
      </van-tab>
      <!-- <van-tab title="兼职任务" name="part-time-task" to="/part-time-task">
        <template v-if="$route.name === 'index-part-time-task'">
          <nuxt-child />
        </template>
      </van-tab> -->
    </van-tabs>

    <!-- 作业栏目-下拉菜单筛选 -->
    <div v-show="showHomeworkMenu">
      <div class="tab-drop-down-menus" :style="scrollTop">
        <div 
          v-for="item in homeworkDownMenus"
          :key="item.value"
          :class="homeworkMenuValue === item.value ? 'menus-item-active' : 'menus-item'"
          @click.stop="onChangeHomeworkMenus(item)"
        >
          {{item.text}}
        </div>
      </div>
    </div>

    <!-- 小视频栏目-下拉菜单筛选 -->
    <div v-show="showVideoMenu">
      <div class="tab-drop-down-menus" :style="scrollTop">
        <div 
          v-for="item in videoDownMenus"
          :key="item.value"
          :class="videoMenuValue === item.value ? 'menus-item-active' : 'menus-item'"
          @click.stop="onChangeVideoMenus(item)"
        >
          {{item.text}}
        </div>
      </div>
    </div>

    <!-- 遮罩弹层 -->
    <van-overlay
      :show="showHomeworkMenu || showVideoMenu"
      @click="showHomeworkMenu = false;showVideoMenu = false"
      z-index='11'
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Square',
  data: () => ({
    activeName: 'recommend',
    scrollTop: 'top:88px;',
    showHomeworkMenu: false,
    showVideoMenu: false,
    dropMenusName: '作业',
    homeworkMenuValue: '',
    videoMenuValue: '',
    homeworkDownMenus: [
      { text: '全部', value: '' },
      { text: '体验课', value: 'TEST' },
      { text: '正式课', value: 'VIP' },
      { text: '亲子课', value: 'CHILD' },
    ],
    videoDownMenus: [
      { text: '全部', value: '' },
      { text: '作业', value: 'HOMEWORK' },
      { text: '作品', value: 'WORKS' },
      { text: '动态', value: 'DYNAMIC' },
    ],
    tabUp: require('@/assets/icons/navbar/nav-arrow-up.png'),
    tabDown: require('@/assets/icons/navbar/nav-arrow-down.png'),
  }),
  computed:{
    ...mapGetters('user', ['userInfoGetters']),
  },

  async fetch({ app, route, axios, store}) {
    if(route.query.access_token) {
      await store.dispatch('user/appendUserInfo',{ token: route.query.access_token })
    }
  },

  async asyncData ({route, store, error}) {
    try {
      if (store.getters['banner/bannerListGetters'].length === 0) {
        await store.dispatch('banner/appendBannerList', { collegeId: 'j5m484vz' })
      }
      if (store.getters['user/userInfoGetters'] !== null) {
        await store.dispatch('user/queryStudentCode')
      }
    } catch (err) {
      console.log(err)
      // error({ statusCode: err.data.code, message: err.data.message })
    }
  },

  mounted () {
    /**
     * 路由定位
     */
    const to = this.$route
    if (to.name === 'index') {
      this.activeName = 'recommend'
    } else if (to.name === 'index-attention') {
      this.activeName = 'attention'
    } else if (to.name === 'index-homework') {
      this.activeName = 'homework'
    } else if (to.name === 'index-growth') {
      this.activeName = 'growth'
    } else if (to.name === 'index-dynamic') {
      this.activeName = 'dynamic'
    } else if (to.name === 'index-works') {
      this.activeName = 'works'
    } else if (to.name === 'index-video') {
      this.activeName = 'video'
    } else if (to.name === 'index-small-video') {
      this.activeName = 'small-video'
    }
    // else if (to.name === 'index-reading') {
    //   this.activeName = 'reading'
    // } 
    // else if (to.name === 'index-part-time-task') {
    //   this.activeName = 'part-time-task'
    // }

    /***
     * 下拉菜单选择定位
     */
    if (to.query.courseType) {
      this.setDownMenusPosition(to)
    }

    // cookie 存储
    const Cookie = process.browser ? require('js-cookie') : undefined
    if(this.userInfoGetters && this.$route.query.access_token) {
      Cookie.set('token', JSON.stringify(this.userInfoGetters))
      this.$router.replace('/')
    }
  },
  
  methods:{
    /** 打开作业下拉菜单 */
    openHomeworkMenu(){
      this.showHomeworkMenu = !this.showHomeworkMenu
    },

     /** 打开小视频下拉菜单 */
    openVideoMenu(){
      this.showVideoMenu = !this.showVideoMenu
    },

    /** 
     * 点击切换导航菜单 ；
     * 导航按钮-作业和小视频比较特殊；
     * HTML结构未设置路由跳转；
     * 而是转为this.$router.replace；
     * 这样做是避免路由双执行的报错；
     * 另外，作业和小视频下还有按钮筛选；
     * 也是为了参数缓存；
    */
    onMenusClick(name, title) {
      
      if(name === 'small-video') {

        if(this.$route.name === 'index-small-video') {
          this.showVideoMenu = !this.showVideoMenu
          return
        }

        this.$router.replace({
          path: '/small-video',
          query: {
            ...this.$route.query,
            courseType: this.videoMenuValue
          }
        })
      }

      if(name === 'homework') {

        if(this.$route.name === 'index-homework') {
          this.showHomeworkMenu = !this.showHomeworkMenu
          return
        }

        this.$router.replace({
          path: '/homework',
          query: {
            ...this.$route.query,
            courseType: this.homeworkMenuValue
          }
        })
      }

      if(name !== 'homework' || name !== 'small-video') {
        this.showHomeworkMenu = false
        this.showVideoMenu = false
      }
    },

    /** 监听作业切换下拉菜单事件 */
    onChangeHomeworkMenus(params) {
      this.dropMenusName = params.text
      if(params.text === '全部') {
        this.dropMenusName = '作业'
      }
      this.homeworkMenuValue = params.value
      this.showHomeworkMenu = !this.showHomeworkMenu
      if(this.$route.query.courseType === params.value) return
      this.$router.replace({ query: { ...this.$route.query, courseType: params.value } })
    },

    /** 监听小视频切换下拉菜单事件 */
    onChangeVideoMenus(params) {
      this.videoMenuValue = params.value
      this.showVideoMenu = !this.showVideoMenu
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
      if(to.name === 'index-small-video') {
        this.videoDownMenus.forEach(element => {
          if (element.value === to.query.courseType) {
            this.videoMenuValue = element.value
          }
        })
      }

      if(to.name === 'index-homework') {
        this.homeworkDownMenus.forEach(element => {
          if (element.value === to.query.courseType) {
            this.homeworkMenuValue = element.value
            if(element.text === '全部') {
              this.dropMenusName = '作业'
            } else {
              this.dropMenusName = element.text
            }
          }
        })
      }
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
  padding-right: 8px;
  position: relative;
  background-color: @dp-white;
  z-index: 13;
}

@media (max-width: 330px)  {
  /deep/ .van-tabs__wrap {
    padding-left: 8px;
    padding-right: 8px;
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
