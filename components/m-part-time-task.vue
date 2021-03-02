<template>
  <div>
    <!-- Swiper -->
    <!-- <m-swipe /> -->
    <div class="top-banner">
      <img src="http://testimage.dapengjiaoyu.com/2021-02-04/jxtuqmsukv/8855938042161_T1BFUkFURQ==.png" alt="">
    </div>

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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "M-Part-Time-Task",
   computed: {
    ...mapGetters('logo',
      ["getTagsList", "getSortList","getTabsList"]
    ),
  },
  data: () => ({}),
    mounted() {
    let params = {
      class1id:1,
      class2id:this.getTagsList[0].id,
      px:''
    }
    this.appendTaskPartList({page: 1,params })
  },
  methods: {
     ...mapActions("task-part", ["appendTaskPartList"]),
  },
};
</script>

<style lang="less" scoped>
.top-banner {
  margin-top: 10px;
  & > img {
    margin-top: 10px;
    margin-left: 16px;
    width: 340px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
  }
} 

.works-wrap {
  width: 100%;
  min-height: calc(100vh - 139px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}
</style>
