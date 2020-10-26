<template>
  <div>
    <m-navbar :title="handleNavTitle($route.query.type)" />
    
    <div class="mine-publish-wrap">
      <template v-if="$route.query.type === 'homework'">
        <publish-homework />
      </template>
      <template v-if="$route.query.type === 'works'">
        <publish-works />
      </template>
      <template v-if="$route.query.type === 'dynamic'">
        <publish-dynamic />
      </template>
      <template v-if="$route.query.type === 'growth'">
        <publish-growth />
      </template>
      <template v-if="$route.query.type === 'reading'">
        <publish-reading />
      </template>
      <template v-if="$route.query.type === 'video'">
        <publish-video />
      </template>
      <template v-if="$route.query.type === 'task'">
        <publish-task />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name:'PersonalPublish',
  layout:'navbar',
  methods:{
    /**
     * 格式化标题
     */
    handleNavTitle(type){
      switch (type) {
        case 'homework':
          return '我的作业'
          break;
        case 'works':
          return '我的作品'
          break;
        case 'dynamic':
          return '我的动态'
          break;
        case 'growth':
          return '我的活动'
          break;
        case 'reading':
          return '我的阅读'
          break;
        case 'homework':
          return '我的作业'
          break;
        case 'video':
          return '我的视频'
          break;
        case 'task':
          return '我的任务'
          break;
      }
    }
  }
}
</script>

<style lang="less" scoped>

.mine-publish-wrap {
  width: 100%;
  padding-top: 44px;
  min-height: calc(100vh -44px);
}
</style>