<template>
  <van-popup v-model="stagePop.show" round position="bottom">
    
    <div class="stage-header">
      <span class="header-title">选择你想观看的期次</span>
      <span class="header-cancel" @click="stagePop.show = false">取消</span>
    </div>

    <van-picker ref="picker" :columns="stagePop.list" :swipe-duration="300"/>

    <div class="stage-footer">
      <div class="footer-btn" @click="onConfirm">确定</div>
    </div>

  </van-popup>
</template>

<script>
export default {
  props: {
    stagePop:{
      type:Object,
      default: {
        show: false,
        list: []
      }
    }
  },

  methods:{
    onConfirm() {
      const index = this.$refs.picker.getIndexes()
      this.$emit('changeStage', index)
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  padding: 16px;
}

.van-popup--bottom.van-popup--round {
  border-radius: 10px 10px 0px 0px;
}

.stage-header {
  width: 100%;
  height: 25px;
  .l-flex-row();

  .header-title {
    font-size: 18px;
    font-family: @medium;
    font-weight: 600;
    color: #18252C;
  }

  .header-cancel {
    font-size: 14px;
    font-family: @regular;
    font-weight: 500;
    color: #969696;
  }
}

.van-picker {
  margin-top: 20px;
}

/deep/ .van-picker-column__item {
  font-size: 14px;
  font-family: @regular;
  font-weight: 400;
  color: #969696;

}

/deep/ .van-picker-column__item--selected {
  font-size: 18px;
  font-family: @medium;
  font-weight: 500;
  color: #0CB65B;
}

.stage-footer {
  width: 334px;
  height: 44px;
  margin: 0 auto;
  line-height: 44px;
  text-align: center;
  background-image: url('~@/assets/icons/course/stage-btn-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .footer-btn {
    font-size: 16px;
    font-family: @medium;
    font-weight: 600;
    color: #FFFFFF;
  }
}
</style>
