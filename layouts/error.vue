<template>
  <div class="error-page">
    <van-empty class="error-image" :image="error" description="你要找的页面走丢了～">
      <van-button round type="primary" class="bottom-button" to="/">返回广场</van-button>
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
.error-page .error-image {
  padding-top: 121px;
}
.error-image .van-empty__image {
  width: 240px;
  height: 126px;
}
</style>