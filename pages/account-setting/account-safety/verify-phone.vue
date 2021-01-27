<template>
  <div class="replace-phone">
    <m-navbar title="绑定手机号" />
    <div class="form-list">
      <div class="form-item txt">您的手机号尚未验证，为保障账户安全，请验证您的手机号:</div>
      <div class="form-item">
        <input type="text" class="phone-number"
          placeholder="请输入新手机号" v-model.trim="mobile">
      </div>
      <div class="form-item">
        <input type="text" class="verification-code"
          placeholder="请输入短信验证码" v-model.trim="code">
        <div :class="showCode ? 'send-code': 'un-send-code'" @click="sendMobileCode">{{codeBtnInfo}}</div>
      </div>
      <div :class="isEmpty ? 'unfinished' : 'finish'" @click="onConfirmBtn">提交</div>
    </div>
  </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import { validateMobile } from '@/utils/validate.js'
export default {
  layout:'navbar',
  data() {
    return {
      mobile: '',
      code: '',
      codeBtnInfo: '获取验证码',
      // 倒计时基数
      countdown: 60,
      timer: null
    }
  },
  computed: {
    ...mapGetters('user',[
      'userInfoGetters'
    ]),
    // 判断获取验证码是否点亮
    showCode() {
      return Boolean(this.mobile)
    },

    // 判断确认更换是否点亮
    isEmpty() {
      return Boolean(this.mobile && this.code)
    }
  },
  mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
  },
  methods: {
    ...mapActions('user', [
      'sendCode',
      'verificationMobile'
    ]),
    // 发送验证码校验
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
              message: `短信验证码发送失败`,
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
    // 确认更换事件
    async onConfirmBtn() {
      // 更换手机号
      const data = {
        mobile: this.mobile,
        code: this.code,
        type: 'SelfVerification',
        verificationType: 'ACCOUNT'
      }
      await this.verificationMobile(data)
      .then((res) => {
        if (res.status === 200) {
          this.$toast({
            message: `手机号绑定成功`,
            position: 'bottom',
            duration: 2000
          })
          setTimeout(() => {
            this.$router.push('/setting')
          }, 2000)
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
            message: `手机号格更换失败`,
            position: 'bottom',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.replace-phone {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  & > .form-list {
    margin: 56px 47px 0 46px;
    & > .txt {
      width: 282px;
      height: 70px;
      font-size: 14px;
      font-family: @dp-font-semibold;
      font-weight: 600;
      color: #75737E;
      line-height: 25px;
    }
    & >.form-item {
      position: relative;
      & > .tip {
        width: 56px;
        height: 20px;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #465156;
        line-height: 20px;
        margin: 16px 0;
      }
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
      & > .un-send-code {
        width: 98px;
        height: 40px;
        line-height: 40px;
        position: absolute;
        top: 16px;
        right: 0;
        text-align: center;
        font-size: 13px;
        color: @dp-white;
        background: rgba(12, 182, 91, .4);
        border-radius: 2px;
        pointer-events: none;
      }
      & > .send-code {
        width: 98px;
        height: 40px;
        line-height: 40px;
        position: absolute;
        top: 16px;
        right: 0;
        text-align: center;
        font-size: 13px;
        color: @dp-white;
        background: rgba(12, 182, 91, 1);
        border-radius: 2px;
        cursor: pointer;
      }
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
      border-radius: 2px;
      pointer-events: none;
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
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
</style>