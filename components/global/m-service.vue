<template>
  <van-popup
    v-model="service.show"
    round
    closeable
    position="bottom"
    get-container="#app"
    :style="{ height: '382px' }"
  >
    <div class="service-header">
      <img class="header-avatar" :src="avatar" alt="avatar" />
      <span class="header-txt">Hi，请选择您要咨询的业务～</span>
    </div>

    <div class="service-menus-wrap">
      <div class="menu-item">
        <img class="menu-icon" :src="online" alt="online" />
        <span class="menu-txt">在线咨询</span>
      </div>
      <div class="menu-item">
        <img class="menu-icon" :src="suggest" alt="suggest" />
        <span class="menu-txt">建议与投诉</span>
      </div>
      <div class="menu-item">
        <img class="menu-icon" :src="password" alt="password" />
        <span class="menu-txt">找回密码</span>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name:'ServicePop',
  props:{
    service: {
      type: Object,
      default: {
        show: false
      }
    }
  },

  data: () => ({
    avatar: require('@/assets/icons/service/service.png'),
    online: require('@/assets/icons/service/online.png'),
    suggest: require('@/assets/icons/service/suggest.png'),
    password: require('@/assets/icons/service/password.png'),
  })
}
</script>

<style lang="less" scoped>

.service-header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 58px;
}

.service-header .header-avatar {
  width: 82px;
  height: 89px;
}

.service-header .header-txt {
  font-size: 16px;
  font-family: @medium;
  font-weight: 500;
  color: #36404A;
  margin-top: 16px;
}

.service-menus-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 47px;
}

.service-menus-wrap .menu-item {
  display: flex;
  align-items: center;
  flex-direction: column;

  .menu-icon {
    width: 28px;
    height: 28px;
  }

  .menu-txt {
    font-size: 14px;
    font-family: @regular;
    font-weight: 400;
    color: #36404A;
    margin-top: 11px;
  }
}

/deep/.van-icon-cross::before {
  font-size: 17px;
  color: #E0E5E2;
}
</style>