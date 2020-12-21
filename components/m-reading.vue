<template>
  <div>
    <!-- Swiper -->
    <m-swipe :banner="articleBannerListGetters"/>

    <!-- 二级菜单 -->
    <m-menus menus-type="college" :menus="readingCollegesGetters" />

    <section class="works-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="readingListGetters.list.length">
          <m-reading-posts v-for="(item, i) in readingListGetters.list" :id="item ? item.id: ''" :propIndex="i" :key="i" :item="item" />
        </template>
      </van-list>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Reading',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    finishedTxt: '没有更多了',
  }),
  computed:{
    ...mapGetters('banner', [
      'articleBannerListGetters'
    ]),
    ...mapGetters('colleges', [
      'readingCollegesGetters'
    ]),
    ...mapGetters('reading', [
      'readingListGetters'
    ])
  },
  watch: {
    'readingListGetters.status': function (newVal, oldVal) {
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
    'readingListGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$store.state.anchorId) {
        const element = document.getElementById(this.$store.state.anchorId)
        if (element)
        element.scrollIntoView({
          behavior: 'auto'
        })
      }
    })
  },
  methods:{
    ...mapActions('reading', [
      'appendReadingList'
    ]),
    onLoad() {
      if (this.readingListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.readingListGetters.status === 'loading') return false
      const newPage = this.readingListGetters.pageInfo.pages + 1
      this.appendReadingList({
        categoryIds: this.$route.query.college,
        page: newPage
      })
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
</style>
