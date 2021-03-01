<template>
  <div class="part-short">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="short-shift" v-for="(item, i) in taskPartListGetters.list" :key="i" @click="handelDetals(item.itemid)">
        <h1>{{ item.itemname }}</h1>
        <div class="shift-box">
          <p class="box-left">{{ item.addtime }}</p>
          <p>{{ item.yanqi }}</p>
        </div>
        <div class="shift-right">
          <template v-if="item.state">
             <p class="box-left">{{ evaluateState(item.state) }}</p>
          </template>
          <p>￥{{ item.money }}</p>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
    computed: {
    ...mapGetters('task-part', [
      'taskPartListGetters'
    ])
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
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
    }
  },
  mounted() {
    // this.appendTaskPartList({page: 1 })
  },
  destroyed() {
     this.clearTwoList()
  },
  methods: {
    ...mapMutations('task-part', ['clearTwoList']),
    ...mapActions("task-part", ["appendTaskPartList"]),
    evaluateState(state) {
      let str = ''
      switch (state) {
        case '0':
          str = '未评标'
          break;
         case '1':
          str = '已评标'
          break;
           case '2':
          str = '投票中标'
          break;
           case '3':
          str = '威客奖金'
          break;
           case '4':
          str = '未评标'
          break;
           case '5':
          str = '表示招标项目已选标'
          break; case '-1':
          str = '退款'
          break;
           case '-3':
          str = '招标项目已流标'
          break;
        default:
          break;
      }
      return str
    },
    onLoad() {
      if (this.taskPartListGetters.status === 'over') {
        this.finished = true
        return false
      } 
      if (this.taskPartListGetters.status === 'loading') return false
      const newPage = this.taskPartListGetters.pageInfo.pages + 1
      this.appendTaskPartList({page: newPage })
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