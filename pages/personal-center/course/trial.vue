<template>
  <section>
    <m-navbar title="我的体验课"></m-navbar>
    
    <div class="page-course-wrapper">

      <div class="course-list-nav-row">
        <img class="nav" :src="nav" />
        <span class="nav-txt">已开通的课程服务列表</span>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  layout:'navbar',
  data: () => ({
    nav: require('@/assets/icons/course/nav.png')
  })
}
</script>

<style lang="less" scoped>
.page-course-wrapper {
  width: 100%;
  height: 100%;
  background:#F8F8F8;
}

.course-list-nav-row {
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: @dp-white;

  .nav {
    width: 15px;
    height: 16px;
    margin-right: 5px;
  }

  .nav-txt {
    font-size: 16px;
    font-family: @semibold;
    font-weight: 600;
    color: #18252C;
  }
}
</style>
