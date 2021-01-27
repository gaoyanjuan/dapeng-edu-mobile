<template>
  <div class="modification-password">
    <m-navbar title="修改密码" />
    <div class="form-list" v-if="mobileState !== 'Verification'">
      <div class="txt">请验证手机号并设置新密码</div>
      <div class="form-item">
        <input
          v-model.trim="mobile"
          class="password-input"
          type="text"
          placeholder="请输入手机号"
        />
      </div>
      <div class="form-item">
        <input
          v-model.trim="code"
          class="code-input"
          type="text"
          placeholder="请输入验证码"
        />
        <div :class="showCode ? 'send-code': 'un-send-code'" @click="sendMobileCode">{{codeBtnInfo}}</div>
      </div>
      <div class="form-item">
        <input
          v-model="newPasswd"
          class="password-input"
          type="password"
          placeholder="设置新密码（英文+数字，6-18位）"
        />
      </div>
      <div class="form-item">
        <input
          v-model="aginPasswd"
          class="password-input"
          type="password"
          placeholder="请再次输入密码"
        />
      </div>
      <!-- <div class="hint">密码为6—18位数字、可包含数字、大小写字母和下划线</div> -->
      <div :class="isCodeEmpty ? 'unfinished' : 'finish'" @click="onAccomplishBtn">完成</div>
    </div>
    <div class="form-list" v-if="mobileState === 'Verification'">
      <div class="form-item">
        <input
          v-model="oldPasswd"
          class="password-input"
          type="password"
          placeholder="请输入旧密码"
        />
      </div>
      <div class="form-item">
        <input
          v-model="newPasswd"
          class="password-input"
          type="password"
          placeholder="请输入新密码"
        />
      </div>
      <div class="form-item">
        <input
          v-model="aginPasswd"
          class="password-input"
          type="password"
          placeholder="请确认新密码"
        />
      </div>
      <div class="hint">密码为6—18位数字、可包含数字、大小写字母和下划线</div>
      <div :class="isEmpty ? 'unfinished' : 'finish'" @click="onAccomplishBtn">完成</div>
    </div>
  </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import { validatePassword, validateMobile } from '@/utils/validate.js'
