<template>
  <div>
    <div class="app_wrap" v-if="$nuxt.isOnline">
      <Nuxt />
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
  },
  created () {
    if (this.userInfoGetters) {
      this.getUserDetails()
    }
  },
  computed:{
    ...mapGetters('user', ['userInfoGetters'])
  },
  methods: {
    ...mapActions({
      getUserDetails: 'user/getUserDetails',
    }) 
  }
}
</script>

<style lang="less" scoped>
.app_wrap {
  width: 100%;
  min-height: 100vh;
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
