<template>
  <div class="support-staff">
    <template>
      <van-overlay :show="showPopup.show" z-index="2001" @click="handClose">
        <van-popup v-model="showPopup.show" :overlay="false" @click.stop="" style="border-radius: 8px">
          <div class="footer-popup">
            <img :src="service" alt="" />
            <p>
              兼职任务面向正式课程学员！如果您想开通正式课程，请联系客服老师！
            </p>
          </div>
          <div class="popup-bcg" @click="handelApplication">
            <img src="@/assets/icons/popup/popup-bcg.png" alt="" />
            <span>报名咨询</span>
          </div>
         
        </van-popup>
        <img
          class="popup-close"
          src="@/assets/icons/popup/popup-close.png"
          alt=""
          @click="handClose"
        />
      </van-overlay>
    </template>
    <m-park-dialog :showPopup="auditionPop"></m-park-dialog>
  </div>
</template>
<script>
import {mapActions,mapGetters } from "vuex";
export default {
  props:{
    showPopup:{
      type: Object,
      default: {
        show: false
      }
    },
  },
   computed: {
    ...mapGetters("user", ["userInfoGetters", "userTrendsGetters"])
  },
  data() {
    return {
      auditionPop: { show: false },
      service: require("@/assets/icons/popup/server.png"),
    }
  },
  methods: {
    ...mapActions("publish",["getZcAdviser"]),
    handClose() {
      this.showPopup.show = false
    },
    async handelApplication() {
      await this.getZcAdviser().then( res => {
        this.showPopup.show = false
        this.auditionPop.show = true
      }).catch(err => {
        if(err.data && err.data.code === 409) {
          // 报名咨询
          doyoo.util.openChat('g=10085048')
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.support-staff {
  .footer-popup {
    position: relative;
    & > p {
      position: absolute;
      top: 124px;
      padding: 0 20px;
      font-size: 16px;
      font-weight: 600;
      color: #36404a;
      line-height: 24px;
    }
  }
  .popup-bcg {
    text-align: center;
    display: flex;
    justify-content: center;
    position: relative;
    bottom: 20px;
    & > span {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 0.37333rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      transform: translate(-50%, -50%);
    }
  }
  .popup-close {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 15%;
    left: 47%;
    transform: translate(-20%, -1%);
  }
}
</style>