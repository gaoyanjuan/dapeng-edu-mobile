<template>
  <div class="video-posts-wrap">

    <nuxt-link tag="div" class="video-posts-content" :to="`/details/video?id=${item.id}`">
      {{ item.title }}
    </nuxt-link>

    <nuxt-link tag="div" class="video-posts-cover" :to="`/details/video?id=${item.id}`">
      <img v-if="item.video && item.video.cover" class="video-cover" v-lazy="item.video.cover" />
      <img v-else class="video-cover" v-lazy="cover" alt="" />
      <img class="video-play" :src="playBtn" alt="" />
      <span class="video-duration"> {{ item.video.duration }} </span>
    </nuxt-link>

    <div class="video-posts-info">
      <div class="video-posts-label">视频·{{ item.college.name.replace(/学院/, '') }}</div>
      <span class="video-posts-nickname">{{ item.user.nickname }}</span>
      <span class="video-posts-date">{{ item.createTime | commonDate }}</span>
    </div>

    <div class="video-posts-interaction">
      <div class="video-posts-comment" @click="toDetail">
        <img :src="comment" alt="" />
        <span>{{ item.commentCount | studentsCount }}</span>
      </div>
      <div class="video-posts-like" @click="onLove">
        <img :src="isPraise ? like : unLike" alt="" />
        <span>{{ praiseCount | studentsCount}}</span>
      </div>
      <div class="video-posts-star" @click="onCollect">
        <img :src="isCollection ? unStar : star" alt="star" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name:'M-Video-Posts',
  props:{
    item:{
      type:Object,
      default: {}
    },
    pageName: {
      type: String,
      default: ''
    },
    propIndex:{
      type: Number,
      default: 0
    }
  },
  data: () => ({
    loading: true,
    isPraise: false,
    isCollection: false,
    praiseCount: 0,
    star:require('@/assets/icons/posts/posts-star.png'),
    like:require('@/assets/icons/posts/posts-unlove.png'),
    unLike: require('@/assets/icons/posts/posts-love.png'),
    unStar: require('@/assets/icons/posts/posts-unstar.png'),
    comment:require('@/assets/icons/posts/posts-comment.png'),
    cover:require('@/assets/icons/common/photos-bg.png'),
    playBtn:require('@/assets/icons/square/video-play-btn.png')
  }),
  created() {
    if (this.item) {
      this.praiseCount = this.item.praiseCount
      this.isPraise = this.item.isPraise
      this.isCollection = this.item.isCollection
    }
  },
  watch: {
    'item': function (newVal, oldVal) {
      this.praiseCount = newVal.praiseCount
      this.isPraise = newVal.isPraise
      this.isCollection = newVal.isCollection
    },
  },
  mounted(){
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods:{
    ...mapActions({
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike',
      queryCollection: 'comment/queryCollection',
      queryDeleteCollection: 'comment/queryDeleteCollection',
    }),
    ...mapMutations('user', [
      'deleteUserLikes',
      'deleteUserFavorites'
    ]),

    onComment() {},

    onLove() {
      if(!this.$login()) {
        return 
      }
      if (this.isPraise) {
        this.isPraise = false
        this.praiseCount -= 1
        this.queryUnLike({
          id: this.item.id,
          type: 'MOVIE'
        }).then(()=>{
          if (this.pageName === 'userLike') {
            let payload = {
              type: 'MOVIE',
              index: this.propIndex
            }
            this.deleteUserLikes(payload)
          }
        })
      } else {
        this.isPraise = true
        this.praiseCount += 1
        this.queryLike({
          id: this.item.id,
          type: 'MOVIE',
          createdId: this.item.user.userId,
          contentType: 'VIDEO'
        })
      }
    },

    onCollect() {
      if(!this.$login()) {
        return 
      }
      if (this.isCollection) {
        this.isCollection = false
        this.queryDeleteCollection({
          id: this.item.id,
          type: 'MOVIE'
        }).then(()=>{
           if (this.pageName === 'userCollection') {
            let payload = {
              type: 'MOVIE',
              index: this.propIndex
            }
            this.deleteUserFavorites(payload)
          }
        })

      } else {
        this.isCollection = true
        this.queryCollection({
          id: this.item.id,
          type: 'MOVIE',
          createdId: this.item.user.userId,
          contentType: 'VIDEO'
        })
      }
    },
    toDetail() {
      window.anchorId = this.listItemData.id
      this.$router.push({
        path: `/details/video?id=${this.item.id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>

.video-posts-wrap {
  width: 100%;
  height: 361px;
  padding: 16px;
  background-color: @dp-white;
}

.video-posts-wrap:not(:first-child) {
  margin-top: 12px;
}

// -- text style --
.video-posts-wrap .video-posts-content {
  max-height: 48px;
  min-height: 24px;
  font-size: 16px;
  font-family: @regular;
  font-weight: 400;
  color: #18252C;
  line-height: 24px;
  word-wrap: break-word;
  word-break: break-all;
  cursor: pointer;
  .text-ellipsis-with-two-line()
}

// -- video cover style --
.video-posts-wrap .video-posts-cover {
  width: 100%;
  height: 193px;
  border-radius: 4px;
  margin-top: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  .video-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  .video-play {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .video-duration {
    height: 20px;
    padding: 0 8px;
    background: #000000;
    border-radius: 10px;
    opacity: 0.6;

    font-size: 12px;
    font-family: @medium;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 20px;
    text-align: center;

    position: absolute;
    right: 12px;
    bottom: 8px;
  }
}

// video info style
.video-posts-wrap .video-posts-info {
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  margin-top: 12px;

  .video-posts-label {
    // width: 70px;
    // height: 24px;
    padding: 4px 8px;
    background: #F7F7F7;
    border-radius: 12px;
    margin-right: 8px;

    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #465156;
    // line-height: 24px;
    text-align: center;
    cursor: pointer;
  }

  .video-posts-nickname,
  .video-posts-date {
    max-width: 200px;
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #A3A8AB;
    line-height: 16px;
    margin-right: 8px;
    .text-ellipsis()
  }
}

// video interaction style
.video-posts-wrap .video-posts-interaction {
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;

  .video-posts-comment,
  .video-posts-like,
  .video-posts-star {
    min-width: 57px;
    height: 24px;
    display: flex;
    align-items: center;
    margin-right: 17px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }

    span {
      font-size: 12px;
      font-family: @medium;
      font-weight: 500;
      color: #747C80;
      line-height: 24px;
      margin-left: 4px;
    }
  }

  .video-posts-star {
    min-width: 24px;
    margin-right: 0;
  }
}
</style>