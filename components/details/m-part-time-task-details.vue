<template>
  <div class="task-part-details">
    <van-nav-bar title="任务详情" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #left>
        <img src="@/assets/icons/common/left.png" alt="">
      </template>
      <template #right>
        <div :class="isHight ? 'show-icon' : 'hide-icon'"></div>
      </template>
    </van-nav-bar>
    <div class="task-hander">
      <p>{{ taskList.item_name }}</p>
      <div class="details-time">
        <img src="@/assets/icons/common/time.png" alt="" />
        <span>{{ taskList.item_addtime | taskDate }}</span>
        <img src="@/assets/icons/common/edit.png" alt="" />
        <span>已结束</span>
        <img src="@/assets/icons/common/sand-clock.png" alt="" />
        <template v-if="taskList.item_state==='1' ||taskList.item_state==='5'">
          <span style="color:green">已中标</span>
        </template>
        <template v-else>
          <template v-if="taskList.item_state==='0'">
            <span>{{ taskList.item_endtime | dateCount(taskList.item_fbtime) }}</span>
          </template>
          <template v-else>
            <span v-if="taskList.item_type==='0'">已截止提交方案</span>
            <span v-else>已截止提交报价</span>
          </template>
        </template>
      </div>
      <template v-if="taskList.item_type">
        <h3 class="task-money" v-if="taskList.item_type==='1'">￥{{ taskList.item_yusuan1 | formatNumber}} - {{ taskList.item_yusuan2 | formatNumber}}元</h3>
        <h3 class="task-money" v-else>￥{{ taskList.item_money }}元</h3>
      </template>
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
          <img src="@/assets/icons/common/birdie.png" alt="" />
          <img src="@/assets/icons/common/shadow.png" alt="" />
        </div>
        <!-- <div v-else>
          <img src="@/assets/icons/common/birdiery.png" alt="" srcset="">
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
      <img src="@/assets/icons/common/green-bj.png" alt="" />
      <span>我要申请此任务</span>
    </div>
    <m-support-staff :showPopup="auditionPop"></m-support-staff>
  </div>
</template>
<script>
import parkDialog from "../global/m-park-dialog";
import { mapGetters,mapActions } from "vuex";
export default {
  components: {
    parkDialog,
  },
   computed: {
    ...mapGetters('task-part', [
      'taskPartDetailsGetters'
    ])
   },
  data() {
    return {
      isHight:false,
      auditionPop: { show: false },
      taskList:{},
    };
  },
  mounted() {
    let itemId = this.$route.query.itemId
    this.appendTaskPartDetails(itemId).then((res) => {
    this.taskList = res.data;
    });
    this.appendBrowses({id: itemId});
    // 校验当前用户是否收藏兼职任务
    this.verifyCollect({id: itemId}).then((res) => {
      if(res.data) {
        this.isHight= true;
      }
    })
  },
  methods: {
     ...mapActions("task-part", 
     ["appendTaskPartDetails","appendCollect","delCollect","verifyCollect","appendBrowses"]),
    onClickLeft() {
      this.$router.push({ path: "/part-time-task" });
    },
    /* 收藏事件 */
    onClickRight() {
      let itemId = this.$route.query.itemId
       if(!this.$login()) {
        return 
      }
      if(this.isHight) {
        this.delCollect({id: itemId}).then((res) => {
          if(res.status === 204) {
            this.isHight= false;
            this.$toast({
              message: '取消收藏',
              icon: 'close',
            })
          }
        })
      }else {
        this.appendCollect({id: itemId}).then((res) => {
          if(res.status === 201) {
             this.isHight= true;
            this.$toast.success('已收藏');
          }
        })
      }
    },
    handerApply() {
      this.auditionPop.show = true
    },
  },
};
</script>
<style lang="less" scoped>
.task-part-details {
  background: #f5f5f5;
  .show-icon {
    width: 22px;
    height: 21px;
    background-image: url(~@/assets/icons/common/collect.png);
    background-size: 22px 21px;
  }
  .hide-icon {
    width: 22px;
    height: 21px;
    background-image: url(~@/assets/icons/common/star.png);
     background-size: 22px 21px;
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
}
</style>