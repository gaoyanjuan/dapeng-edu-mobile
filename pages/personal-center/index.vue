<template>
  <div class="mine">
    <!-- 顶部用户登录信息  -->
    <div class="mine-header-wrap">
      <div class="header-left-side">
        <img
          v-if="userInfoGetters"
          class="header-avatar"
          :src="userInfoGetters.avatar"
          alt="avatar"
          @click="toPersonalInfo"
        />
        <img
          v-else
          class="header-avatar"
          :src="notLoginAvatar"
          alt="avatar"
          @click="toLogin"
        />
      </div>

      <div class="header-right-side">
        <span
          v-if="userInfoGetters"
          class="user-nickname"
          @click="toPersonalInfo"
        >
          {{
            userInfoGetters.loginName ||
            userInfoGetters.nickname ||
            userInfoGetters.dpAccount
          }}
        </span>
        <p v-else class="not-login-wrap">
          <span @click="toLogin">登录</span><span>/</span
          ><span @click="toLogin">注册</span>
        </p>
        <span
          v-if="userInfoGetters && userInfoGetters.studentSatusId"
          class="user-code"
          >学籍号：{{ userInfoGetters.studentSatusId }}</span
        >
      </div>
      <div class="right-arrow" @click="toPersonalCenter">
        <img src="@/assets/icons/mine/personal-center-right-arrow.png" alt="" />
      </div>
    </div>

    <!-- 用户数据：“关注、粉丝、推荐、喜欢” -->
    <div class="mine-user-data-wrap">
      <div class="data-item-column" @click="toAttention">
        <div class="data-item-column-nums">
          {{ userTrendsGetters.followCount | studentsCount }}
        </div>
        <div class="data-item-column-txt">关注</div>
      </div>

      <div class="data-item-column" @click="toFans">
        <div class="data-item-column-nums">
          {{ userTrendsGetters.fansCount | studentsCount }}
        </div>
        <div class="data-item-column-txt">粉丝</div>
      </div>

      <div class="data-item-column" @click="toRecommend">
        <div class="data-item-column-nums">
          {{ userTrendsGetters.recommendCount | studentsCount }}
        </div>
        <div class="data-item-column-txt">推荐</div>
      </div>

      <div class="data-item-column" @click="openLovePopup">
        <div class="data-item-column-nums">
          {{ userTrendsGetters.likeCount | studentsCount }}
        </div>
        <div class="data-item-column-txt">喜欢</div>
      </div>
    </div>
    <!-- 我的体验课、正式课、发布、订单导航 -->
    <div class="mine-user-nav-wrap">
      <div class="nav-item" @click="toTrialClass">
        <div>
          <img src="@/assets/icons/mine/icon-trial-course.png" alt="" />
        </div>
        <div>我的体验课</div>
      </div>
      <div class="nav-item" @click="toVipClass">
        <div>
          <img src="@/assets/icons/mine/icon-formal-course.png" alt="" />
        </div>
        <div>我的正式课</div>
      </div>
      <div class="nav-item" @click="toPersonalCenter">
        <div>
          <img src="@/assets/icons/mine/icon-my-publish.png" alt="" />
        </div>
        <div>我的发布</div>
      </div>
      <div class="nav-item" @click="myOrder">
        <div>
          <img src="@/assets/icons/mine/icon-my-order.png" alt="" />
        </div>
        <div>我的订单</div>
      </div>
    </div>
    <!-- 广告站位图 -->
    <!-- <div class="advertising-picture">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in adverBannerListGetters" :key="index">
          <a :href="item.url" target="_blank">
            <img :src="item.imgInfo" :alt="item.name" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div> -->

    <!-- 我的喜欢、我的收藏、学习荣誉等底部导航 -->
    <div class="mine-nav-group-wrap">
      <van-grid square :border="false" clickable>
        <van-grid-item
          v-for="(item, i) in navList"
          :key="i"
          @click="onNavGroupItem(item)"
        >
          <img class="nav-icon" :src="item.icon" alt="" />
          <span class="nav-txt"> {{ item.txt }} </span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 退出登录 -->
    <div
      v-if="userInfoGetters"
      class="mine-app-logout-wrap"
      @click="onLogoutEvent"
    >  
      退出登录
    </div>

    <!-- 我的喜欢弹层 -->
    <m-love-popup :show-popup="lovePopup" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { openInApp } from "@/utils/device-type";

