<template>
  <div>
    <!-- Swiper -->
    <m-swipe :banner="recommendBannerListGetters"/>

    <!-- 话题 -->
    <!-- <transition name="component-fade" mode="out-in">
      <m-topic-card v-if="showTopic" :topic="recommendGetters" channel="RECOMMEND"/>
    </transition> -->

    <section class="recommend-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="recommendListGetters.list.length">
          <div class="recommend-item" v-for="(res, i) in recommendListGetters.list" :key="res && res.recommendTopic ? res.recommendTopic.id + i: i">
            <m-reading-posts
              v-if="res && res.hotType === 'ARTICLE'"
              :id="res.recommendTopic ? res.recommendTopic.id: ''"
              listType="recommend"
              :propIndex="i"
              :imgSmall="res.recommendTopic.coverImgSmall"
              :item="res.recommendTopic"
            />
            <m-video-posts
              v-else-if="res && res.hotType === 'MOVIE'"
              :id="res.recommendTopic ? res.recommendTopic.id: ''"
              listType="recommend"
              :propIndex="i"
              :item="res.recommendTopic"
            />
            <m-posts
              v-else
              :id="res.recommendTopic ? res.recommendTopic.id : ''"
              :propSquareType="res.hotType"
              listType="recommend"
              :propIndex="i"
              :courseType="res.recommendTopic ? res.recommendTopic.courseType : ''"
              :modifiedTime="res.recommendTopic ? res.recommendTopic.createTime : 0"
              :listItemData="res.recommendTopic ? res.recommendTopic : {}"
              :commentList="res.recommendTopic ? res.recommendTopic.comments : null"
              :path="`/details/${pathType(res)}`"
            />
          </div>
        </template>
        <template v-if="!recommendListGetters.list.length && finished">
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
  name: 'M-Recommend',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      finishedTxt: '没有更多了',
      blank:require('@/assets/icons/blank/have-no-homework.png')
    }
  },
  computed: {
    ...mapGetters('banner', [
      'recommendBannerListGetters'
    ]),
    ...mapGetters('recommend', [
      'recommendListGetters'
    ]),
    ...mapGetters({
      userInfo: 'user/userInfoGetters'
    }),
    // ...mapGetters('topic', [
    //   'recommendGetters'
    // ]),

    // showTopic() {
    //   return this.recommendGetters.list.length > 0
    // }
  },
  watch: {
    'recommendListGetters.status': function (newVal, oldVal) {
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
    'recommendListGetters.list': function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  mounted () {
    if(!this.recommendListGetters.list.length) {
      this.finishedTxt = ''
    }

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
    ...mapActions('recommend', [
      'appendRecommendList'
    ]),
    onLoad () {
      if (this.recommendListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.recommendListGetters.status === 'loading') return false
      const newPage = this.recommendListGetters.pageInfo.number + 1
      this.appendRecommendList({ page: newPage })
      // this._squareLoading({ page_area: '推荐', page_area_sec:'', request_type: '手动上拉刷新'})
    },

    pathType(item){
      switch (item.hotType) {
        case 'HOMEWORK':
          return 'homework'
          break;
        case 'WORKS':
          return 'works'
          break;
        case 'LIFE':
          return 'dynamic'
          break;
        case 'ARTICLE':
          return 'reading'
          break;
        case 'MOVIE':
          return 'video'
          break;
        case 'video':
          return 'VIDEO'
          break;
        default:
          return '111'
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recommend-wrap {
  width: 100%;
  min-height: calc(100vh - 300px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}

.recommend-item:first-child {
  margin-top: 0px;
}

.recommend-item {
  margin-top: 12px;
}

.recommend-wrap .works-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.recommend-wrap .works-blank-wrap .blank-img {
  width: 240px;
  height: 126px;
  margin-top: 24px;
}

.recommend-wrap .works-blank-wrap .blank-txt {
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
