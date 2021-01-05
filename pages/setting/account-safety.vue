<template>
  <div class="account-safety">
    <m-navbar title="账号与安全" />
    <div class="account-safety_content">
      <div class="safety-grade">
        <div class="grade-score">
          50
        </div>
        <div class="account-tip">
          <img class="star" src="@/assets/icons/mine/icon-star.png" alt="">
          <div class="account-text">账号安全等级中等</div>
        </div>
      </div>
      <nuxt-link
        class="modification-box"
        tag="div"
        to="/setting/account-safety-folder/replace-phone"
      >
        <div class="modification-left-box">
          <div class="modification-text">更换手机号</div>
          <div class="modification-explain">换手机了？来这儿修改一下，以后就不怕忘记密码咯！</div>
        </div>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link
        class="modification-box"
        tag="div"
        to="/setting/account-safety-folder/modification-password"
      >
        <div class="modification-left-box">
          <div class="modification-text">修改密码</div>
          <div class="modification-explain">互联网环境建议您定期修改密码！</div>
        </div>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link
        class="modification-box"
        tag="div"
        to="/setting/account-safety-folder/forget-password"
      >
        <div class="modification-left-box">
          <div class="modification-text">忘记密码</div>
          <div class="modification-explain">怎么也想不起来？通过手机号验证登录吧！</div>
        </div>
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
.account-safety {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  & > .account-safety_content {
    margin-top: 56px;
    padding: 0 14px 0 16px;
    & > .safety-grade {
      width: 343px;
      height: 88px;
      background: rgba(255, 191, 14, .1);
      border-radius: 4px;
      position: relative;
      & > .grade-score {
        width: 72px;
        height: 84px;
        font-size: 60px;
        font-family: @dp-font-medium;
        font-weight: 500;
        color: #EFBA31;
        line-height: 84px;
        margin-left: 20px;
      }
      & > .account-tip {
        width: 112px;
        height: 55px;
        position: absolute;
        top:50%;
        left: 102px;
        transform: translateY(-50%);
        & > .star {
          width: 16px;
          height: 16px;
        }
        & > .account-text {
          width: 112px;
          height: 20px;
          font-size: 14px;
          font-family: @dp-font-regular;
          font-weight: 400;
          color: #5E5E5E;
          line-height: 20px;
        }
      }
    }
    & > .modification-box {
      width: 100%;
      height: 80px;
      line-height: 80px;
      margin-top: 14px;
      border-bottom: 1px solid #F5F5F5;
      position: relative;
      & > .modification-left-box {
        position: absolute;
        top: 17px;
        left: 0;
        & > .modification-text {
          width: 70px;
          height: 20px;
          font-size: 14px;
          font-family: @dp-font-regular;
          font-weight: 400;
          color: #333333;
          line-height: 20px;
        }
        & > .modification-explain {
          width: 288px;
          height: 17px;
          font-size: 12px;
          font-family: @dp-font-regular;
          font-weight: 400;
          color: #CFCECE;
          line-height: 17px;
        }
      }
      & > .right-arrow {
        position: absolute;
        top: 24px;
        right: 0;
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
    }
  }
}
</style>