export default {
  name: "Mine",
  data: () => ({
    lovePopup: { show: false },
    userRoute: "/personal-center/dashboard",
    avatar: require("@/assets/icons/common/avatar.png"),
    notLoginAvatar: require("@/assets/icons/mine/not-login.png"),
    navList: [
      {
        txt: "我的喜欢",
        name: "like",
        icon: require("@/assets/icons/mine/icon-my-like.png"),
      },
      {
        txt: "我的收藏",
        name: "collection",
        icon: require("@/assets/icons/mine/icon-my-collection.png"),
      },
      {
        txt: "学习荣誉",
        name: "learn-honor",
        icon: require("@/assets/icons/mine/icon-learn-honor.png"),
      },
      {
        txt: "快捷支付",
        name: "fast-payment",
        icon: require("@/assets/icons/mine/icon-fast-payment.png"),
      },
      // {txt:'任务',name:'task',icon: require('@/assets/icons/mine/icon-task.png')},
      {
        txt: "联系学管",
        name: "teacher",
        icon: require("@/assets/icons/mine/icon-contact-teacher.png"),
      },
      {
        txt: "建议与投诉",
        name: "suggest-complaint",
        icon: require("@/assets/icons/mine/icon-suggest-complaint .png"),
      },
      {
        txt: "设置",
        name: "setting",
        icon: require("@/assets/icons/mine/icon-seting.png"),
      },
      {
        txt: "下载APP",
        name: "download",
        icon: require("@/assets/icons/mine/icon-download.png"),
      },
    ],
    advertisBanner: [],
  }),
  mounted() {
    if (this.userInfoGetters && this.userInfoGetters.userId) {
      if (
        !this.userInfoGetters.gender ||
        !this.userInfoGetters.loginName ||
        !this.userInfoGetters.nickname
      ) {
        this.getUserDetails()
      }
      this.appendUserTrends({ userId: this.userInfoGetters.userId });
    }  
  },
  computed: {
    ...mapGetters("user", ["userInfoGetters", "userTrendsGetters"]),
     ...mapGetters("banner", ["adverBannerListGetters"]),
  },
  methods:{
    ...mapActions('user', [
      'appendUserTrends',
      'getUserDetails',
      'userMainStationToken'
    ]),
    // 打开我的喜欢弹框
    openLovePopup() {
      if (!this.$login()) {
        return
      }
      this.lovePopup.show = true
    },

    // 退出登录
    onLogoutEvent() {
      this.$logout().then(() => {
        const redirectUrl = `${location.protocol}//${location.host}`
        window.location.href = `${process.env.authUrl}/logout?redirectUrl=${redirectUrl}`
      })
    },

    // 跳转登录页
    toLogin () {
      this.$login()
    },

    // 跳转注册页
    toRegister() {
      this.$router.push("/register")
    },
    // 进入我的喜欢、收藏等页面跳转
    onNavGroupItem(params) {
      switch (params.name) {
        case "like":
          if (!this.$login()) return;
          this.$router.push({
            path: "/personal-center/likes",
            query: {
              userId: this.userInfoGetters.userId,
            },
          });
          break;
        case "collection":
          if (!this.$login()) return;
          this.$router.push({
            path: "/personal-center/collection",
            query: {
              userId: this.userInfoGetters.userId,
            },
          });
          break;
        case "learn-honor":
          if (!this.$login()) return;
          this.$router.push({path: "/personal-center/honor",
          })
          break;
        case 'fast-payment':
          window.location.href = `${process.env.payUrl}`
          break;
        case "task":
          break;
        case "teacher":
          break;
        case "suggest-complaint":
          break;
        case "setting":
          if (!this.$login()) return;
          this.$router.push({
            path: "/setting",
          });
          break;
        case "download":
          openInApp();
          break;
        default:
          break;
      }
    },
    // 进个人主页
    toPersonalCenter() {
      if (!this.$login()) return;
      this.$router.push({
        path: "/personal-center/publish",
        query: {
          userId: this.userInfoGetters.userId,
        }
      })
    },
    // 进个人资料
    toPersonalInfo() {
      this.$router.push({
        path: "/account-setting/personal-information",
      })
    },

    toTrialClass() {
      if (!this.$login()) return;

      this.$router.push({
        path: '/personal-center/course/trial',
        query: {
          userId: this.userInfoGetters.userId
        },
      })
    },
    toVipClass() {
      if (!this.$login()) return
      
      this.$router.push({
        path: '/personal-center/course/formal',
        query: {
          userId: this.userInfoGetters.userId
        },
      })
    },
    toAttention() {
      if (!this.$login()) return;

      this.$router.push({
        path: "/personal-center/dashboard",
        query: {
          userId: this.userInfoGetters.userId,
        },
      });
    },

    toFans() {
      if (!this.$login()) return;

      this.$router.push({
        path: "/personal-center/dashboard",
        query: {
          type: "fans",
          userId: this.userInfoGetters.userId,
        },
      });
    },

    toRecommend() {
      if (!this.$login()) return;
      this.$router.push({
        path: "/personal-center/dashboard",
        query: {
          type: 'recommend',
          userId: this.userInfoGetters.userId
        }
      })
    },
    async myOrder() {
      if (!this.$login()) return
      const res = await this.userMainStationToken()
      window.location.href = `${process.env.mOrderUrl}?token=${res.data.data}&source=4`
    }
  }
}
</script>

