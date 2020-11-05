<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="list.length">
      <m-reading-posts v-for="(item, i) in list" :key="i" :item="item" />
    </template>
    <template v-if="!list.length && finished">
      <div class="posts-blank-wrap">
        <img class="blank-icon" :src="blank" alt="" />
        <span class="blank-txt">暂无内容～</span>
      </div>
    </template>
  </van-list>
</template>

<script>
import { reading } from '@/data'
export default {
  name:'LikeReadingPosts',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    blank: require('@/assets/icons/blank/have-no-reading.png')
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
/deep/.m-reading:not(:first-child) {
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