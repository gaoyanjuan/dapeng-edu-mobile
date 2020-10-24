<template>
  <div class="mine">

    <!-- 顶部用户登录信息  -->
    <div class="mine-header-wrap">
      <div class="header-left-side">
        <img class="header-avatar" :src="avatar" alt="avatar" />
      </div>
      <div class="header-right-side">
        <span class="user-nickname">三班王晓丽</span>
        <span class="user-code">学籍号：2020070388886</span>
      </div>
    </div>

    <!-- 用户数据：“关注、粉丝、推荐、喜欢” -->
    <div class="mine-user-data-wrap">
      <div class="data-item-column">
        <span class="data-item-column-nums">123</span>
        <span class="data-item-column-txt">关注</span>
      </div>
      <div class="data-item-column">
        <span class="data-item-column-nums">123</span>
        <span class="data-item-column-txt">粉丝</span>
      </div>
      <div class="data-item-column">
        <span class="data-item-column-nums">14</span>
        <span class="data-item-column-txt">推荐</span>
      </div>
      <div class="data-item-column" @click="openLovePopup">
        <span class="data-item-column-nums">123</span>
        <span class="data-item-column-txt">喜欢</span>
      </div>
    </div>

    <!-- 用户数据：“我的喜欢和收藏” -->
    <div class="mine-user-remark-wrap">
      <div class="user-remark-left-side">
        <img class="user-remark-icon" :src="navLike" alt="" />
        <span class="user-remark-txt">我的喜欢</span>
      </div>

      <div class="user-remark-right-side">
        <img class="user-remark-icon" :src="navStar" alt="" />
        <span class="user-remark-txt">我的喜欢</span>
      </div>
    </div>

    <!-- 用户数据：“作业、作品导航等……” -->
    <div class="mine-nav-group-wrap">
      <van-grid square :border="false" clickable>
        <van-grid-item v-for="(item ,i) in navList" :key="i">
          <img class="nav-icon" :src="item.icon" alt="" />
          <span class="nav-txt"> {{ item.txt }} </span>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- APP 引导下载 -->
    <div class="mine-app-download-wrap">
      <img class="app-logo" :src="logo" alt="" />
      <span class="app-txt">下载大鹏教育APP</span>
    </div>

    <!-- 我的喜欢弹层 -->
    <m-love-popup :show-popup="lovePopup"/>

  </div>
</template>

<script>
export default {
  name:'Mine',
  data: ()=> ({
    lovePopup: { show: false },
    avatar:require('@/assets/icons/common/avatar.png'),
    navLike: require('@/assets/icons/mine/nav-like.png'),
    navStar: require('@/assets/icons/mine/nav-star.png'),
    logo: require('@/assets/icons/mine/dapeng-logo.png'),
    navList:[
      {txt:'作业',icon: require('@/assets/icons/mine/nav-homework.png')},
      {txt:'作品',icon: require('@/assets/icons/mine/nav-works.png')},
      {txt:'动态',icon: require('@/assets/icons/mine/nav-dynamic.png')},
      {txt:'活动',icon: require('@/assets/icons/mine/nav-activity.png')},
      {txt:'阅读',icon: require('@/assets/icons/mine/nav-reading.png')},
      {txt:'视频',icon: require('@/assets/icons/mine/nav-video.png')},
      {txt:'任务',icon: require('@/assets/icons/mine/nav-task.png')}
    ]
  }),
  methods:{
    /** 打开我的喜欢弹框 */
    openLovePopup (){
      this.lovePopup.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.mine {
  width: 100%;
  padding: 16px;
  min-height: calc(100vh - 94px);
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
  max-width: 60px;
  height: 17px;
  display: flex;
  align-items: center;
  line-height: 17px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 16px;
  }

  & .data-item-column-nums {
    max-width: 20px;
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
  min-height: 154px;
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
</style>