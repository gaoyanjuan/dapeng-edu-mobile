<template>
  <van-nav-bar
    class="m-navbar"
    fixed
    left-arrow
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    @click-left="$goback"
    @click-right="onClickRight"
    safe-area-inset-top
  >
    <template #left>
      <img class="navbar__arrow icon" :src="arrow" alt="arrow" />
    </template>
    <template #right>
      <!-- 个人资料模块头部组件 -->
      <div v-if="showInfoRightText" :class="accomplishStatus ? 'navbar__accomplish' : 'hidden__accomplish'">{{ rightText }}</div>
      <!-- 通用头部文本组件 -->
      <div v-if="showRightText" :class="submitStatus ? 'navbar__submit btn-active':'navbar__submit'">{{ rightText }}</div>
      <!-- 通用图片（三个点）组件 -->
      <img v-if="showRightMenu" class="navbar__menu icon" :src="navMenu" alt="menu" @click="onOpenMenus" />
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    title: {
      type: String,
      default: '',
    },
    leftText: {
      type: String,
      default: '',
    },
    rightText: {
      type: String,
      default: '提交',
    },
    showRightText: {
      type:Boolean,
      default:false,
    },
    submitStatus: {
      type:Boolean,
      default:false,
    },
    showRightMenu: {
      type: Boolean,
      default: false
    },
    accomplishStatus: {
      type:Boolean,
      default:false
    },
    showInfoRightText: {
      type:Boolean,
      default:false
    }
  },
  data: () => ({
    arrow: require('@/assets/icons/navbar/nav-arrow-back.png'),
    navMenu: require('@/assets/icons/navbar/nav-menus.png')
  }),
  methods: {
    onClickRight() {
      this.$emit('onClickRight')
    },
    onOpenMenus() {
      this.$emit('onOpenMenus')
    },
  },
}
</script>

<style lang="less" scoped>
.m-navbar {
  height: 44px;
  line-height: 44px;
}

.m-navbar .navbar__arrow {
  width: 24px;
  height: 24px;
}
.m-navbar .navbar__menu {
  width: 24px;
  height: 24px;
}

.m-navbar .navbar__submit {
  width: 60px;
  height: 28px;
  background: #9EE2BD;
  border-radius: 14px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 28px;
}

.m-navbar .btn-active {
  background: #0CB65B;
}

// 个人资料头图样式
.m-navbar .navbar__accomplish {
  width: 38px;
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #0CB65B;
  line-height: 20px;
}
.m-navbar .hidden__accomplish {
  display: none;
}
</style>
