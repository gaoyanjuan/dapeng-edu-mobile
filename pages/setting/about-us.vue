<template>
  <div class="about-us">
    <m-navbar title="关于我们" />
    <div class="body_main">
      <div class="about_logo">
        <img src="@/assets/icons/mine/dapeng.png" alt="" />
      </div>
      <div class="about_content">
        <div class="site-com">
          <p>公司名称：</p>
          <span>北京知金大鹏教育科技有限公司</span>
        </div>
        <div class="site-com">
          <p>联系电话：</p>
          <span>400-101-8899</span>
        </div>
        <div class="site-com">
          <p>官方公众号：</p>
          <span>bjdpjy</span>
        </div>
        <div class="site-com">
          <p>公司地址：</p>
          <span>北京市海淀区中关村南大街5号</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Copyright © 2013-2020 大鹏教育</p>
    </div>
  </div>
</template>
<script>
export default {
  layout: "navbar",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.about-us {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  & > .body_main {
    & > .about_logo {
      margin: 64px 79px 0 80px;
      & > p {
        text-align: center;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #75737e;
      }
    }
    & > .about_content {
      margin: 26px 20px 0 50px;
      .site-com {
        margin-bottom: 36px;
        display: flex;
        & > p {
           width: 84px;
          font-size: 14px;
          font-family: @dp-font-regular;
          font-weight: 400;
          margin-right: 20px;
          color: #383640;
          line-height: 20px;
        }
        & > span {
          font-size: 14px;
          font-family: @dp-font-regular;
          font-weight: 400;
          color: #75737e;
          line-height: 20px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 40px;
    left: 50%;
    margin-left: -25%;
    z-index: 55;
    & > p {
      font-size: 12px;
      font-family: @dp-font-regular;
      font-weight: 500;
      color: #75737e;
    }
  }
}
</style>