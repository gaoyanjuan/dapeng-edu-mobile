<template>
  <div class="works__class--wrap">
    <span>{{ remark }} {{ college ? `· ${college.name}` : '' }}</span>
  </div>
</template>

<script>
export default {
  name: 'M-Posts-Class',
  props:{
    remark:{
      type: String,
      default: '作业'
    },
    college: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>

.works__class--wrap {
  width: max-content;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background: #f7f7f7;
  border-radius: 12px;
  & > span {
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #465156;
  }
}

</style>