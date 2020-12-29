<template>
  <div class="task-part-details">
    <van-nav-bar title="任务详情" left-arrow @click-left="onClickLeft" />
    <div class="task-hander" v-for="item in taskList">
      <p>{{ item.title }}</p>
      <div class="details-time">
        <img src="../../assets/icons/common/time.png" alt="" />
        <span>{{ item.day }}</span>
        <img src="../../assets/icons/common/edit.png" alt="" />
        <span>{{ item.limite }}</span>
        <img src="../../assets/icons/common/sand-clock.png" alt="" />
        <span>{{ item.time }}</span>
      </div>
      <h3 class="task-money">￥{{ item.money }}</h3>
    </div>
    <div class="task-content">
      <h3>任务要求</h3>
      <p>1.公司简介：</p>
      <div class="content">
        <p>
          大鹏教育创建于2015年，是中国在线教育的领航者之一，具备国际化的教研体系，专业化的作业系统，互联网与教师伴随相结合的教学模式。
        </p>
        <p>
          大鹏教育提供在线学习服务，现自有版权课程百余门，业务涵盖平面设计、UI设计、美术、书法、国画、短视频等多个领域。成立多年来，大鹏教育利用丰富的教学经验、健全的辅导体系、专业的教研体系,为用户的学习提供有力的保障。2017年,大鹏教育成为国家级高新技术企业，并连续多年被腾讯网、新华网授予教育奖项。
        </p>
        <p>截至2020年3月,大鹏教育已为数百万用户提供在线教育服务。</p>
      </div>
      <p>2.能接受改稿，改到满意为止~</p>
      <p>现LOGO或参考</p>
      <template>
        <div class="contentImg">
          <img src="../../assets/icons/common/birdie.png" alt="" />
          <img src="../../assets/icons/common/shadow.png" alt="" />
        </div>
        <!-- <div v-else>
          <img src="../../assets/icons/common/birdiery.png" alt="" srcset="">
        </div> -->
      </template>

      <p>网址：<span>www.dapengjiaoyu.</span></p>
    </div>
    <div class="task-footer">
      <h2>温馨说明</h2>
      <p>1.此任务由第三方提供</p>
      <p>2.请不要轻信需要交钱(报名费、抵押金之类)才能投稿的任务</p>
      <p>3.稿件中标需要等到任务中标公示期之后</p>
    </div>
    <div class="footer" @click="handerApply">
      <img src="../../assets/icons/common/green-bj.png" alt="" />
      <span>我要申请此任务</span>
    </div>
    <!-- <m-park-dialog  :visible.sync="visible"></m-park-dialog> -->
    <van-overlay :show="show" @click="handClose">
      <van-popup v-model="showPopup" style="border-radius: 8px">
        <div class="footer-popup">
          <img :src="service" alt="" @click="handService" />
          <p>
            兼职任务面向正式课程学员！如果您想开通正式课程，请联系客服老师！
          </p>
        </div>
      </van-popup>
      <img
        class="popup-close"
        src="../../assets/icons/common/toast-success.png"
        alt=""
        @click="handClose"
      />
    </van-overlay>
    <van-popup v-model="showTeacher" style="border-radius: 8px">
      <div class="footer-teacher">
        <img src="../../assets/icons/common/teacher.png" alt="" srcset="" />
        <h2>同学您好</h2>
        <p>
          咱们的兼职任务服务是面向正式课程学员的！如果您想开通正式课程，可以联系您的班主任~
        </p>
        <img
          class="teach-rectang"
          src="../../assets/icons/common/rectang.png"
          alt=""
        />
        <img
          class="teach-bitmap"
          src="../../assets/icons/common/bitmap.png"
          alt=""
          srcset=""
        />
        <p class="class-teacher">请您加入班主任QQ群：2384619287</p>
        <img
          class="teach-orthogon"
          src="../../assets/icons/common/orthogon.png"
          alt=""
          srcset=""
        />
        <span @click="handbtn">点击进入班主任QQ群</span>
      </div>
      <!-- <div class="ellipse"></div> -->
    </van-popup>
    <van-popup v-model="isShow" style="border-radius: 8px">
      <div class="footer-teacher">
        <img src="../../assets/icons/common/teacher.png" alt="" srcset="" />
        <h2>同学您好</h2>
        <p>
          咱们的兼职任务服务是面向正式课程学员的！如果您想开通正式课程，可以联系您的班主任~
        </p>
        <img
          class="teach-rectang"
          src="../../assets/icons/common/rectang.png"
          alt=""
        />
        <img
          class="teach-bitmap"
          src="../../assets/icons/common/bitmap.png"
          alt=""
          srcset=""
        />
        <p class="wx-teacher">班主任微信：dpjyzxkf</p>
        <img
          class="teach-orthogon"
          src="../../assets/icons/common/orthogon.png"
          alt=""
          srcset=""
        />
        <span>点击联系班主任微信</span>
      </div>
      <!-- <div class="ellipse"></div> -->
    </van-popup>
  </div>
