<template>
  <div>
    <!-- Swiper -->
    <m-swipe :banner="lifeBannerListGetters"/>

    <!-- 话题 -->
    <!-- <transition name="component-fade" mode="out-in">
      <m-topic-card v-if="showTopic" :topic="dynamicGetters" channel="LIFE"/>
    </transition> -->
    
    <!-- 二级菜单 -->
    <m-menus menus-type="type" :menus="menus" :automatic="true"/>

    <section class="works-wrap">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <template v-if="$route.query.type === 'hot'">
          <m-posts 
            v-for="(item, index) in hotDynamicListGetters.list"
            :id="item ? item.id: ''"
            :key="item ? item.id + index: index"
            listType="dynamic-hot"
            :propIndex="index"
            :listItemData="item"
            :modifiedTime="item.createTime"
            path="/details/dynamic"
            propSquareType="LIFE"
          />
        </template>
        <template v-else-if="$route.query.type === 'new'">
          <m-posts 
            v-for="(item, index) in newDynamicListGetters.list"
            :id="item ? item.id: ''"
            :key="item ? item.id + index: index"
            listType="dynamic-new"
            :propIndex="index"
            :listItemData="item"
            :modifiedTime="item.createTime"
            path="/details/dynamic"
            propSquareType="LIFE"
          />
        </template>
        <template v-else>
          <m-posts 
            v-for="(item, index) in hotDynamicListGetters.list"
            :id="item ? item.id: ''"
            :key="item ? item.id + index: index"
            listType="dynamic-hot"
            :propIndex="index"
            :listItemData="item"
            :modifiedTime="item.createTime"
            path="/details/dynamic"
            propSquareType="LIFE"
          />
        </template>
      </van-list>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Dynamic',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    menus:[{id:'hot',name:'最热'},{id:'new',name:'最新'}]
  }),
  watch: {
    'hotDynamicListGetters.status': function (newVal, oldVal) {
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
    'newDynamicListGetters.status': function (newVal, oldVal) {
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
    ...mapActions('dynamic', [
      'appendNewDynamicList',
      'appendHotDynamicList'
    ]),
    onLoad() {
      if (this.$route.query.type === 'hot') {
        this.getMoreHotData()
      } else if (this.$route.query.type === 'new') {
        this.getMoreNewData()
      } else {
        this.getMoreHotData()
      }
    },
    getMoreHotData () {
      if (this.hotDynamicListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.hotDynamicListGetters.status === 'loading') return false
      const newPage = this.hotDynamicListGetters.page + 1
      this.appendHotDynamicList({ page: newPage })
      this._squareLoading({
        page_area: '动态',
        page_area_sec: '',
        request_type: '手动上拉刷新'
      })
    },
    getMoreNewData () {
      if (this.newDynamicListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.newDynamicListGetters.status === 'loading') return false
      const newPage = this.newDynamicListGetters.page + 1
      this.appendNewDynamicList({ page: newPage })
      // this._squareLoading({ 
      //   page_area: '动态',
      //   page_area_sec: '',
      //   request_type: '手动上拉刷新'
      // })
    }
  },
  computed: {
    ...mapGetters('banner', [
      'lifeBannerListGetters'
    ]),
    ...mapGetters('dynamic', [
      'newDynamicListGetters',
      'hotDynamicListGetters'
    ]),
    // ...mapGetters('topic', [
    //   'dynamicGetters'
    // ]),
    // showTopic() {
    //   return this.dynamicGetters.list.length > 0
    // }
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

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
