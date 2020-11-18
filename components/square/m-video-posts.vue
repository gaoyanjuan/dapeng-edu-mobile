<template>
  <van-skeleton title :row="8" :loading="loading">
    <div class="video-posts-wrap">

      <nuxt-link tag="div" class="video-posts-content" to="/details/video-page-details?type=long">
        {{ item.title }}
      </nuxt-link>

      <nuxt-link tag="div" class="video-posts-cover" to="/details/video-page-details?type=long">
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
        <div class="video-posts-comment">
          <img :src="comment" alt="" />
          <span>{{ item.commentCount | studentsCount }}</span>
        </div>
        <div class="video-posts-like">
          <img :src="item.isPraise ? like : unLike" alt="" />
          <span>{{ item.praiseCount | studentsCount}}</span>
        </div>
        <div class="video-posts-star">
          <img :src="item.isCollection ? unStar : star" alt="star" />
        </div>
      </div>
    </div>
  </van-skeleton>
</template>

<script>
export default {
  name:'M-Video-Posts',
  props:{
    item:{
      type:Object,
      default: {}
    }
  },
  data: () => ({
    loading: true,
    star:require('@/assets/icons/posts/posts-star.png'),
    like:require('@/assets/icons/posts/posts-unlove.png'),
    unLike: require('@/assets/icons/posts/posts-love.png'),
    unStar: require('@/assets/icons/posts/posts-unstar.png'),
    comment:require('@/assets/icons/posts/posts-comment.png'),
    cover:require('@/assets/icons/common/photos-bg.png'),
    playBtn:require('@/assets/icons/square/video-play-btn.png')
  }),
  mounted(){
    setTimeout(() => {
      this.loading = false
    }, 500)
  }
}
</script>

<style lang="less" scoped>

.van-skeleton {
  padding-top: 20px;
}

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