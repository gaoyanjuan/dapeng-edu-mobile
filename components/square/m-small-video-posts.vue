<template>
  <div class="small-video-wrapper">

    <nuxt-link tag="img"
      :src="imgInfo.imgUrl" 
      to="/details/video-page-details?type=small" 
      class="small-video-cover"
      :style="{ height: `${imgInfo.height}px`}"
    />

    <nuxt-link tag="div" 
      to="/details/video-page-details?type=small" 
      class="small-video-content van-multi-ellipsis--l3"
    >
      零基础学设计只要3天零零基础学设计只要3天零基础学设计只要3天点点滴零零基础学设计只要3天
    </nuxt-link>

    <div class="small-video-info">
      <div class="info-left-side">
        <img class="avatar" :src="avatar" alt="" />
        <span class="nickname"> 范冰冰 </span>
      </div>
      <div class="info-right-side">
        <img class="icon-love" :src="love" alt="" />
        <span class="love-nums"> 3231 </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'M-Small-Video',
  props:{
    /** 
     * 数据对象 
    * */
    imgInfo: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data:() => ({
    avatar:require('@/assets/icons/common/avatar.png'),
    love:require('@/assets/icons/posts/small-love.png'),
    unlove:require('@/assets/icons/posts/small-unlove.png'),
    cover:require('@/assets/icons/square/small-video-cover.png')
  })
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