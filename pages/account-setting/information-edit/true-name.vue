<template>
  <div class="true-name">
    <m-navbar
      title="真实姓名"
      right-text="完成"
      :show-info-right-text="true"
      :accomplish-status="accomplishStatus"
      @onClickRight="onSaveHandle"
    />
    <!-- 修改真实姓名内容 -->
    <div class="modified-content">
      <div class="modified-name-box">
        <input
          v-model="treuNameModel"
          class="modified-name"
          placeholder="请输入您的真实姓名"
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
import { validateEmpty } from '@/utils/validate.js'
export default {
  layout:'navbar',
  data() {
    return {
      treuNameModel: '',
      accomplishStatus:true,
      userId: '',
      userNameModel: ''
    }
  },
  computed: {
    ...mapGetters('user', [
      'userInfoGetters'
    ]),
    closeIcon() {
      if (this.treuNameModel) {
        return 'close-icon'
      } else {
        return 'close-icon-hidden'
      }
    }
  },
  mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
    
    // 获取用户真实姓名
    if (this.userInfoGetters.trueName) {
      this.treuNameModel = this.userInfoGetters.trueName
      this.userNameModel = this.userInfoGetters.loginName
      this.userId = this.userInfoGetters.userId
    } else {
      this.getUserDetails().then((res)=> {
        this.treuNameModel = res.data.trueName
        this.userNameModel = res.data.loginName
        this.userId = res.data.userId
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'getUserDetails',
      'editUserInfo'
    ]),
    //点击叉号清空输入框内容
    deletcontent() {
      this.treuNameModel = ''
    },
    onSaveHandle() {
      // 修改真实姓名
      if (!validateEmpty(this.treuNameModel)) {
        const chinese = /^[\u2E80-\u9FFF]+$/
        const letter = /^[a-zA-Z]+$/
        if (chinese.test(this.treuNameModel)) {
          if (this.treuNameModel.length > 5 || this.treuNameModel.length < 2) {
            this.$toast('真实姓名为小于6个的汉字，并且不得小于2个字')
            return false
          }
        }
        if (letter.test(this.treuNameModel)) {
          if (this.treuNameModel.length > 20 || this.treuNameModel.length < 2) {
            this.$toast('真实姓名为小于20个的英文，并且不得小于2个英文')
            return false
          }
        }
        if (!chinese.test(this.treuNameModel) && !letter.test(this.treuNameModel)) {
          this.$toast('真实姓名为小于20个的英文或者小于5个的汉字')
          return false
        }
      }
      const params = {
        userId:this.userId,
        trueName: this.treuNameModel,
        loginName: this.userNameModel
      }
      this.editUserInfo(params).then(res=> {
        if (res.status === 200) {
          this.$toast('保存成功')
          this.getUserDetails()
        }
      }).catch((error) => {
        if (error && error.data) {
          this.$toast(error.data.message)
        } else {
          this.$toast('保存失败')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.true-name {
  width: 100%;
  position: relative;
  min-height: 100vh;
  background: @dp-app-bgc;
  overflow: hidden;
  & > .modified-content {
    margin: 56px 0 12px 0;
    & > .modified-name-box {
      width: 100%;
      height: 52px;
      line-height: 40px;
      padding: 0 32px;
      background: @dp-white;
      & > .modified-name {
        width: 95%;
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
