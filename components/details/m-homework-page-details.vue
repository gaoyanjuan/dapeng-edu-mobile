<template>
  <div v-if="homework" class="p-details">
    <!-- Back last page -->
    <m-navbar :title="title" :attention="homework.isAttention" :show-right-menu="true" @onOpenMenus="onShowMenus"/>

    <!-- Main Block -->
    <div class="details-content-wrap">
      <!-- Gallery -->
      <m-gallery :photos="homework.img" :photoInfo="homework.imgInfo" :item="homework"/>

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
      <m-details-footer
        :propCommentCount="homework.commentCount"
        :propPraiseCount="homework.praiseCount"
        :courseType="homework.courseType"
        :contentType="homework.type"
        topicType="HOMEWORK"
        :detailData="homework"
      />
    </div>
    <!-- 菜单弹层 -->
    <van-popup v-model="showMenusPopup" round overlay-class="menus__popup">
      <nuxt-link tag="div" to="" class="menus__popup__item">编辑</nuxt-link>
      <div class="menus__popup__item" @click="deleteHomeWork">删除</div>
      <div class="menus__popup__item" @click="onShowMenus">取消</div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'Details',
  data:() => ({
    title:'作业详情',
    likeSelected: false,
    commentSelected: true,
    showMenusPopup: false
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
  methods: {
    /** 打开/关闭菜单 */
    onShowMenus() {
      this.showMenusPopup = !this.showMenusPopup
    },
    // 删除作业
    deleteHomeWork() {},
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
  padding: 16px 16px 45px;
}

.details-inner-content-wrap {
  padding: 16px;
}

.details-inner-content-wrap .inner-content-txt {
  margin-top: 16px;
}

.inner-content-txt .txt {
  font-size: 16px;
  font-family: @regular;
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
  font-family: @regular;
  font-weight: 400;
  color: #465156;
}

.inner-content-lab {
  width: 100%;
  position: relative;
  margin-top: 12px;
}

/** menus-popup */
.p-details /deep/.van-popup {
  width: 284px;
  height: 138px;
  overflow: hidden;
}

/deep/.van-popup--center.van-popup--round {
  border-radius: 8px;
}

.van-popup .menus__popup__item {
  width: 100%;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
  font-family: @regular;
  font-weight: 400;
  color: #18252C;
  text-align: center;
  border-bottom: 1px solid #F7F7F7;
  cursor: pointer;
}

.van-popup .menus__popup__item:active {
  background-color:#f2f3f5;
}

.van-popup .menus-popup__item:last-child{
  border-bottom:none;
}
</style>
