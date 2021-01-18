<template>
  <div class="other-problems">
    <m-navbar title="其他问题" />
    <div class="setting-content">
      <nuxt-link class="setting-item" tag="div" to="/setting/other-questions">
        <span class="setting-text">如何知道在线支付是否成功？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  layout: "navbar",
  data() {
    return {
      
    }
  },
  methods: {
    toMoreProblems() {
      
    }
  },
};
</script>
<style lang="less" scoped>
.other-problems {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  & > .setting-content {
    margin-top: 44px;
    & > .setting-item {
      width: 100%;
      height: 54px;
      display: flex;
      justify-content: flex-start;
      margin-left: 16px;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      font-family: @dp-font-regular;
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      & > .right-arrow {
        position: absolute;
        right: 16px;
        float: right;
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
    }
  }
}
</style>