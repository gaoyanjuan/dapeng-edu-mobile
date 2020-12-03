<template>
  <div>
    <div class="app_wrap" v-if="$nuxt.isOnline">
      <Nuxt />
    </div>
    <div class="off-line-wrap" v-if="$nuxt.isOffline">
      请检查网络
    </div>
  </div>
</template>

<style lang="less" scoped>
.app_wrap {
  width: 100%;
  min-height: 100vh;
  background: @dp-white;
  box-sizing: border-box;
}

.off-line-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 45% auto;
}
</style>
