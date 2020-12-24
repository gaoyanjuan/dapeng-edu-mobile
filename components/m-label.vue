<template>
  <div>
    <div class="label-navbar">
      <div class="label-navbar-back">
        <img @click="back" src="@/assets/icons/navbar/nav-arrow-back.png" alt="">
      </div>
      <div class="label-navbar-title">
        {{ labelDataGetters && labelDataGetters.name }}
      </div>
      <div class="label-navbar-footer" v-if="labelCountGetters">
        <div>{{ labelCountGetters.participationCount | studentsCount }}参与</div><div>{{ labelCountGetters.browseCount | studentsCount }}人浏览</div>
      </div>
    </div>
    <!-- 二级菜单 -->
    <van-sticky class="the-menus">
      <m-label-menus :menus="menus" />
    </van-sticky>
    <section class="label-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="labelListGetters.list.length && $route.query.topicType === 'VIDEO'">
          <m-water-fall width="167px" gap="0" :data="labelListGetters.list" @complete="completeEvent">
            <m-water-fall-item v-for="(item, index) in labelListGetters.list" :key="index" :order="index">
              <m-small-video-posts :videoItem="item" :propIndex="index" />
            </m-water-fall-item>
          </m-water-fall>
        </template>
        <template v-if="labelListGetters.list.length && $route.query.topicType !== 'VIDEO'">
          <div v-for="(item, index) in labelListGetters.list" :key="item ? item.id: ''" :id="item ? item.id: ''">
            <m-reading-posts
              v-if="item && item.topicType === 'ARTICLE'"
              listType="label"
              :propIndex="index"
              :item="item"
            />
            <m-posts
              v-else
              class="list-item"
              listType="label"
              :propIndex="index"
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
    onLoad () {
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
    back () {
      const route = 'personal-center-publish'
      const isLogin = this.$cookiz.get('isLogin')
      if (isLogin) {
        const isDetails = this.$isDetails(this.$route.name)
        this.$cookiz.set('isLogin', false, {
          path: '/'
        })
        if (isDetails) {
          this.$router.go(-4)
        } else {
          this.$router.go(-1)
        }
      } else if(this.$route.name === route) {
        this.$router.replace('/personal-center')
      } else {
        this.$router.go(-1)
      }
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