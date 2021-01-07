<template>
  <div class="live-issue">
    <m-navbar title="直播问题" />
    <div class="issue-content">
      <div class="content-text" v-html="`${content[id]}`"></div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "navbar",
  data() {
    return {
      content: [
        "",
        `<h2>如何上直播课？</h2>
        <p>试学课:"已有班主任老师，请联系班主任开通试学课程后即可观看直播课程"
         正式课程:"已经购买正式课程，请联系学管老师， 即可观看直播课程"</p>`,
        `<h2>课程是否可以下载或缓存？</h2>
        <p>在线课程暂不支持下载或缓存，在学习期间内，学员可观看直播与回放课程</p>`,
      ],
      id: "",
    };
  },
  mounted() {
    this.id = this.$route.query.id;
  },
};
</script>
<style lang="less" scoped>
.live-issue {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  /deep/ .issue-content {
    margin: 60px 15px;
    /deep/ h2 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    /deep/ p {
      color: #383640;
      font-size: 14.5px;
      line-height: 22px;
      font-family: @dp-font-medium;
    }
  }
}
</style>


