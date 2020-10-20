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
  >
    <template #left>
      <img class="navbar__arrow icon" :src="arrow" alt="arrow" />
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
      default: '',
    },
  },
  data: () => ({
    arrow: require('@/assets/images/icon/mobile/nav-arrow-back.png'),
  }),
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$emit('onClickRight')
    },
  },
}
</script>

<style lang="less" scoped>
.m-navbar {
  height: 44px;
  line-height: 44px;
}

.navbar__arrow {
  width: 24px;
  height: 24px;
}
</style>
