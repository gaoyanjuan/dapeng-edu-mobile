<template>
  <div>
    <!-- 底部菜单 -->
    <van-tabbar v-model="active" z-index="10" :before-change="changeTab">

      <!-- 广场 -->
      <van-tabbar-item name="square" :to="calcRoute">
        <span>广场</span>
        <template #icon="props">
          <img :src="props.active ? square.active : square.inactive" />
        </template>
      </van-tabbar-item>

      <!-- 课程 :url="courseUrl"-->
      <van-tabbar-item name="course">
        <span class="tabbar-btn-text-active">课程</span>
        <template #icon="props">
          <img :src="props.active ? course.inactive : course.inactive" />
        </template>
      </van-tabbar-item>

      <!-- 发布 -->
      <div class="submit" @click="showPublishMenus">
        <img :src="upload.active" />
      </div>

      <!-- 活动 -->
      <van-tabbar-item name="activities" to="/activities">
        <span>活动</span>
        <template #icon="props">
          <img :src="props.active ? activities.active : activities.inactive" />
        </template>
      </van-tabbar-item>

      <!-- 我的 -->
      <van-tabbar-item name="personal-center" to="/personal-center">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? mine.active : mine.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 底部 发布菜单 -->
    <van-overlay :show="show" z-index="2005" :duration="0">
      <div class="menus-wrapper" @click.stop>
        <img class="menus-close" :src="publish.close" alt="close" @click="show = false"/>
        
        <!-- 体验课作业提交 -->
        <div @click="enterSubmit('TEST')">
          <div class="menus-cloumn cloumn-trial animate__animated animate__bounceInUp">
            <img class="menus-icon" :src="publish.trial" alt="trial"/>
            <div class="menus-txt">
              <div>体验课</div>
              <div>作业提交</div>
            </div>
          </div>
        </div>

        <!-- 正式课作业提交 -->
        <div @click="enterSubmit('VIP')">
          <div class="menus-cloumn cloumn-formal animate__animated animate__bounceInUp">
            <img class="menus-icon" :src="publish.formal" alt="formal"/>
            <div class="menus-txt">
              <div>正式课</div>
              <div>作业提交</div>
            </div>
          </div>
        </div>

        <!-- 作品发布 -->
        <div @click="enterSubmit('WORKS')">
          <div class="menus-cloumn cloumn-works animate__animated animate__bounceInUp">
            <img class="menus-icon" :src="publish.works" alt="works"/>
            <span class="menus-txt">作品发布</span>
          </div>
        </div>

        <!-- 生活动态 -->
        <div @click="enterSubmit('LIFE')">
          <div class="menus-cloumn cloumn-dynamic animate__animated animate__bounceInUp">
            <img class="menus-icon" :src="publish.dynamic" alt="dynamic"/>
            <span class="menus-txt">发布动态</span>
          </div>
        </div>

      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Footer',
  data: () => ({
    show: false,
    active: 'square',
    courseUrl: null,
    square: {
      active: require('@/assets/icons/newyear/bar-square-active.png'),
      inactive: require('@/assets/icons/newyear/bar-square.png'),
    },
    course: {
      active: require('@/assets/icons/newyear/bar-course-active.png'),
      inactive: require('@/assets/icons/newyear/bar-course.png'),
    },
    upload: {
      active: require('@/assets/icons/newyear/bar-submit.png'),
    },
    activities: {
      active: require('@/assets/icons/newyear/bar-activity-active.png'),
      inactive: require('@/assets/icons/newyear/bar-activity.png'),
    },
    mine: {
      active: require('@/assets/icons/newyear/bar-mine-active.png'),
      inactive: require('@/assets/icons/newyear/bar-mine.png'),
    },
    publish: {
      close: require('@/assets/icons/tabbar/bar-close.png'),
      trial: require('@/assets/icons/tabbar/bar-trial-lessons.png'),
      formal: require('@/assets/icons/tabbar/bar-formal-lessons.png'),
      works: require('@/assets/icons/tabbar/bar-pub-works.png'),
      dynamic: require('@/assets/icons/tabbar/bar-pub-dynamic.png'),
    }
  }),

  computed:{
    /**
     * 计算并赋值路由
     * 非广场区列表，默认返回‘/’
     * 已在广场区列表模块，不能点击广场
     */
    calcRoute() {
      const route = this.$route.name
      if(route.indexOf('index') > -1) {
        return ''
      } else {
        return '/'
      }
    },

    ...mapGetters({
      userInfo: 'user/userInfoGetters'
    }),
  },
  mounted() {
    /**
     * 路由定位
     */
    this.courseUrl = this.validateSystemHostName().COURSE_HOST
    const to = this.$route || { name: 'index' }
    if (to.name === 'index') {
      this.active = 'square'
    } else if (to.name === 'course') {
      this.active = 'course'
    } else if (to.name === 'activities') {
      this.active = 'activities'
    } else if (to.name === 'personal-center') {
      this.active = 'personal-center'
    }
  },
  methods:{
    // 显示发布菜单
    showPublishMenus() {
      this.matomo('ISSUE')
      this.show = true
    },
 
    // 切换菜单时
    changeTab(name) {
      
      this.matomo(name)

      if(name === 'course') {
        window.location.href = `${this.courseUrl}/course/explore`
        return false
      }
      
      this.active = name
    },

    // 触发埋点事件
    matomo(name) {
      let params = JSON.stringify({
        navigation_name: this.transitionTabName(name),
        user_id: (this.userInfo && this.userInfo.userId) ? this.userInfo.userId : ''
      })
      
      this.$matomo.setCustomVariable(1, 'common#navigation_click', params, 'page')
    },
    
    // 转换tabbar Name
    transitionTabName(name) {
      let res = ''
      switch (name) {
        case 'square':
          res = 'HOME'
          break
        case 'ISSUE':
          res = 'ISSUE'
          break
        case 'course':
          res = 'COURSE'
          break
        case 'activities':
          res = 'ACTIVITY'
          break
        case 'personal-center':
          res = 'ABOUT_US'
          break
      }
      return res
    },

    // 进入发布页面
    enterSubmit(name) {

      if(!this.$login()) return

      if(name === 'VIP' || name === 'TEST') {
        this.$router.push(`/homework-list?courseType=${name}`)
      }

      if(name === 'LIFE' || name === 'WORKS') {
        this.$router.push(`/submit?type=${name}`)
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
  // font-weight: 600;
}

/deep/ .van-tabbar-item__icon img{
  width: 25px;
  height: 25px;
}

.submit {
  flex: 1;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > img {
    // width: 37px;
    // height: 37px;
    width: 45px;
    height: 48px;
  }
}

.tabbar-btn-text-active {
  // color: #0CB65B;
  color: #333333;
}

/deep/ .van-overlay {
  width: 375px;
  height: 100%;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
}

.menus-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 50px;
  background: rgba(255, 255, 255, 0.84);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);

  .menus-close {
    width: 37px;
    height: 37px;
    position: absolute;
    bottom: 8px;
    z-index: 2006;
    cursor: pointer;
  }

  .menus-cloumn {
    width: 60px;
    height: 102px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 2006;
  }

  .cloumn-trial {
    bottom: 227px;
    left: 86px;
    animation-duration: 0.8s;
  }

  .cloumn-formal {
    bottom: 227px;
    right: 86px;
    animation-duration: 1.2s;
  }

  .cloumn-works {
    bottom: 110px;
    left: 86px;
    animation-duration: 1s;
  }

  .cloumn-dynamic {
    bottom: 110px;
    right: 86px;
    animation-duration: 1.4s;
  }

  .menus-icon,
  .menus-icon {
    width: 60px;
    height: 60px;
    cursor: pointer;
  }

  .menus-txt {
    // width: 48px;
    height: 34px;
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #1A3743;
    line-height: 17px;
    text-align: center;
    margin-top: 8px;
  }
}


</style>
