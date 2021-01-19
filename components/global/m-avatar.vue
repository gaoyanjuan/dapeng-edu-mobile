<template>
  <section class="m-avatar">

    <!-- 左边用户信息 -->
    <div class="avatar-left-side-wrap" @click.stop="toPersonalCenter">
      <head-image :headImg="userInfo ? userInfo.avatar : ''" imgWidth="40px" imgHeight="40px"></head-image>
      <div class="avatar-info-wrap">
        <span class="info-nickname">{{ userNickname }}</span>
        <span class="info-date">
          {{ submitTime | commonDate }}
          <span
            class="info-my-submit"
            v-if="showMySubmit">｜{{ $route.path.includes('/homework') ? '我最近发布的' : '我发布的' }}
          </span>
        </span>
      </div>
    </div>

    <!-- 右边关注等操作 (【...更多】仅作业类型存在)-->
    <div class="avatar-right-side-wrap">
      <img class="avatar-menus-follow" v-if="showFollowBtn" :src="isAttention ? unfollow : follow" alt="" @click.stop="handleFollow"/>
      <template v-if="showScore">
        <img class="avatar-menus-score" v-if="listItemData.approvedLevel=== '90'" src="@/assets/icons/posts/posts-good.png" alt="优" />
        <img class="avatar-menus-score" v-if="listItemData.approvedLevel=== '80'" src="@/assets/icons/posts/posts-liang.png" alt="良" />
        <img class="avatar-menus-score" v-if="listItemData.approvedLevel=== '70'" src="@/assets/icons/posts/posts-zhong.png" alt="中" />
        <img class="avatar-menus-score" v-if="listItemData.approvedLevel=== '60'" src="@/assets/icons/posts/posts-cha.png" alt="差" />
      </template>
      <img class="avatar-menus-doubt" v-if="listItemData.isDoubt && pageName === 'myHomework'" :src="doubtImg" alt="疑" @click.stop="showDoubt" />
      <span
        @click.stop="onOpenMenus"
        v-if="showMenus"
      >
        <img
          class="avatar-menus-more"
          :src="more"
          alt="更多"
        />
      </span>
    </div>
    <div class="doubt-content" v-if="doubtContentShow">
      此作业被其他用户投诉涉嫌抄袭，有疑义请联系大鹏客服QQ:706559568
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    userId: {
      type: String,
      default: 'available'
    }
  },
  data: () => ({
    follow: require('@/assets/icons/posts/posts-follow.png'),
    unfollow: require('@/assets/icons/posts/posts-unfollow.png'),
    more: require('@/assets/icons/posts/posts-more.png'),
    doubtImg: require('@/assets/icons/posts/posts-doubt.png'),
    doubtContentShow: false,
    isDoubt: false,
    dpUserId: process.env.global.dpUserId,
    isAttention: false
  }),
  computed:{
    ...mapGetters('user',[
      'userInfoGetters',
    ]),
    userNickname () {
      if (this.userInfo) {
        return this.userInfo.nickname ? this.userInfo.nickname : this.userInfo.dpAccount
      } else {
        return '佚名'
      }
    },
    showFollowBtn () {
      let currentUserId = this.userInfoGetters ? this.userInfoGetters.userId : ''
      return this.userInfo && this.userInfo.userId !== currentUserId && this.userInfo.userId !== this.dpUserId && this.$route.path !== '/attention' && this.pageName.indexOf('my') === -1
    },
    showMenus () {
      return (this.squareType === '作业' && this.pageName !== 'myHomework') || (this.pageName === 'myHomework') || (this.pageName.indexOf('my') !== -1 && this.pageName !== 'myHomework' )
    },
    showScore () {
      return this.userInfoGetters && this.userInfo && this.userInfo.userId === this.userInfoGetters.userId && this.listItemData.approvedLevel !== '0' && this.pageName.indexOf('my') !== -1
    },
    showMySubmit() {
      let currentUserId = this.userInfoGetters ? this.userInfoGetters.userId : ''
      let flag = this.userInfo && this.userInfo.userId === currentUserId && (this.pageName === 'requirement' || this.pageName === 'homework')
      // return this.userInfo && this.userInfo.userId === currentUserId && this.pageName === 'requirement'
      return flag
    },
    functionName () {
      return this.$getFunctionName(this.$store.state.listType)
    }
  },
  created () {
    this.isAttention = this.attention
  },
  methods:{
    ...mapActions('user', [
      'followingUser',
      'cancelFollowingUser'
    ]),
    toPersonalCenter() {
      if (!this.$login()) return
      this.$router.push({
        path: '/personal-center/publish',
        query:{ 
          userId: this.userInfo.userId
        }
      })
    },
    // toPersonalCenter() {
    //   if(!this.$login()) {
    //     return 
    //   }
    //   if (this.userId === 'available') {
    //     if (this.$route.query.userId === this.userInfoGetters.userId) return false
    //     this.$router.push({
    //       path: '/personal-center',
    //       query: {
    //         userId: this.userInfoGetters.userId
    //       }
    //     })
    //   } else if (this.$router.history.current.path === '/personal-center') {
    //     if (this.$route.query.userId === this.userId) return false
    //     this.$router.push({
    //       path: '/personal-center',
    //       query: {
    //         userId: this.userId
    //       }
    //     })
    //   }
    //   this.$router.push({
    //     path:'/personal-center'
    //   })
    // },
    /**关注事件 */
    handleFollow () {
      if(!this.$login()) {
        return 
      }
      if (this.isAttention) {
        this.isAttention = false
        this.$store.commit(`${this.functionName}`, {
          index: this.$store.state.propIndex,
          type: 'attention',
          value: false
        })
        this.cancelFollowingUser({
          id: this.userInfo.userId
        })
      } else {
        this.isAttention = true
        this.$store.commit(`${this.functionName}`, {
          index: this.$store.state.propIndex,
          type: 'attention',
          value: true
        })
        this.followingUser({
          id: this.userInfo.userId
        })
      }
    },
    /**打开菜单 */
    onOpenMenus() {
      this.$emit('onOpenMenus')
    },
    // 打开标疑弹框
    showDoubt() {
      this.doubtContentShow = !this.doubtContentShow
    }
  }
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
  margin: 12px 0 12px 12px;
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
  box-sizing: border-box;
  
}
</style>