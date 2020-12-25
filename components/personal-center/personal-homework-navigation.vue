<template>
  <div class="navigation">
    <van-tabs v-model="activeName" sticky offset-top='44px' @click="onTabsClick">
      <van-tab title= '动态'>
        <publish-dynamic />
      </van-tab>
      <van-tab title= '作业'>
        <publish-homework />
      </van-tab>
      <van-tab title= '作品'>
        <publish-works />
      </van-tab>
      <van-tab title= '活动'>
        <publish-growth />
      </van-tab>
      <!-- <van-tab title= '小视频'>
        
      </van-tab> -->
      <van-tab title= '阅读'>
        <publish-reading/>
      </van-tab>
      <!-- <van-tab title= '视频'>
        <publish-video />
      </van-tab> -->
    </van-tabs>
  </div>
</template>
<script>
export default {
  name:'PersonalPublish',
  data() {
    return {
      activeName: 'dynamic'
    }
  },
  mounted() {
    // 路由定位
    let query = this.$route.query.type || 'dynamic'
    let tabs = ['dynamic','homework','works','growth','reading','video']
    this.activeName = tabs.findIndex(tab => tab === query)
  },
  methods: {
    onTabsClick(index) {
      let tabs = ['dynamic','homework','works','growth','reading','video']
      if(this.$route.query.type === tabs[index]) return
      this.$router.replace({ query: { ...this.$route.query, type: tabs[index] } })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