</template>
<script>
import parkDialog from "../global/m-park-dialog";
export default {
  components: {
    parkDialog,
  },
  data() {
    return {
      showPopup: false,
      showTeacher: false,
      visible: false,
      show: false,
      popupClose: false,
      service: require("@/assets/icons/common/service.png"),
      isShow: false,
      taskList: [
        {
          title: "做一个甲烷的公司LOGO，主要得好看,",
          day: "20分钟前",
          limite: "进行中",
          time: "剩余 3 天 22 小时",
          money: "1000元-1.5万",
        },
      ],
    };
  },
  mounted() {
    // this.appendTaskPartList().then((res) => {
    //   this.taskList = res.data.list;
    // });
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/part-time-task" });
    },
    handerApply() {
      // this.visible = true;
      this.show = true;
      this.showPopup = true;
      this.popupClose = true;
      this.popupShow = true;
      // this.$router.push({ path: "/task-centered/task-part-centered" });
    },
    dialogChange() {
      this.popupShow = true;
    },
    handService() {
      this.showTeacher = true;
    },
    handbtn() {
      this.isShow = true;
    },
    handClose() {
      this.show = false;
      this.popupClose = false;
      this.showPopup = false;
    },
  },
};
</script>
<style lang="less" scoped>
.task-part-details {
  background: #f5f5f5;
  .task-hander {
    height: 149px;
    background: #ffffff;
    border-radius: 8px;
    margin: 12px 15px;
    & > P {
      padding: 16px 10px;
      font-size: 18px;
      font-weight: 600;
      color: #18252c;
    }
    .details-time {
      display: flex;
      margin-left: 12px;
      & > img {
        width: 14px;
        height: 14px;
        margin: 1px 6px 0 0;
      }
      & > span {
        font-size: 12px;
        margin-right: 28px;
        font-weight: 400;
        color: #465156;
      }
    }
    & > h3 {
      margin: 16px 0 0 8px;
      font-size: 22px;
      font-weight: 500;
      color: #ff3510;
    }
  }
  .task-content {
    // height: 540px;
    background: #ffffff;
    border-radius: 8px;
    margin: 12px 15px;
    padding: 16px 16px 18px 16px;
    & > h3 {
      margin-bottom: 11px;
      font-size: 16px;
      font-weight: 600;
      color: #18252c;
    }
    & > .content {
      font-size: 14px;
      font-weight: 400;
      color: #18252c;
      line-height: 22px;
    }
    & > p {
      font-size: 14px;
      font-weight: 400;
      color: #18252c;
      line-height: 22px;
    }
    :nth-child(4) {
      // font-size: 14px;
      // font-weight: 400;
      color: #0cb65b;
      margin-bottom: 20px;
    }
    .contentImg {
      padding: 8px 0 20px 0;
      display: flex;
      & > img {
        padding-right: 5px;
      }
    }
    :nth-last-child(1) {
      font-size: 14px;
      font-weight: 400;
      color: #18252c;
      :nth-last-child(1) & > span {
        color: #6f84bb;
      }
    }
  }
  .task-footer {
    margin: 0 15px 0 15px;
    height: 118px;
    background: #ffffff;
    border-radius: 8px;
    padding: 18px 10px;
    & > h2 {
      padding-bottom: 12px;
      font-size: 16px;
      font-weight: 600;
      color: #18252c;
    }
    & > p {
      font-size: 12px;
      font-weight: 400;
      color: #a3a8ab;
    }
  }
  .footer {
    margin-top: 12px;
    position: relative;
    & > img {
      width: 100%;
    }
    & > span {
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
      position: absolute;
      bottom: 20px;
      left: 130px;
    }
  }
  .footer-popup {
    position: relative;
    & > p {
      position: absolute;
      top: 116px;
      margin: 0 20px;
      font-size: 16px;
      font-weight: 600;
      color: #36404a;
      line-height: 24px;
    }
  }
  .popup-close {
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 100px;
    left: 160px;
  }
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
  .ellipse {
    width: 50px;
    height: 50px;
    background-color: #ff3510;
    border-radius: 50%;
  }
}
</style>