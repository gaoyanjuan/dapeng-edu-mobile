<template class="works-wrap">
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="publishWorksGetters.list.length">
      <m-posts
        v-for="(res, index) in publishWorksGetters.list"
        :key="res ? res.id + index : index"
        :courseType="res.courseType"
        :modifiedTime="res.createTime"
        :listItemData="res"
        :path="navRoute"
        :pageName="pageName"
        propSquareType="WORKS"
        :propIndex="index"
      />
    </template>
    <template v-if="!publishWorksGetters.list.length && finished">
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
  name:'Works',
  data: () => ({
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    navRoute:'/details/works',
    blank: require('@/assets/icons/blank/have-no-works.png'),
    pageName: 'myWork',
    currentPage: 1
  }),
  mounted() {
    if (this.$route.query.userId && this.publishWorksGetters.list.length === 0) {
      this.appendPublishWorks({
        userId: this.$route.query.userId,
        page: this.currentPage,
        size: 10
      })
    }
  },
  watch: {
    'publishWorksGetters.status': function (newVal, oldVal) {
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
    'publishWorksGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  methods:{
     ...mapActions('user', [
      'appendPublishWorks',
    ]),
    ...mapMutations('user', [
      'clearPublishWorks',
    ]),
     onLoad() {
      if (this.publishWorksGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.publishWorksGetters.status === 'loading') return false
      const newPage = this.publishWorksGetters.pageInfo.pages + 1
      this.appendPublishWorks({
        userId: this.$route.query.userId,
        page: newPage,
        size: 10
      })
    }
  },
  computed: {
    ...mapGetters('user', [
      'publishWorksGetters'
    ])
  },
  destroyed () {
    this.clearPublishWorks()
  },
}
</script>

<style lang="less" scoped>

.works-wrap {
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