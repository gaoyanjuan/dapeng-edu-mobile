<template>
  <div class="mine">

    <!-- 顶部用户登录信息  -->
    <div class="mine-header-wrap">
      <div class="header-left-side">
        <img v-if="userInfoGetters" class="header-avatar" :src="userInfoGetters.avatar" alt="avatar" @click="toPersonalCenter" />
        <img v-else class="header-avatar" :src="notLoginAvatar" alt="avatar" @click="toLogin" />
      </div>
      
      <div class="header-right-side">
        <span v-if="userInfoGetters" class="user-nickname" @click="toPersonalCenter"> {{ userInfoGetters.loginName || userInfoGetters.nickname || userInfoGetters.dpAccount }} </span>
        <p v-else class="not-login-wrap"><span @click="toLogin">登录</span><span>/</span><span @click="toLogin">注册</span></p>
        <span v-if="userInfoGetters && userInfoGetters.studentSatusId" class="user-code">学籍号：{{ userInfoGetters.studentSatusId }}</span>
      </div>
    </div>

    <!-- 用户数据：“关注、粉丝、推荐、喜欢” -->
    <div class="mine-user-data-wrap">
      <div class="data-item-column" @click="toAttention">
        <span class="data-item-column-nums">{{ userTrendsGetters.followCount | studentsCount }}</span>
        <span class="data-item-column-txt">关注</span>
      </div>

      <div class="data-item-column" @click="toFans">
        <span class="data-item-column-nums">{{ userTrendsGetters.fansCount | studentsCount }}</span>
        <span class="data-item-column-txt">粉丝</span>
      </div>

      <div class="data-item-column" @click="toRecommend">
        <span class="data-item-column-nums">{{ userTrendsGetters.recommendCount | studentsCount }}</span>
        <span class="data-item-column-txt">推荐</span>
      </div>

      <div class="data-item-column" @click="openLovePopup">
        <span class="data-item-column-nums">{{ userTrendsGetters.likeCount | studentsCount }}</span>
        <span class="data-item-column-txt">喜欢</span>
      </div>
    </div>

    <!-- 用户数据：“我的喜欢和收藏” -->
    <div class="mine-user-remark-wrap">
      <div class="user-remark-left-side" @click="toMyLike">
        <img class="user-remark-icon" :src="navLike" alt="" />
        <span class="user-remark-txt">我的喜欢</span>
      </div>

      <div class="user-remark-right-side" @click="toMyCollection">
        <img class="user-remark-icon" :src="navStar" alt="" />
        <span class="user-remark-txt">我的收藏</span>
      </div>
    </div>

    <!-- 用户数据：“作业、作品导航等……” -->
    <div class="mine-nav-group-wrap">
      <van-grid square :border="false" clickable>
        <van-grid-item v-for="(item ,i) in navList" :key="i" @click="enterPublishPage(item)">
          <img class="nav-icon" :src="item.icon" alt="" />
          <span class="nav-txt"> {{ item.txt }} </span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- APP 引导下载 -->
    <div class="mine-app-download-wrap" @click="openAppEvent">
      <img class="app-logo" :src="logo" alt="" />
      <span class="app-txt">下载大鹏教育APP</span>
    </div>

    <!-- 退出登录 -->
    <div v-if="userInfoGetters" class="mine-app-logout-wrap" @click="onLogoutEvent">退出登录</div>

    <!-- 我的喜欢弹层 -->
    <m-love-popup :show-popup="lovePopup"/>

  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import { openInApp } from '@/utils/device-type'

