<template>
  <div v-if="showWrap" class="loading"></div>
</template>

<script>
export default {
  data:()=>({
    showWrap: false
  })
}
</script>

<style lang="less" scoped>

.loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background: url("~@/assets/icons/loading.gif") center center no-repeat #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 172px 36px;
  animation: load 2.04s ease infinite;
  -webkit-animation: load 2.04s ease infinite;
}

@keyframes load {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}

@-webkit-keyframes load {
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}
</style>