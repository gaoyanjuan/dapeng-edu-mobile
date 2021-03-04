<template>
  <div class="taskBrowser">
    <template v-if="browserGetters.list.length > 0">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-swipe-cell v-if="browserGetters" class="short-shift" v-for="(item,index ) in browserGetters.list" :key='index'>
          <van-card>
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
          <template #right>
            <van-button
              squarej
              text="删除"
              type="danger"
              class="delete-button"
              @click="deletrBut(item.id)"
            />
            <img class="del-img" src="@/assets/icons/common/delete.png" alt="" />
          </template>
        </van-swipe-cell>
      </van-list>
    </template>
    <template v-else>
      <div class="browser-activity">
        <img src="@/assets/icons/common/no-activity.png" alt="">
      <p>暂无浏览的任务哦~</p>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions,mapMutations } from "vuex";
export default {
  name:'taskPart',
  props: {
    pageName: {
      type: String,
      default: ''
    }
  },
   computed: {
    ...mapGetters('task-part', [
      'browserGetters'
    ])
  },
  data() {
    return {
      loading: false,
      finished: false,
      taskStatus:true,
      page:0,
    }
  },
    watch:{
    'browserGetters.status' : function (newVal, oldVal) {
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
    this.appendBrowser({page: 1,type:'browser'})
  },
  methods: {
    ...mapActions("task-part", ["appendBrowser","cleartBrowse"]),
    ...mapMutations('task-part', ['clearNewTaskList']),
     onLoad() {
      if (this.browserGetters.status === 'over') {
        this.finished = true
        return false
      } 
      if (this.browserGetters.status === 'loading') return false
      const newPage = this.browserGetters.pageInfo.pages + 1
      this.appendBrowser({page: newPage,type: 'browser' })
    },
    deletrBut(id) {
      this.cleartBrowse({id}).then((res) => {
        this.clearNewTaskList()
        if(res.status === 204) {
          this.$toast.success('删除成功');
          this.appendBrowser({page: 1,type:'browser'})
        }
      })
    }
  },
}
</script>
<style lang="less" scoped>
.taskBrowser {
  margin-top: 45px;
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
  .van-button__content {
    margin-top: 10px;
  }
  .delete-button {
    height: 105px;
  }
  .del-img {
    position: absolute;
    top: 28px;
    left: 20px;
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
  .browser-activity {
    margin: 156px auto;
    text-align: center;
    & > p {
      margin-top: 6px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #8D8E8E;
    }
  }
}
</style>