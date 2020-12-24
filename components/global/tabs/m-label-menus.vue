<template>
   <section class="menus-wrap">
    <client-only>
      <van-tabs v-model="activeName" @click="changeMenus">
        <van-tab v-for="(item, index) in menus" :key="index" :title="item.name" :name="item.topicType" ></van-tab>
      </van-tabs>
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'Menus',
  props:{
    menus:{
      type:Array,
      default:[]
    }
  },
  data: () => ({
    activeName: ''
  }),
  mounted () {
    this.cacheActive()
  },
  methods: {
    cacheActive() {
      for (let index = 0; index < this.menus.length; index++) {
        const element = this.menus[index]
        if (this.$route.query.topicType === element.topicType) {
          this.activeName = element.topicType
        }
      }
    },
    changeMenus(name, title) {
      // 禁止路由重复点击
      if (this.$route.query.topicType === name) return
      this.activeName = name
      this.$router.replace({
        query: {
          ...this.$route.query,
          topicType : name
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.menus-wrap {
  width: 100%;
  height: 45px;
  padding: 0;
  background-color: @dp-white;
}

/deep/ .van-tabs {
  width: 100%;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #747C80;
}

/deep/ .van-tab--active {
  font-size: 14px;
  font-family: @dp-font-regular;;
  font-weight: 400;
  color: #00B93B;
  animation: 0.5s appear;
}

/deep/ .van-tabs__line {
  width: 28px;
  height: 4px;
  background: #00B93B;
  border-radius: 2px;
  bottom: 16px;
}

</style>
