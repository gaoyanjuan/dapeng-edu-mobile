<template>
  <div class="follow__wrap">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(item, i) in list" :key="i" class="follow__row">
        <div class="follow__cloumn--left">
          <img class="avatar" :src="avatar" alt="avatar" />
          <div class="user__wrap">
            <span class="user__nickname">{{ item.nickname }}</span>
            <span class="user__signature">{{ item.signature }}</span>
          </div>
        </div>
        <div class="follow__cloumn--right" @click="handleFollow(item)">
          <img class="follow__btn" :src="item.type ? follow : unfollow" alt="" />
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'M-followers',
  data: () => ({
    list:[],
    loading: false,
    finished: false,
    avatar: require('@/assets/icons/common/avatar.png'),
    follow: require('@/assets/icons/posts/posts-follow.png'),
    unfollow: require('@/assets/icons/posts/posts-unfollow.png')
  }),
  methods:{
    ...mapActions('user', [
      'appendUserFollow'
    ]),
    ...mapMutations('user', [
      'clearUserFollow'
    ]),
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push({
            nickname:'宋祖儿',
            signature:'与其怕失败，不如狠狠地失败一次',
            type: (i % 2 === 0) ? true : false,
          })
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 30) {
          this.finished = true;
        }
      }, 1000)
    },
    /** 关注事件 */
    handleFollow(){}
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