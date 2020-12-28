<template>
  <div class="like-item" @click="toPersonalCenter(user)">
    <headImage
      :headImg="headImg"
      imgWidth="40px"
      imgHeight="40px"
    />
    <div class="userinfo-box">
      <div>{{ userName }}</div>
      <div>{{ time | commonDate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userName: {
      type: String,
      default: ''
    },
    headImg: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    },
    user: {
      type: Object,
      default: null
    }
  },
  methods: {
    toPersonalCenter(item) {
      if (!this.$login()) return
      if (item) {
        this.$router.push({
          path: '/personal-center/publish',
          query:{ 
            userId: item.userId
          }
        })
      } else {
         this.$router.push({
          path: '/personal-center/publish'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.like-item {
  display: flex;
  margin-bottom: 16px;
  height: 40px;
  .userinfo-box {
    margin-left: 8px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &>:nth-child(1) {
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 600;
      color: #18252C;
      line-height: 20px;
    }
    &>:nth-child(2) {
      font-size: 10px;
      font-family: @dp-font-light;
      font-weight: 300;
      color: #A6AEA9;
      line-height: 14px;
    }
  }
}
</style>
