<template>
  <div>
    <div class="label-navbar">
      <div class="label-navbar-back">
        <img @click="$goback" src="@/assets/icons/navbar/nav-arrow-back.png" alt="">
      </div>
      <div class="label-navbar-title">
        {{ labelDataGetters && labelDataGetters.name }}
      </div>
      <div class="label-navbar-footer" v-if="labelCountGetters">
        <div>{{ labelCountGetters.participationCount | studentsCount }}人参与</div><div>{{ labelCountGetters.browseCount | studentsCount }}人浏览</div>
      </div>
    </div>
    <!-- 二级菜单 -->
    <van-sticky class="the-menus">
      <m-label-menus :menus="menus" />
    </van-sticky>
    <section class="label-wrap" :class="{ 'label-wrap-background' : $route.query.topicType === 'VIDEO' }">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="labelListGetters.list.length && $route.query.topicType === 'VIDEO'">
          <div class="water-fall-warp">
            <m-water-fall width="167px" gap="0" :data="labelListGetters.list" @complete="completeEvent">
              <m-water-fall-item v-for="(item, index) in labelListGetters.list" :key="item ? item.id + index: index" :order="index">
                <m-small-video-posts
                  :propSquareType="item && item.topicType"
                  listType="label"
                  :videoItem="item"
                  :propIndex="index"
                />
              </m-water-fall-item>
            </m-water-fall>
          </div>
        </template>
        <template v-if="labelListGetters.list.length && $route.query.topicType !== 'VIDEO'">
          <div class="list-item" v-for="(item, index) in labelListGetters.list" :key="item ? item.id + index: index" :id="item ? item.id: ''">
            <m-reading-posts
              v-if="item && item.topicType === 'ARTICLE'"
              listType="label"
              :propIndex="index"
              :imgSmall="item.coverImg"
              :item="item"
            />
            <m-video-posts
              v-else-if="item && item.topicType === 'MOVIE'"
              listType="label"
              :propIndex="index"
              :item="item"
            />
            <m-posts
              v-else
              listType="label"
              :propIndex="index"
              :commentList="item.comments"
              :courseType="item.courseType"
              :listItemData="item"
              :modifiedTime="item.createTime"
              :path="`/details/${pathType(item)}`"
              :propSquareType="item && item.topicType"
            />
          </div>
        </template>
        <template v-if="!labelListGetters.list.length && finished">
          <div class="label-blank-wrap">
            <img class="blank-img" :src="blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
          </div>
        </template>
      </van-list>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  title: '成长详情页',
  data () {
    return {
      waterFallComplete: false,
      loading: false,
      finished: false,
      finishedTxt: '没有更多了',
      blank: require('@/assets/icons/blank/have-no-homework.png'),
      menus: [
        { name: '全部', topicType: '' },
        { name: '成长', topicType: 'POST' },
        { name: '作业', topicType: 'HOMEWORK' },
        { name: '作品', topicType: 'WORKS' },
        { name: '动态', topicType: 'LIFE' },
        { name: '阅读', topicType: 'ARTICLE' },
        { name: '视频', topicType: 'MOVIE' },
        { name: '小视频', topicType: 'VIDEO' }
      ]
    }
  },
  computed: {
    ...mapGetters('label', [
      'labelListGetters',
      'labelCountGetters',
      'labelDataGetters'
    ])
  },
  watch: {
    'labelListGetters.status': function (newVal, oldVal) {
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
    'labelListGetters.list': function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  mounted () {
    if(!this.labelListGetters.list.length) {
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
  methods: {
    ...mapActions('label', [
      'appendLabelList'
    ]),
    completeEvent () {
      if (!this.waterFallComplete) {
        this.waterFallComplete = true
        this.loading = false
        document.documentElement.scrollTop = this.$store.state.video.scrollTop
      }
    },
    onLoad () {
      if (this.$route.query.topicType === 'VIDEO') {
        if (!this.waterFallComplete) return false
      }
      if (this.labelListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.labelListGetters.status === 'loading') return false
      const newPage = this.labelListGetters.pageInfo.pages + 1
      this.appendLabelList({
        id: this.$route.query.id,
        topicType: this.$route.query.topicType, 
        page: newPage
      })
    },
    pathType(item){
      switch (item.topicType) {
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
.label-navbar {
  background-image: url('~@/assets/icons/navbar/navbar-background-label.png');
  background-size: 100% 140px;
  height: 140px;
  width: 100%;
  padding: 0 16px;
  .label-navbar-back {
    height: 36px;
    width: 100%;
    img {
      margin-top: 12px;
      width: 24px;
      height: 24px;
    }
  }
  .label-navbar-title {
    margin-top: 8px;
    max-height: 50px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 18px;
    font-family: @dp-font-medium;
    font-weight: 500;
    color: #18252C;
    line-height: 25px;
  }
  .label-navbar-footer {
    margin-top: 8px;
    height: 20px;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #747C80;
    line-height: 20px;
    display: flex;
    &>:last-child {
      margin-left: 12px;
    }
  }
}

.list-item {
  margin-bottom: 12px;
}

.label-wrap {
  background-color: #f8f8f8;
  width: 100%;
  min-height: calc(100vh - 185px);
  padding-bottom: 65px;
}

.label-wrap-background {
  background-color: #ffffff;
}

.water-fall-warp {
  width: 100%;
  padding: 0 16px;
}

.label-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .blank-img {
    width: 240px;
    height: 126px;
    margin-top: 24px;
  }
  .blank-txt {
    margin-top: 12px;
    width: max-content;
    height: 20px;
    font-size: 14px;
    font-family: @dp-font-semibold;
    font-weight: 600;
    color: #8D8E8E;
    line-height: 20px;
  }
}
</style>