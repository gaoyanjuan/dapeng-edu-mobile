<template>
  <div class="modification-password">
    <m-navbar title="修改密码" />
    <div class="form-list">
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
import { validatePassword } from '@/utils/validate.js'
export default {
  layout:'navbar',
  data() {
    return {
      oldPasswd: '',
      newPasswd: '',
      aginPasswd: ''
    }
  },
  computed: {
    // 判断完成按钮是否点亮
    isEmpty() {
      return Boolean(this.oldPasswd && this.newPasswd && this.aginPasswd)
    }
  },
  methods: {
    ...mapActions('user', [
      'modifyPassword'
    ]),
    // 点击完成按钮的逻辑判断
    async onAccomplishBtn() {
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
    },
    // 修改密码后退出登录
    onLogoutEvent() {
      this.$axios.get('/logout').then(() => {
        this.$cookiz.remove('userinfo', {
          path: '/'
        })
        this.$store.commit('user/appendUserInfo', null)
      })
      const redirectUrl = `${location.protocol}//${location.host}`
      window.location.href = `${process.env.authUrl}/logout?redirectUrl=${redirectUrl}`
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
    & > .form-item {
      width: 100%;
      height: 52px;
      line-height: 42px;
      border-bottom: 1px solid #f7f7f7;
      & > .password-input {
        width: 175px;
        height: 32px;
        font-size: 14px;
        color: #A3A8AB;
        border: none;
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