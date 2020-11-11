<template>
  <div class="m-fans-wrap">
    <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
      <template v-if="userFansGetters.list.length > 0">
        <template  v-for="(item, index) in userFansGetters.list" >
        <div :key="index" v-if="item.userId" class="m-avatar">  
          <!-- 左边用户信息 -->
          <div class="avatar-left-side-wrap">
            <div v-if="item.redDot" class="red-dot"></div>
            <img class="avatar" :src="item.avatar || avatar" alt="" />
            <div class="avatar-info-wrap">
              <span class="info-nickname"> {{ item.nickname }} </span>
              <span class="info-signature"> {{ item.introduction || '这个人很懒,什么都没有写~'}} </span>
              <span class="info-date"> {{ item.createTime | commonDate }} </span>
            </div>
          </div>

          <!-- 右边关注 -->
          <div class="avatar-right-side-wrap">
            <img class="avatar-menus-follow" :src="item.isAttention ? unfollow : follow" @click="handleFollow(item, index)"/>
          </div>
        </div>
        </template>
      </template>

      <!-- 无数据 -->
      <template v-if="userFansGetters.list.length === 0 && finished">
        <div class="blank-no-data-wrap">
          <img class="blank-icon" :src="blank" alt="" />
          <span class="blank-txt">您还没有粉丝～</span>
        </div>
      </template>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Fans',
  data: () => ({
    list:[],
    loading: false,
    finished: false,
    finishedText:'没有更多了',
    avatar: require('@/assets/icons/common/avatar.png'),
    follow: require('@/assets/icons/posts/posts-follow.png'),
    unfollow: require('@/assets/icons/posts/posts-unfollow.png'),
    blank: require('@/assets/icons/blank/have-no-fans.png'),
  }),
  mounted() {
    if(!this.userFansGetters.list.length) {
      this.finishedText = ''
    }
    if (this.userFansGetters.list.length === 0) {
        this.appendUserFans({
          userId: this.$route.query.userId,
          page: 1,
          size: 20
        })
      }
    console.log(this.userFollowGetters)
  },
  methods:{
    ...mapActions('user', [
      'appendUserFans',
      'followingUser',
      'cancelFollowingUser'
    ]),
    ...mapMutations('user', [
      'clearUserFans',
      'setUserFollowStatus'
    ]),
    onLoad() {
      if (this.userFansGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.userFansGetters.status === 'loading') return false
      const newPage = this.userFansGetters.pageInfo.number + 1
      this.appendUserFans({
        userId: this.$route.query.userId,
        page: newPage,
        size: 20
      })
    },
    /** 关注事件 */
    handleFollow(item, index){
      console.log(item, index)
      if(item.isAttention) {
        this.setUserFollowStatus({
          index: index,
          flag: false,
          data: 'userFans'
        })
        this.cancelFollowingUser({ id: item.userId }).catch(()=>{
          this.setUserFollowStatus({
          index: index,
          flag: true,
          data: 'userFans'
        })
        })
        
      }else {
         this.setUserFollowStatus({
          index: index,
          flag: true,
          data: 'userFans'
        })
        this.followingUser({ id: item.userId }).catch(()=>{
          this.setUserFollowStatus({
          index: index,
          flag: false,
          data: 'userFans'
        })
        })
        
      }
    }
  },
  computed: {
    ...mapGetters('user', [
      'userFansGetters'
    ])
  },
  watch: {
    'userFansGetters.status': function (newVal, oldVal) {
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
    'userFansGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },
  destroyed() {
    this.clearUserFans()
  },
}
</script>

<style lang="less" scoped>

.m-fans-wrap {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 44px);
}

.m-avatar {
  width: 100%;
  height: 55px;
  padding: 16px;
  margin-top: 20px;
  .l-flex-row();
}

.m-avatar .avatar-left-side-wrap {
  .l-flex-row();
}

.avatar-left-side-wrap .red-dot {
  width: 6px;
  height: 6px;
  margin-top: 16px;
  margin-right: 5px;
  background: #FE4646;
  border-radius: 50%;
  align-self: flex-start;
}

.avatar-left-side-wrap .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  align-self: flex-start;
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

.avatar-info-wrap .info-signature {
  max-width: 200px;
  height: 17px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A6AEA9;
  line-height: 17px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.avatar-info-wrap .info-date {
  height: 14px;
  font-size: 10px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A6AEA9;
  line-height: 14px;
  margin-top: 4px;
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