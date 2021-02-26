<template>
  <div class="hover-btn-box" @click.stop="">
    <van-popup
      v-model="ShowMenusList"
      position="bottom"
      round
      @click-overlay="overlay"
    >
      <div
        class="menus__popup__item"
        v-for="(item, index) in btnList"
        :key="index"
        @click="onSelect(item)"
      >{{item.name}}</div>
      <div class="menus__popup__item cancel" @click="onCancel">取消</div>
    </van-popup>
  </div>
</template>
<script>
export default {
   props: {
    btnList: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      ShowMenusList: true
    }
  },
  methods:{
    onSelect(item) {
      this.$emit('chooseItem', item.name )
      this.ShowMenusList = false
    },
    // 点击取消时触发
    onCancel() {
      this.$emit('chooseItem')
      this.ShowMenusList =false
    },
    // 点击遮罩层时触发
    overlay() {
      this.$emit('chooseItem')
      this.ShowMenusList =false
    }
  }
}
</script>
<style lang="less" scoped>
.van-popup .menus__popup__item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 3px 0;
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #18252C;
  text-align: center;
  cursor: pointer;
}
.van-popup .cancel {
  background: #F5F5F5;
  border-radius: 20px;
  width: 343px;
  height: 40px;
  margin: 3px auto 14px;
  line-height: 40px;
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  text-align: center;
  cursor: pointer;
}
/deep/ .van-popup--bottom.van-popup--round {
border-radius: 8px 8px 0px 0px;
}
</style>


