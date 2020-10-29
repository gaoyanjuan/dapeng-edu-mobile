<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <!-- 二级菜单 -->
    <m-menus v-show="$route.query.courseType !== 'DYNAMIC'" :menus="menus" menus-type="college"/>

    <section class="works-wrapper">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <m-water-fall width="167px" gap="0" :data="list">
          <template v-for="(item, index) in list">
            <m-water-fall-item :key="index" :order="index">
              <m-small-video-posts :imgInfo="item" />
            </m-water-fall-item>
          </template>
        </m-water-fall>
      </van-list>
    </section>
  </div>
</template>

<script>
import { waterFallImgPromise } from '@/utils/util'
import { smallVideo } from '@/data'
export default {
  name: 'M-Small-Video',
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
    async onLoad() {
      const promiseList = []
      for (let index = 0; index < smallVideo.length; index++) {
        promiseList.push(waterFallImgPromise(smallVideo, index, 167))
      }
      this.list = this.list.concat(smallVideo)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if(this.list.length > 60) {
        this.finished = true
      }
    }
  },
}
</script>

<style lang="less" scoped>
.works-wrapper {
  width: 100%;
  min-height: calc(100vh - 339px);
  padding:10px 16px 65px;
  background-color:@dp-white;
}
</style>

