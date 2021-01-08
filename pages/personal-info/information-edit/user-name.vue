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
          v-model="UserNameModel"
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
import { mapActions } from 'vuex'
export default {
  layout:'navbar',
  data() {
    return {
      UserNameModel: '',
      /** 头部完成的状态*/
      accomplishStatus:false,
      userInfo: ''
    }
  },
  computed: {
    closeIcon() {
      if (this.UserNameModel) {
        return 'close-icon'
      } else {
        return 'close-icon-hidden'
      }
    }
  },
  mounted() {
    // 获取用户名
    this.getUserDetails().then((res)=> {
      this.UserNameModel = res.data.loginName
      this.userInfo = res.data.userId
    })
  },
  methods: {
    ...mapActions('user', [
      'getUserDetails',
      'editUserInfo'
    ]),
    //点击叉号清空输入框内容
    deletcontent() {
      this.UserNameModel = ''
    },
    onSaveHandle() {
      // 修改用户名
      if (!this.UserNameModel) {
        this.$toast({
          message: `请填写用户名`,
          position: 'bottom',
          duration: 2000
        })
        return
      }
      const params = {
        userId:this.userInfo,
        loginName: this.UserNameModel
      }
      this.editUserInfo(params).then(res=> {
        if (res.status === 200) {
          this.$toast({
            message: `保存成功`,
            position: 'bottom',
            duration: 2000
          })
          setTimeout(() => {
            this.$router.push('/personal-info')
          }, 2000)
        }
      }).catch((error) => {
        this.$toast({
          message: `${error.data.message}`,
          position: 'bottom',
          duration: 2000
        })
      })
    },
    changeInput() {
      if (this.UserNameModel) {
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


