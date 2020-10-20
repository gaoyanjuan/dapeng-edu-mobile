<template>
  <div v-if="homework" class="p-details">
    <!-- Back last page -->
    <m-navbar :title="title"/>

    <!-- Main Block -->
    <div class="details-content-wrap">
      <!-- Gallery -->
      <m-gallery :photos="homework.img" :photoInfo="homework.imgInfo"/>

      <div class="details-inner-content-wrap">
        <!-- Avatar -->
        <m-avatar 
          avatar-style="width:36px; height:36px;"
          :user-info="homework.user"
          :submit-time="homework.lastModifiedTime"
        />
        
        <!-- Conetnt -->
        <div class="inner-content-txt">
          <m-posts-remark
            v-if="homework.recommendType"
            :label="homework.recommendType"
            source="detailsPage"
          />
          <span class="txt" v-html="$options.filters.formatEmotions(homework.content)"></span>
        </div>

        <!-- classification -->
        <div class="inner-content-class">
          <div class="inner-content-class-wrap">
            <span>作业 {{ homework.college ? `·${homework.college.name.replace(/学院/, '')}` : '' }}</span>
          </div>
        </div>

        <!-- Label -->
        <div class="inner-content-lab">
          <m-label label-type="作业" :label-data="homework.task" />
        </div>
      </div>
    </div>

    <!-- Middle Block -->
    <div class="details-split-line"></div>

    <!-- Footer Block -->
    <div class="details-footer-wrap" id="report">
      <m-tabs>
        <m-tab-item :selected="commentSelected" :count="homework.commentCount" name="评论">
          <m-comment-list
            :courseType="homework.courseType"
          />
        </m-tab-item>
        <m-tab-item :selected="likeSelected" name="喜欢" :count="homework.praisesCount">
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
    title:'作业详情',
    likeSelected: false,
    commentSelected: true
  }),
  computed:{
    ...mapGetters({
      homework:'homework/homeworkDetailsGetters'
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