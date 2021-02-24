<template>
  <div class="task-centered">
    <m-navbar title="我的任务" right-text="清空" :show-task-right-text="true" :task-status="taskStatus" @onClickRight="onClickRight" />
    <div>
      <template>
       <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-tabs v-model="active" sticky :offset-top="'1.1733rem'" @click="onTabsClick">
            <van-tab title="我的浏览">
              <van-swipe-cell>
                <van-card v-if="activeUserGetters" class="short-shift" v-for="(item, item_name) in activeUserGetters">
                  <template #title>
                    <h1 class="shift-title">{{ item.item_endtime }}</h1>
                  </template>
                  <template #desc>
                    <div class="shift-box">
                      <p class="box-left">{{ item.item_ispay  }}</p>
                      <p>{{ item.item_endtime }}</p>
                    </div>
                    <div class="shift-right">
                      <p class="box-left">{{ item.item_type }}</p>
                      <p>￥{{ item.item_money }}</p>
                    </div>
                  </template>
                </van-card>
                  <template v-else>
                    <van-empty
                      class="custom-image"
                      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                      description="暂无浏览的任务哦~"
                    />
                  </template>
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
                <van-card v-if="activeUserGetters.list" class="short-shift" v-for="(item, index) in activeUserGetters.list">
                  <template #title>
                    <h1 class="shift-title">{{ item.item_name }}</h1>
                  </template>
                  <template #desc>
                    <div class="shift-box">
                      <p class="box-left">{{ item.item_state }}</p>
                      <p>{{ item.item_type }}</p>
                    </div>
                    <div class="shift-right">
                      <p class="box-left">{{ item.item_ispay }}</p>
                      <p>￥{{ item.item_money }}</p>
                    </div>
                  </template>
                </van-card>
                 <template v-else>
                    <van-empty
                      class="custom-image"
                      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
                      description="暂无收藏的任务哦~"
                    />
                  </template>
                <template #right>
                  <van-button square class="delete-button">删除</van-button>
                </template>
              </van-swipe-cell>
            </van-tab>
          </van-tabs>
        </van-list>
      </template>
    
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters('task-part', [
      'activeUserGetters'
    ])
  },
  data() {
    return {
      loading: false,
      finished: false,
      taskStatus:true,
      page:0,
      active: 0,
      shortList: [],
    };
  },
    watch:{
    'activeUserGetters.status' : function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
      }
    }
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
    this.appendActiveUser({page: 1 })
  },
  methods: {
    ...mapActions("task-part", ["appendActiveUser","delBrowse"]),
     /**
     * 监听菜单切换事件，
     * 挂载Type参数给路由
     */
    onTabsClick(index) {
      let tabs = ['browser','favorite']
      if(this.$route.query.type === tabs[index]) return
      this.$router.replace({ query: { ...this.$route.query, type: tabs[index] } })
    },
     onLoad() {
      if (this.activeUserGetters.status === 'over') {
        this.finished = true
        return false
      } 
      if (this.activeUserGetters.status === 'loading') return false
      const newPage = this.activeUserGetters.pageInfo.pages + 1
      console.log(this.activeUserGetters.pageInfo);
      this.appendActiveUser({page: newPage })
    },
    onClickRight() {
      this.$dialog.alert({
        showCancelButton: true,
        confirmButtonText: "确定",
        theme: "round",
        confirmButtonColor: "#0CB65B",
        message: "确定清空我的浏览吗？",
      }).then(() => {
          this.delBrowse().then((res) => {
          if(res.status === 204) {
            this.$toast.success('删除成功');
            // this.appendActiveUser()
          }
        })
      })
    },
  },
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