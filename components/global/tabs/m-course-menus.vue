<template>
  <div class="course-menus-wrapper">
    <van-tabs v-model="activeName">
      <van-tab v-for="(item, index) in menus" :key="index" :title="item.name" :name="item.name" ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'M-Course-Menus',

  props:{
    menus:{
      type:Array,
      default:[]
    }
  },

  data: () => ({
    activeName: '',
  }),

  mounted() {
    console.log(this.menus)
  }
}
</script>

<style lang="less" scoped>
.course-menus-wrapper {
  width: 375px;
  height: 44px;
  background: #FFFFFF;
}

/deep/ .van-tab {
  max-width: 65px;
  min-width: 55px;
  text-align: center;
  flex: 0;
  -webkit-flex: 0;
}

/deep/ .van-tab__text--ellipsis {
  max-width: 65px;
  min-width: 55px;
}

/deep/ .van-tab--active {
  width: 60px;
  font-size: 18px;
}

/deep/ .van-tab__text {
  display: block;
  max-width: 65px;
  min-width: 55px;
}

/deep/ .van-tabs__nav--line {
  padding-left: 16px;
  padding-right: 16px;
}
</style>