<template>
  <van-dialog v-model="dialog.show"
    show-cancel-button
    message="确定删除该内容吗？"
    confirm-button-text="确定"
    cancel-button-color="#5A5A5A"
    confirm-button-color="#0CB65B"
    @confirm="confirm"
  >
  </van-dialog>
</template>

<script>
export default {
  name:'Dialog',
  props:{
    dialog: {
      type:Object,
      default:{}
    }
  },
  data: () => ({}),
  methods:{
    confirm(){
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="less" scoped>

.van-dialog {
  border-radius: 6px;
}

/deep/ .van-dialog__message {
  font-size: 16px;
  font-family: @semibold;
  font-weight: 600;
  color: #363D35;
  line-height: 22px;
}

</style>