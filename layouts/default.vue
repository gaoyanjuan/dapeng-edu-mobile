<template>
  <div>
    <div v-if="$nuxt.isOnline && show">
      <m-guide />
      <div class="app_wrap">
        <Nuxt />
      </div>
      <m-footer />
    </div>
    <div class="off-line-wrap" v-if="$nuxt.isOffline">
      <span class="off-line-txt"> 您的网络已断开 </span>
      <span class="off-line-txt"> 请检查后刷新一下哦~ </span>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    show: false,
  }),
  mounted() {
    this.$cookiz.remove("access_token_t");
    this.$cookiz.remove("access_token_t", {
      path: "/",
      domain: ".dapengjiaoyu.cn",
    });
    this.$cookiz.remove("access_token", {
      path: "/",
      domain: ".dapengjiaoyu.cn",
    });
    if (this.$store.getters["banner/adverBannerListGetters"] !== "" &&
      this.$store.getters["banner/adverBannerListGetters"] !== null) {
      this.appendAdverList();
    }
    /***
     * 【刷新或者首次加载】
     * 等待文档树渲染完毕后，再放开显示
     */
    this.$nextTick(() => {
      this.show = true;
    });
  },
  methods: {
    ...mapActions("banner", ["appendAdverList"]),
  },
};
</script>

<style lang="less" scoped>
.app_wrap {
  width: 100%;
  min-height: calc(100vh - 94px);
  background: @dp-white;
  box-sizing: border-box;
}

.off-line-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 45% auto;
}

.off-line-txt {
  font-size: 14px;
  font-family: @regular;
  font-weight: 400;
  color: #747c80;
  line-height: 26px;
}

.off-line-txt:not(:first-child) {
  margin-top: 5px;
}
</style>
