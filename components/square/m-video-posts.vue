<template>
  <div class="video-posts-wrap" @click="toDetail" v-if="item">

    <div class="video-posts-cover"  >
      <div class="video-posts-content" >
        {{ item.title }}
      </div>
      <img v-if="item.video && item.video.cover" class="video-cover" v-lazy="item.video.cover" />
      <img v-else class="video-cover" v-lazy="cover" alt="" />
      <img class="video-play" :src="playBtn" alt="" />
      <span class="video-duration"> {{ item.video.duration }} </span>
    </div>

    <!-- Body Block -->
    <div class="video-posts-box">
      <m-posts-class
        :remark="item.college && item.college.name ? `视频·${ item.college.name.replace(/学院/, '') }` : '视频'"
        :labels="item.labels"
      />
    </div>

    <div class="video-posts-info">
      <div>
        <span>{{ nickname}}</span>
        <span>{{ item.createTime | commonDate }}</span>
      </div>
      <div>
        <span>{{ item.commentCount | studentsCount }}评论</span>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name:'M-Video-Posts',
  props:{
    listType: {
      type: String,
      default: ''
    },
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
  computed:{
    nickname () {
      if (this.item &&  this.item.user && this.item.user.nickname) {
        return this.item.user.nickname
      } else {
        return '佚名'
      }
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

    toDetail() {
      this.$cookiz.remove('isLogin')
      
      this.$store.commit('changeListData', {
        listType: this.listType,
        propIndex: this.propIndex,
        anchorId: this.item.id
      })
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
  height: 289px;
  padding: 16px;
  background-color: @dp-white;
}

.video-posts-wrap:not(:first-child) {
  margin-top: 12px;
}

// -- text style --
.video-posts-wrap .video-posts-content {
  position: absolute;
  top: 6px;
  max-height: 48px;
  min-height: 24px;
  width: 100%;
  padding: 0 12px;
  font-size: 16px;
  font-family: @medium;
  font-weight: 500;
  color: #FFFFFF;
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
  position: relative;
  overflow: hidden;
  cursor: pointer;
  position: relative;

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
    top: 67px;
    left: 50%;
    transform: translate(-50%, 0);
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
.video-posts-wrap .video-posts-box {
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  margin-top: 12px;
}

.video-posts-wrap .video-posts-info {
  margin-top: 12px;
  height: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 16px;
  :nth-child(1) {
    margin-left: 2px;
    :nth-child(2) {
      margin-left: 8px;
    }
  }
}

</style>