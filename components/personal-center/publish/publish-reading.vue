<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="publishReadingGetters.list.length">
      <div class="reading-wrap">
        <m-reading-posts
          v-for="(item, index) in publishReadingGetters.list"
          :key="index"
          :item="item"
          :imgSmall="item.coverImgSmall"
          :showPersonal="showPersonal"
        />
      </div>
    </template>
    <template v-if="!publishReadingGetters.list.length && finished">
      <div class="have-no-posts-wrap">
        <img class="icon" :src="blank" alt="" />
        <div class="txt">暂无内容</div>
      </div>
    </template>
  </van-list>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'Reading',
   props: {
    // 是否是我的个人主页
    showPersonal: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    blank: require('@/assets/icons/blank/have-no-reading.png'),
    currentPage: 1
  }),
  computed: {
    ...mapGetters('user', [
      'publishReadingGetters'
    ])
  },
  destroyed () {
    this.clearPublishReading()
  },
  watch: {
    'publishReadingGetters.status': function (newVal, oldVal) {
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
    'publishReadingGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  mounted() {
    if (this.$route.query.userId && this.publishReadingGetters.list.length === 0) {
      this.appendPublishReading({
          userId: this.$route.query.userId,
          page: this.currentPage,
          size: 10
      })
    }
  },
  methods:{
    ...mapActions('user', [
      'appendPublishReading',
    ]),
    ...mapMutations('user', [
      'clearPublishReading',
    ]),
    onLoad() {
      if (this.publishReadingGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.publishReadingGetters.status === 'loading') return false
      const newPage = this.publishReadingGetters.pageInfo.pages + 1
      this.appendPublishReading({
        userId: this.$route.query.userId,
        page: newPage,
        size: 10
      })
    }
  }
}
</script>

<style lang="less" scoped>

.reading-wrap {
  position: relative;
  background-color: #f5f5f5;
}

.have-no-posts-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50%;
  transform: translateY(-50%);

  & .icon {
    width: 240px;
    height: 126px;
  }

  & .txt {
    font-size: 14px;
    font-weight: 600;
    color: #8D8E8E;
    margin-top: 12px;
  }
}
</style>