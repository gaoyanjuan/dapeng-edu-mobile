<template>
  <van-popup v-model="showPopup.show" round @closed="closed" :transition-appear="true">
    <div class="popup-warp">
      <div class="homework-code">作业号{{ showPopup.jobNummer }}</div>
      <div class="copy-code" @click.stop="onCopy">复制作业号</div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name:'Homework-Number',
  props:{
    showPopup:{
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      isShowCodeDialog: this.showPopup.show
    }
  },
  methods:{
    /** 复制作业号 */
    onCopy() {
      this.$copyText(this.showPopup.jobNummer).then( (e) => {
        this.$toast('复制成功')
        this.$emit('closed')
      }, function(e) {
        console.log('Can not copy')
      })
    },

    /** 关闭 */
    closed() {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="less" scoped>

.van-popup {
  width: 260px !important;
  height: 145px !important;
  overflow: hidden;
}

.popup-warp {
  width: 260px;
  height: 145px;
  border-radius: 8px;
  padding: 32px 20px 0;

  .homework-code {
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #36404A;
    margin-bottom: 29px;
  }
  .copy-code {
    width: 220px;
    height: 40px;
    background: linear-gradient(317deg, rgba(255, 177, 52, 0.98) 0%, #FEDA35 100%);
    border-radius: 6px;
    font-size: 14px;
    font-family: @dp-font-medium;
    line-height: 40px;
    text-align: center;
    font-weight: 500;
    color: #3B4954;
    cursor: pointer;
    margin-bottom: 20px;
  }
}
</style>