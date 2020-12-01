<template>
  <div>
    <div v-if="$nuxt.isOnline">
      <m-guide />
      <div class="app_wrap">
        <Nuxt />
      </div>
      <m-footer />
    </div>
    <div class="off-line-wrap" v-if="$nuxt.isOffline">
      掉线了~~
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.app_wrap {
  width: 100%;
  min-height: calc(100vh - 94px);
  background: @dp-white;
  box-sizing: border-box;
}

.off-line-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 45% auto;
}
</style>
