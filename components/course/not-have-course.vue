<template>
  <div class="not-have-course-warp">
    <img src="@/assets/icons/blank/not-have-course.png" alt="">
    <div>
      <p>亲爱的<span @click="toPersonalCenter">{{ userNick }}</span>学员，</p>
      <p>由于你暂时未开通<span @click="toCourse">【{{ courseTitle }}】</span>听课权限，请联系班主任老师帮你开通~</p>
    </div>
    <a href="/">回到首页</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    courseInfo: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfoGetters'
    }),
    userNick () {
      if (this.userInfo && this.userInfo.nickname) {
        return this.userInfo.nickname
      } else if (this.userInfo && this.userInfo.dpAccount) {
        return this.userInfo.dpAccount
      } else {
        return '佚名'
      }
    },
    courseTitle () {
      if (this.courseInfo && this.courseInfo.title) {
        return this.courseInfo.title
      }
    }
  },
   methods: {
    toCourse () {
      window.location.replace(`${this.validateSystemHostName().COURSE_HOST}/course/${this.courseInfo.id}`)
    },
    toPersonalCenter () {
      window.location.replace(`${this.validateSystemHostName().HOST}/personal-center/publish?userId=${this.userInfo.userId}`)
    }
  }
}
</script>

<style lang="less" scoped>
.not-have-course-warp {
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > img {
    margin-top: 50px;
    width: 108px;
    height: 117px;
  }
  & > div:nth-child(2) {
    margin-top: 16px;
    text-align: center;
    padding: 0 38px;
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #465156;
    line-height: 22px;
    span {
      color: #0CB65B;
    }
  }
  & > a:nth-child(3) {
    text-align: center;
    margin-top: 28px;
    background: linear-gradient(196deg,#0CB65B 0%, #1CDC94 100%);
    width: 220px;
    height: 40px;
    font-size: 14px;
    font-family: @dp-font-medium;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 40px;
  }
}
</style>