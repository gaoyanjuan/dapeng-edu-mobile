<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <m-video-posts v-for="(item, i) in list" :key="i" :item="item"/>
  </van-list>
</template>

<script>
export default {
  name:'LikeVideoPosts',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
  }),
  methods:{
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.list.push(i)
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
/deep/.video-posts-wrap:not(:first-child) {
  border-top: 12px solid #F7FAF8;
}
</style>