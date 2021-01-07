<template>
  <div class="more-problems">
    <m-navbar title="帮助与反馈" />
    <div class="setting-content">
      <nuxt-link class="setting-item" tag="div" to="/setting/take-streaming">
        <span class="setting-text">直播问题</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" to="/setting/account-problem">
        <span class="setting-text">账号问题</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" to="/setting/other-problems">
        <span class="setting-text">其他问题</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
    </div>
    <div class="footer">
      <button @click="toMoreProblems">意见反馈</button>
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
    toMoreProblems() {
      const href =
        process.env.protocol +
        "zcyhxy?platform=wap&entrance=common&from=REGISTER&userid=";
      location.href = href;
    },
  },
};
</script>
<style lang="less" scoped>
.more-problems {
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
  .footer {
    text-align: center;
    margin-top: 10px;
    & > button {
      border: none;
      background: #ffffff;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #44b336;
    }
  }
}
</style>