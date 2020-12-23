<template>
  <div>
    <div class="label-navbar">
      <div class="label-navbar-back">
        <img @click="back" src="@/assets/icons/navbar/nav-arrow-back.png" alt="">
      </div>
      <div class="label-navbar-title">
        {{ labelDataGetters && labelDataGetters.name }}
      </div>
      <div class="label-navbar-footer">
        <div>5677人参与</div><div>6.89万人浏览</div>
      </div>
    </div>
    <!-- 二级菜单 -->
    <van-sticky class="the-menus">
      <m-label-menus :menus="menus" />
    </van-sticky>
    <div>
      <m-posts 
        v-for="(item, index) in labelListGetters.list"
        :id="item ? item.id: ''"
        :key="index"
        listType="label"
        :propIndex="index"
        :courseType="item.courseType"
        :listItemData="item"
        :modifiedTime="item.createTime"
        :path="`/details/${pathType(item)}`"
        :propSquareType="item && item.topicType"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  title: '成长详情页',
  data () {
    return {
      menus: [
        { name: '全部', topicType: '' },
        { name: '成长', topicType: 'POST' },
        { name: '作业', topicType: 'HOMEWORK' },
        { name: '作品', topicType: 'WORKS' },
        { name: '动态', topicType: 'LIFE' },
        { name: '阅读', topicType: 'ARTICLE' },
        { name: '小视频', topicType: 'VIDEO' }
      ]
    }
  },
  computed: {
    ...mapGetters('label', [
      'labelListGetters',
      'labelDataGetters'
    ])
  },
  mounted () {

  },
  methods: {
    back () {
      const route = 'personal-center-publish'
      const isLogin = this.$cookiz.get('isLogin')
      if (isLogin) {
        const isDetails = this.$isDetails(this.$route.name)
        this.$cookiz.set('isLogin', false, {
          path: '/'
        })
        if (isDetails) {
          this.$router.go(-4)
        } else {
          this.$router.go(-1)
        }
      } else if(this.$route.name === route) {
        this.$router.replace('/personal-center')
      } else {
        this.$router.go(-1)
      }
    },
    pathType(item){
      console.log(item)
      switch (item.topicType) {
        case 'HOMEWORK':
          return 'homework'
          break;
        case 'WORKS':
          return 'works'
          break;
        case 'LIFE':
          return 'dynamic'
          break;
        case 'ARTICLE':
          return 'reading'
          break;
        case 'MOVIE':
          return 'video'
          break;
        case 'video':
          return 'VIDEO'
          break;
        default:
          return '111'
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label-navbar {
  background-image: url('~@/assets/icons/navbar/navbar-background-label.png');
  background-size: 100% 140px;
  height: 140px;
  width: 100%;
  padding: 0 16px;
  .label-navbar-back {
    height: 36px;
    width: 100%;
    img {
      margin-top: 12px;
      width: 24px;
      height: 24px;
    }
  }
  .label-navbar-title {
    margin-top: 8px;
    max-height: 50px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 18px;
    font-family: @dp-font-medium;
    font-weight: 500;
    color: #18252C;
    line-height: 25px;
  }
  .label-navbar-footer {
    margin-top: 8px;
    height: 20px;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #747C80;
    line-height: 20px;
    display: flex;
    &>:last-child {
      margin-left: 12px;
    }
  }
}

.list-item {
  margin-bottom: 8px;
  height: 150px;
  background-color: #18252C;
}
</style>