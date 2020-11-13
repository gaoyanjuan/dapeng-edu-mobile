<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="userLikesGetters.activity_post.list.length">
      <m-posts
        v-for="(res, index) in userLikesGetters.activity_post.list"
        :key="index"
        :dataType="res.type"
        :courseType="res.courseType"
        :user="res.user"
        :college="res.college"
        :recommendType="res.recommendType"
        :task="res.task"
        :content="res.content"
        :isAttention="res.isAttention"
        :modifiedTime="res.createTime"
        :listItemData="res"
        :path="navRoute"
        propSquareType="ACTIVITY_POST"
        :propIndex="index"
      />
    </template>
    <template v-if="!userLikesGetters.activity_post.list.length && finished">
      <div class="posts-blank-wrap">
        <img class="blank-icon" :src="growth_blank" alt="" />
        <span class="blank-txt">暂无内容～</span>
      </div>
    </template>
  </van-list>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'LikePosts',
  data: () => ({
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    navRoute:'/details/growth-page-details',
    growth_blank: require('@/assets/icons/blank/have-no-growth.png'),
    currentPage: 1
  }),
   mounted() {
    if (this.userLikesGetters.activity_post.list.length === 0) {
      this.appendUserLikes({
        type: 'ACTIVITY_POST',
        page: this.currentPage,
        size: 10
      })
    }
  },
  watch: {
    'userLikesGetters.activity_post.status': function (newVal, oldVal) {
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
    'userLikesGetters.activity_post.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  methods:{
    ...mapActions('user', [
      'appendUserLikes'
    ]),
    ...mapMutations('user', [
      'clearUserLikes'
    ]),
    onLoad() {
      if (this.userLikesGetters.activity_post.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.userLikesGetters.activity_post.status === 'loading') return false
      const newPage = this.currentPage + 1
      this.appendUserLikes({
        type: 'ACTIVITY_POST',
        page: newPage,
        size: 10
      })
    }
  },
  computed: {
    ...mapGetters('user', [
      'userLikesGetters'
    ])
  },
}
</script>

<style lang="less" scoped>
/deep/.m-works:not(:first-child) {
  border-top: 12px solid #F7FAF8;
}

.posts-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.posts-blank-wrap .blank-icon {
  width: 240px;
  height: 126px;
}

.posts-blank-wrap .blank-txt {
  margin-top: 12px;
  font-size: 14px;
  font-family: @semibold;
  font-weight: 600;
  color: #8D8E8E;
}
</style>