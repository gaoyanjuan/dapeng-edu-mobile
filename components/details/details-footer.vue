<template>
  <div>
    <m-tabs>
      <m-tab-item selected="true" name="评论" :count="propCommentCount">
        <m-comment-list />
      </m-tab-item>
      <m-tab-item name="喜欢" :count="propPraiseCount">
        <m-like-list />
      </m-tab-item>
    </m-tabs>
  </div>
</template>

<script>
export default {
  props: {
    propCommentCount: {
      type: Number,
      default: 0
    },
    propPraiseCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      commentCount: 0,
      praiseCount: 0
    }
  },
  created () {
    this.commentCount = this.propCommentCount
    this.praiseCount = this.propPraiseCount
  }
}
</script>

<style lang="less" scoped>

</style>