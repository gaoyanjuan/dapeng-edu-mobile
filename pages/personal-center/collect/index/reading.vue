<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <m-reading-posts v-for="(item, i) in list" :key="i" :item="item" />
  </van-list>
</template>

<script>
import { reading } from '@/data'
export default {
  name:'Reading',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    navRoute:'/details/homework-page-details',
  }),
  methods:{
     onLoad() {
      setTimeout(() => {
        for (let i = 0; i < reading.length; i++) {
          this.list.push(reading[i])
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
/deep/.m-reading:not(:first-child) {
  border-top: 12px solid #F7FAF8;
}
</style>