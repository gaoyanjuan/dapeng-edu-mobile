<template>
  <van-popup v-model="showPopup.show" round :transition-appear="true">
    <div class="popup-warp">
      <div class="popup-head-photo"></div>
      <div class="popup-body-nums">累计获得了{{userTrendsGetters.likeCount}}个赞</div>
      <div class="popup-footer-btn" @click="showPopup.show = false">知道啦</div>
    </div>
  </van-popup>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'M-Love-Popup',
  props:{
    showPopup:{
      type: Object,
      default: {}
    }
  },
  computed:{
    ...mapGetters('user',['userTrendsGetters'])
  },
}
</script>

<style lang="less" scoped>

.popup-warp {
  width: 260px;
  height: 235px;
  background: linear-gradient(182deg, #FFFFFF 0%, #F7F9F7 100%);
  border-radius: 8px;
  overflow: hidden;

  & .popup-head-photo {
    width: 100%;
    height: 98px;
    background-color: transparent;
    background-image: url('~@/assets/icons/mine/love-popup-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }

  & .popup-body-nums {
    width: 100%;
    height: 89px;
    font-size: 16px;
    font-family: @dp-font-semibold;
    font-weight: 600;
    color: #36404A;
    line-height: 89px;
    text-align: center;
    border-bottom: 1px solid #F0F0F8;
  }

  & .popup-footer-btn {
    width: 100%;
    height: 47px;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #333333;
    line-height: 47px;
    text-align: center;
    cursor: pointer;
  }
}
</style>