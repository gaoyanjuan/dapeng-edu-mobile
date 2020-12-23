<template>
  <div class="task-part-details">
    <div class="details">
      <img src="../../assets/icons/common/left.png" @click="goBack" alt="" />
      <p>任务详情</p>
    </div>
    <div class="task-hander" v-for="item in taskList">
      <p>{{ item.title }}</p>
      <div class="details-time">
        <span>{{ item.day }}</span>
        <span>{{ item.limite }}</span>
        <span>{{ item.time }}</span>
      </div>
      <h3 class="task-money">￥{{ item.money }}</h3>
    </div>
    <div class="task-content">
      <h3>任务要求</h3>
      <p>1.公司简介：</p>
      <p>
        大鹏教育创建于2015年，是中国在线教育的领航者之一，具备国际化的教研体系，专业化的作业系统，互联网与教师伴随相结合的教学模式。
        大鹏教育提供在线学习服务，现自有版权课程百余门，业务涵盖平面设计、UI设计、美术、书法、国画、短视频等多个领域。成立多年来，大鹏教育利用丰富的教学经验、健全的辅导体系、专业的教研体系，为用户的学习提供有力的保障。2017年，大鹏教育成为国家级高新技术企业，并连续多年被腾讯网、新华网授予教育奖项。
        截至2020年3月，大鹏教育已为数百万用户提供在线教育服务。
      </p>
      <p>2.能接受改稿，改到满意为止~</p>
      <p>现LOGO或参考</p>
      <div class="contentImg">
        <img src="../../assets/icons/common/birdie.png" alt="" />
        <img src="../../assets/icons/common/shadow.png" alt="" />
      </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      taskList: [
        {
          title: "做一个甲烷的公司LOGO，主要得好看",
          day: "20分钟前",
          limite: "进行中",
          time: "剩余 3 天 22 小时",
          money: "1000元-1.5万",
        },
      ],
      times: require("@/assets/icons/common/time.png"),
      limite: require("@/assets/icons/common/edit.png"),
      poson: require("@/assets/icons/common/sand-clock.png"),
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/part-time-task" });
    },
    handerApply() {
      this.$router.push({ path: "/task-centered/task-part-centered" });
    }
  },
};
</script>
<style lang="less" scoped>
.task-part-details {
  background: #f5f5f5;
  .details {
    background: #ffffff;
    height: 44px;
    display: flex;
    & > img {
      width: 20px;
      height: 20px;
      flex: 1;
      line-height: 27px;
      margin: 14px 0 0 17px;
    }
    & > P {
      flex: 10;
      text-align: center;
      margin-left: -22px;
      font-size: 16px;
      font-weight: 500;
      color: #18252c;
      line-height: 46px;
    }
  }

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
      margin: 0 32px 0 10px;
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
    height: 540px;
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
    & > p {
      font-size: 14px;
      font-weight: 400;
      color: #18252c;
      line-height: 22px;
    }
    :nth-child(4) {
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
}
</style>