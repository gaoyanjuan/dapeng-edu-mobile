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
        <template v-if="!readingListGetters.list.length && finished">
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
  name: 'M-Reading',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    finishedTxt: '没有更多了',
    blank:require('@/assets/icons/blank/have-no-reading.png')
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
        if (element) {
          element.scrollIntoView({
            behavior: 'auto'
          })
        }
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
  background-color: #f5f5f5;
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
</style>
