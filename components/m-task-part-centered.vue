<template>
  <div class="task-centered">
    <van-nav-bar
      title="我的任务"
      right-text="清空"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div>
      <template>
        <van-tabs v-model="active" sticky :offset-top="'1.1733rem'">
          <van-tab title="我的浏览">
            <van-swipe-cell>
              <van-card class="short-shift" v-for="(item, index) in shortList">
                <template #title>
                  <h1 class="shift-title">{{ item.title }}</h1>
                </template>
                <template #desc>
                  <div class="shift-box">
                    <p class="box-left">{{ item.day }}</p>
                    <p>{{ item.time }}</p>
                  </div>
                  <div class="shift-right">
                    <p class="box-left">{{ item.underway }}</p>
                    <p>￥{{ item.money }}</p>
                  </div>
                </template>
              </van-card>
              <template #right>
                <van-button
                  squarej
                  text="删除"
                  type="danger"
                  class="delete-button"
                />
              </template>
            </van-swipe-cell>
          </van-tab>
          <van-tab title="我的收藏">
            <van-swipe-cell>
              <van-card class="short-shift" v-for="(item, index) in shortList">
                <template #title>
                  <h1 class="shift-title">{{ item.title }}</h1>
                </template>
                <template #desc>
                  <div class="shift-box">
                    <p class="box-left">{{ item.day }}</p>
                    <p>{{ item.time }}</p>
                  </div>
                  <div class="shift-right">
                    <p class="box-left">{{ item.underway }}</p>
                    <p>￥{{ item.money }}</p>
                  </div>
                </template>
              </van-card>
              <template #right>
                <van-button square class="delete-button">删除</van-button>
              </template>
            </van-swipe-cell>
          </van-tab>
        </van-tabs>
      </template>
      <!-- <template>
        <van-empty
          class="custom-image"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无浏览的任务哦~"
        />
      </template> -->
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
    onClickLeft() {
      this.$router.push({ path: "/details/part-task" });
    },
    onClickRight() {
      this.$dialog.alert({
        showCancelButton: true,
        confirmButtonText: "确定",
        theme: "round",
        confirmButtonColor: "#0CB65B",
        message: "确定清空我的浏览吗？",
      });
    },
  },
};
</script>
<style lang="less" scoped>
.task-centered {
  .short-shift {
    width: 343px;
    height: 105px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(160, 160, 160, 0.1);
    border-radius: 8px;
    margin: 12px 16px;
    .shift-title {
      font-size: 14px;
      font-weight: 600;
      color: #18252c;
      margin-bottom: 12px;
    }
  }
  .delete-button {
    height: 105px;
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
  .custom-image .van-empty__image {
    width: 90px;
    height: 90px;
  }
}
</style>