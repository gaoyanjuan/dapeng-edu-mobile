<template>
  <div class="task-centered">
    <m-navbar title="我的任务" right-text="清空" :show-task-right-text="true" :task-status="taskStatus" @onClickRight="onClickRight" />
    <div>
      <template>
        <van-tabs v-model="active" sticky :offset-top="'1.1733rem'" @click="onTabsClick">
          <van-tab title="我的浏览">
            <personal-browse-posts pageName="taskPart" />
          </van-tab>
          <van-tab title="我的收藏">
            <personal-favorite-post pageName="taskPart" />
          </van-tab>
        </van-tabs>
      </template>
    </div>
  </div>
</template>
<script>
import { mapMutations,mapActions } from "vuex";
export default {
  data() {
    return {
      taskStatus:true,
      active: 0,
    };
  },
   mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
    /**
     * 路由定位
     */
    let query = this.$route.query.type || 'browser'
    let tabs = ['browser','favorite']
    this.active = tabs.findIndex(tab => tab === query)
  },
  destroyed() {
     this.clearTwoList()
  },
  methods: {
     ...mapActions("task-part", ["delBrowse"]),
    ...mapMutations('task-part', ['clearTwoList']),
     /**
     * 监听菜单切换事件，
     * 挂载Type参数给路由
     */
    onTabsClick(index) {
      let tabs = ['browser','favorite']
      if(this.$route.query.type === tabs[index]) return
      this.$router.replace({ query: { ...this.$route.query, type: tabs[index] } })
    },
    onClickRight() {
       if(this.$route.query.type !== "favorite") {
        this.$dialog.alert({
          showCancelButton: true,
          confirmButtonText: "确定",
          theme: "round",
          confirmButtonColor: "#0CB65B",
          message: "确定清空我的浏览吗？",
        }).then(() => {
            this.delBrowse().then((res) => {
            if(res.status === 204) {
              this.$toast.success('清空成功');
              this.clearTwoList()
            }
          })
        })
       }
       else {
        return
       }
      
    },
  }
};
</script>
<style lang="less" scoped>
.task-centered {
  .van-swipe-cell {
    margin-top: 33px;
  }
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