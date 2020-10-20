<style lang="less" scoped>
img {
  vertical-align: middle;
  object-fit: cover;
  cursor: pointer;
}
</style>
<template>
  <div class="head-image-box">
    <img
      ref="headerImg"
      :src="headUrl"
      :alt="imgName"
      :style="headImgStyle"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'head-image',
  props: {
    headImg: {
      type: String,
      default: ''
    },
    imgName: {
      type: String,
      default: '用户头像'
    },
    imgWidth: {
      type: String,
      default: '32px'
    },
    imgHeight: {
      type: String,
      default: '32px'
    },
    borderRadius: {
      type: String,
      default: '50%'
    },
    // userId共分为三种情况：默认不传参'available',跳转到自己的主页;'disable',禁用点击跳转;传入用户的ID，跳转到指定用户的个人主页
    userId: {
      type: String,
      default: 'available'
    }
  },
  data () {
    return {
      defaultImg: require('@/assets/images/common/dp_default_headImg.jpg')
    }
  },
  computed: {
    headImgStyle () {
      return {
        height: this.imgHeight,
        width: this.imgHeight,
        borderRadius: this.borderRadius
      }
    },
    // 判断是否有http前缀，没有的加上
    headUrl () {
      if (this.headImg === null) {
        return ''
      } else if (this.headImg.startsWith('http')) {
        return this.headImg
      } else {
        return this.defaultImg
      }

      //return this.$url + this.headImg
    },
    // ...mapGetters('user', ['userInfoGetters'])
  },
  mounted () {
    // 挂载完成后，判断图片是否显示成功，若失败，则替换为默认图片
    this.$refs.headerImg.onerror = () => {
      this.$refs.headerImg.src = this.defaultImg
    }
  },
  methods: {
    // toPersonalCenter () {
    //   // 使用组件时，若userId传入disable，则禁用跳转
    //   if (this.userId !== 'disable') {
    //     if (this.userId === 'available') {
    //       const routeData = this.$router.resolve({
    //         path: '/personal-home',
    //         query: {
    //           name: this.name,
    //           userId: this.userInfoGetters.userId
    //         }
    //       })
    //       window.open(routeData.href, '_blank')
    //     } else if (this.$router.history.current.path === '/personal-home') {
    //       this.$router.push({
    //         path: '/personal-home',
    //         query: {
    //           name: this.name,
    //           userId: this.userId
    //         }
    //       })
    //       // 直播间讲师头像不打开新页面
    //     } else if (this.$route.path.indexOf('secure/course')) {
    //       this.$router.push({
    //         path: '/personal-home',
    //         query: {
    //           name: this.name,
    //           userId: this.userId
    //         }
    //       })
    //     } else {
    //       const routeData = this.$router.resolve({
    //         path: '/personal-home',
    //         query: {
    //           name: this.name,
    //           userId: this.userId
    //         }
    //       })
    //       window.open(routeData.href, '_blank')
    //     }
    //   }
    // }
  }
}
</script>
