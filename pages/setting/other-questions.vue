<template>
  <div class="other-questions">
    <m-navbar title="其他问题" />
    <div class="other-content">
      <h2>如何知道在线支付是否成功？</h2>
      <p>
        支付成功后，页面会提示"支付成功"，如页面未提示支付结果，可以通过银行官网/手机银行查询交易明细，或者致电银行的客服咨询，还可以联系班主任老师咨询支付结果。
      </p>
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
  mounted() {
  },
};
</script>
<style lang="less" scoped>
.other-questions {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  /deep/ .other-content {
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


