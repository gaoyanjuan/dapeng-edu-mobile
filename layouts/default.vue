<template>
  <div>
    <div v-if="$nuxt.isOnline">
      <m-guide/>
      <Nuxt />
      <m-footer />
    </div>
    <div class="off-line-wrap" v-if="$nuxt.isOffline">
      掉线了~~
    </div>
  </div>
</template>

<style lang="less" scoped>
.off-line-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 45% auto;
}
</style>
