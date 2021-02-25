<template>
  <div>
    <!-- Swiper -->
    <m-swipe :banner="movieBannerListGetters"/>

    <!-- 话题 -->
    <transition name="component-fade" mode="out-in">
      <m-topic-card v-if="showTopic" :topic="movieGetters" channel="MOVIE"/>
    </transition>

    <!-- 二级菜单 -->
    <m-menus menus-type="college" :menus="videoCollegesGetters" @switchCollegeName="switchCollegeName"/>

    <section class="works-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="videoListGetters.list.length">
          <m-video-posts v-for="(item, i) in videoListGetters.list"
            :id="item ? item.id: ''"
            :propIndex="i"
            listType="video"
            :key="item ? item.id + i : i"
            :item="item"
          />
        </template>
        <template v-if="!videoListGetters.list.length && finished">
          <div class="works-blank-wrap">
            <img class="blank-img" :src="blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
          </div>
        </template>
      </van-list>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Video',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    collegeType: '全部',
    finishedTxt:'没有更多了',
    blank:require('@/assets/icons/blank/have-no-video.png')
  }),
   watch: {
    'videoListGetters.status': function (newVal, oldVal) {
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
    'videoListGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  computed: {
    ...mapGetters('banner', [
      'movieBannerListGetters'
    ]),
    ...mapGetters('colleges', [
      'videoCollegesGetters'
    ]),
    ...mapGetters('video', [
      'videoListGetters'
    ]),
    ...mapGetters('topic', [
      'movieGetters'
    ]),

    showTopic() {
      return this.movieGetters.list.length > 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$store.state.anchorId) {
        const element = document.getElementById(this.$store.state.anchorId)
        if (element) {
          element.scrollIntoView({
            behavior: 'auto'
          })
        }
      }
    })
  },
  methods:{
    ...mapActions('video', [
      'appendVideoList'
    ]),

    onLoad() {
       if (this.videoListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.videoListGetters.status === 'loading') return false
      const newPage = this.videoListGetters.pageInfo.pages + 1
      this.appendVideoList({
        collegeId: this.$route.query.college,
        page: newPage
      })
      // this._squareLoading({ 
      //   page_area: '视频',
      //   page_area_sec: this.collegeType,
      //   request_type: '手动上拉刷新'
      // })
    },
    switchCollegeName(params) {
      this.collegeType = params.name
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


.works-wrap .works-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.works-wrap .works-blank-wrap .blank-img {
  width: 240px;
  height: 126px;
  margin-top: 24px;
}

.works-wrap .works-blank-wrap .blank-txt {
  margin-top: 12px;
  width: max-content;
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #8D8E8E;
  line-height: 20px;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
