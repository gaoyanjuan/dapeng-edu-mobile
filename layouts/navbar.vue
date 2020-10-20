<template>
  <div class="tabbar-box">
    <!-- 主体内容 -->
    <div class="app_wrap">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="less" scoped>

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.tabbar-box {
  background-color: #FFF;
}

.app_wrap {
  width: 100%;
  min-height: 100vh;
  background: @dp-white;
  box-sizing: border-box;
}
</style>
