<template>
  <div class="follow__wrap">
    <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
      <template v-if="userFollowGetters.list.length > 0">
      <div v-for="(item, index) in userFollowGetters.list" :key="index" class="follow__row">
        <div class="follow__cloumn--left">
          <img class="avatar" :src="item.avatar || avatar" alt="avatar" />
          <div class="user__wrap">
            <span class="user__nickname">{{ item.nickname }}</span>
            <span class="user__signature">{{ item.introduction || '这个人很懒,什么都没有写~' }}</span>
          </div>
        </div>
        <div class="follow__cloumn--right" @click="handleFollow(item,index)" v-if="item.userId !== dpUserId">
          <img class="follow__btn" :src="item.isAttention ? unfollow : follow" alt="" />
        </div>
      </div>
      </template>
      <!-- 无数据 -->
      <template v-if="userFollowGetters.list.length === 0 && finished">
        <div class="blank-no-data-wrap">
          <img class="blank-icon" :src="blank" alt="" />
          <span class="blank-txt">您还没有关注～</span>
        </div>
      </template>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'M-followers',
  data: () => ({
    loading: false,
    finished: false,
    avatar: require('@/assets/icons/common/avatar.png'),
    follow: require('@/assets/icons/posts/posts-follow.png'),
    unfollow: require('@/assets/icons/posts/posts-unfollow.png'),
    finishedText: '没有更多了',
    dpUserId: process.env.global.dpUserId,
    blank: require('@/assets/icons/blank/have-no-fans.png'),
  }),
  mounted() {
    if(!this.userFollowGetters.list.length) {
      this.finishedText = ''
    }
    if (this.userFollowGetters.list.length === 0) {
        this.appendUserFollow({
          userId: this.$route.query.userId,
          page: 1,
          size: 20
        })
      }
    console.log(this.userFollowGetters)
    
  },
  destroyed() {
    this.clearUserFollow()
  },
  watch: {
    'userFollowGetters.status': function (newVal, oldVal) {
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
    'userFollowGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  methods:{
    ...mapActions('user', [
      'appendUserFollow',
      'followingUser',
      'cancelFollowingUser'
    ]),
    ...mapMutations('user', [
      'clearUserFollow',
      'setUserFollowStatus'
    ]),
    onLoad() {
      if (this.userFollowGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.userFollowGetters.status === 'loading') return false
      const newPage = this.userFollowGetters.pageInfo.number + 1
      this.appendUserFollow({
        userId: this.$route.query.userId,
        page: newPage,
        size: 20
      })
    },
    /** 关注事件 */
    handleFollow(item, index){
      if(item.isAttention) {
        this.setUserFollowStatus({
          index: index,
          flag: false,
          data: 'userFollow'
        })
        this.cancelFollowingUser({ id: item.userId }).catch(()=>{
          this.setUserFollowStatus({
          index: index,
          flag: true,
          data: 'userFollow'
          })
        })
        
      }else {
        this.setUserFollowStatus({
          index: index,
          flag: true,
          data: 'userFollow'
        })
        this.followingUser({ id: item.userId }).catch(()=>{
          this.setUserFollowStatus({
          index: index,
          flag: false,
          data: 'userFollow'
          })
        })
        
      }
      
    }
  },
  computed: {
    ...mapGetters('user', [
      'userFollowGetters'
    ])
  },
}
</script>

<style lang="less" scoped>
.c-flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.c-flex-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.follow__wrap {
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 0 16px 50px;
  background-color: @dp-white;
}

.follow__row {
  width: 100%;
  height: 40px;
  margin-top: 24px;
  .c-flex-row();
}

.follow__cloumn--left {
  .c-flex-row();
  & .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  & .user__wrap {
    height: 40px;
    margin-left: 8px;
    .c-flex-column();
  }
  & .user__wrap > .user__nickname {
    height: 20px;
    font-size: 14px;
    font-family: @dp-font-medium;
    font-weight: 600;
    color: #18252c;
    line-height: 20px;
  }
  & .user__wrap > .user__signature {
    max-width: 200px;
    height: 17px;
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #a6aea9;
    line-height: 17px;
    .text-ellipsis()
  }
}

.follow__cloumn--right {
  & .follow__btn {
    width: 59px;
    height: 28px;
  }
}

/** 空数据 Style */

.blank-no-data-wrap {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-40%);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.blank-no-data-wrap .blank-icon {
  width: 228px;
  height: 129px;
}

.blank-no-data-wrap .blank-txt {
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #8D8E8E;
  line-height: 20px;
  margin-top: 12px;
}
</style>