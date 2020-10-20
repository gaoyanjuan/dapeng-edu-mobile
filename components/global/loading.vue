<template lang="html">
  <div v-if="loading" class="loading-page"></div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background: url('~assets/images/common/loading.svg') center center no-repeat
    rgba(255, 255, 255, 0.8);
  background-size: 80px 80px;
}
</style>
