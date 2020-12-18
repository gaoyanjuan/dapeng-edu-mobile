<template>
  <div>
    <van-popup
      v-model="show"
      :overlay="true"
      :close-on-click-overlay="false"
      :transition-appear="false"
      duration="0"
    >
      <div class="invalid-login-dialog">
        <div class="title">
          下线通知
        </div>
        <div class="content">
          {{ content }}
        </div>
        <div class="bottom-box">
          <div class="quit" @click="toQuit">
            退出
          </div>
          <div class="login" @click="toLogin">
            重新登录
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      content: '登录失效'
    }
  },
  mounted () {
    if (process.env.mode === 'development') {
      this.$cookiz.remove(this.validateSystemHostName().token_name)
    } else {
      this.$cookiz.remove(this.validateSystemHostName().token_name, {
        path: '/',
        domain: '.dapengjiaoyu.cn'
      })
      this.$cookiz.remove(this.validateSystemHostName().token_name)
    }
    this.$cookiz.remove('refresh_token')
    this.$cookiz.remove('userinfo', {
      path: '/'
    })
    this.$store.commit('user/appendUserInfo', null)
    if (this.$route.query.type === 'failure') {
      this.content = '登录失效'
    } else if (this.$route.query.type === 'displacement') {
      this.content = '该账号已在其他同类设备登录，如非本人操作，则密码可能已经被泄露，建议立即更换密码'
    }
  },
  methods: {
    toQuit () {
      location.href = '/'
    },
    toLogin () {
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.invalid-login-dialog {
  width: 283px;
  background: #FFFFFF;
  &>.title {
    text-align: center;
    padding-top: 20px;
    height: 42px;
    font-size: 16px;
    font-family: @dp-font-semibold;
    font-weight: 600;
    color: #363D35;
    line-height: 22px;
  }
  &> .content {
    text-align: center;
    margin-top: 12px;
    padding: 0 29px;
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #363D35;
    line-height: 22px;
  }
  &> .bottom-box {
    margin-top: 20px;
    height: 40px;
    border-top: solid 1px #D8D8D8;
    display: flex;

    .quit {
      text-align: center;
      padding: 10px 0;
      height: 40px;
      width: 142px;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #18252C;
      line-height: 20px;
      border-right: solid 1px #D8D8D8;
    }
    .login {
      text-align: center;
      padding: 10px 0;
      height: 40px;
      width: 140px;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #0CB65B;
      line-height: 20px;
    }
  }
}
.van-popup {
  border-radius: 6px;
}
</style>