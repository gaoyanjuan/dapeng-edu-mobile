<template>
  <div class="account-safety">
    <m-navbar title="账号与安全" />
    <div class="account-safety_content">
      <safety-grade :scoreNum="this.score"/>
      <nuxt-link
        v-if="mobileState !== 'Verification'"
        class="modification-box"
        tag="div"
        to="/account-setting/account-safety/verify-phone"
      >
        <div class="modification-left-box">
          <div class="modification-text">手机号验证</div>
          <div class="modification-explain">您的手机号尚未验证，为保障账户安全，请验证您的手机号</div>
        </div>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link
        v-if="mobileState === 'Verification'"
        class="modification-box"
        tag="div"
        to="/account-setting/account-safety/replace-phone"
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
        to="/account-setting/account-safety/modification-password"
      >
        <div class="modification-left-box">
          <div class="modification-text">修改密码</div>
          <div class="modification-explain">互联网环境建议您定期修改密码！</div>
        </div>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link
        v-if="mobileState === 'Verification'"
        class="modification-box"
        tag="div"
        to="/account-setting/account-safety/forget-password"
      >
        <div class="modification-left-box">
          <div class="modification-text">忘记密码</div>
          <div class="modification-explain">怎么也想不起来？通过手机号验证登录吧！</div>
        </div>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <div class="modification-box" @click="unsubscribe">
        <div class="modification-left-box">
          <div class="modification-text">注销账户</div>
          <div class="modification-explain">注销账户，请谨慎操作！</div>
        </div>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters } from 'vuex'
export default {
  layout:'navbar',
  data() {
    return {
      score:null,
      mobileState: ''
    }
  },
  computed: {
    ...mapGetters('user', [
      'userStatusGetters'
    ]),
  },
  mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
    
    this.getAccountSafety().then((res)=> {
      this.score =res.data
    })
    if (this.userStatusGetters) {
      this.mobileState = this.userStatusGetters.mobileValidateState
    } else {
      this.geMyState().then(res =>{
        this.mobileState = res.data.mobileValidateState
      })
    }
  },
  methods: {
    ...mapActions('user',[
      'getAccountSafety',
      'userMainStationToken',
      'geMyState'
    ]),
    async unsubscribe() {
      const res = await this.userMainStationToken()
      window.open(`${process.env.userCancelUrl}?access_token=${res.data.data}`)
    }
  }
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
