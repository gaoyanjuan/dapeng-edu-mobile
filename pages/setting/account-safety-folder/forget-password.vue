<template>
  <div class="forget-password">
    <m-navbar title="忘记密码" />
    <div class="form-list">
      <div class="form-item txt">请通过手机验证重置您的登录密码:</div>
      <div class="form-item">
        <input type="text" class="phone-number"
        v-bind:value="1" disabled="disable">
      </div>
      <div class="form-item">
        <input type="text" class="verification-code"
          placeholder="请输入短信验证码" v-model.trim="code">
        <div class="send-code" @click="sendMobileCode">获取验证码</div>
      </div>
      <div class="form-item">
        <input type="password" class="new-passwd"
        placeholder="新密码（英文+数字，6-18位）" v-model.trim="newPasswd">
      </div>
      <div class="form-item">
        <input type="password" class="new-passwd"
        placeholder="确认密码" v-model.trim="aginPasswd">
      </div>
      <div class="verify-login" @click="onConfirmBtn">验证并重新登录</div>
    </div>
  </div>
</template>
<script>
import { validatePassword,validateEmpty } from '@/utils/validate.js'
export default {
  layout:'navbar',
  data() {
    return {
      code: '',
      newPasswd: '',
      aginPasswd: ''
    }
  },
  methods: {
    // 发送验证码 
    sendMobileCode() {

    },
    // 验证登录校验
    onConfirmBtn() {
      if (validateEmpty(this.code)) {
        this.$toast('请输入验证码')
        return
      }
      if (validateEmpty(this.newPasswd)) {
        this.$toast('请输入新密码')
        return
      }
      if (validateEmpty(this.aginPasswd)) {
        this.$toast('请确认新密码')
        return
      }
      if(!validatePassword(this.newPasswd)) {
        this.$toast({
          message: `密码为6—18位数字、可包含数字、大小写字母和下划线`,
          position: 'bottom',
          duration: 2000
        })
      }
      if (this.newPasswd !== this.aginPasswd ) {
        this.$toast('两次密码不一致')
        return
      }
    }
  }
}
</script>
<style lang="less" scoped>
.forget-password {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  & > .form-list {
    margin: 56px 47px 0 46px;
    & > .txt {
      width: 282px;
      height: 50px;
      font-size: 14px;
      font-family: @dp-font-semibold;
      font-weight: 600;
      color: #75737E;
      line-height: 25px;
    }
    & >.form-item {
      position: relative;
      & > .phone-number {
        height: 40px;
        width: 282px;
        font-size: 14px;
        border: none;
        padding: 0 12px;
        background: #f7f7f7;
        border-radius: 2px;
        background-image: url('~@/assets/icons/mine/mobile-icon.png');
        background-repeat: no-repeat;
        background-position: center;
        background-position-x: 15px;
        letter-spacing: 1px;
        outline:none;
        padding:0 0 0 30px;
      }
      & > .verification-code {
        width: 175px;
        height: 40px;
        margin-top: 16px;
        padding: 0 12px;
        font-size: 14px;
        border: none;
        background: #F7F7F7;
        border-radius: 2px;
        background-image: url('~@/assets/icons/mine/safety.png');
        background-repeat: no-repeat;
        background-position: center;
        background-position-x: 15px;
        letter-spacing: 1px;
        outline:none;
        padding:0 0 0 30px;
      }
      & > .send-code {
        width: 98px;
        height: 40px;
        line-height: 40px;
        position: absolute;
        top: 16px;
        right: 0;
        text-align: center;
        font-size: 15px;
        color: @dp-white;
        background: rgba(12, 182, 91, 1);
        border-radius: 2px;
        cursor: pointer;
      }
      & > .new-passwd {
        height: 40px;
        width: 282px;
        font-size: 14px;
        margin-top: 16px;
        border: none;
        padding: 0 12px;
        background: #f7f7f7;
        border-radius: 2px;
        background-image: url('~@/assets/icons/mine/password.png');
        background-repeat: no-repeat;
        background-position: center;
        background-position-x: 15px;
        letter-spacing: 1px;
        outline:none;
        padding:0 0 0 30px;
      }
    }
    & > .verify-login {
      width: 282px;
      height: 40px;
      line-height: 40px;
      margin-top: 34px;
      text-align: center;
      font-size: 15px;
      color: @dp-white;
      background: rgba(12, 182, 91, 1);
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
</style>