export default {
  layout:'navbar',
  data() {
    return {
      mobile: '',
      code:'',
      codeBtnInfo: '获取验证码',
      oldPasswd: '',
      newPasswd: '',
      aginPasswd: '',
      mobileState: '',
      // 倒计时基数
      countdown: 60,
    }
  },
  computed: {
    ...mapGetters('user', [
      'userStatusGetters'
    ]),
    // 判断获取验证码是否点亮
    showCode() {
      return Boolean(this.mobile)
    },
    // 判断完成按钮是否点亮
    isEmpty() {
      return Boolean(this.oldPasswd && this.newPasswd && this.aginPasswd)
    },
    isCodeEmpty() {
      return Boolean(this.mobile && this.code && this.newPasswd && this.aginPasswd)
    }
  },
  mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
    if (this.userStatusGetters) {
      this.mobileState = this.userStatusGetters.mobileValidateState
    } else {
      this.geMyState().then(res =>{
        this.mobileState = res.data.mobileValidateState
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'modifyPassword',
      'geMyState',
      'sendCode',
      'verificationMobile'
    ]),

    async sendMobileCode() {
      if (validateMobile(this.mobile)) {
        const params = {
          mobile: this.mobile,
          codeType: 'REAL_PHONE_CODE'
        }
        await this.sendCode(params).then((res) => {
          if (res.status === 200 && !this.timer) {
            this.countDown()
          }
        }).catch((error) => {
          if (error && error.data) {
            this.$toast({
              message: `${error.data.message}`,
              position: 'bottom',
              duration: 2000
            })
          } else {
            this.$toast({
              message: `获取验证码失败`,
              position: 'bottom',
              duration: 2000
            })
          }
        })
      } else {
        this.$toast({
          message: `手机号格式不正确请重新输入`,
          position: 'bottom',
          duration: 2000
        })
      }
    },
    // 验证码倒计时
    countDown () {
      this.timer = setInterval(() => {
        if (this.countdown > 0 && this.countdown <= 60) {
          this.countdown--
          if (this.countdown !== 0) {
            
            this.codeBtnInfo = `${this.countdown}s后重新发送`
          } else {
            clearInterval(this.timer)
            this.codeBtnInfo = '获取验证码'
            this.countdown = 60
            this.timer = null
            this.codeDisabled = false
            return false
          }
        }
      }, 1000)
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer)
        this.timer = null
      })
    },

    // 点击完成按钮的逻辑判断
    async onAccomplishBtn() {
      if (this.mobileState === 'Verification') {
        if (this.oldPasswd.length === 0) {
          this.$toast('请输入原密码')
          return
        }
        if (this.newPasswd.length === 0) {
          this.$toast('请输入新密码')
          return
        }
        if (this.aginPasswd.length === 0) {
          this.$toast('请输入确认密码')
          return
        }
        if (this.newPasswd !== this.aginPasswd) {
          this.$toast('两次密码不一致')
          return
        }
         // 设置新密码正则判断
        if(validatePassword(this.newPasswd)) {
          const data = {
            oldPassWord: this.oldPasswd,
            password: this.newPasswd
          }
          await this.modifyPassword(data).then((res) => {
            if (res.status === 200) {
              this.$toast({
                message: `密码修改成功`,
                position: 'bottom',
                duration: 2000
              })
              this.onLogoutEvent()
            }
          }).catch((error) => {
            if (error && error.data) {
              this.$toast({
                message: `${error.data.message}`,
                position: 'bottom',
                duration: 2000
              })
            } else {
              this.$toast({
                message: `修改密码失败`,
                position: 'bottom',
                duration: 2000
              })
            }
          })
        } else {
          this.$toast({
            message: `密码为6—18位数字、可包含数字、大小写字母和下划线`,
            position: 'bottom',
            duration: 2000
          })
        }
      } else {
        if (validateMobile(this.mobile)) {
          const data = {
            mobile: this.mobile,
            code: this.code,
            password: this.newPasswd,
            type: 'SelfVerification',
            verificationType: 'RESET'
          }
          await this.verificationMobile(data)
          .then((res) => {
            if (res.status === 200) {
              this.$toast({
                message: `密码修改成功`,
                position: 'bottom',
                duration: 2000
              })
               this.onLogoutEvent()
            }
          })
          .catch((error) => {
            if (error && error.data) {
              this.$toast({
                message: `${error.data.message}`,
                position: 'bottom',
                duration: 2000
              })
            } else {
              this.$toast({
                message: `密码修改失败`,
                position: 'bottom',
                duration: 2000
              })
            }
          })
        }
      }
    },
    // 修改密码后退出登录
    onLogoutEvent() {
      this.$logout().then(() => {
        const redirectUrl = `${location.protocol}//${location.host}`
        window.location.href = `${process.env.authUrl}/logout?redirectUrl=${redirectUrl}`
      })
    }
  }
}
</script>
<style lang="less" scoped>
.modification-password {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  & > .form-list {
    margin: 44px 53px 0 46px;
    & > .txt {
      width: 282px;
      height: 50px;
      font-size: 14px;
      font-family: @dp-font-semibold;
      font-weight: 600;
      color: #75737E;
      line-height: 25px;
    }
    & > .form-item {
      width: 100%;
      height: 52px;
      line-height: 42px;
      position: relative;
      border-bottom: 1px solid #f7f7f7;
      & > .code-input {
        width: 175px;
        height: 32px;
        font-size: 14px;
        border: none;
      }
      & > .password-input {
        width: 220px;
        height: 32px;
        font-size: 14px;
        border: none;
      }
      & > .un-send-code {
        width: 98px;
        height: 32px;
        line-height: 32px;
        position: absolute;
        top: 9px;
        right: 0;
        text-align: center;
        font-size: 14px;
        color: #A3A8AB;
        border-radius: 2px;
        pointer-events: none;
      }
      & > .send-code {
        width: 98px;
        height: 32px;
        line-height: 32px;
        position: absolute;
        top: 9px;
        right: 0;
        text-align: center;
        font-size: 14px;
        color: #0BCB7F;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    & > .hint {
      width: 275px;
      height: 40px;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #A3A8AB;
      line-height: 20px;
      margin-top: 8px;
    }
    & > .finish {
      width: 282px;
      height: 40px;
      line-height: 40px;
      margin-top: 34px;
      text-align: center;
      font-size: 15px;
      color: @dp-white;
      background: rgba(12, 182, 91, .4);
      border-radius: 5px;
      cursor: pointer;
    }
    & > .unfinished {
      width: 282px;
      height: 40px;
      line-height: 40px;
      margin-top: 34px;
      text-align: center;
      font-size: 15px;
      color: @dp-white;
      background: rgba(12, 182, 91, 1);
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>