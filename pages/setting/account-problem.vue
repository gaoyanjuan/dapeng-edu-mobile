<template>
  <div class="account-problem">
    <m-navbar title="账号问题" />
    <div class="setting-content">
      <nuxt-link
        class="setting-item"
        tag="div"
        :to="`/setting/trouble-shooting?id=${8}`"
      >
        <span class="setting-text"
          >修改绑定手机号码，手机丢了，无法接受验证码怎么办？</span
        >
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
      <nuxt-link
        class="setting-item"
        tag="div"
         :to="`/setting/trouble-shooting?id=${9}`"
      >
        <span class="setting-text">忘记密码怎么找回密码？</span>
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
    return {};
  },
  methods: {
    toMoreProblems() {},
  },
};
</script>
<style lang="less" scoped>
.account-problem {
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
      & > .setting-text {
        width: 270px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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