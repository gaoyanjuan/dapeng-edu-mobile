<template class="dynamic-wrap">
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="publishDynamicGetters.list.length">
      <m-posts
        v-for="(res, index) in publishDynamicGetters.list"
        :key="index"
        :courseType="res.courseType"
        :modifiedTime="res.lastModifiedTime"
        :listItemData="res"
        :path="navRoute"
        :pageName="pageName"
        propSquareType="LIFE"
        :propIndex="index"
      />
    </template>
    <template v-if="!publishDynamicGetters.list.length && finished">
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
  name:'Dynamic',
  data: () => ({
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    navRoute:'/details/dynamic',
    blank: require('@/assets/icons/blank/have-no-dynamic.png'),
    pageName: 'myDynamic',
    currentPage: 1
  }),
  computed: {
    ...mapGetters('user', [
      'publishDynamicGetters',
    ])
  },
  mounted() {
    if (this.$route.query.userId && this.publishDynamicGetters.list.length === 0) {
      this.appendPublishDynamic({
        userId: this.$route.query.userId,
        page: this.currentPage,
        size: 10
      })
    }
  },
  watch: {
    'publishDynamicGetters.status': function (newVal, oldVal) {
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
    'publishDynamicGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  methods:{
    ...mapActions('user', [
      'appendPublishDynamic',
    ]),
    ...mapMutations('user', [
      'clearPublishDynamic',
    ]),
    onLoad() {
      if (this.publishDynamicGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.publishDynamicGetters.status === 'loading') return false
      const newPage = this.publishDynamicGetters.pageInfo.pages + 1
      this.appendPublishDynamic({
        userId: this.$route.query.userId,
        page: newPage,
        size: 10
      })
    }
  },
  destroyed() {
    this.clearPublishDynamic()
  },
}
</script>

<style lang="less" scoped>
 

.dynamic-wrap {
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