<template>
  <div>
    <!-- Swiper -->
    <m-swipe />
    
    <!-- 二级菜单 -->
    <m-menus menus-type="type" :menus="menus"/>

    <section class="works-wrap">
      <van-list
        v-model="loading"
        :finished="finished"
        loading-text="正在努力加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <m-posts
          v-for="(item, index) in growthListGetters.list"
          :key="index"
          :dataType="item.contentType"
          :imgInfo="item.content.imgSmall"
          :user="item.user"
          :activity="item.activityBaseDto"
          :content="item.content.text"
          :listItemData="item"
          :modifiedTime="item.createTime"
          path="/details/growth-page-details"
          squareType="成长"
        />
      </van-list>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Growth',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    menus:[{id:'HOTTEST',name:'最热'},{id:'NEWEST',name:'最新'}]
  }),
  watch: {
    'growthListGetters.status': function (newVal, oldVal) {
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
    ...mapActions('growth', [
      'appendGrowthList'
    ]),
    onLoad() {
      if (this.growthListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.growthListGetters.status === 'loading') return false
      const newPage = this.growthListGetters.pageInfo.pages + 1
      let type
      if (this.$route.query.type) {
        type = this.$route.query.type
      } else {
        type = this.menus[0].id
      }
      this.appendGrowthList({
        type,
        page: newPage
      })
    }
  },
  computed: {
    ...mapGetters('growth', [
      'growthListGetters'
    ])
  }
}
</script>

<style lang="less" scoped>
.works-wrap {
  width: 100%;
  min-height: calc(100vh - 133px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}
</style>
