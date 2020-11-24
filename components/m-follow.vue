<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <!-- 关注画廊 -->
    <m-follow-gallery />

    <!-- 分割线 -->
    <div class="follow-section-line"></div>
    
    <!-- 关注帖子列表 -->
    <div class="follow-wrap">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <template v-if="attentionListGetters.list.length">
          <div v-for="(res, i) in attentionListGetters.list" :key="i">
            <m-posts
              v-if="res.topic"
              :propSquareType="res.topicType"
              :courseType="res.topic ? res.topic.courseType : ''"
              :modifiedTime="res.topic ? res.topic.createTime : 0"
              :listItemData="res.topic"
            />
          </div>
        </template>
        <template v-if="!attentionListGetters.list.length && finished">
          <div class="works-blank-wrap">
            <img class="blank-img" :src="blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
          </div>
        </template>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Follow',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    navRoute:'/details/homework',
  }),
  computed: {
    ...mapGetters('attention', [
      'attentionListGetters'
    ])
  },
   watch: {
    'attentionListGetters.status': function (newVal, oldVal) {
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
    'attentionListGetters.list': function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  methods:{
    ...mapActions('attention', [
      'appendAttentionList'
    ]),
     onLoad () {
      if (this.attentionListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.attentionListGetters.status === 'loading') return false
      const newPage = this.attentionListGetters.pageInfo.number + 1
      this.appendAttentionList({
        page: newPage
      })
    }
  }
}
</script>

<style lang="less" scoped>

.follow-section-line {
  width: 100%;
  height: 12px;
  background-color: #F8F8F8;
}

.follow-wrap {
  width: 100%;
  min-height: calc(100vh - 500px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}
</style>
