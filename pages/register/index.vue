<template>
  <div>
    <m-navbar title="注册"/>

    <div class="register-wrapper">
      
      <!-- Account Title Blcok -->
      <h3 class="register-title-row">手机号验证注册</h3>
      
      <!-- Phone Number Blcok -->
      <div class="register-account-row">
        <img class="account-icon" :src="account" alt="account" />
        <input v-model.trim="mobile" class="account-phone-number" type="text" placeholder="请输入手机号" />
      </div>

      <!-- Auth Code Blcok -->
      <div class="register-auth-code-row">

        <div class="register-left-side-cloumn">
          <img class="auth-code-icon" :src="safety" alt="code-icon" />
          <input v-model.trim="authCode" class="auth-code" type="text" placeholder="请输入验证码" />
        </div>

        <div :class="authStatus ? 'get-code btn-active':'get-code btn-disable'" @click="getAuthCode">
          {{ timer ? '('+ count +')秒后获取':'获取验证码' }}
        </div>

      </div>

      <!-- Warning Block -->
      <div v-if="warning.show" class="register-warning-row" v-html="warning.content"></div>
      
      <!-- Register Button Blcok -->
      <div v-if="registerAble" class="register-button-row" @click="onRegister">快速注册</div>
      <div v-else class="register-button-row" @click="toLogin">去登录</div>

      <!-- Resister Footer Protocol -->
      <div class="register-footer-protocol">
        <van-checkbox v-model="checked" shape="square" checked-color="#00B93B" icon-size="18px"/>
        <div class="protocol-txt">
          <span class="protocol-link" @click="onToProtocol">《大鹏教育用户服务协议v3.2》</span>和
          <span class="protocol-link" @click="onTopolicy">《隐私政策》</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name:'Register',
  layout:'navbar',
  data:() => ({
    checked: true,
    // 手机号
    mobile:'',
    // 验证码
    authCode:'',
    // 验证码状态
    authStatus:false,
    // 计时载体
    count:'',
    // 计时器
    timer:null,
    // 警告消息
    warning: { show:false, content:'' },
    // 判断用户是否自注册
    registerAble: true,
    account: require('@/assets/icons/register/account.png'),
    safety: require('@/assets/icons/register/safety.png'),
  }),
  watch:{
    mobile(n, o) {
      if (!new RegExp(/^1[3-9][0-9]\d{8}$/).test(n)) {
        this.authStatus = false
      } else {
        if(!this.timer) {
          this.authStatus = true
        }
      }
      this.registerAble = true
      this.warning.show = false
      this.warning.content = ''
    },
    authCode(n, o) {
      if (!n.length) {
        this.warning.show = true
      } else {
        this.warning.show = false
        this.warning.content = ''
      }
    },
    checked(n, o) {
      if (!n) {
        this.warning.show = true
      } else {
        this.warning.show = false
        this.warning.content = ''
      }
    }
  },
  methods:{
    ...mapActions('user', [
      'checkRegisterAble',
      'sendCode',
      'checkCode'
    ]),
    // 快速注册
    onRegister() {

      const reg = /^1[3-9][0-9]\d{8}$/
      if(!reg.test(this.mobile)) {
        this.warning.show = true
        this.warning.content = '请输入正确的手机号'
        return
      }

      if(!this.authCode.length) {
        this.warning.show = true
        this.warning.content = '请输入验证码'
        return
      }

      if(!this.checked) {
        this.warning.show = true
        this.warning.content = '请同意 服务协议 和 隐私政策'
        return
      }

      // 对比验证码
      const params = {
        mobile: this.mobile,
        codeType: 'REGISTER_CODE',
        code: this.authCode
      }
      this.checkCode(params)
        .then((res) => {
          if (res.status === 200) {
            // 注册逻辑************
            this.$router.push({
              path: '/register/affirm-password',
              query: {
                mobile: this.mobile
              }
            })
          } else {
            this.warning.content = res.data.message ? res.data.message : ''
            this.warning.show = true
          }
        })
    },

    // 获取验证吗码
    async getAuthCode() {
      if(!this.authStatus) return

      if(this.timer) return

      // 验证用户是否可以自注册
      const { data } = await this.checkRegisterAble({account: this.mobile})
      if (data.verifyStatus) {
        const params = {
          mobile: this.mobile,
          codeType: 'REGISTER_CODE'
        }
        // 检查是否需要将注册按钮变换为登录按钮
        this.registerAble = true
        const res = await this.sendCode(params)
        if (res.status === 200 && !this.timer) {
          this.countDown()
        } else {
          this.warning.content = res.data.message ? res.data.message : ''
          this.warning.show = true
        }
      } else {
        this.registerAble = false

        if (data.accountType === 'MOBILE') {
          const newMobile = this.validateMobileCode(data.account)
          this.warning.content = `<p>该手机号已经存在，无法再次注册</p><p>可使用绑定的手机号<span style="color:#00BF65;">${newMobile}</span>，获取验证码直接登录，如登录遇到问题，请联系客服</p>`
        } else if (data.accountType === 'DPACCOUNT') {
          this.warning.content = `<p>该手机号已经存在，听课号：<span style="color:#00BF65;">${data.account}</span></p><p>您无需再次注册，可使用手机验证码的方式直接登录</p>`
        }
        this.warning.show = true
      }
    },

    countDown() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.authStatus = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            clearInterval(this.timer)
            this.timer = null
            this.authStatus = true
          }
        }, 1000)
      }
    },

    validateMobileCode (mobile) {
      const first = mobile.slice(0, 3)
      const last = mobile.slice(-4)
      return first + '****' + last
    },

    // 协议
    onToProtocol() {
      const href = "https://h5-static.dapengjiaoyu.cn/h5-protocol/#/zcyhxy?platform=wap&entrance=common&from=REGISTER&userid="
      location.href = href
      // window.open(href,'_blank')
    },

    // 隐私政策
    onTopolicy() {
      const href = "https://h5-static.dapengjiaoyu.cn/h5-protocol/#/yszc?platform=wap&entrance=common"
      location.href = href
      // window.open(href,'_blank')
    },

    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

