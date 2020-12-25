<template class="video-wrap">
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="publishVideoGetters.list.length">
      <m-video-posts v-for="(item, index) in publishVideoGetters.list" :key="index" :item="item"/>
    </template>
    <template v-if="!publishVideoGetters.list.length && finished">
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
  name:'Video',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    blank: require('@/assets/icons/blank/have-no-video.png'),
    currentPage: 1
  }),
  computed: {
    ...mapGetters('user', [
      'publishVideoGetters'
    ])
  },
  destroyed () {
    this.clearPublishVideo()
  },
   watch: {
    'publishVideoGetters.status': function (newVal, oldVal) {
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
    'publishVideoGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  mounted() {
    if (this.$route.query.userId && this.publishVideoGetters.list.length === 0) {
      this.appendPublishVideo({
          userId: this.$route.query.userId,
          page: this.currentPage,
          size: 10
      })
    }
  },
  methods:{
    ...mapActions('user', [
      'appendPublishVideo'
    ]),
    ...mapMutations('user', [
      'clearPublishVideo'
    ]),
    onLoad() {
      if (this.publishVideoGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.publishVideoGetters.status === 'loading') return false
      const newPage = this.publishVideoGetters.pageInfo.pages + 1
      this.appendPublishVideo({
        userId: this.$route.query.userId,
        page: newPage,
        size: 10
      })
    }
  }
}
</script>

<style lang="less" scoped>

/deep/.video-posts-wrap:not(:first-child) {
  border-top: 12px solid #F7FAF8;
}

.video-wrap {
  position: relative;
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