<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <template v-if="pageName === 'userLike'">
      <template v-if="userLikesGetters.article.list.length">
        <m-reading-posts v-for="(item, index) in userLikesGetters.article.list" :key="index" :item="item" :pageName="pageName" :propIndex="index" />
      </template>
      <template v-if="!userLikesGetters.article.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="blank" alt="" />
            <span class="blank-txt">暂无喜欢阅读</span>
          </div>
        </div>
      </template>
    </template>
    <template v-if="pageName === 'userCollection'">
      <template v-if="userFavoritesGetters.article.list.length">
        <m-reading-posts v-for="(item, index) in userFavoritesGetters.article.list" :key="index" :item="item" :pageName="pageName" :propIndex="index" />
      </template>
      <template v-if="!userFavoritesGetters.article.list.length && finished">
        <div class="blank-box">
          <div class="posts-blank-wrap">
            <img class="blank-icon" :src="blank" alt="" />
            <span class="blank-txt">暂无收藏阅读</span>
          </div>
        </div>
      </template>
    </template>
  </van-list>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'LikeReadingPosts',
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
    blank: require('@/assets/icons/blank/have-no-reading.png'),
    currentPage: 1
  }),
  computed: {
    ...mapGetters('user', [
      'userLikesGetters',
      'userFavoritesGetters'
    ])
  },
   watch: {
    'userLikesGetters.article.status': function (newVal, oldVal) {
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
    'userLikesGetters.article.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    },
    'userFavoritesGetters.article.status': function (newVal, oldVal) {
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
    'userFavoritesGetters.article.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  mounted() {
    if(this.pageName === 'userLike') {
      if (this.userLikesGetters.article.list.length === 0) {
        this.appendUserLikes({
          type: 'ARTICLE',
          page: this.currentPage,
          size: 10
        })
      }
    }else if(this.pageName === 'userCollection') {
      if (this.userFavoritesGetters.article.list.length === 0) {
        this.appendUserFavorites({
          type: 'ARTICLE',
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
        if (this.userLikesGetters.article.status === 'over') {
          this.finished = true
          return false
        }
      
        if (this.userLikesGetters.article.status === 'loading') return false
        const newPage = this.currentPage + 1
        this.appendUserLikes({
          type: 'ARTICLE',
          page: newPage,
          size: 10
        })
      }else if(this.pageName === 'userCollection') {
        if (this.userFavoritesGetters.article.status === 'over') {
          this.finished = true
          return false
        }
      
        if (this.userFavoritesGetters.article.status === 'loading') return false
        const newPage = this.currentPage + 1
        this.appendUserFavorites({
          type: 'ARTICLE',
          page: newPage,
          size: 10
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.m-reading:not(:first-child) {
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