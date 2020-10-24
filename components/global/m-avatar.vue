<template>
  <section class="m-avatar">

    <!-- 左边用户信息 -->
    <div class="avatar-left-side-wrap">
      <head-image :headImg="userInfo ? userInfo.avatar : ''" imgWidth="40px" imgHeight="40px"></head-image>
      <div class="avatar-info-wrap">
        <span class="info-nickname">{{ userInfo ? userInfo.nickname : '佚名' }}</span>
        <span class="info-date">{{ submitTime | commonDate }}</span>
      </div>
    </div>

    <!-- 右边关注等操作 (【...更多】仅作业类型存在)-->
    <div class="avatar-right-side-wrap">
      <img class="avatar-menus-follow" :src="attention ? unfollow : follow" alt="" @click="handleFollow"/>
      <img v-if="squareType === '作业'" class="avatar-menus-more" :src="more" alt="更多" @click="onOpenMenus"/>
    </div>
  </section>
</template>

<script>
export default {
  name:'Avatar',
  props:{
    avatarStyle:{
      type:String,
      default:''
    },
    userInfo:{
      type:Object,
      default: () => {
        return null
      }
    },
    submitTime: {
      type:Number,
      default: 0
    },
    /**
     * 类型（作业、作品……）
     * 用来判断显示更多操作
     */
    squareType:{
      type:String,
      default:''
    },
    /** 是否关注 */
    attention: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    follow: require('@/assets/icons/posts/posts-follow.png'),
    unfollow: require('@/assets/icons/posts/posts-unfollow.png'),
    more: require('@/assets/icons/posts/posts-more.png'),
  }),
  methods:{
    /**关注事件 */
    handleFollow() {},
    /**打开菜单 */
    onOpenMenus() {
      this.$emit('onOpenMenus')
    },
  }
}
</script>

<style lang="less" scoped>

.m-avatar {
  width: 100%;
  height: 40px;
  .l-flex-row();
}

.m-avatar .avatar-left-side-wrap {
  .l-flex-row();
}

.avatar-left-side-wrap .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.m-avatar .avatar-info-wrap {
  margin-left: 8px;
  .l-flex-column-def();
}

.avatar-info-wrap .info-nickname {
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-medium;
  font-weight: 600;
  color: #18252c;
  line-height: 20px;
}

.avatar-info-wrap .info-date {
  height: 17px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #9fa4a7;
  line-height: 17px;
  margin-top: 3px;
}

/** 右边菜单 Style */

.m-avatar .avatar-right-side-wrap{
  .l-flex-row-def()
}

.avatar-right-side-wrap .avatar-menus-follow {
  width: 59px;
  height: 28px;
  cursor: pointer;
}

.avatar-right-side-wrap .avatar-menus-more {
  width: 11px;
  height: 15px;
  margin-left: 12px;
  cursor: pointer;
}
</style>