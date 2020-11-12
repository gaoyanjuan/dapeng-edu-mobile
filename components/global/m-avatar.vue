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
      <img class="avatar-menus-follow" v-if="userInfo.userId !== userInfoGetters.userId && userInfo.userId !== dpUserId" :src="attention ? unfollow : follow" alt="" @click="handleFollow"/>
      <template v-if="userInfo.userId === userInfoGetters.userId && listItemData.approvedLevel !== '0'">
        <img class="avatar-menus-score" v-if="listItemData.approvedLevel=== '90'" src="@/assets/icons/posts/posts-good.png" alt="优" />
        <img class="avatar-menus-score" v-if="listItemData.approvedLevel=== '80'" src="@/assets/icons/posts/posts-liang.png" alt="良" />
        <img class="avatar-menus-score" v-if="listItemData.approvedLevel=== '70'" src="@/assets/icons/posts/posts-zhong.png" alt="中" />
        <img class="avatar-menus-score" v-if="listItemData.approvedLevel=== '60'" src="@/assets/icons/posts/posts-cha.png" alt="差" />
      </template>
      <!-- <img class="avatar-menus-doubt" v-if="isDoubt" :src="doubtImg" alt="疑" @click="showDoubt" /> -->
      <img v-if="(squareType === '作业' && pageName !== 'myRecommend') || (pageName === 'myHomework' && listItemData.approvedLevel === '0') || (pageName.indexOf('my') !== -1 && pageName !== 'myRecommend')" class="avatar-menus-more" :src="more" alt="更多" @click="onOpenMenus"/>
    </div>
    <div class="doubt-content" v-if="doubtContentShow">
      此作业被其他用户投诉涉嫌抄袭，有疑义请联系大鹏客服QQ:706559568
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
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
    },
    pageName: {
      type: String,
      default: ''
    },
    listItemData: {
      type: Object,
      require: true,
      default: function () {
        return {
          user: {
            nickname: '佚名',
            avatar: ''
          }
        }
      }
    },
  },
  data: () => ({
    follow: require('@/assets/icons/posts/posts-follow.png'),
    unfollow: require('@/assets/icons/posts/posts-unfollow.png'),
    more: require('@/assets/icons/posts/posts-more.png'),
    doubtImg: require('@/assets/icons/posts/posts-doubt.png'),
    doubtContentShow: false,
    isDoubt: false,
    dpUserId: process.env.global.dpUserId,
  }),
  methods:{
    /**关注事件 */
    handleFollow() {},
    /**打开菜单 */
    onOpenMenus() {
      this.$emit('onOpenMenus')
    },
    // 打开标疑弹框
    showDoubt() {
      this.doubtContentShow = !this.doubtContentShow
    }
  },
  computed:{
    ...mapGetters('user',[
      'userInfoGetters',
    ])
  },
}
</script>

<style lang="less" scoped>

.m-avatar {
  position: relative;
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
.avatar-right-side-wrap .avatar-menus-score {
  width: 38px;
  height: 38px;
  margin-left: 12px;
  cursor: pointer;
}
.avatar-right-side-wrap .avatar-menus-doubt {
  width: 44px;
  height: 25px;
  margin-left: 12px;
  cursor: pointer;
}
.doubt-content {
  position: absolute;
  top: 36px;
  right: 15px;
  z-index: 10;
  width: 214px;
  height: 68px;
  padding: 16px 10px 18px 10px;
  background: #D8D8D8;
  border-radius: 4px;
  color: #36404A;
  font-size: 12px;
  
}
</style>