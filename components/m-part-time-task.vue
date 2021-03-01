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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "M-Part-Time-Task",
   computed: {
    ...mapGetters('logo', 
      ["getTagsList", "getSortList"]
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
.works-wrap {
  width: 100%;
  min-height: calc(100vh - 139px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}
</style>
