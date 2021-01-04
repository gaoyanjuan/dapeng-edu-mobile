<template>
  <div class="setting-nav-list">
    <m-navbar title="设置" />
    <div class="setting-content">
      <nuxt-link class="setting-item" tag="div" to="/setting/account-safety">
        <span class="setting-text">账号安全</span>
        <span class="safety-grade">账号安全等级</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" to="/setting/protocol-policy">
        <span class="setting-text">协议与政策</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" to="/setting/help-feedback">
        <span class="setting-text">帮助与反馈</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" to="/setting/about-us">
        <span class="setting-text">关于我们</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  layout:'navbar'

}
</script>
<style lang="less" scoped>
.setting-nav-list {
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
      & > .setting-text {
        width: 70px;
        height: 14px;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #383640;
        line-height: 14px;
      }
      & > .safety-grade {
        width: 84px;
        height: 14px;
        position: absolute;
        right: 42px;
        float: right;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #75737E;
        line-height: 14px;
      }
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


