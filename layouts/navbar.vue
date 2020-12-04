<template>
  <div>
    <div class="app_wrap" v-if="$nuxt.isOnline">
      <Nuxt />
    </div>
    <div class="off-line-wrap" v-if="$nuxt.isOffline">
       <span class="off-line-txt"> 您的网络已断开 </span>
       <span class="off-line-txt"> 请检查后刷新一下哦~ </span>
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
  flex-direction: column;
  margin: 45% auto;
}


.off-line-txt {
  font-size: 14px;
  font-family: @regular;
  font-weight: 400;
  color: #747C80;
  line-height: 26px;
}

.off-line-txt:not(:first-child) {
  margin-top: 5px;
}

</style>
