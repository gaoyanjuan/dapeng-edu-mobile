<template class="homework-wrap">
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="publishHomeworkGetters.list.length">
      <m-posts
        v-for="(res, index) in publishHomeworkGetters.list"
        :key="index"
        :commentList="res.comments"
        :courseType="res.courseType"
        :modifiedTime="res.lastModifiedTime"
        :listItemData="res"
        :path="navRoute"
        :pageName="pageName"
        propSquareType="HOMEWORK"
        :propIndex="index"
      />
    </template>
    <template v-if="!publishHomeworkGetters.list.length && finished">
      <div class="have-no-posts-wrap">
        <img class="icon" :src="blank" alt="" />
        <span class="txt">暂无内容</span>
      </div>
    </template>
  </van-list>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'Homework',
  data: () => ({
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    navRoute:'/details/homework',
    blank: require('@/assets/icons/blank/have-no-homework.png'),
    pageName: 'myHomework',
    currentPage: 1
  }),
  mounted() {
    if (this.$route.query.userId && this.publishHomeworkGetters.list.length === 0) {
      this.appendPublishHomework({
          userId: this.$route.query.userId,
          page: this.currentPage,
          size: 10
      })
    }
  },
  watch: {
    'publishHomeworkGetters.status': function (newVal, oldVal) {
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
    'publishHomeworkGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  methods:{
     ...mapActions('user', [
      'appendPublishHomework'
    ]),
    ...mapMutations('user', [
      'clearPublishHomework'
    ]),
     onLoad() {
      if (this.publishHomeworkGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.publishHomeworkGetters.status === 'loading') return false
      const newPage = this.currentPage + 1
      this.appendPublishHomework({
        userId: this.$route.query.userId,
        page: newPage,
        size: 10
      })
    }
  },
   computed: {
    ...mapGetters('user', [
      'publishHomeworkGetters'
    ])
  },
  destroyed () {
    this.clearPublishHomework()
  },
}
</script>

<style lang="less" scoped>
/deep/.m-works:not(:first-child) {
  border-top: 12px solid #F7FAF8;
}


.homework-wrap {
  position: relative;
}


.have-no-posts-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

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