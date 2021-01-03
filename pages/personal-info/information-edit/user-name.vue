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
export default {
  layout:'navbar',
  data() {
    return {
      UserNameModel: '',
      /** 头部完成的状态*/
      accomplishStatus:false
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
  methods: {
    //点击叉号清空输入框内容
    deletcontent() {
      this.UserNameModel = ''
    },
    onSaveHandle() {
      var regex = /^(?!dp)(?!\d+$)[\d\u4e00-\u9fffa-zA-Z]{2,12}$/i
      if (!regex.test(this.UserNameModel)) {
        this.$toast({
          message: `用户名需要为2-12位中、英文,不能包含数字或特殊符号，注意不要以dp开头哦~`,
          position: 'bottom',
          duration: 2000
        })
      } else {
        this.$toast({
          message: `保存成功`,
          position: 'bottom',
          duration: 2000
        })
      }
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


