<template>
  <div class="empty-wrapper">

    <m-navbar :title="$route.query.title"></m-navbar>

    <div class="empty">
      <img class="empty-icon" :src="empty" alt="empty" />
      <span class="empty-txt">页面加载异常，请稍后～</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'Empty',

  layout:'navbar',

  data: ()=> ({
    empty: require('@/assets/icons/blank/have-no-network.png')
  })
}
</script>

<style lang="less" scoped>
.empty-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
  background: @dp-white;
}

.empty-wrapper .empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  flex-direction: column;

  &-icon {
    width: 240px;
    height: 126px;
  }

  &-txt {
    font-size: 14px;
    font-family: @semibold;
    font-weight: 600;
    color: #8D8E8E;
    margin-top: 12px;
    text-align: center;
  }
}
</style>