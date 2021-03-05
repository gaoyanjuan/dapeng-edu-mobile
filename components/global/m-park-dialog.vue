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
            <img
              class="teach-bitmap"
              src="@/assets/icons/common/bitmap.png"
              alt=""
              srcset=""
            />
            <p class="wx-teacher" v-if="visity">班主任微信：dpjyzxkf</p>
            <p class="class-teacher" v-else>请您加入班主任QQ群：2384619287</p>
            <img  
              class="teach-orthogon"
              src="@/assets/icons/common/orthogon.png"
              alt=""
              srcset=""
            />
            <span v-if="visity">点击联系班主任微信</span>
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
      visity:false, 
      auditionPop: { show: false },
    };
  },
  methods: {
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
      top: 10px;
      left: 70px;
      font-size: 28px;
      font-weight: 600;
      color: #36404a;
    }
    & > p {
      position: absolute;
      top: 50px;
      margin: 0 30px;
      font-size: 14px;
      font-weight: 400;
      color: #5a5a5a;
    }
    & > .teach-rectang {
      position: absolute;
      bottom: 90px;
      left: 46px;
    }
    & > .teach-bitmap {
      position: absolute;
      bottom: 114px;
      left: 67px;
    }
    & > .class-teacher {
      position: absolute;
      top: 290px;
      font-size: 12px;
      font-weight: 400;
      color: #f5f5f5;
    }
    & > .wx-teacher {
      position: absolute;
      top: 292px;
      left: 35px;
      font-size: 12px;
      font-weight: 400;
      color: #f5f5f5;
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