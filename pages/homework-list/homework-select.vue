<template>
  <div class="homework-select-page">
    <m-navbar :title="navTitle" />

    <van-tabs  v-if="courseType === 'VIP'" v-model="active" sticky @click="onTabsClick" animated :swipe-threshold="3" :ellipsis="false">
      <van-tab v-for="(item, index) in stageList" :key="index" >
        
        <template #title>
          <div class="van-title-wrap">
              <div class="van-title-content">20182222</div>
              <img class="recommend-image" :src="recommendImg" />
          </div>
        </template>

        <section class="homework-info-wrap" :style="{ paddingTop: `2.34rem` }">
          <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
            <homework-course-chapter v-for="(item, index) in list" :key="index" :isVideo="index % 2 === 0"></homework-course-chapter>
          </van-list>
        </section>

      </van-tab>
    </van-tabs>

    <section class="homework-info-wrap" v-if="courseType === 'TEST'" :style="{ paddingTop: `1.17rem` }" >
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
        <homework-course-chapter v-for="(item, index) in list" :key="index" :isVideo="index % 2 === 0"></homework-course-chapter>
      </van-list>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Homework-Select',
  layout: 'navbar',
  data() {
    return {
      stageList: [1,2,3],
      list: [],
      loading: false,
      finished: false,
      finishedText: '没有更多了',
      active: 0,
      recommendImg: require('@/assets/icons/homework/recommend-homework.png'),
      courseType: 'TEST',
      navTitle: ''
    }
  },
  created() {
    if (this.$route.query.courseType) {
      this.courseType = this.$route.query.courseType
    }
    this.navTitle = '这里是动态标题'
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          this.list.push(i)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 15) {
          this.finished = true
        }
        if (this.list.length === 0) {
          this.finished = true
          this.finishedText = ''
        }
      }, 1000)
    },
    onTabsClick() {}
  }
}
</script>
<style lang="less" scoped>
.homework-select-page {
  .homework-info-wrap {
    margin-left: 16px;
  }
  .van-title-wrap {
    .van-title-content {
      max-width: 65px;
      .text-ellipsis()
    }
    .recommend-image {
    position: absolute;
    right: 2px;
    top: 0px;
    width: 36px;
    height: 27px;
  }
  }
  /deep/.van-tabs {
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #747c80;
    line-height: 20px;
  }
  /deep/.van-tab {
    flex: 0;
    padding: 0 16px;
  }
  /deep/.van-tab--active {
    font-size: 14px;
    font-family: @dp-font-medium;
    font-weight: 600;
    color: #00b93b;
    animation: 0.5s appear;
  }
  /deep/.van-tabs__line {
    width: 64px;
    height: 4px;
    bottom: 15px;
    background: #0cb65b;
    border-radius: 2px;
    background-image: none;
  }
  /deep/.van-tabs__wrap {
    height: 48px;
  }
  /deep/.van-tab {
    padding-top: 8px;
  }
  /deep/.van-sticky {
    position: fixed;
    width: 10rem;
    top: 44px;
    z-index: 99;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
  }
  /deep/.van-sticky--fixed {
    top: 44px;
  }
}
</style>
