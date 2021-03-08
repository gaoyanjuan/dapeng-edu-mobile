<template>
  <div class="mark">
    <template>
      <van-overlay :show="showPopup.show" z-index="2001" @click="handClose">
        <van-popup v-model="showPopup.show" @click.stop="" style="border-radius: 8px">
          <div class="footer-teacher">
            <img src="@/assets/icons/common/teacher.png" alt="" srcset="" />
            <h2>同学您好</h2>
            <p>
              咱们的兼职任务服务是面向正式课程学员的！如果您想开通正式课程，可以联系您的班主任~
            </p>
            <img
              class="teach-rectang"
              src="@/assets/icons/common/rectang.png"
              alt=""
            />
            <template v-if="adviserInfo.groupQr">
              <template v-if="adviserInfo.groupType==='1'">
                <img class="teach-bitmap" :src="adviserInfo.groupQr" />
              </template>
              <template v-else>
                <img class="teach-bitmap" :src="adviserInfo.groupQr" />
              </template>
            </template>
           
            <p class="wx-teacher" v-if="adviserInfo.groupType==='1'">班主任微信：dpjyzxkf</p>
            <p class="class-teacher" v-else>请您加入班主任QQ群：2384619287</p>
            <img  
              class="teach-orthogon"
              src="@/assets/icons/common/orthogon.png"
            />
            <span v-if="adviserInfo.groupType==='1'">点击联系班主任微信</span>
            <span v-else>点击进入班主任QQ群</span>
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
  </div>
</template>
<script>
import {mapActions } from "vuex";
export default {
 props:{
    showPopup:{
      type: Object,
      default: {
        show: false
      }
    },
  },
  data() {
    return {
      adviserInfo:{},
      auditionPop: { show: false },
    };
  },
  mounted() {
    // this.getZcAdviser().then( res => {
    //   this.adviserInfo = res.data
    // })
    
  },
  methods: {
    ...mapActions("publish",["getZcAdviser"]),
    handClose() {
      this.showPopup.show = false
    }
  },
};
</script>
<style lang="less" scoped>
.mark {
  .footer-teacher {
    position: relative;
    top: 10px;
    & > h2 {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -80%);
      font-size: 28px;
      font-weight: 600;
      color: #36404a;
    }
    & > p {
      position: absolute;
      top: 20%;
      transform: translateY(-50%);
      padding: 0 30px;
      font-size: 14px;
      font-weight: 400;
      color: #5a5a5a;
    }
    & > .teach-rectang {
      position: absolute;
      width: 180px;
      height: 180px;
      top: 50%;
      left: 50%;
      transform: translate(-53%, -35%);
    }
   
    & > .class-teacher {
      position: absolute;
      top: 50%;
      transform: translateY(10%);
      margin-top: 108px;
      font-size: 12px;
      font-weight: 400;
      color: #f5f5f5;
    }
    & > .wx-teacher {
      position: absolute;
      top: 50%;
      transform: translateY(10%);
      left: 14%;
      font-size: 12px;
      font-family: @regular;
      font-weight: 400;
      color: #fff;
      line-height: 16px;
      margin-top: 108px;
    }
    & > .teach-orthogon {
      position: absolute;
      bottom: 20px;
      left: 20px;
    }
    & > span {
      position: absolute;
      bottom: 30px;
      left: 55px;
      font-size: 14px;
      font-weight: 500;
      color: #36404a;
    }
  }
   .footer-teacher .teach-bitmap {
    position: absolute;
    top: 50%;
    transform: translate(-55%, -32%);
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 134px;
    height: 134px;
    }
  .popup-close {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 11%;
    left: 47%;
    transform: translate(-20%, -1%);
  }
}
</style>