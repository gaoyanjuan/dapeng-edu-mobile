<template>
  <div class="mark" v-show="visible">
    <div class="content">

    </div>
    <p></p>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      dafault: false,
    },
  },
  data() {
    return { };
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
.mark {
  z-index: 9999;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  .content {
    width: 200px;
    height: 200px;
    background-color: #ffffff;
    position: absolute;
    top: 30%;
    margin-top: 30%;
    left: 50%;
    margin-left: -100px;
  }
  & > p {
    width: 50px;
    height: 50px;
    position: absolute;
    background-color: red;
    bottom: 40px;
    left: 50%;
    margin-left: -25px;
  }
}
</style>