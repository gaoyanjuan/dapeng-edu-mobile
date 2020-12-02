<template>
  <div class="delete-confirm-pop">
    <van-popup v-model="deleteDialogParams.show" round overlay-class="menus__popup" :transition-appear="true">
      <div class="delete-tips">确定删除本条数据吗？</div>
      <div class="button-group">
        <div class="cancel-button" @click.stop="cancelDelete">取消</div>
        <div class="confirm-button" @click.stop="confirmDelete">确定</div>
      </div>
    </van-popup>
  </div>  
</template>
<script>
export default {
  props: {
    deleteDialogParams: {
      type: Object,
      default: ()=>{
        return {
          show: false
        }
      }
    }
  },
  methods: {
    cancelDelete() {
      this.deleteDialogParams.show = false
    },
    confirmDelete() {
      this.$emit('confirmDelete')
    }
  }
}
</script>
<style lang="less" scoped>
.delete-confirm-pop {
  /deep/.van-popup {
  width: 284px;
  height: 137px;
  overflow: hidden;
}

/deep/.van-popup--center.van-popup--round {
  border-radius: 6px;
}
.delete-tips {
  margin: 37px 0;
  font-size: 16px;
  font-weight: 600;
  color: #363D35;
  font-family: @dp-font-semibold;
  text-align: center;
}
.button-group {
  display: flex;
  height: 40px;
  border-top: 1px solid #D8D8D8;
  font-size: 14px;
  color: #5A5A5A;
  font-family: @dp-font-regular;
  .cancel-button,
  .confirm-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cancel-button {
    border-right: 1px solid #D8D8D8;
  }
  .confirm-button {
    color: #0CB65B;
  }
}
}

</style>
