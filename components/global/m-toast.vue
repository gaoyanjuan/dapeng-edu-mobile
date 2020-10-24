<template>
  <div v-if="showWrap" class="toast-wrap">
    <van-overlay :show="showWrap" :z-index="2001"/>
    <div class="success-wrap">
      <!-- :class="showContent ? 'fadein' : 'fadeout'" -->
      <img class="success-icon" :src="sucess" alt="sucess"/>
      <span class="success-text">{{ content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    showWrap: false,
    sucess:require('@/assets/icons/common/toast-success.png')
  })
}
</script>

<style lang="less" scoped>
// 成功 style
.success-wrap {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
  display: flex;
  flex-direction: column;
  display: -webkit-flex;
  align-items: center;
  justify-content: center;
  min-width: 164px;
  min-height: 160px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 2002;
  & > img.success-icon {
    width: 60px;
    height: 60px;
  }
  & > span.success-text {
    width: 126px;
    height: 40px;
    font-size: 14px;
    font-family: @dp-font-medium;
    font-weight: 500;
    color: #465156;
    line-height: 20px;
    margin-top: 20px;
    text-align: center;
  }
}

.fadein {
  animation: animate_in 0.25s;
}
.fadeout {
  animation: animate_out 0.25s;
  opacity: 0;
}
@keyframes animate_in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes animate_out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
