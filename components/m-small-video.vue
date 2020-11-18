<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <!-- 二级菜单 -->
    <m-menus v-show="$route.query.courseType !== 'DYNAMIC'" :menus="colleges" menus-type="college"/>

    <section class="works-wrapper">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <m-water-fall width="167px" gap="0" :data="smallVideoList.list">
          <template v-for="(item, index) in smallVideoList.list">
            <m-water-fall-item :key="index" :order="index">
              <m-small-video-posts :videoItem="item" />
            </m-water-fall-item>
          </template>
        </m-water-fall>
      </van-list>
    </section>
  </div>
</template>

<script>
import { waterFallImgPromise } from '@/utils/util'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Small-Video',
  data: () => ({
    list: [],
    loading: false,
    finished: false
  }),
  computed: {
    ...mapGetters({
      colleges: 'colleges/smallVideoCollegesGetters',
      smallVideoList: 'video/smallVideoListGetters'
    })
  },
  watch: {
    'smallVideoList.status': function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
      }
    }
  },
  methods:{
    ...mapActions('video', [
      'appendSmallVideoList'
    ]),
    onLoad() {
      if (this.smallVideoList.status === 'over') {
        this.finished = true
        return false
      }
      if (this.smallVideoList.status === 'loading') return false
      const newStartTime = this.smallVideoList.list.slice(-1)[0].approvedTime
      this.appendSmallVideoList({
        type: this.$route.query.courseType,
        collegeId: this.$route.query.college,
        timestamp: newStartTime
      })
    }
  }
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

