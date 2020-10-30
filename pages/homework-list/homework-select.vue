<template>
  <div class="homework-select-page">
    <m-navbar title="UI设计行业试学精品课" />
    <van-tabs v-model="active" sticky :offset-top="44" @click="onTabsClick" animated>
      <van-tab v-for="(item, index) in stageList" :key="index">
        <template #title> 
        20180826
        <img class="recommend-image" :src="recommendImg">  
        </template>
        <section class="homework-info-wrap">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finishedText"
            @load="onLoad"
          >
            <homework-course-chapter
              v-for="(item, index) in list"
              :key="index"
            ></homework-course-chapter>
          </van-list>
        </section>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "Homework-Select",
  layout: "navbar",
  data() {
    return {
      stageList: [1,2,3],
      list: [],
      loading: false,
      finished: false,
      finishedText: "没有更多了",
      active: 0,
      recommendImg: require('@/assets/icons/homework/video-homework.png'),
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 2; i++) {
          this.list.push(i);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 5) {
          this.finished = true;
        }
        if (this.list.length === 0) {
          this.finished = true;
          this.finishedText = "";
        }
      }, 1000);
    },
    onTabsClick() {}
  }
};
</script>
<style lang="less" scoped>
.homework-select-page {
  .homework-info-wrap {
    padding-top: 44px;
    margin-left: 16px;
  }
  .recommend-image {
    position: absolute;
    right: 20px;
    top: 0px;
    width: 28px;
    height: 19px;
  }
  /deep/.van-tabs {
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #747C80;
    line-height: 20px;
  }
  /deep/.van-tab--active {
    font-size: 14px;
    font-family: @dp-font-medium;
    font-weight: 600;
    color: #00B93B;
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
}
</style>