<style lang="less" scoped>
.mine {
  width: 100%;
  padding: 16px 16px 80px;
  min-height: calc(100vh - 90px);
  background: linear-gradient(180deg, #ffffff 0%, #f1f5f1 100%);
}

.mine-header-wrap {
  width: 100%;
  height: 106px;
  padding: 33px 0 12px 3px;
  background-color: transparent;
  background-image: url("~@/assets/icons/mine/mine-bg.png");
  background-size: 192px 106px;
  background-repeat: no-repeat;
  background-position: right;
  position: relative;
  .l-flex-row-def();
}

.mine-header-wrap .header-left-side {
  width: 66px;
  height: 66px;
  display: flex;
  border-radius: 50%;
  background: #ffffff;
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
    color: #36404a;
    line-height: 33px;
    .text-ellipsis();
  }
  & .not-login-wrap {
    font-size: 24px;
    color: #747c80;
    font-family: @dp-font-regular;
    cursor: pointer;
  }
  & .user-code {
    max-width: 200px;
    height: 20px;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #6d7278;
    line-height: 20px;
    margin-top: 6px;
  }
}
.right-arrow {
  position: absolute;
  right: 0;
  & > img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
}
.mine-user-data-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 16px;
}

.mine-user-data-wrap .data-item-column {
  width: 92px;
  text-align: center;
  color: #bec2c6;
  line-height: 20px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 16px;
  }

  & .data-item-column-nums {
    font-size: 12px;
    font-family: @dp-font-semibold;
    font-weight: 600;
    color: #2b2b2b;
    margin-right: 4px;
  }

  & .data-item-column-txt {
    width: auto;
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #a6aea9;
  }
}
// 我的体验课、正式课等导航栏样式
.mine-user-nav-wrap {
  margin-top: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 87px;
  & > .nav-item {
    width: 100px;
    text-align: center;
    line-height: 20px;
    & > :nth-child(1) {
      & > img {
        width: 30px;
        height: 30px;
      }
    }
    & > :nth-child(2) {
      font-size: 12px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #18252c;
      margin-top: 2px;
      height: 20px;
    }
  }
}
.advertising-picture {
  margin-top: 12px;
  .van-swipe-item {
    & > a {
      & > img {
        width: 343px;
        height: 76px;
        border-radius: 10px;
        object-fit:cover;
      }
    }
  }
}

.mine-nav-group-wrap {
  width: 343px;
  min-height: 77px;
  background: #ffffff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  margin-top: 10px;

  & .nav-icon {
    width: 32px;
    height: 32px;
  }

  & .nav-txt {
    width: auto;
    height: 17px;
    margin-top: 8px;
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #a3a8ab;
    line-height: 17px;
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
  color: #a3a8ab;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.03);
  cursor: pointer;
}
</style>