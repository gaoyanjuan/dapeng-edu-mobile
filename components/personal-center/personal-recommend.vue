<template>
  <div>
    <m-navbar :title=" interactionNews ? '我的推荐' : '他的推荐'" />

    <div class="recommend-list-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
        <template v-if="userHomesRecommendGetters.list.length > 0">
        <m-posts
          v-for="(res, index) in userHomesRecommendGetters.list"
          :key="res ? res.id + index : index"
          :commentList="res.comments"
          :dataType="res.type"
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
          propSquareType="HOMEWORK"
          pageName="myRecommend"
          :propIndex="index"
        />
        </template>
         <!-- 无数据 -->
      <template v-if="userHomesRecommendGetters.list.length === 0 && finished">
        <div class="blank-no-data-wrap">
          <img class="blank-icon" :src="blank" alt="" />
          <span class="blank-txt">{{ interactionNews ? '您暂无推荐作业哦～': '他还没有被推荐的作业哦~' }}</span>
        </div>
      </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'Recommend',
  layout:'navbar',
  data: () => ({
    loading: false,
    finished: false,
    interactionNews: true,
    navRoute:'/details/homework',
    finishedText: '没有更多了',
    blank: require('@/assets/icons/blank/have-no-homework.png'),
  }),
   computed: {
    ...mapGetters('user', [
      'userHomesRecommendGetters',
      'userInfoGetters'
    ])
  },
  mounted() {
    if (this.userInfoGetters && this.$route.query.userId === this.userInfoGetters.userId) {
      this.interactionNews = true
    } else {
      this.interactionNews = false
    }
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
      const newPage = this.userHomesRecommendGetters.pageInfo.number + 1
      this.appendUserHomesRecommend({
        userId: this.$route.query.userId,
        page: newPage,
        size: 10
      })
    }
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