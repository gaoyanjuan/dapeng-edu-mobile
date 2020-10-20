<template>
  <div class="tabbar-box">
    <m-guide/>
    <div class="app_wrap">
      <Nuxt />
    </div>
    <m-footer />
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
  min-height: calc(100vh - 94px);
  background: @dp-white;
  box-sizing: border-box;
}
</style>