export default {
  name:'Mine',
  data: ()=> ({
    lovePopup: { show: false },
    userRoute:'/personal-center/dashboard',
    avatar:require('@/assets/icons/common/avatar.png'),
    notLoginAvatar: require('@/assets/icons/mine/not-login.png'),
    navLike: require('@/assets/icons/mine/nav-like.png'),
    navStar: require('@/assets/icons/mine/nav-star.png'),
    logo: require('@/assets/icons/mine/dapeng-logo.png'),
    navList:[
      {txt:'作业',name:'homework',icon: require('@/assets/icons/mine/nav-homework.png')},
      {txt:'作品',name:'works',icon: require('@/assets/icons/mine/nav-works.png')},
      {txt:'动态',name:'dynamic',icon: require('@/assets/icons/mine/nav-dynamic.png')},
      {txt:'活动',name:'growth',icon: require('@/assets/icons/mine/nav-activity.png')},
      {txt:'我的课程',name:'course',icon: require('@/assets/icons/mine/nav-task.png')},
      {txt:'阅读',name:'reading',icon: require('@/assets/icons/mine/nav-reading.png')},
      // {txt:'视频',name:'video',icon: require('@/assets/icons/mine/nav-video.png')},
      // {txt:'任务',name:'task',icon: require('@/assets/icons/mine/nav-task.png')}
    ]
  }),
  mounted() {
    if(this.userInfoGetters && this.userInfoGetters.userId ) {
      if (!this.userInfoGetters.gender || !this.userInfoGetters.loginName || !this.userInfoGetters.nickname) {
        this.getUserDetails()
      }
      this.appendUserTrends({ userId: this.userInfoGetters.userId })
    }
  },
  computed:{
    ...mapGetters('user',[
      'userInfoGetters',
      'userTrendsGetters'
    ])
  },
  methods:{
    ...mapActions('user', [
      'appendUserTrends',
      'getUserDetails'
    ]),

    // 打开我的喜欢弹框
    openLovePopup (){
      if (!this.$login()) {
        return
      }
      this.lovePopup.show = true
    },

    // 退出登录
    onLogoutEvent() {
      if (process.env.mode === 'development') {
        this.$cookiz.remove(this.validateSystemHostName().token_name)
      } else {
        this.$cookiz.remove(this.validateSystemHostName().token_name, {
          path: '/',
          domain: '.dapengjiaoyu.cn'
        })
        this.$cookiz.remove(this.validateSystemHostName().token_name)
      }
      this.$cookiz.remove('userinfo', {
        path: '/'
      })
      const redirectUrl = `${location.protocol}//${location.host}`
      window.location.href = `${process.env.authUrl}/logout?redirectUrl=${redirectUrl}`
    },

     /// 唤起APP
    openAppEvent () {
      openInApp()
    },

    // 跳转登录页
    toLogin () {
      localStorage.setItem('route', $nuxt.$route.fullPath)
      this.$router.push('/login')
    },

    // 跳转注册页
    toRegister () {
      this.$router.push('/register')
    },

    // 进入发布页面
    enterPublishPage(params) {
      if (!this.$login()) return

      if(params.name === 'course') {
        const url = `${process.env.courseUrl}/secure/my/course/learning/live/courseId?r=${Math.random()}`
        location.href = url
        return
      }
      
      this.$router.push({
        path: '/personal-center/publish',
        query:{ 
          type: params.name,
          userId: this.userInfoGetters.userId
        }
      })
    },
    toPersonalCenter() {
      this.$router.push({
        path: '/personal-center/publish',
        query:{ 
          userId: this.userInfoGetters.userId
        }
      })
    },
    toAttention() {
      if (!this.$login()) return

      this.$router.push({
        path: '/personal-center/dashboard',
        query: {
          userId: this.userInfoGetters.userId
        }
      })
    },

    toFans() {
      if (!this.$login()) return

      this.$router.push({
        path: '/personal-center/dashboard',
        query: {
          type: 'fans',
          userId: this.userInfoGetters.userId
        }
      })
    },

    toRecommend() {
      if (!this.$login()) return
      this.$router.push({
        path: '/personal-center/dashboard',
        query: {
          type: 'recommend',
          userId: this.userInfoGetters.userId
        }
      })
    },

    toMyLike() {
      if (!this.$login()) return
      this.$router.push({
        path: '/personal-center/likes',
        query: {
          userId: this.userInfoGetters.userId
        }
      })
    },

    toMyCollection() {
      if (!this.$login()) return
      this.$router.push({
        path: '/personal-center/collection',
        query: {
          userId: this.userInfoGetters.userId
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mine {
  width: 100%;
  padding: 16px 16px 80px;
  min-height: calc(100vh - 90px);
  background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F1 100%);
}

.mine-header-wrap {
  width: 100%;
  height: 106px;
  padding: 33px 0 12px 3px;
  background-color: transparent;
  background-image: url('~@/assets/icons/mine/mine-bg.png');
  background-size: 192px 106px;
  background-repeat: no-repeat;
  background-position: right;
  .l-flex-row-def();
}

.mine-header-wrap .header-left-side {
  width: 66px;
  height: 66px;
  display: flex;
  border-radius: 50%;
  background: #FFFFFF;
  align-items: center;
  justify-content: center;
  box-shadow: -3px 8px 12px 0px rgba(9, 65, 51, 0.1);

  & .header-avatar {
    width: 62px;
    height: 62px;
    object-fit: cover;
    border-radius: 50%;
  }

}

.mine-header-wrap .header-right-side {
  margin-left: 15px;
  .l-flex-column-def();

  & .user-nickname {
    max-width: 200px;
    height: 33px;
    font-size: 24px;
    font-family: @dp-font-semibold;
    font-weight: 600;
    color: #36404A;
    line-height: 33px;
    .text-ellipsis()
  }
  & .not-login-wrap {
    font-size: 24px;
    color: #747C80;
    font-family: @dp-font-regular;
    cursor: pointer;
  }
  & .user-code {
    max-width: 200px;
    height: 20px;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #6D7278;
    line-height: 20px;
    margin-top: 6px;
  }
}

.mine-user-data-wrap {
  width: 100%;
  height: 17px;
  padding-left: 82px;
  display: flex;
  align-items: center;
}

.mine-user-data-wrap .data-item-column {
  // max-width: 60px;
  height: 17px;
  display: flex;
  align-items: center;
  line-height: 17px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 16px;
  }

  & .data-item-column-nums {
    // max-width: 20px;
    font-size: 12px;
    font-family: @dp-font-semibold;
    font-weight: 600;
    color: #2B2B2B;
    margin-right: 4px;
  }

  & .data-item-column-txt {
    width: auto;
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #A6AEA9;
  }
}

.mine-user-remark-wrap {
  width: 100%;
  height: 36px;
  margin-top: 20px;
  .l-flex-row();

  & .user-remark-left-side,
  & .user-remark-right-side {
    width: 163px;
    height: 36px;
    background: #FFFFFF;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & .user-remark-left-side,
  & .user-remark-right-side {
    & .user-remark-icon {
      width: 18px;
      height: 15px;
      margin-right: 9px;
    }

    & .user-remark-txt {
      min-width: 56px;
      height: 20px;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #5A5A5A;
      line-height: 20px;
    }
  }

  & .user-remark-right-side {
    & .user-remark-icon {
      width: 18px;
      height: 19px;
    }
  }
}

.mine-nav-group-wrap {
  width: 343px;
  // min-height: 154px;
  min-height: 77px;
  background: #FFFFFF;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  margin-top: 12px;
  padding:10px;

  & .nav-icon {
    width: 32px;
    height: 32px;
  }

  & .nav-txt {
    width: auto;
    height: 17px;
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #5A5A5A;
    line-height: 17px;
  }
}

.mine-app-download-wrap {
  width: 343px;
  height: 44px;
  background: #FFFFFF;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  cursor: pointer;

  & .app-logo {
    width: 24px;
    height: 24px;
    border-radius: 8px;
  }

  & .app-txt {
    width: auto;
    font-size: 12px;
    font-family: @dp-font-medium;
    font-weight: 600;
    color: #5A5A5A;
    margin-left: 6px;
  }
}

.mine-app-logout-wrap {
  width: 343px;
  height: 44px;
  line-height: 44px;
  border-radius: 6px;
  margin-top: 12px;

  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #A3A8AB;
  text-align: center;
  background: #FFFFFF;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.03);
  cursor: pointer;
}

</style>