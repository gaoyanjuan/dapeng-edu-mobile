<template>
  <span>
    <img v-if="label === 'EXCELLENT'" :class="source === 'listPage'? 'photos__label':'details__label'" :src="awesome">
    <img v-if="label === 'PROGRESS'" :class="source === 'listPage'? 'photos__label':'details__label'"  :src="progress">
    <img v-if="label === 'CREATIVE'" :class="source === 'listPage'? 'photos__label':'details__label'" :src="creative">
    <img v-if="label === 'STRIVE'" :class="source === 'listPage'? 'photos__label':'details__label'" :src="effort">
    <img v-if="label === 'BOARDPAINTING'" :class="source === 'listPage'? 'photos__label':'details__label'" :src="draw">
  </span>
</template>

<script>
export default {
  name:'M-Photos-Label',
  props:{
    label:{
      type:String,
      default:'EXCELLENT'
    },
    /**
     * listPage：列表页
     * detailsPage:详情页
     */
    source:{
      type:String,
      default:'listPage'
    }
  },
  data: ()=> ({
    effort: require('@/assets/images/icon/mobile/label-effort.png'),
    awesome: require('@/assets/images/icon/mobile/label-awesome.png'),
    creative: require('@/assets/images/icon/mobile/label-creative.png'),
    draw: require('@/assets/images/icon/mobile/label-draw.png'),
    progress: require('@/assets/images/icon/mobile/label-progress.png')
  })
}
</script>

<style lang="less" scoped>
.photos__label {
  position: absolute;
  top: 4px;
  left: -8px;
  width: 80px;
  height: 24px;
}

.details__label {
  width: 80px;
  height: 24px;
  line-height: 24px;
  margin-right: 7px;
  vertical-align: text-bottom;
}
</style>