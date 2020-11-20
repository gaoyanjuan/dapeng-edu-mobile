<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="pageName === 'userLike'">
      <template v-if="userLikesGetters.movie.list.length">
        <m-video-posts v-for="(item, index) in userLikesGetters.movie.list" :key="index" :item="item" :pageName="pageName" :propIndex="index" />
      </template>
      <template v-if="!userLikesGetters.movie.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
          </div>
        </div>
      </template>
    </template>
    <template v-if="pageName === 'userCollection'">
      <template v-if="userFavoritesGetters.movie.list.length">
        <m-video-posts v-for="(item, index) in userFavoritesGetters.movie.list" :key="index" :item="item" :pageName="pageName" :propIndex="index" />
      </template>
      <template v-if="!userFavoritesGetters.movie.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="blank" alt="" />
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
  name:'LikeVideoPosts',
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
    blank: require('@/assets/icons/blank/have-no-video.png'),
    currentPage: 1
  }),
  computed: {
    ...mapGetters('user', [
      'userLikesGetters',
      'userFavoritesGetters'
    ])
  },
  watch: {
     'userLikesGetters.movie.status': function (newVal, oldVal) {
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
    'userLikesGetters.movie.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    },
    'userFavoritesGetters.movie.status': function (newVal, oldVal) {
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
    'userFavoritesGetters.movie.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  mounted() {
    if(this.pageName === 'userLike') {
      if (this.userLikesGetters.movie.list.length === 0) {
        this.appendUserLikes({
          type: 'MOVIE',
          page: this.currentPage,
          size: 10
        })
      }
    }else if(this.pageName === 'userCollection') {
      if (this.userFavoritesGetters.movie.list.length === 0) {
        this.appendUserFavorites({
          type: 'MOVIE',
          page: this.currentPage,
          size: 10
        })
      }
    }
  },
  methods:{
    ...mapActions('user', [
      'appendUserLikes',
      'appendUserFavorites'
    ]),
    onLoad() {
      if(this.pageName === 'userLike') {
        if (this.userLikesGetters.movie.status === 'over') {
          this.finished = true
          return false
        }
      
        if (this.userLikesGetters.movie.status === 'loading') return false
        const newPage = this.currentPage + 1
        this.appendUserLikes({
          type: 'MOVIE',
          page: newPage,
          size: 10
        })
      }else if(this.pageName === 'userCollection') {
        if (this.userFavoritesGetters.movie.status === 'over') {
          this.finished = true
          return false
        }
      
        if (this.userFavoritesGetters.movie.status === 'loading') return false
        const newPage = this.currentPage + 1
        this.appendUserFavorites({
          type: 'MOVIE',
          page: newPage,
          size: 10
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.video-posts-wrap:not(:first-child) {
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