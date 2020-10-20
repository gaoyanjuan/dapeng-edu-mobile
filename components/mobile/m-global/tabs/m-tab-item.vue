<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabItem",
  props: {
    name: { 
      required: true
    },
    selected: {
      default: false
    },
    count: {
      default: 0
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  mounted() {
    this.isActive = this.selected
  }
}
</script>