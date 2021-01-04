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
          v-model="TreuNameModel"
          class="modified-name"
          @input="changeInput()"
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
export default {
  layout:'navbar',
  data() {
    return {
      TreuNameModel: '',
      accomplishStatus:false
    }
  },
  computed: {
    closeIcon() {
      if (this.TreuNameModel) {
        return 'close-icon'
      } else {
        return 'close-icon-hidden'
      }
    }
  },
  methods: {
    //点击叉号清空输入框内容
    deletcontent() {
      this.TreuNameModel = ''
    },
    onSaveHandle() {
      if (this.TreuNameModel.length > 6) {
        this.$toast({
          message: `真实姓名不能超过6个字`,
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
      if (this.TreuNameModel) {
        this.accomplishStatus = true
      } else {
        this.accomplishStatus = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.true-name {
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
      background: @dp-white;
      & > .modified-name {
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
