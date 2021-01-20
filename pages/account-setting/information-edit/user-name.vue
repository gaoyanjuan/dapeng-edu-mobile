<template>
  <div class="user-name">
    <m-navbar
      title="用户名"
      right-text="完成"
      :show-info-right-text="true"
      :accomplish-status="accomplishStatus"
      @onClickRight="onSaveHandle"
    />
    <!-- 修改用户名内容 -->
    <div class="modified-content">
      <div class="modified-name-box">
        <input
          v-model="userNameModel"
          class="modified-name"
          @input="changeInput()"
          placeholder="请输入用户名"
        >
        <span class="right-close">
          <img
           :class="closeIcon"
            src="@/assets/icons/mine/icon-input-close.png"
            alt=""
            @click="deletcontent"
          />
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  layout:'navbar',
  data() {
    return {
      userNameModel: '',
      /** 头部完成的状态*/
      accomplishStatus:false,
      userId: ''
    }
  },
  computed: {
    ...mapGetters('user', [
      'userInfoGetters'
    ]),
    closeIcon() {
      if (this.userNameModel) {
        return 'close-icon'
      } else {
        return 'close-icon-hidden'
      }
    }
  },
  mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
    
    // 获取用户名
    if (this.userInfoGetters.loginName) {
      this.userNameModel = this.userInfoGetters.loginName
      this.userId = this.userInfoGetters.userId
    }
  },
  methods: {
    ...mapActions('user', [
      'editUserInfo',
      'getUserDetails'
    ]),
    //点击叉号清空输入框内容
    deletcontent() {
      this.userNameModel = ''
    },
    onSaveHandle() {
      // 修改用户名
      if (!this.userNameModel) {
        this.$toast({
          message: `请填写用户名`,
          position: 'bottom',
          duration: 2000
        })
        return
      }
      const userinfo = this.$cookiz.get('userinfo')
      const params = {
        userId:this.userId,
        loginName: this.userNameModel
      }
      this.editUserInfo(params).then(res=> {
        if (res.status === 200) {
          userinfo.loginName = this.userNameModel
          this.$cookiz.set('userinfo',userinfo, {
            path: '/'
          })
          this.$toast({
            message: `保存成功`,
            position: 'bottom',
            duration: 2000
          })
          this.getUserDetails()
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
            message: `保存失败`,
            position: 'bottom',
            duration: 2000
          })
        }
      })
    },
    changeInput() {
      if (this.userNameModel) {
        this.accomplishStatus = true
      } else {
        this.accomplishStatus = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user-name {
  width: 100%;
  position: relative;
  min-height: calc(100vh - 1px);
  background: @dp-app-bgc;
  overflow: hidden;
  & > .modified-content {
    margin: 56px 0 12px 0;
    & > .modified-name-box {
      width: 100%;
      height: 52px;
      line-height: 40px;
      padding: 0 32px;
      align-items: center;
      background: @dp-white;
      & > .modified-name {
        width: 80%;
        line-height: 32px;
        font-size: 14px;
        outline: none;
        border: 0px;
        padding: 0px;
      }
      & > input::placeholder {
        color: #a6aea9;
        font-size: 14px;
        text-align: left;
        font-family: @dp-font-regular;
        font-weight: 400;
      }
      & > .right-close {
        cursor: pointer;
        position: absolute;
        right: 16px;
        & > img.close-icon {
          width: 15px;
          height: 15px;
        }
        & > img.close-icon-hidden {
          width: 15px;
          height: 15px;
          visibility: hidden;
        }
      }
    }
  }
}
</style>


