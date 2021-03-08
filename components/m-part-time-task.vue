<template>
  <div>
    <!-- Swiper -->
    <!-- <m-swipe /> -->
    <div class="top-banner">
      <img src="@/assets/icons/common/banner.png" alt="">
    </div>

    <!-- 二级菜单 -->
    <part-time-jobs @setParams='setParams' />
    <section class="works-wrap">
      <template>
      <short-shift-content @changePage='changePage'/>
      </template>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "M-Part-Time-Task",
  computed: {
    ...mapGetters('logo',["getTagsList", "getSortList","getTabsList"]
    ),
  },
  data: () => ({
    class1id:1,
    class2id:null,
    px: ''
  }),
  mounted() {
    this.class1id = this.$route.query.class1id || 1
    this.class2id = this.$route.query.class2id || this.getTagsList[1].id
    this.px=this.$route.query.px || ''
    let query = {
      class1id:this.class1id,
      class2id:this.class2id,
      px:this.px
    }
    this.appendTaskPartList({page: 1,query })
  },
  methods: {
    ...mapActions("task-part", ["appendTaskPartList"]),
    changePage(page){
    let query = {
      class1id:this.class1id,
      class2id:this.class2id,
      px:this.px
    }
    this.appendTaskPartList({page: page,query })
     },
    setParams(class1id,class2id,px){
      this.class1id = class1id
      this.class2id = class2id
      this.px = px
    }
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
