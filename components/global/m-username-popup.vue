<template>
  <van-popup v-model="showPopup.show" round>
    <div class="popup-warp">
      <div class="popup-head-photo">请完善用户名，让老师与您更好的交流~</div>
      <div class="popup-body-input">
        <input type="text" v-model.trim="username" @input="changeInput()" placeholder="请输入用户名" />
      </div>
      <div :class="submitStatus ? 'popup-footer btn-active':'popup-footer btn'" @click="submit">提交</div>
    </div>
  </van-popup>
</template>

<script>
/**
 * 
 * 使用方式
 * <!-- 完善用户名 -->
 * <m-username-popup :show-popup="usernamePop"/>
 * usernamePop:{ show: false },
 */
export default {
  name:'Username-Popup',
  props:{
    showPopup:{
      type: Object,
      default: {}
    }
  },
  data: () => ({
    username:'',
    submitStatus:false
  }),
  methods:{
    submit() {
      if(this.submitStatus) {}
    },
    /** 监听Input  */
    changeInput() {
      if(this.username.length) {
        this.submitStatus = true
      } else {
        this.submitStatus = false
      }
    }
  }
}
</script>

<style lang="less" scoped>

.van-popup {
  width: 260px !important;
  height: 235px !important;
  overflow: hidden;
}

.popup-warp {
  width: 260px;
  height: 235px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  background-image: url('~@/assets/icons/popup/name-popup-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  overflow: hidden;

  & .popup-head-photo {
    width: 220px;
    height: 48px;
    font-size: 18px;
    font-family: @semibold;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 24px;
    margin-top: 18px;
  }

  & .popup-body-input {
    width: 220px;
    height: 40px;
    background-color: transparent;
    background-image: url('~@/assets/icons/popup/name-input-border.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    margin-top: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 13px 8px;
    overflow: hidden;

    > input {
      width: 215px;
      height: 35px;
      border: none;
    }

    .input-placeholder {
      font-size: 14px;
      font-family: @medium;
      font-weight: 500;
      color: #DDDDDD;
    }

    input::-webkit-input-placeholder {
      .input-placeholder()
    }

    input::-moz-placeholder {
      .input-placeholder()
    }

    input:-ms-input-placeholder {
		  .input-placeholder()
    }
    
		input:-moz-placeholder {
      .input-placeholder()
		}
  }

  & .popup-footer {
    width: 220px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: @medium;
    font-weight: 500;
    text-align: center;
    margin-top: 23px;
    cursor: pointer;
  }

  & .btn {
    color: #AAAAAA;
    background-color: transparent;
    background-image: url('~@/assets/icons/popup/name-btn-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }

  & .btn-active {
    color: #3D4954;
    background-color: transparent;
    background-image: url('~@/assets/icons/popup/name-btn-bg-active.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }
}
</style>