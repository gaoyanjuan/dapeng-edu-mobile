<template>
  <div>
      <m-navbar></m-navbar>
      <div class="m-box">
        <div>
          <img src="@/assets/images/common/404.png" alt="">
        </div>
        <p class="back-txt">你要找的页面走丢了～</p>
      </div>
  </div>
</template>

<script>
export default {
  layout: 'not-found'
}
</script>

<style lang="less" scoped>
.m-box {
  margin: 124px auto 0 auto;
  width: 240px;
  text-align: center;
  img {
    width: 240px;
    height: 126px;
  }
  .back-txt {
    margin-top: 12px;
    font-size: 14px;
    font-family: @dp-font-semibold;
    font-weight: 600;
    color: #8D8E8E;
  }
}
</style>