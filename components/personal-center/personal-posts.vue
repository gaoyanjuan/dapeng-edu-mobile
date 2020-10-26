<template>
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
</template>

<script>
import { workDetails } from '@/data'
export default {
  name:'LikePosts',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    navRoute:'/details/homework-page-details',
  }),
  methods:{
     onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.list.push(workDetails)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 5) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.m-works:not(:first-child) {
  border-top: 12px solid #F7FAF8;
}
</style>