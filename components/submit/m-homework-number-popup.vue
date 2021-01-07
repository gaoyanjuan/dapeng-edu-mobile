<template>
  <van-popup v-model="showPopup.show" round @closed="closed" :transition-appear="true">
    <div class="popup-warp">
      <div class="popup-head">您未有此课程专属班主任，请先复制作业号，然后联系客服老师为您安排专属班主任批改作业哦~</div>
      <div class="popup-body">作业号：{{ showPopup.jobNummer }}</div>
      <div class="popup-footer btn-active" @click.stop="onCustomer">联系客服</div>
      <div class="popup-copy-row" @click.stop="onCopy">复制作业号</div>
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
  methods:{
    /** 联系客服 */
    onCustomer() {
      window.open(process.env.leyuUrl, '_blank')
    },

    /** 复制作业号 */
    onCopy() {
      this.$copyText(this.showPopup.jobNummer).then( (e) => {
        this.$toast('复制成功')
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

  & .popup-head {
    width: 220px;
    height: 60px;
    font-size: 14px;
    font-family: @semibold;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 20px;
    margin-top: 12px;
  }

  & .popup-body {
    width: 224px;
    height: 24px;
    margin-top: 44px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 16px;
    font-family: @regular;
    font-weight: 400;
    color: #36404A;
    .text-ellipsis()
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

  & .btn-active {
    color: #3D4954;
    background-color: transparent;
    background-image: url('~@/assets/icons/popup/name-btn-bg-active.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }

  & .popup-copy-row {
    margin-top: 12px;
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #BEBEBE;
    line-height: 12px;
    cursor: pointer;
  }
}
</style>