<template>
  <section>
      <m-home />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Square',
  computed:{
    ...mapGetters('user', ['userInfoGetters']),
  },
  async fetch({ app, route, axios, store}) {
    if(route.query.access_token) {
      await store.dispatch('user/appendUserInfo',{ token: route.query.access_token })
    }
  },
  async asyncData ({route, store}) {
    try {
      if (store.getters['banner/bannerListGetters'].length === 0) {
        await store.dispatch('banner/appendBannerList', { collegeId: 'j5m484vz' })
      }
    } catch (error) {
      error({ statusCode: error.data.code, message: error.data.message })
    }
  },
  mounted () {
    const Cookie = process.browser ? require('js-cookie') : undefined
    if(this.userInfoGetters && this.$route.query.access_token) {
      Cookie.set('token', JSON.stringify(this.userInfoGetters))
      this.$router.replace('/')
    }
  },
}
</script>

<style lang="less" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>