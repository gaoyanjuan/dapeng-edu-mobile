<template>
  <div v-if="growth" class="p-details">
    <!-- Back last page -->
    <m-navbar :title="title"/>

    <!-- Main Block -->
    <div class="details-content-wrap">
      <!-- Gallery -->
      <m-gallery :photos="growth.content.img" :photoInfo="growth.content.imgJson"/>

      <div class="details-inner-content-wrap">
        <!-- Avatar -->
        <m-avatar
          avatar-style="width:36px; height:36px;"
          :user-info="growth.user"
          :submit-time="growth.createTime"
        />
        
        <!-- Conetnt -->
        <div class="inner-content-txt">
          <span class="txt" v-html="$options.filters.formatEmotions(growth.content.text)"></span>
        </div>

        <!-- classification -->
        <div class="inner-content-class">
          <div class="inner-content-class-wrap">
            <span>活动</span>
          </div>
        </div>

        <!-- Label -->
        <div class="inner-content-lab">
          <m-label label-type="成长" :activityData="growth.activityBaseDto"/>
        </div>
      </div>
    </div>

    <!-- Middle Block -->
    <div class="details-split-line"></div>

    <!-- Footer Block -->
    <div class="details-footer-wrap" id="report">
      <m-tabs>
        <m-tab-item :selected="commentSelected" name="评论" :count="growth.commentCount">
          <m-comment-list />
        </m-tab-item>
        <m-tab-item :selected="likeSelected" name="喜欢" :count="growth.praisesCount">
          <m-like-list />
        </m-tab-item>
      </m-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'Details',
  data:() => ({
    title:'帖子详情',
    commentSelected: true,
    likeSelected: false
  }),
  computed:{
    ...mapGetters({
      growth:'growth/growthDetailsGetters'
    })
  },
  created () {
    if (this.$route.query.type && this.$route.query.type === 'like') {
      this.likeSelected = true
      this.commentSelected = false
    }
  },
  mounted () {
    // 详情页跳转定位
    // if (this.$route.fullPath.includes('report')) {
    //   this.$nextTick(() => {
    //     const element = document.getElementById('report')
    //     element.scrollIntoView({
    //       behavior: 'auto'
    //     })
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>

.details-content-wrap {
  margin-top: 44px;
}

.details-split-line {
  width: 100%;
  height: 15px;
  background-color: #F8F8F8;
}

.details-footer-wrap {
  padding: 16px;
}

.details-inner-content-wrap {
  padding: 16px;
}

.details-inner-content-wrap .inner-content-txt {
  margin-top: 16px;
}

.inner-content-txt .txt {
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #18252C;
  line-height: 24px;
}

.inner-content-txt /deep/ .emotion {
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
}

.details-inner-content-wrap .inner-content-class {
  width:intrinsic;
  width: -moz-max-content;
  width: -webkit-max-content;
  margin-top: 12px;
}

.inner-content-class .inner-content-class-wrap {
  height: 24px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background: #f7f7f7;
  border-radius: 12px;
}

.inner-content-class-wrap span {
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #465156;
}

.inner-content-lab {
  width: 100%;
  position: relative;
  margin-top: 12px;
}
</style>