<template>
  <div class="small-video-wrapper" @click="toDetail">
    <div class="img-box" :style="{ height: `${videoItem.height}px`}">
      <img
        ref="videoImg"
        v-lazy="videoItem.videoImg"
        class="small-video-cover"
        :style="{ height: `${videoItem.height}px`}"
      />
      <div class="small-video-content van-ellipsis">
        {{ videoItem.content }}
      </div>
      <div class="bottom-box">
        <div class="info-left-side" @click.stop="toPersonalCenter">
          <img
            class="avatar"
            :src="videoItem.user ? videoItem.user.avatar : ''"
            imgWidth="16px"
            imgHeight="16px"
          />
          <span class="nickname">{{ videoItem.user ? (videoItem.user.nickname ? videoItem.user.nickname : videoItem.user.dpAccount) : '佚名' }}</span>
        </div>
        <div class="info-right-side" @click.stop="changeLike">
          <img class="icon-love" v-if="videoItem.isPraise" src="@/assets/icons/posts/small-unlove.png" alt="">
          <img class="icon-love" v-else src="@/assets/icons/posts/small-love.png" alt="">
          <span class="love-nums"> {{ videoItem.praiseCount | studentsCount }} </span>
        </div>
      </div>
    </div>
    <div class="">
      <m-posts-class
        :remark="videoItem.college && videoItem.college.name ? `作品·${videoItem.college.name.replace(/学院/, '')}` : '作品'"
        :labels="videoItem.labels"
      />
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
    listType: {
      type: String,
      default: ''
    },
    propSquareType: {
      type: String,
      default: 'HOMEWORK'
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
  computed: {
    functionName () {
      return this.$getFunctionName(this.listType)
    }
  },
  created () {},
  mounted () {
    if (this.$refs.videoImg) {
      this.$refs.videoImg.onerror = function () {
        this.$refs.videoImg.src = this.defaultImg
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
        this.$store.commit(`${this.functionName}`, {
          index: this.propIndex,
          type: 'love',
          value: {
            praise: false,
            count: -1
          }
        })
        this.queryUnLike({
          id: this.videoItem.id,
          type: this.propSquareType
        })
      } else {
        this.$store.commit(`${this.functionName}`, {
          index: this.propIndex,
          type: 'love',
          value: {
            praise: true,
            count: 1
          }
        })
        this.queryLike({
          id: this.videoItem.id,
          type: this.propSquareType,
          createdId: this.videoItem.user.userId,
          contentType: 'VIDEO'
        })
      }
    },
    toDetail () {
      this.$cookiz.set('isLogin', false, {
        path: '/'
      })
      this.$store.commit('video/changeScrollTop', document.documentElement.scrollTop)
      this.$store.commit('changeListData', {
        listType: this.listType,
        propIndex: this.propIndex,
        anchorId: this.videoItem.id
      })
      if (this.propSquareType === 'HOMEWORK') {
        this.$router.push({
          path: '/details/homework',
          query: {
            id: this.videoItem.id
          }
        })
      } else if (this.propSquareType === 'WORKS') {
        this.$router.push({
          path: '/details/works',
          query: {
            id: this.videoItem.id
          }
        })
      } else if (this.propSquareType === 'LIFE') {
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
.img-box {
  position: relative;
}

.small-video-wrapper {
  margin-top: 14px;
  width: 167px;
  border-radius: 8px;
  background-color: @dp-white;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  .small-video-cover {
    z-index: 5;
    width: 167px;
    border-radius: 8px ;
    object-fit: cover;
    vertical-align: middle;
  }
  .small-video-content {
    z-index: 10;
    position: absolute;
    bottom: 24px;
    width: 167px;
    height: 20px;
    font-size: 14px;
    font-family: @regular;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 20px;
    padding: 0 4px;
  }
  .bottom-box {
    z-index: 10;
    position: absolute;
    bottom: 4px;
    display: flex;
    justify-content: space-between;
    width: 167px;
    padding: 0 8px;
    height: 16px;
    .info-left-side {
      display: flex;
      align-items: center;
      .avatar {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        position: relative;
      }
      .nickname {
        width: 80px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        font-family: @regular;
        font-weight: 400;
        color: #FFFFFF;
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
        color: #FFFFFF;
        margin-left: 4px;
      }
    }
  }
}

</style>