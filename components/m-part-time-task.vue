<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <!-- 二级菜单 -->
    <part-time-jobs />
    <section class="works-wrap">
      <template>
      <short-shift-content />
      </template>
    </section>
  </div>
</template>

<script>
export default {
  name: "M-Part-Time-Task",
  data: () => ({}),
  methods: {},
};
</script>

<style lang="less" scoped>
.works-wrap {
  width: 100%;
  min-height: calc(100vh - 139px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}
</style>
