<template>
  <div class="course-menus-wrapper">
    <van-tabs v-model="activeName" @click="changeMenus">
      <van-tab v-for="(item, index) in menus" :key="index" :title="item.name"
        :name="item.id" :title-style="item.name.length === 4 ? tabStyle :''"
      />
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
    tabStyle: 'margin-right: 10px;margin-left: 10px;'
  }),

  computed:{
    college() {
      return this.$route.query.college
    }
  },

  mounted() {
    this.menus.forEach(element => {
      if(element.id === this.college) {
        this.activeName = element.id
      }
    })
  },

  methods:{
     changeMenus(name, title) {
      // 禁止路由重复点击
      if (this.college === name) {
        return false
      }

      this.activeName = name

      this.$router.replace({
        query: {
          ...this.$route.query,
          college : name
        }
      })
    }
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
  max-width: 75px;
  min-width: 75px;
}

/deep/ .van-tabs__nav--line {
  padding-left: 6px;
  padding-right: 16px;
}
</style>