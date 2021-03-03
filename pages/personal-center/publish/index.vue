<template>
  <div class="personal-homepage">
    <!-- 个人主页顶部背景及内容 -->
    <div class="personal-homepage-top">
      <div class="left-arrow-back" @click="onClickBack">
        <img src="~@/assets/icons/mine/icon-left-arrow.png" alt="">
      </div>
      <div class="user-info">
        <div class="user-avatar">
          <img ref="headerImg" v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像">
          <img ref="headerImg" v-if="!userInfo.avatar && !loadAvatar" :src="defaultImg" alt="头像">
        </div>
        <div class="info-box">
          <div class="user-name">{{ userInfo.loginName || userInfo.nickname || userInfo.dpAccount }}</div>
          <div v-if="userInfo.introduction!== '' && userInfo.introduction!== null" class="personalized-signature">{{userInfo.introduction}}</div>
          <div v-else class="personalized-signature">这个人很懒，什么都没有写~</div>
        </div>
        <!-- 个人主页右侧右侧关注按钮 -->
        <div class="avatar-follow" v-if="showAttention" @click="handelAttention">
          <img :src="attentionState ? unfollow : follow" alt="">
        </div>
      </div>
      <!-- 关注、粉丝等导航 -->
      <div class="content-box">
        <div @click="toAttention">
          <div>{{ userTrendsGetters.followCount | studentsCount }}</div>
          <div>关注</div>
        </div>
        <p class="line"></p>
        <div @click="toFans">
          <div>{{ userTrendsGetters.fansCount | studentsCount }}</div>
          <div>粉丝</div>
        </div>
        <p class="line"></p>
        <div @click="toRecommend">
          <div>{{ userTrendsGetters.recommendCount | studentsCount }}</div>
          <div>推荐</div>
        </div>
        <p class="line"></p>
        <div @click="openLovePopup">
          <div>{{ userTrendsGetters.likeCount | studentsCount }}</div>
          <div>喜欢</div>
        </div>
      </div>
    </div>
    <!-- 滚动固定顶部 -->
    <div :class="navBar ? 'fix-top' : ''" v-show="navBar">
      <div class="left-arrow-back" @click="onClickBack">
        <img src="~@/assets/icons/navbar/nav-arrow-back.png" alt="">
      </div>
      <div class="user-avatar">
        <img ref="headerImg" :src="userInfo.avatar || defaultImg" alt="头像">
        <div class="user-name">{{ userInfo.loginName || userInfo.nickname || userInfo.dpAccount }}</div>
      </div>
      <!-- 固定顶部--右侧关注按钮 -->
      <div class="avatar-follow" v-if="showAttention" @click="handelAttention">
        <img :src="attentionState ? unfollow : topfollow" alt="">
      </div>
    </div>
    <!-- 个人主页列表内容 -->
    <div class="content-list">
      <personal-homework-navigation :showPersonal="showPersonal" />
    </div>

    <!-- 我的喜欢弹层 -->
    <m-love-popup :show-popup="lovePopup"/>
    <!-- 取消关注二次确认 -->
    <m-delete-dialog
      :deleteDialogParams="deleteDialogParams"
      @confirmDelete="confirmDelete"
      title="确定取消关注吗？"
    />
  </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  layout: 'navbar',
  data() {
    return {
      fromRouteName: null,
      follow: require('@/assets/icons/mine/posts-follow.png'),
      topfollow: require('@/assets/icons/posts/posts-follow.png'),
      unfollow: require('@/assets/icons/posts/posts-unfollow.png'),
      defaultImg: require('@/assets/icons/common/dp_default_headImg.jpg'),
      navBar: false,
      lovePopup: { show: false },
      userInfo: {},
      loadAvatar: true,
      showAttention: false,
      attentionState: null,
      showPersonal: true,
      deleteDialogParams: {
        show: false
      }
    }
  },
  computed: {
    ...mapGetters('user',[
      'userInfoGetters',
      'userTrendsGetters'
    ])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fromRouteName = from.name
    })
  },
  methods: {
    ...mapActions('user', [
      'queryUserData',
      'appendUserTrends',
      'appendFollowingStatus',
      'followingUser',
      'cancelFollowingUser',
      'getUserDetails'
    ]),
    // 返回
    onClickBack() {
      if (this.fromRouteName === 'submit') {
        this.$router.replace('/personal-center')
      } else {
        this.$router.go(-1)
      }
    },
    // 滚动吸顶
    watchScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 160) {
        this.navBar = true
      } else {
        this.navBar = false
      }
    },
    //关注跳转
    toAttention() {
      if (!this.$login()) return

      this.$router.push({
        path: '/personal-center/dashboard',
        query: {
          userId: this.userInfo.userId
        }
      })
    },
    // 粉丝跳转
    toFans() {
      if (!this.$login()) return

      this.$router.push({
        path: '/personal-center/dashboard',
        query: {
          type: 'fans',
          userId: this.userInfo.userId
        }
      })
    },
    // 推荐跳转
    toRecommend() {
      if (!this.$login()) return
      this.$router.push({
        path: '/personal-center/dashboard',
        query: {
          type: 'recommend',
          userId: this.userInfo.userId
        }
      })
    },
    // 喜欢跳转
    openLovePopup (){
      if (!this.$login()) {
        return
      }
      this.lovePopup.show = true
    },
    // 右侧关注按钮切换事件
    handelAttention() {
      if (this.attentionState) {
        this.deleteDialogParams.show = true
      } else {
        this.attentionState = true
        this.followingUser({ id: this.$route.query.userId })
      }
    },
    // 取消关注二次确认
    confirmDelete() {
      this.attentionState = false
      this.cancelFollowingUser({ id: this.$route.query.userId })
      this.deleteDialogParams.show = false
    },
  },
  mounted() {
    if(!this.$login()) return

    // 判断我的或TA的个人主页是否显示关注按钮以及用户信息的赋值
    if (this.$route.query.userId === this.userInfoGetters.userId) {
      if (this.userInfoGetters.introduction) {
        this.userInfo = this.userInfoGetters
      } else {
        this.getUserDetails().then((res) => {
          this.userInfo = res.data
        })
      }
      this.showAttention = false
      this.showPersonal = true
    } else {
      this.queryUserData({userId: this.$route.query.userId})
      .then((data) => {
        this.userInfo = data
        this.loadAvatar = false
      })
      this.showPersonal = false
    }
    // 判断我是否关注TA的个人主页的关注按钮展示（关注/已关注）
    if (!this.$route.query.userId || this.$route.query.userId === this.userInfoGetters.userId) {
      this.appendUserTrends({ userId: this.userInfoGetters.userId })
    } else {
      //用户的互动数据（关注、粉丝等）
      this.appendUserTrends({ userId: this.$route.query.userId })
      //查询用户的关注状态
      this.appendFollowingStatus({ id: this.$route.query.userId })
      .then((data) => {
        this.attentionState = data
        this.showAttention = true
      })
    }
    // 监听调用滚动事件
    window.addEventListener('scroll', this.watchScroll)
    // 挂载完成后，判断图片是否显示成功，若失败，则替换为默认图片
    this.$refs.headerImg.onerror = () => {
      this.$refs.headerImg.src = this.defaultImg
    }
  }
}
</script>
<style lang="less" scoped>
.personal-homepage {
  & > .personal-homepage-top {
    position: relative;
    width: 375px;
    height: 190px;
    background: url('~@/assets/icons/mine/personal-homepage-bg.png') no-repeat;
    background-size: 375px 190px;
    & > .left-arrow-back {
      & > img {
        width: 24px;
        height: 24px;
        margin: 8px 0 0 16px;
      }
    }
    & > .user-info {
      display: flex;
      justify-content: flex-start;
      margin: 28px 16px 0 16px;
      & > .user-avatar {
        & > img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          z-index: 1;
          object-fit: cover;
        }
      }
      & > .info-box {
        width: 250px;
        height: 50px;
        margin-left:16px;
        & > .user-name {
          font-size: 18px;
          font-weight: 600;
          font-family: @dp-font-semibold;
          color: #fff;
        }
        & > .personalized-signature {
          width: 195px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          font-weight: 500;
          font-family: @dp-font-medium;
          color: #bec2c6;
          margin-top: 8px;
        }
      }
      & > .avatar-follow {
        line-height: 60px;
        & > img {
          width: 60px;
          height: 28px;
          margin-left: 22px;
        }
      }
    }
    & > .content-box {
      position: absolute;
      bottom: -10px;
      width: 100%;
      height: 82px;
      padding: 20px 2px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      user-select: none;
      & > div {
        width: 92px;
        text-align: center;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #BEC2C6;
        line-height: 20px;
        & > :nth-child(1) {
          height: 20px;
        }
        &>:nth-child(2) {
          margin-top: 2px;
          height: 20px;
        }
      }
      & > .line {
        width: 1px;
        height: 22px;
        background-color: #979797;
      }
    }
  }
  & > .fix-top {
    position: fixed;
    display: block;
    top: 0px;
    width: 375px;
    background: #fff;
    z-index: 20;
    height: 44px;
    display: flex;
    & > .left-arrow-back {
      & > img {
        width: 24px;
        height: 24px;
        margin: 6px 0 0 16px;
      }
    }
    & > .user-avatar {
      margin: 0 auto;
      overflow: hidden;
      & > img {
        width: 32px;
        height: 32px;
        float: left;
        margin-top:6px;
        border-radius: 50%;
        z-index: 1;
      }
      & > .user-name {
        float: left;
        margin: 10px 0 0 8px;
        font-size: 18px;
        font-weight: 600;
        font-family: @dp-font-semibold;
        color: #18252C;
      }
    }
    & > .avatar-follow {
      line-height: 60px;
      & > img {
        width: 60px;
        height: 28px;
        margin: 8px 16px 0 0;
      }
    }
  }
}
/deep/ .van-tabs__line {
  width: 28px;
  height: 4px;
  top: 38px;
  background: #0CB65B;
  border-radius: 2px;
}
/deep/ .van-tab--active {
  font-size: 14px;
  font-weight: 400;
  color: #0CB65B;
}

/deep/ .van-tabs__nav--line {
  padding-left: 35px;
  padding-right: 35px;
}
</style>
