<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <!-- 二级菜单 -->
    <m-menus menus-type="college" :menus="menus" />

    <section class="works-wrap">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <m-reading-posts v-for="(item, i) in list" :key="i" :item="item" />
      </van-list>
    </section>
  </div>
</template>

<script>
import { reading } from '@/data'
export default {
  name: 'M-Reading',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    menus:[{id:'', name: '全部'},
    {id:'sheji',name:'设计'},
    {id:'meishu',name:'美术'},
    {id:'guohua',name:'国画'},
    {id:'shufa',name:'书法'},
    {id:'video',name:'短视频'},
    {id:'shouban',name:'手办'},
    {id:'linmo',name:'临摹'}]
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
        this.finished = true
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.works-wrap {
  width: 100%;
  min-height: calc(100vh - 339px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}
</style>
