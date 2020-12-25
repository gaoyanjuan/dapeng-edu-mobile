<template>
  <div class="part-short">
    <div
      class="short-shift"
      v-for="(item, i) in list"
      :key="i"
      @click="handelDetals"
    >
      <h1>{{ item.itemname }}</h1>
      <div class="shift-box">
        <p class="box-left">{{ item.addtime }}</p>
        <p>{{ item.yanqi }}</p>
      </div>
      <div class="shift-right">
        <p class="box-left">{{ item.state }}</p>
        <p>￥{{ item.money }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      list: [],
      loading: false,
    };
  },

  mounted() {
    this.appendTaskPartList().then((res) => {
      this.list = res.data.list;
    });
  },
  methods: {
    ...mapActions("task-part", ["appendTaskPartList"]),
    handelDetals() {
      this.$router.push({ path: "/details/part-task" });
    },
  },
};
</script>
<style lang="less" scoped>
.part-short {
  background-color: #fff;
  margin-top: 20px;
  .short-shift {
    width: 343px;
    height: 105px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(160, 160, 160, 0.1);
    border-radius: 8px;
    margin: 0 16px 20px 16px;
    padding: 16px 16px;
    & > h1 {
      font-size: 14px;
      font-weight: 600;
      color: #18252c;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
  .shift-box {
    display: flex;
    font-size: 12px;
    font-weight: 400;
    color: #a3a8ab;
    margin-bottom: 16px;
    & > .box-left {
      flex: 1;
    }
  }
  .shift-right {
    display: flex;
    & > .box-left {
      flex: 1;
      color: green;
      border-radius: 4px;
    }
    & > p + p {
      font-size: 22px;
      font-weight: 600;
      color: #ff3510;
      line-height: 18px;
    }
  }
}
</style>