<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="list.length">
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
    </template>
    <template v-if="!list.length && finished">
      <div class="posts-blank-wrap">
        <template v-if="$route.query.type === 'homework' || !$route.query.type">
          <img class="blank-icon" :src="homework_Blank" alt="" />
        </template>
        <template v-if="$route.query.type === 'works'">
          <img class="blank-icon" :src="works_Blank" alt="" />
        </template>
        <template v-if="$route.query.type === 'dynamic'">
          <img class="blank-icon" :src="dynamic_Blank" alt="" />
        </template>
        <template v-if="$route.query.type === 'growth'">
          <img class="blank-icon" :src="growth_blank" alt="" />
        </template>
        <span class="blank-txt">暂无内容～</span>
      </div>
    </template>
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
    finishedText:'没有更多了',
    navRoute:'/details/homework-page-details',
    homework_Blank:require('@/assets/icons/blank/have-no-homework.png'),
    works_Blank: require('@/assets/icons/blank/have-no-works.png'),
    dynamic_Blank: require('@/assets/icons/blank/have-no-dynamic.png'),
    growth_blank: require('@/assets/icons/blank/have-no-growth.png')
  }),
  mounted() {
    console.log('执行')
  },
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
        if (this.list.length === 0) {
          this.finished = true
          this.finishedText = ''
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

.posts-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.posts-blank-wrap .blank-icon {
  width: 240px;
  height: 126px;
}

.posts-blank-wrap .blank-txt {
  margin-top: 12px;
  font-size: 14px;
  font-family: @semibold;
  font-weight: 600;
  color: #8D8E8E;
}
</style>