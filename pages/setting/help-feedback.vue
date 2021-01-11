<template>
  <div class="help-feedback">
    <m-navbar title="帮助与反馈" />
    <div class="setting-content">
      <nuxt-link class="setting-item" tag="div" :to="`/setting/trouble-shooting?id=${1}`">
        <span class="setting-text">大鹏教育的网址是什么？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" :to="`/setting/trouble-shooting?id=${2}`">
        <span class="setting-text">验证手机号与密码可以修改吗？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""  
        />
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div":to="`/setting/trouble-shooting?id=${3}`">
        <span class="setting-text">如何报名课程？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" :to="`/setting/trouble-shooting?id=${4}`">
        <span class="setting-text">如何联系班主任老师？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" :to="`/setting/trouble-shooting?id=${5}`">
        <span class="setting-text">进入直播间出现卡顿情况如何解决？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
      <nuxt-link class="setting-item" tag="div" :to="`/setting/trouble-shooting?id=${6}`">
        <span class="setting-text">提交后的作业是否可以修改？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link>
       <!-- <nuxt-link class="setting-item" tag="div" :to="`/setting/trouble-shooting?id=${7}`">
        <span class="setting-text">M站页面混乱布局出错如何解决？</span>
        <img
          class="right-arrow"
          src="@/assets/icons/mine/icon-right-arrow.png"
          alt=""
        />
      </nuxt-link> -->
    </div>
    <div class="footer">
      <button @click="toMoreProblems">更多问题</button>
      <button @click="tofeedback">意见反馈</button>
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
      this.$router.push({
         path:'./more-problems',   //跳转的路径 
      })
    },
       tofeedback() {
        this.$router.push({
         path:'./advice-feedback',   //跳转的路径         
      })
    }
  }
};
</script>
<style lang="less" scoped>
.help-feedback {
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
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -196px;
    z-index: 55;
    & > button {
      width: 188px;
      height: 49px;
      border: none;
      background: #ffffff;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #5e5e5e;
      line-height: 20px;
    }
  }
}
</style>