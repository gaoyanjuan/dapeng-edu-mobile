<template>
  <van-nav-bar
    class="m-navbar"
    fixed
    left-arrow
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
    safe-area-inset-top
  >
    <template #left>
      <img class="navbar__arrow icon" :src="arrow" alt="arrow" />
    </template>
    <template #right>
      <div v-if="showRightText" :class="submitStatus ? 'navbar__submit btn-active':'navbar__submit'">{{ rightText }}</div>
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
    }
  },
  data: () => ({
    arrow: require('@/assets/icons/navbar/nav-arrow-back.png'),
    navMenu: require('@/assets/icons/navbar/nav-menus.png')
  }),
  methods: {
    onClickLeft() {
      const route = 'personal-center-publish'
      const isLogin = this.$cookiz.get('isLogin')
      if (isLogin) {
        const isDetails = this.$isDetails(this.$route.name)
        this.$cookiz.set('isLogin', false)
        if (isDetails) {
          this.$router.go(-4)
        } else {
          this.$router.go(-1)
        }
      } else if(this.$route.name === route) {
        this.$router.replace('/personal-center')
      } else {
        this.$router.go(-1)
      }
    },
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
</style>
