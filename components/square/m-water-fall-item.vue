<template>
  <div :style="{ width: width, padding: gap }" class="water-fall-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Number,
      required: true
    }
  },
  computed: {
    width() {
      const { width } = this.$parent
      let res = (parseInt(width.replace('px',''))/37.5)
      return res +'rem'
    },
    gap() {
      const { gap } = this.$parent
      return gap
    }
  }
}
</script>

<style lang="less" scoped>
.water-fall-item {
  left: 0;
  top: 0;
  position: absolute;
  transition: left 0.3s, right 0.3s, opacity 0.1s;
}
</style>