.register-wrapper {
  min-height: 100vh;
  padding: 85px 46px 10px;
  background-color: @dp-white;
  position: relative;
}

// 标题
.register-title-row {
  height: 18px;
  font-size: 18px;
  font-family: @semibold;
  font-weight: 600;
  color: #75737E;
}

// ****输入手机号*****
.register-account-row {
  width: 282px;
  height: 40px;
  background: #F7F7F7;
  border-radius: 2px;
  margin-top: 41px;
  padding: 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  
  .account-icon {
    width: 13px;
    height: 13px;
    margin-right: 9px;
  }

  .account-phone-number {
    width: 230px;
    height: 15px;
    border: none;
    color: #383640;
    background: #F7F7F7;
  }

  .account-phone-number::placeholder {
    color: #75737E;
  }
}

// ************获取验证码************
.register-auth-code-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;

  .get-code {
    width: 98px;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    font-size: 12px;
    font-family: @medium;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
    cursor: pointer;
  }
  
  .btn-disable {
    background: #99E3B1;
  }
  
  .btn-active {
    background: #00B93B;
  }
}

.register-auth-code-row .register-left-side-cloumn {
  width: 175px;
  height: 40px;
  background: #F7F7F7;
  border-radius: 2px;
  padding: 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;

  .auth-code-icon {
    width: 13px;
    height: 13px;
    margin-right: 9px;
  }

  .auth-code {
    width: 120px;
    height: 15px;
    border: none;
    color: #383640;
    background: #F7F7F7;
  }

  .auth-code::placeholder {
    color: #75737E;
  }
}

// 警告信息
.register-warning-row {
  max-height: 40px;
  font-size: 13px;
  font-family: @regular;
  font-weight: 400;
  color: #FF9466;
  line-height: 20px;
  margin-top: 20px;
}

// 快速注册
.register-button-row {
  width: 282px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #00B93B;
  border-radius: 2px;
  margin-top: 40px;
  font-size: 15px;
  font-family: @medium;
  font-weight: 500;
  color: #FFFFFF;
  cursor: pointer;
}

// 用户协议
.register-footer-protocol {
  width: 320px;
  height: 13px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-top: 16px;

  .protocol-txt {
    font-size: 12px;
    font-family: @medium;
    font-weight: 500;
    color: #707070;
    margin-left: 7px;
  }

  .protocol-link {
    font-size: 12px;
    font-family: @medium;
    font-weight: 500;
    color: #00B93B;
    cursor: pointer;
  }
}
</style>