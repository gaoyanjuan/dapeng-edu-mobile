<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <div v-for="(item, i) in list" :key="i" class="m-avatar">
      
      <!-- 左边用户信息 -->
      <div class="avatar-left-side-wrap">
        <img class="avatar" :src="avatar" alt="" />
        <div class="avatar-info-wrap">
          <span class="info-nickname"> {{ item.nickname }} </span>
          <span class="info-signature"> {{ item.signature }} </span>
          <span class="info-date"> {{ item.date | commonDate }} </span>
        </div>
      </div>

      <!-- 右边关注 -->
      <div class="avatar-right-side-wrap">
        <img class="avatar-menus-follow" :src="item.type ? follow : unfollow" @click="handleFollow"/>
      </div>
    </div>
  </van-list>
</template>

<script>
export default {
  name: 'Fans',
  data: () => ({
    list:[],
    loading: false,
    finished: false,
    avatar: require('@/assets/icons/common/avatar.png'),
    follow: require('@/assets/icons/posts/posts-follow.png'),
    unfollow: require('@/assets/icons/posts/posts-unfollow.png'),
  }),
  methods:{
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push({
            nickname:'宋祖儿',
            signature:'好设计是不唐突的',
            date: 1603533623139,
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
  }
}
</script>

<style lang="less" scoped>

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
</style>