<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <!-- 二级菜单 -->
    <m-menus v-show="$route.query.type !== 'LIFE'" :menus="colleges" menus-type="college"/>

    <section class="works-wrapper">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="smallVideoList.list.length">
          <m-water-fall width="167px" gap="0" :data="smallVideoList.list" @complete="completeEvent">
            <m-water-fall-item v-for="(item, index) in smallVideoList.list" :key="index" :order="index">
              <m-small-video-posts :videoItem="item" />
            </m-water-fall-item>
          </m-water-fall>
        </template>
        <template v-if="!smallVideoList.list.length && finished">
          <div class="small-video-blank-wrap">
            <img class="blank-img" :src="blank" alt="" />
            <span class="blank-txt">暂无内容</span>
          </div>
        </template>
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
    waterFallComplete: false,
    loading: false,
    finished: false,
    finishedTxt:'没有更多了',
    blank:require('@/assets/icons/blank/have-no-video.png')
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
    },
    'smallVideoList.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  methods:{
    ...mapActions('video', [
      'appendSmallVideoList'
    ]),
    completeEvent () {
      if (!this.waterFallComplete) {
        this.waterFallComplete = true
        this.loading = false
        document.documentElement.scrollTop = this.$store.state.video.scrollTop
      }
    },
    onLoad() {
      if (!this.waterFallComplete) return false
      if (this.smallVideoList.status === 'over') {
        this.finished = true
        return false
      }
      if (this.smallVideoList.status === 'loading') return false
      const newStartTime = this.smallVideoList.list.slice(-1)[0].approvedTime
      this.appendSmallVideoList({
        type: this.$route.query.type,
        collegeId: this.$route.query.college,
        timestamp: newStartTime
      })
    }
  },
  destroyed () {
    this.$store.commit('video/changeScrollTop', document.documentElement.scrollTop)
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


.small-video-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.small-video-blank-wrap .blank-img {
  width: 240px;
  height: 126px;
  margin-top: 24px;
}

.small-video-blank-wrap .blank-txt {
  margin-top: 12px;
  width: max-content;
  height: 20px;
  font-size: 14px;
  font-family: @semibold;
  font-weight: 600;
  color: #8D8E8E;
  line-height: 20px;
}
</style>

