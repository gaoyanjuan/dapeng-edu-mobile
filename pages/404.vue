<template>
  <div>
    <m-navbar title="404"/>
    <van-empty class="empty-image" :image="error" description="你要找的页面走丢了～">
      <van-button round type="primary" class="bottom-button" to="/">回首页</van-button>
    </van-empty>
  </div>
</template>

<script>
export default {
  layout: 'navbar',
  data:()=>({
    error:require('@/assets/icons/blank/404.png')
  })
}
</script>

<style lang="less">
.empty-image {
  padding-top: 121px;
}
.empty-image .van-empty__image {
  width: 240px;
  height: 126px;
}
</style>