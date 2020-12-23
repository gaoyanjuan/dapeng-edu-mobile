<template>
  <div class="task-centered">
    <div class="task-hander">
      <img src="../assets/icons/common/left.png" @click="goBack" alt="" />
      <p>我的任务</p>
      <span>清空</span>
    </div>
    <div>
      <van-tabs v-model="active">
        <van-tab title="我的浏览">
          <div class="short-shift" v-for="(item, index) in shortList">
            <h1>{{ item.title }}</h1>
            <div class="shift-box">
              <p class="box-left">{{ item.day }}</p>
              <p>{{ item.time }}</p>
            </div>
            <div class="shift-right">
              <p class="box-left">{{ item.underway }}</p>
              <p>￥{{ item.money }}</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="我的收藏">  
          <div class="short-shift" v-for="(item, index) in shortList">
            <h1>{{ item.title }}</h1>
            <div class="shift-box">
              <p class="box-left">{{ item.day }}</p>
              <p>{{ item.time }}</p>
            </div>
            <div class="shift-right">
              <p class="box-left">{{ item.underway }}</p>
              <p>￥{{ item.money }}</p>
            </div>
          </div>
        </van-tab></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "2",
      shortList: [
        {
          title: "做一个名为格润博道德公司logo",
          day: " 前天",
          time: " 剩余 3 天 23 小时",
          underway: "进行中",
          money: "1000-3000",
        },
        {
          title: "做一个名为格润博道德公司",
          day: " 8-10",
          time: " 已截止提交方案",
          underway: "已结束",
          money: "1.5万",
        },
        {
          title: "做一个名为格润博道德公司logo纠结纠结",
          day: " 昨天",
          time: " 已中标",
          underway: "已结束",
          money: "1000",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/details/part-task" });
    },
  },
};
</script>
<style lang="less" scoped>
.task-centered {
  // background: red;
  .task-hander {
    display: flex;
    background: #ffffff;
    border-bottom: 1px solid #ccc;
    line-height: 44px;
    padding: 0 16px;
    & > img {
      position: absolute;
      top: 13px;
      width: 20px;
      height: 20px;
    }
    & > P {
      flex: 1;
      text-align: center;
    }
    
  }
  .short-shift {
      width: 343px;
      height: 105px;
      background: #ffffff;
      box-shadow: 0px 0px 10px 0px rgba(160, 160, 160, 0.1);
      border-radius: 8px;
      margin: 12px 16px;
      padding: 0 16px;
      & > h1 {
        font-size: 14px;
        font-weight: 600;
        color: #18252c;
        margin-bottom: 12px;
      }
    }
    .shift-box {
      display: flex;
      font-size: 12px;
      font-weight: 400;
      color: #a3a8ab;
      margin-bottom: 16px;
      & > .box-left {
        flex: 1;
      }
    }
    .shift-right {
      display: flex;
      & > .box-left {
        flex: 1;
        color: green;
        border-radius: 4px;
      }
      & > p + p {
        font-size: 22px;
        font-weight: 600;
        color: #ff3510;
        line-height: 18px;
      }
    }
}
</style>