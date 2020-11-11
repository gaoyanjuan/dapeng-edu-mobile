<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <section class="recommend-wrap">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <template v-if="recommendListGetters.list.length">
          <div v-for="(res, i) in recommendListGetters.list" :key="i">
            <m-posts
              v-if="res.recommendTopic.type === 'TEXT'"
              :propSquareType="res.hotType"
              :courseType="res.courseType"
              :modifiedTime="res.recommendTopic.createTime"
              :listItemData="res.recommendTopic"
            />
            <m-video-posts
              v-if="res.recommendTopic.type === 'VIDEO'"
              :propSquareType="res.hotType"
              :courseType="res.courseType"
              :modifiedTime="res.recommendTopic.createTime"
              :listItemData="res.recommendTopic"
            />
          </div>
        </template>
        <template v-if="!recommendListGetters.list.length && finished">
          <div class="works-blank-wrap">
            <img class="blank-img" :src="blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
          </div>
        </template>
      </van-list>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Recommend',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      navRoute:'/details/homework-page-details'
    }
  },
  computed: {
    ...mapGetters('recommend', [
      'recommendListGetters'
    ])
  },
  watch: {
    'recommendListGetters.status': function (newVal, oldVal) {
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
    'recommendListGetters.list': function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  methods:{
    ...mapActions('recommend', [
      'appendRecommendList'
    ]),
    onLoad () {
      if (this.recommendListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.recommendListGetters.status === 'loading') return false
      const newPage = this.recommendListGetters.pageInfo.pages + 1
      this.appendRecommendList({
        page: newPage
      })
    }
  }
}
</script>

<style lang="less" scoped>
.recommend-wrap {
  width: 100%;
  min-height: calc(100vh - 300px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}
</style>
