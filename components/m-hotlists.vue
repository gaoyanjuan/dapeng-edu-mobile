<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <section class="hotlists-wrap">
      <m-posts
        v-if="res"
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
        :modifiedTime="res.lastModifiedTime"
        :listItemData="res"
        :path="navRoute"
      >
      </m-posts>
    </section>
  </div>
</template>

<script>
import { workDetails } from '@/data'
export default {
  name: 'M-Hotlists',
  data: () => ({
    res: workDetails,
    navRoute:'/details/homework-page-details',
  })
}
</script>

<style lang="less" scoped>
.hotlists-wrap {
  width: 100%;
  height: auto;
  padding-bottom: 65px;
  background-color: #f8f8f8;
}
</style>
