<template>
  <section>
    <m-navbar title="推荐关注" />
    <div class="follow__wrap">
      <div v-for="(item, i) in 7" :key="i" class="follow__row">
        <div class="follow__cloumn--left">
          <img class="avatar" :src="avatar" alt="avatar" />
          <div class="user__wrap">
            <span class="user__nickname">宋祖儿</span>
            <span class="user__signature">与其怕失败，不如狠狠地失败一次</span>
          </div>
        </div>
        <div class="follow__cloumn--right">
          <img class="follow__btn" :src="follow" alt="follow" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Follow',
  layout:'navbar',
  data: () => ({
    avatar: require('@/assets/icons/common/avatar.png'),
    follow: require('@/assets/icons/posts/posts-follow.png'),
  }),
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
