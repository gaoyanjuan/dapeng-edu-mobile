<template>
  <div class="part-short">
    <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
      <div class="short-shift" v-for="(item, i) in taskPartListGetters.list" :key="i" @click="handelDetals(item.itemid)">
        <h1>{{ item.itemname }}</h1>
        <div class="shift-box">
          <p class="box-left">{{ item.addtime | taskDate }}</p>
          <template v-if="item.state==='1' ||item.state==='5'">
            <p style="color:green">已中标</p>
          </template>
          <template v-else>
            <template v-if="item.state==='0'">
              <p>{{ item.endtime | dateCount(item.fbtime) }}</p>
            </template>
            <template v-else>
              <p v-if="item.zab_do==='0'">已截止提交方案</p>
              <p v-else>已截止提交报价</p>
            </template>
           </template>
        </div>
        <div class="shift-right">
          <template v-if="item.state">
            <p class="box-left">已结束</p>
          </template>
          <template v-if="item.zab_do">
            <p v-if="item.zab_do==='1'">￥{{ item.zab_yusuan1 | formatNumber}} - {{ item.zab_yusuan2 | formatNumber}}元</p>
            <p v-else>￥{{ item.money }}元</p>
          </template>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters('task-part', ['taskPartListGetters']),
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      finishedTxt: '没有更多了',
      page:0,
    };
  },
  watch:{
    'taskPartListGetters.status' : function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
      }
    },
    'taskPartListGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  mounted() {
  },
  destroyed() {
    this.clearNewTaskList()
  },
  methods: {
    ...mapMutations('task-part', ['clearNewTaskList']),
    ...mapActions("task-part", ["appendTaskPartList"]),
    onLoad() {
      if (this.taskPartListGetters.status === 'over') {
        this.finished = true
        return false
      } 
      if (this.taskPartListGetters.status === 'loading') return false
      const newPage = this.taskPartListGetters.pageInfo.pages + 1
      this.$emit('changePage',newPage)
    },
    handelDetals(itemid) {
      this.$router.push({ path: "/details/part-task" ,query: { itemId : itemid}});
    },
  },
};
</script>
<style lang="less" scoped>
.part-short {
  background-color: #fff;
  margin-top: 20px;
  .short-shift {
    width: 343px;
    height: 105px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(160, 160, 160, 0.1);
    border-radius: 8px;
    margin: 0 16px 20px 16px;
    padding: 16px 16px;
    & > h1 {
      font-size: 14px;
      font-weight: 600;
      color: #18252c;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
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