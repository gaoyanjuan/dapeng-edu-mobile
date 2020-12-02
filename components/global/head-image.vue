<template>
  <div class="head-image-box">
    <img ref="headerImg" v-lazy="headUrl" :alt="imgName" :style="headImgStyle" />
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
      defaultImg: require('@/assets/icons/common/dp_default_headImg.jpg')
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
    },
  },
  mounted () {
    // 挂载完成后，判断图片是否显示成功，若失败，则替换为默认图片
    this.$refs.headerImg.onerror = () => {
      this.$refs.headerImg.src = this.defaultImg
    }
  }
}
</script>

<style lang="less" scoped>
img {
  vertical-align: middle;
  object-fit: cover;
  cursor: pointer;
}
</style>