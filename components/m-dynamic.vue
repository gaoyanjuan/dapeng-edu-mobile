<template>
  <div>
    <!-- Swiper -->
    <m-swipe />
    
    <!-- 二级菜单 -->
    <m-menus menus-type="type" :menus="menus" :automatic="true"/>

    <section class="works-wrap">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <template v-if="$route.query.type === 'hot'">
          <m-posts 
            v-for="(item, index) in hotDynamicListGetters.list"
            :key="index"
            :dataType="item.type"
            :imgInfo="item.imgSmall"
            :user="item.user"
            :activity="item.activity"
            :content="item.content"
            :listItemData="item"
            :isAttention="item.isAttention"
            :modifiedTime="item.createTime"
            path="/details/dynamic-page-details"
            squareType="动态"
          />
        </template>
        <template v-else-if="$route.query.type === 'new'">
          <m-posts 
            v-for="(item, index) in newDynamicListGetters.list"
            :key="index"
            :dataType="item.type"
            :imgInfo="item.imgSmall"
            :user="item.user"
            :activity="item.activity"
            :content="item.content"
            :listItemData="item"
            :isAttention="item.isAttention"
            :modifiedTime="item.createTime"
            path="/details/dynamic-page-details"
            squareType="动态"
          />
        </template>
        <template v-else>
          <m-posts 
            v-for="(item, index) in hotDynamicListGetters.list"
            :key="index"
            :dataType="item.type"
            :imgInfo="item.imgSmall"
            :user="item.user"
            :activity="item.activity"
            :content="item.content"
            :listItemData="item"
            :isAttention="item.isAttention"
            :modifiedTime="item.createTime"
            path="/details/dynamic-page-details"
            squareType="动态"
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
      this.appendHotDynamicList({
        page: newPage
      })
    },
    getMoreNewData () {
      if (this.newDynamicListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.newDynamicListGetters.status === 'loading') return false
      const newPage = this.newDynamicListGetters.page + 1
      this.appendNewDynamicList({
        page: newPage
      })
    }
  },
  computed: {
    ...mapGetters('dynamic', [
      'newDynamicListGetters',
      'hotDynamicListGetters'
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
