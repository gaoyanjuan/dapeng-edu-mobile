<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="pageName === 'userLike'">
      <template v-if="userLikesGetters.activity_post.list.length">
        <m-posts
          v-for="(res, index) in userLikesGetters.activity_post.list"
          :key="index"
          :courseType="res.courseType"
          :modifiedTime="res.createTime"
          :listItemData="res"
          :path="navRoute"
          propSquareType="ACTIVITY_POST"
          :propIndex="index"
          :pageName="pageName"
        />
      </template>
      <template v-if="!userLikesGetters.activity_post.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="growth_blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
          </div>
        </div>
      </template>
    </template>
    <template v-if="pageName === 'userCollection'">
      <template v-if="userFavoritesGetters.activity_post.list.length">
        <m-posts
          v-for="(res, index) in userFavoritesGetters.activity_post.list"
          :key="index"
          :courseType="res.courseType"
          :modifiedTime="res.createTime"
          :listItemData="res"
          :path="navRoute"
          propSquareType="ACTIVITY_POST"
          :propIndex="index"
          :pageName="pageName"
        />
      </template>
      <template v-if="!userFavoritesGetters.activity_post.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="growth_blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
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
    navRoute:'/details/growth',
    growth_blank: require('@/assets/icons/blank/have-no-growth.png'),
    currentPage: 1
  }),
   mounted() {
    if(this.pageName === 'userLike') {
      if (this.userLikesGetters.activity_post.list.length === 0) {
        this.appendUserLikes({
          type: 'ACTIVITY_POST',
          page: this.currentPage,
          size: 10
        })
      }
    }else if(this.pageName === 'userCollection') {
      if (this.userFavoritesGetters.activity_post.list.length === 0) {
        this.appendUserFavorites({
          type: 'ACTIVITY_POST',
          page: this.currentPage,
          size: 10
        })
      }
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
    },
    'userFavoritesGetters.activity_post.status': function (newVal, oldVal) {
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
    'userFavoritesGetters.activity_post.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    },
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
      if (this.pageName === 'userLike') {
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
      } else if(this.pageName === 'userCollection') {
        if (this.userFavoritesGetters.activity_post.status === 'over') {
          this.finished = true
          return false
        }
      
        if (this.userFavoritesGetters.activity_post.status === 'loading') return false
        const newPage = this.currentPage + 1
        this.appendUserFavorites({
          type: 'ACTIVITY_POST',
          page: newPage,
          size: 10
        })
      }
      
    }
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
/deep/.m-works:not(:first-child) {
  border-top: 12px solid #F7FAF8;
}

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