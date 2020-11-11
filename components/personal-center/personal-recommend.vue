<template>
  <div>
    <m-navbar title="我的推荐" />

    <div class="recommend-list-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
        <template v-if="userHomesRecommendGetters.list.length > 0">
        <m-posts
          v-for="(res, index) in userHomesRecommendGetters.list"
          :key="index"
          squareType="作业"
          :commentList="res.comments"
          :dataType="res.type"
          :imgInfo="res.imgSmall"
          :courseType="res.courseType"
          :user="res.user"
          :college="res.college"
          :recommendType="res.recommendType"
          :task="res.task"
          :content="res.content"
          :isAttention="res.isAttention"
          :modifiedTime="res.lastModifiedTime"
          :listItemData="res"
          :path="navRoute"
        />
        </template>
         <!-- 无数据 -->
      <template v-if="userHomesRecommendGetters.list.length === 0 && finished">
        <div class="blank-no-data-wrap">
          <img class="blank-icon" :src="blank" alt="" />
          <span class="blank-txt">您暂无推荐作业哦～</span>
        </div>
      </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { workDetails } from '@/data'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'Recommend',
  layout:'navbar',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    navRoute:'/details/homework-page-details',
    finishedText: '没有更多了',
    blank: require('@/assets/icons/blank/have-no-homework.png'),
  }),
  mounted() {
    if(this.userHomesRecommendGetters.list.length === 0) {
      this.appendUserHomesRecommend({
        userId: this.$route.query.userId,
        page: 1,
        size: 10
      })
    }
    
  },
  watch: {
    'userHomesRecommendGetters.status': function (newVal, oldVal) {
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
    'userHomesRecommendGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  methods:{
     ...mapActions('user', [
      'appendUserHomesRecommend'
    ]),
    ...mapMutations('user', [
      'clearUserHomesRecommend'
    ]),
     onLoad() {
      if (this.userHomesRecommendGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.userHomesRecommendGetters.status === 'loading') return false
      const newPage = this.userHomesRecommendGetters.pageInfo.pages + 1
      this.appendUserFollow({
        userId: this.$route.query.userId,
        page: newPage,
        size: 10
      })
    }
  },
  computed: {
    ...mapGetters('user', [
      'userHomesRecommendGetters'
    ])
  },
  destroyed () {
    this.clearUserHomesRecommend()
  },
}
</script>

<style lang="less" scoped>

.recommend-list-wrap {
  width: 100%;
  padding-top: 44px;
  min-height: 100vh;
  background-color: #f8f8f8;

  /deep/ & .m-works:not(:first-child) {
    margin-top: 12px;
  }
}
/** 空数据 Style */

.blank-no-data-wrap {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-40%);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.blank-no-data-wrap .blank-icon {
  width: 228px;
  height: 129px;
}

.blank-no-data-wrap .blank-txt {
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #8D8E8E;
  line-height: 20px;
  margin-top: 12px;
}
</style>