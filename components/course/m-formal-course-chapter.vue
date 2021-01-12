<template>
  <div class="m-vip-chapter-wrapper">
    <m-navbar :title="chapter.title"></m-navbar>
  </div>
</template>

<script>
export default {
  name:'Vip-Chapter',
  props:{
    chapter:{
      type:Object,
      default:{}
    }
  },
}
</script>

<style lang="less" scoped>
.m-vip-chapter-wrapper {
  width: 375px;
  height: 100vh;
  background: #F8F8F8;
}
</style>