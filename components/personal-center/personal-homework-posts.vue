<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="pageName === 'userLike'">
      <template v-if="userLikesGetters.homework.list.length">
        <m-posts
          v-for="(res, index) in userLikesGetters.homework.list"
          :key="res ? res.id + index : index"
          :courseType="res.courseType"
          :modifiedTime="res.lastModifiedTime"
          :commentList="res.comments"
          :listItemData="res"
          :path="navRoute"
          propSquareType="HOMEWORK"
          :propIndex="index"
          :pageName="pageName"
        />
      </template>
      <template v-if="!userLikesGetters.homework.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="homework_Blank" alt="" />
            <span class="blank-txt">暂无喜欢作业</span>
          </div>
        </div>
      </template>
    </template>
    <template v-if="pageName === 'userCollection'">
      <template v-if="userFavoritesGetters.homework.list.length">
        <m-posts
          v-for="(res, index) in userFavoritesGetters.homework.list"
          :key="res ? res.id + index : index"
          :courseType="res.courseType"
          :modifiedTime="res.lastModifiedTime"
          :listItemData="res"
          :commentList="res.comments"
          :path="navRoute"
          propSquareType="HOMEWORK"
          :propIndex="index"
          :pageName="pageName"
        />
      </template>
      <template v-else-if="!userFavoritesGetters.homework.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="homework_Blank" alt="" />
            <span class="blank-txt">暂无收藏作业</span>
          </div>
        </div>
      </template>
    </template>
  </van-list>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'LikePosts',
  props: {
    pageName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    navRoute:'/details/homework',
    homework_Blank:require('@/assets/icons/blank/have-no-homework.png'),
    currentPage: 1,
  }),
  mounted() {
    if(this.pageName === 'userLike') {
      if (this.userLikesGetters.homework.list.length === 0) {
        this.appendUserLikes({
          type: 'HOMEWORK',
          page: this.currentPage,
          size: 10
        })
      }
    }else if(this.pageName === 'userCollection') {
      if (this.userFavoritesGetters.homework.list.length === 0) {
        this.appendUserFavorites({
          type: 'HOMEWORK',
          page: this.currentPage,
          size: 10
        })
      }
    }
    

  },
  watch: {
    'userLikesGetters.homework.status': function (newVal, oldVal) {
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
    'userLikesGetters.homework.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    },
    'userFavoritesGetters.homework.status': function (newVal, oldVal) {
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
    'userFavoritesGetters.homework.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  methods:{
    ...mapActions('user', [
      'appendUserLikes',
      'appendUserFavorites'
    ]),
    ...mapMutations('user', [
      'clearUserLikes'
    ]),
    onLoad() {
      if(this.pageName === 'userLike') {
        if (this.userLikesGetters.homework.status === 'over') {
          this.finished = true
          return false
        }
      
        if (this.userLikesGetters.homework.status === 'loading') return false
        const newPage = this.userLikesGetters.homework.pageInfo.pages + 1
        this.appendUserLikes({
          type: 'HOMEWORK',
          page: newPage,
          size: 10
        })
      }else if(this.pageName === 'userCollection') {
        if (this.userFavoritesGetters.homework.status === 'over') {
          this.finished = true
          return false
        }
      
        if (this.userFavoritesGetters.homework.status === 'loading') return false
        const newPage = this.userFavoritesGetters.homework.pageInfo.pages + 1
        this.appendUserFavorites({
          type: 'HOMEWORK',
          page: newPage,
          size: 10
        })
      }
      
    },
  },
  computed: {
    ...mapGetters('user', [
      'userLikesGetters',
      'userFavoritesGetters'
    ])
  },
}
</script>

<style lang="less" scoped>


.blank-box .posts-blank-wrap {
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