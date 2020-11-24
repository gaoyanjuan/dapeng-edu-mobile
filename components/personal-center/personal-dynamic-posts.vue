<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="pageName === 'userLike'">
      <template v-if="userLikesGetters.life.list.length">
        <m-posts
          v-for="(res, index) in userLikesGetters.life.list"
          :key="index"
          :courseType="res.courseType"
          :modifiedTime="res.createTime"
          :listItemData="res"
          :path="navRoute"
          propSquareType="LIFE"
          :propIndex="index"
          :pageName="pageName"
        />
      </template>
      <template v-if="!userLikesGetters.life.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="dynamic_Blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
          </div>
        </div>
      </template>
    </template>
    <template v-if="pageName === 'userCollection'">
      <template v-if="userFavoritesGetters.life.list.length">
        <m-posts
          v-for="(res, index) in userFavoritesGetters.life.list"
          :key="index"
          :courseType="res.courseType"
          :modifiedTime="res.createTime"
          :listItemData="res"
          :path="navRoute"
          propSquareType="LIFE"
          :propIndex="index"
          :pageName="pageName"
        />
      </template>
      <template v-if="!userFavoritesGetters.life.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="dynamic_Blank" alt="" />
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
    navRoute:'/details/dynamic',
    dynamic_Blank: require('@/assets/icons/blank/have-no-dynamic.png'),
    currentPage: 1
  }),
   mounted() {
    if(this.pageName === 'userLike') {
      if (this.userLikesGetters.life.list.length === 0) {
        this.appendUserLikes({
          type: 'LIFE',
          page: this.currentPage,
          size: 10
        })
      }
    }else if(this.pageName === 'userCollection') {
      if (this.userFavoritesGetters.life.list.length === 0) {
        this.appendUserFavorites({
          type: 'LIFE',
          page: this.currentPage,
          size: 10
        })
      }
    }
    
  },
  watch: {
    'userLikesGetters.life.status': function (newVal, oldVal) {
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
    'userLikesGetters.life.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    },
    'userFavoritesGetters.life.status': function (newVal, oldVal) {
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
    'userFavoritesGetters.life.list':function (newVal, oldVal) {
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
        if (this.userLikesGetters.life.status === 'over') {
        this.finished = true
        return false
        }
      
        if (this.userLikesGetters.life.status === 'loading') return false
        const newPage = this.currentPage + 1
        this.appendUserLikes({
          type: 'LIFE',
          page: newPage,
          size: 10
        })
      }else if(this.pageName === 'userCollection') {
        if (this.userFavoritesGetters.life.status === 'over') {
        this.finished = true
        return false
        }
      
        if (this.userFavoritesGetters.life.status === 'loading') return false
        const newPage = this.currentPage + 1
        this.appendUserFavorites({
          type: 'LIFE',
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