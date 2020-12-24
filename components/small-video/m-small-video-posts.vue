<template>
  <div class="small-video-wrapper" @click="toDetail">
    <img
      ref="coverImg"
      v-lazy="videoItem.coverImg"
      class="small-video-cover"
      :style="{ height: `${videoItem.height}px`}"
    />

    <div class="small-video-content van-multi-ellipsis--l3">
      {{ videoItem.content }}
    </div>

    <div class="small-video-info">
      <div class="info-left-side">
        <headImage
          :userId="videoItem.user ? videoItem.user.userId : 'disable'"
          :headImg="videoItem.user ? videoItem.user.avatar : ''"
          imgWidth="24px"
          imgHeight="24px"
        />
        <span @click.stop="toPersonalCenter">{{ videoItem.user ? (videoItem.user.nickname ? videoItem.user.nickname : videoItem.user.dpAccount) : '佚名' }}</span>
      </div>

      <div class="info-right-side" @click.stop="changeLike">
        <img class="icon-love" v-if="videoItem.isPraise" src="@/assets/icons/posts/small-unlove.png" alt="">
        <img class="icon-love" v-else src="@/assets/icons/posts/small-love.png" alt="">
        <span class="love-nums"> {{ videoItem.praiseCount | studentsCount }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name:'M-Small-Video',
  props:{
    propIndex:{
      type: Number,
      default: 0
    },
    /** 
     * 数据对象 
    * */
    videoItem: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data:() => ({
    defaultImg: require('@/assets/icons/common/photos-bg.png')
  }),
  created () {},
  mounted () {
    if (this.$refs.coverImg) {
      this.$refs.coverImg.onerror = function () {
        this.$refs.coverImg.src = this.defaultImg
      }
    }
  },
  methods: {
    ...mapActions({
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike'
    }),
    changeLike () {
      if(!this.$login()) return
      
      if (this.videoItem.isPraise) {
        this.$store.commit('video/changeSmallVideoList', {
          index: this.propIndex,
          type: 'love',
          value: {
            praise: false,
            count: -1
          }
        })
        this.queryUnLike({
          id: this.videoItem.id,
          type: this.videoItem.type
        })
      } else {
        this.$store.commit('video/changeSmallVideoList', {
          index: this.propIndex,
          type: 'love',
          value: {
            praise: true,
            count: 1
          }
        })
        this.queryLike({
          id: this.videoItem.id,
          type: this.videoItem.type,
          createdId: this.videoItem.user.userId,
          contentType: 'TEXT'
        })
      }
    },
    toDetail () {
      this.$cookiz.set('isLogin', false, {
        path: '/'
      })
      this.$store.commit('changeListData', {
        listType: 'small-video',
        propIndex: this.propIndex,
        anchorId: this.videoItem.id
      })
      if (this.videoItem.type === 'HOMEWORK') {
        this.$router.push({
          path: '/details/homework',
          query: {
            id: this.videoItem.id
          }
        })
      } else if (this.videoItem.type === 'WORKS') {
        this.$router.push({
          path: '/details/works',
          query: {
            id: this.videoItem.id
          }
        })
      } else if (this.videoItem.type === 'LIFE') {
        this.$router.push({
          path: '/details/dynamic',
          query: {
            id: this.videoItem.id
          }
        })
      } else {
        this.$toast('错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.small-video-wrapper {
  width: 167px;
  border-radius: 8px;
  background-color: @dp-white;
  overflow: hidden;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.small-video-wrapper .small-video-cover {
  width: 167px;
  border-radius: 8px ;
  object-fit: cover;
  cursor: pointer;
}

.small-video-wrapper .small-video-content {
  width: 159px;
  max-height: 60px;
  font-size: 14px;
  font-family: @regular;
  font-weight: 400;
  color: #18252C;
  line-height: 20px;
  margin-top: 6px;
  cursor: pointer;
}

.small-video-wrapper .small-video-info {
  width: 159px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 15px;

  .info-left-side {
    display: flex;
    align-items: center;

    .avatar {
      width: 24px;
      height: 24px;
    }

    .nickname {
      width: 80px;
      line-height: 17px;
      font-size: 12px;
      font-family: @regular;
      font-weight: 400;
      color: #A3A8AB;
      margin-left: 4px;
    }
  }

  .info-right-side {
    display: flex;
    align-items: center;

    .icon-love {
      width: 16px;
      height: 16px;
    }

    .love-nums {
      font-size: 10px;
      font-family:@regular;
      font-weight: 400;
      color: #747C80;
      margin-left: 4px;
    }
  }
}
</style>