<template>
  <div>
    <m-navbar title="设置密码"/>

    <div class="register-wrapper">
      
      <!-- Account Title Blcok -->
      <h3 class="register-title-row">设置您的密码，并开启体验之旅吧！</h3>
      
      <!-- Password Blcok -->
      <div class="register-password-row">
        <img class="password-icon" :src="passIcon" alt="password" />
        <input v-model.trim="password" class="password-input" type="password" placeholder="新密码（英文+数字，6-18位）" />
      </div>

      <!-- Confirm Password Blcok -->
      <div class="register-confirm-password-row">
        <img class="safety-icon" :src="safety" alt="safety-icon" />
        <input v-model.trim="confirmPassword" class="confirm-password" type="password" placeholder="确认密码" />
      </div>

      <!-- Warning Block -->
      <div v-if="warning.show" class="register-warning-row"> {{ warning.content }} </div>
      
      <!-- Register Button Blcok -->
      <div class="register-button-row" @click="onFinished">完成</div>

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
  name:'Affirm-Password',
  layout:'navbar',
  data:() => ({
    checked: true,
    // 密码
    password:'',
    // 确认密码
    confirmPassword:'',
    // 警告消息
    warning: { show:false, content:''},
    passIcon: require('@/assets/icons/register/password.png'),
    safety: require('@/assets/icons/register/safety.png'),
    mobile: '',
    cip: ''
  }),
  watch:{
    password(n, o) {
      if (!n.length) {
        this.warning.show = true
      } else {
        this.warning.show = false
        this.warning.content = ''
      }
    },
    confirmPassword(n, o){
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
  mounted() {
    this.mobile = this.$route.query.mobile
    this.cip = returnCitySN['cip']
  },
  methods: {
    ...mapActions('user', [
      'userRegister'
    ]),
    // 快速注册
    onFinished() {
      if(!this.password.length) { 
        this.warning.show = true
        this.warning.content = '请输入6-18位新密码'
        return
      }
      
      if(this.confirmPassword !== this.password) { 
        this.warning.show = true
        this.warning.content = '两次输入密码不一致！'
        return
      }

      if(!this.checked) {
        this.warning.show = true
        this.warning.content = '请同意 服务协议 和 隐私政策'
        return
      }

      // 请求注册
      const data = {
        mobile: this.mobile,
        password: this.password,
        registerIp: this.cip
      }
      this.userRegister(data)
        .then((res) => {
          if (res.status === 200) {
            this.$cookiz.set('access_token', res.data.access_token)
            this.$cookiz.set('refresh_token', res.data.refresh_token)
            localStorage.setItem('login_time', new Date().getTime())
            // 完成注册
            this.$router.push('/')
          } else {
            this.warning.content = res.data.message
            this.warning.show = true
          }
        })
    },

    // 协议
    onToProtocol() {
      const href = "https://h5-static.dapengjiaoyu.cn/h5-protocol/#/zcyhxy?platform=wap&entrance=common&from=REGISTER&userid="
      window.open(href,'_blank')
    },

    // 隐私政策
    onTopolicy() {
      const href = "https://h5-static.dapengjiaoyu.cn/h5-protocol/#/yszc?platform=wap&entrance=common"
      window.open(href,'_blank')
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
  font-size: 13px;
  font-family: @regular;
  font-weight: 400;
  color: #75737E;
  line-height: 20px;
}

// ****输入新密码*****
.register-password-row {
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
  
  .password-icon {
    width: 13px;
    height: 13px;
    margin-right: 9px;
  }

  .password-input {
    width: 230px;
    height: 15px;
    border: none;
    color: #383640;
    background: #F7F7F7;
  }

  .password-input::placeholder {
    color: #75737E;
  }
}

// ************确认密码************
.register-confirm-password-row {
  width: 282px;
  height: 40px;
  background: #F7F7F7;
  border-radius: 2px;
  margin-top: 16px;
  padding: 15px;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;

  .safety-icon {
    width: 13px;
    height: 13px;
    margin-right: 9px;
  }

  .confirm-password {
    width: 230px;
    height: 15px;
    border: none;
    color: #383640;
    background: #F7F7F7;
  }

  .confirm-password::placeholder {
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