<template>
  <section>
    <m-navbar title="推荐关注" />
    <div class="follow__wrap">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item, index) in popularUsersList.list" :key="index" class="follow__row">
          <div class="follow__cloumn--left" @click="toPersonalCenter(item)">
            <img class="avatar" :src="item.avatar" alt="avatar" />
            <div class="user__wrap">
              <span class="user__nickname">{{ item.nickname }}</span>
              <span class="user__signature">{{ item.introduction || introduction}}</span>
            </div>
          </div>
          <div class="follow__cloumn--right" @click="handleFollow(item, index)">
            <img class="follow__btn" :src="item.isFlower ? unfollow : follow" alt="" />
          </div>
        </div>
      </van-list>
      <!-- 取消关注二次确认 -->
      <m-delete-dialog
        :deleteDialogParams="deleteDialogParams"
        @confirmDelete="confirmDelete"
        title="确定取消关注吗？"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Follow',
  layout:'navbar',
  data: () => ({
    list:[],
    loading: false,
    finished: false,
    introduction:'这个人很懒，什么都没有写 ~',
    avatar: require('@/assets/icons/common/avatar.png'),
    follow: require('@/assets/icons/posts/posts-follow.png'),
    unfollow: require('@/assets/icons/posts/posts-unfollow.png'),
    deleteDialogParams: {
      show: false
    },
    userInfo:{},
    userIndex:null
  }),
  computed: {
    ...mapGetters({
      popularUsersList: 'attention/popularUsersListGetters'
    })
  },
  created () {
    if (this.$store.getters['attention/popularUsersListGetters'].list.length === 0) {
      this.$store.dispatch('attention/appendPopularUsersList', { page: 1 })
    }
  },
  watch: {
    'popularUsersList.status': function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
        this.loading = false
      }
    }
  },
  methods:{
    ...mapActions({
      queryFollowing: 'attention/queryFollowing',
      deleteFollowing: 'attention/deleteFollowing',
      appendPopularUsersList: 'attention/appendPopularUsersList'
    }),
    ...mapMutations({
      changeFollowing: 'attention/changePopularUsersListFollowStatus',
      clearPopularUsersList: 'attention/clearPopularUsersList'
    }),
    onLoad() {
      if (this.popularUsersList.status === 'over') {
        this.finished = true
        return false
      }
      if (this.popularUsersList.status === 'loading') return false
      const newPage = this.popularUsersList.pageInfo.number + 1
      this.appendPopularUsersList({
        page: newPage
      })
    },
    /** 关注事件 */
    handleFollow (item, index) {
      this.userInfo = item
      this.userIndex = index
      if(!this.$login()) {
        return 
      }
      if (this.userInfo.isFlower) {
        this.deleteDialogParams.show = true
        
      } else {
        this.changeFollowing(this.userIndex)
        this.queryFollowing({
          id: this.userInfo.userId
        })
      }
    },
    // 取消关注二次确认
    confirmDelete() {
      this.changeFollowing(this.userIndex)
        this.deleteFollowing({
          id: this.userInfo.userId
        })
      this.deleteDialogParams.show = false
    },
    toPersonalCenter(item) {
      if (!this.$login()) return
      this.$router.push({
        path: '/personal-center/publish',
        query:{ 
          userId: item.userId
        }
      })
    }
  },
  destroyed () {
    this.clearPopularUsersList()
  }
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
  min-height: 100vh;
  padding: 44px 16px 0;
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
    height: 17px;
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #a6aea9;
    line-height: 17px;
  }
}

.follow__cloumn--right {
  & .follow__btn {
    width: 59px;
    height: 28px;
  }
}
</style>
