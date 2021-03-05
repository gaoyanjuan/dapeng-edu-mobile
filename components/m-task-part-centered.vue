<template>
  <div class="task-centered">
    <m-navbar title="我的任务" right-text="清空" :show-task-right-text="true" :task-status="taskStatus" @onClickRight="onClickRight" />
    <div class="tabs-wrap">
      <van-tabs v-model="active" sticky :offset-top="'1.1733rem'" @click="onTabsClick">
        <van-tab title="我的浏览">
          <personal-browse-posts pageName="taskPart" />
        </van-tab>
        <van-tab title="我的收藏">
          <personal-favorite-post pageName="taskPart" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
   computed: {
    ...mapGetters('task-part', [
      'browserGetters'
    ])
  },
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
   watch:{
    '$route.query' : function (newVal, oldVal) {
      if (newVal.type==='browser') {
        this.taskStatus = true
      }else {
        this.taskStatus = false
      }
    },
    'browserGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.taskStatus = false
      } else {
        this.taskStatus = true
      }
    }
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
    // 点击清空
    onClickRight() {
      this.$dialog.alert({
        showCancelButton: true,
        confirmButtonText: "确定",
        theme: "round",
        confirmButtonColor: "#363D35",
        confirmButtonColor:"#0CB65B",
        message: "确定清空我的浏览吗？",
      }).then(() => {
          this.delBrowse().then((res) => {
          if(res.status === 204) {
            this.clearTwoList()
          }
        })
      })
    },
  }
};
</script>
<style lang="less" scoped>
.task-centered {
  .tabs-wrap {
   padding-top: 44px;
}
  /deep/ .van-dialog__content--isolated {
    font-size: 16px;
    font-family: @semibold;
    font-weight: 600;
    color: #363D35;
  }
  /deep/.van-tabs {
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #747C80;
    line-height: 20px;
  }

  /deep/.van-tabs__wrap {
    // border-bottom: 1px solid #EAEAEA;

    .van-tab {
      padding: 0 10px;
      color: #18252C;
    }
  }

  /deep/ .van-tabs__nav {
    padding-left: 40px;
    padding-right: 40px;
    box-shadow: 0px 1px 0px 0px #EAEAEA;
  }

  /deep/.van-tab--active {
    font-size: 16px;
    font-family: @dp-font-medium;
    font-weight: 600;
    color: #18252C;
    animation: 0.5s appear;
  }

  /deep/.van-tabs__line {
    width: 26px;
    height: 4px;
    bottom: 15px;
    background: #0CB65B;
    border-radius: 2px;
    background-image: none;
  }
  /deep/.van-sticky--fixed {
    transform: translateX(-50%)!important;
  }
}
</style>