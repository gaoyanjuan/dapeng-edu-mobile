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
        <m-posts
          v-for="(res, i) in list"
          :key="i"
          squareType="作业"
          :commentList="res.commentList"
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
    navRoute:'/details/homework-page-details',
  }),
  computed: {
    ...mapGetters('attention', [
      'popularUsersGetters',
      'attentionListGetters'
    ])
  },
  methods:{
     onLoad () {}
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
