<template class="growth-wrap">
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="publishGrowthGetters.list.length">
      <m-posts
        v-for="(res, index) in publishGrowthGetters.list"
        :key="index"
        :courseType="res.courseType"
        :modifiedTime="res.createTime"
        :listItemData="res"
        :path="navRoute"
         :pageName="pageName"
        propSquareType="ACTIVITY_POST"
        :propIndex="index"
      />
    </template>
    <template v-if="!publishGrowthGetters.list.length && finished">
      <div class="have-no-posts-wrap">
        <img class="icon" :src="blank" alt="" />
        <span class="txt">暂无内容</span>
      </div>
    </template>
  </van-list>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'Growth',
  data: () => ({
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    navRoute:'/details/growth',
    blank: require('@/assets/icons/blank/have-no-growth.png'),
    pageName: 'myGrowth',
    currentPage: 1
  }),
  computed: {
    ...mapGetters('user', [
      'publishGrowthGetters'
    ])
  },
   watch: {
    'publishGrowthGetters.status': function (newVal, oldVal) {
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
    'publishGrowthGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  mounted() {
    if (this.$route.query.userId && this.publishGrowthGetters.list.length === 0) {
      this.appendPublishGrowth({
        userId: this.$route.query.userId,
        page: this.currentPage,
        size: 10
      })
    }
  },
  methods:{
    ...mapActions('user', [
      'appendPublishGrowth',
    ]),
    ...mapMutations('user', [
      'clearPublishGrowth',
    ]),
    onLoad() {
      if (this.publishGrowthGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.publishGrowthGetters.status === 'loading') return false
      const newPage = this.publishGrowthGetters.pageInfo.pages + 1
      this.appendPublishGrowth({
        userId: this.$route.query.userId,
        page: newPage,
        size: 10
      })
    }
  },
  destroyed() {
    this.clearPublishGrowth()
  },
}
</script>

<style lang="less" scoped>
/deep/.m-works:not(:first-child) {
  border-top: 12px solid #F7FAF8;
}

.growth-wrap {
  position: relative;
}


.have-no-posts-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  & .icon {
    width: 240px;
    height: 126px;
  }

  & .txt {
    font-size: 14px;
    font-weight: 600;
    color: #8D8E8E;
    margin-top: 12px;
  }
}
</style>