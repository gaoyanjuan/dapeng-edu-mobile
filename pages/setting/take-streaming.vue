<template>
  <div class="take-streaming">
    <m-navbar title="直播问题" />
    <div class="setting-content">
      <nuxt-link class="setting-item" tag="div" :to="`/setting/live-issue?id=${1}`">
        <span class="setting-text">如何上直播课？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" :to="`/setting/live-issue?id=${2}`">
        <span class="setting-text">课程是否可以下载或缓存？</span>
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
.take-streaming {
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