<template>
  <div v-if="dynamic" class="p-details">
    <!-- Back last page -->
    <m-navbar
      v-if="!$route.query.share"
      :show-right-menu="showRightMenuFlag"
      @onOpenMenus="onShowMenus"
      :title="dynamic.type === 'TEXT' ? '动态详情' : '小视频详情'"
    />

    <m-call-app v-else></m-call-app>

    <!-- Main Block -->
    <div :class="$route.query.share ? '': 'details-content-wrap'">
      <!-- Gallery TEXT:图文-->
      <m-gallery
        v-if="dynamic.type === 'TEXT'"
        :photos="dynamic.img"
        :photoInfo="dynamic.imgInfo"
        :item="dynamic"
        @openComment="openComment"
        @onLove="onLove"
        @onCollect="onCollect"
      />
      
      <!-- Small Video VIDEO:小视频 -->
      <m-details-small-video
        v-if="dynamic.type === 'VIDEO'"
        :video="dynamic.vid"
      />

      <div class="details-inner-content-wrap">
        <!-- Avatar -->
        <m-avatar
          avatar-style="width:36px; height:36px;"
          :user-info="dynamic.user"
          :attention="dynamic.isAttention"
          :submit-time="dynamic.createTime"
        />
        
        <!-- Conetnt -->
        <div class="inner-content-txt">
          <m-posts-remark
            v-if="dynamic.recommendType"
            :label="dynamic.recommendType"
            source="detailsPage"
          />
          <span class="txt" v-html="$options.filters.formatEmotions(dynamic.content)"></span>
        </div>
        <!-- classification -->
        <div class="inner-content-class">
          <m-posts-class
            :remark="'动态'"
            :labels="dynamic.labels"
          />
        </div>
        <!-- Label -->
        <div class="inner-content-lab">
          <m-topic-label label-type="动态" :activityData="dynamic.activity" />
        </div>
      </div>
    </div>

    <!-- Middle Block -->
    <div class="details-split-line"></div>

    <!-- 悬浮唤起APP 按钮-->
    <m-call-app-btn v-if="$route.query.share"></m-call-app-btn>

    <!-- Footer Block -->
    <div class="details-footer-wrap" id="report">
      <m-details-footer
        :contentType="dynamic.type"
        topicType="LIFE"
        :detailData="dynamic"
        ref="detailsFooter"
      />
    </div>
     <!-- 菜单弹层 -->
      <template v-if="showMenusPopup">
      <hover-point-btn
        :btnList="deleteBtn"
        @chooseItem="chooseItem"
      />
    </template>
    <!-- 删除二次确认弹窗 -->
    <m-delete-dialog :deleteDialogParams="deleteDialogParams" @confirmDelete="confirmDelete"></m-delete-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'Details',
  data:() => ({
    commentSelected: true,
    likeSelected: false,
    showMenusPopup: false,
    deleteDialogParams: {
      show: false
    },
    deleteBtn:[
      { name: '删除', functionName: 'delete' }
    ]
  }),
  computed:{
    ...mapGetters({
      dynamic:'dynamic/dynamicDetailsGetters',
      userInfo: 'user/userInfoGetters'
    }),
    showRightMenuFlag() {
      if(this.dynamic.user && this.dynamic.user.userId === ( this.userInfo ? this.userInfo.userId : '') ) {
        return true
      } else {
        return false
      }
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
  },
  methods: {
    ...mapActions({
      deleteDynamics: 'user/deleteDynamics',
    }),
    /** 打开/关闭菜单 */
    onShowMenus() {
      this.showMenusPopup = !this.showMenusPopup
    },
    chooseItem(val) {
      this.showMenusPopup = false
      if (val === '删除') {
        this.deleteDynamic()
      }
    },
    // 评论操作
    openComment () {
      this.$refs.detailsFooter.openComment()
    },
    // 收藏
    onCollect () {
      this.$refs.detailsFooter.onCollectEvent()
    },
    //喜欢操作
    onLove () {
      this.$refs.detailsFooter.onLikeEvent()
    },
    // 删除成长
    deleteDynamic() {
      this.showMenusPopup = false
      this.deleteDialogParams.show = true
    },
    confirmDelete() {
      this.deleteDynamics({ id: this.dynamic.id }).then(()=>{
        this.$toast('删除成功')
        this.$router.go(-1)
      })
    }
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
  display: block;
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #18252C;
  line-height: 24px;
  word-break: break-all;
  word-wrap: break-word;
}

.inner-content-txt /deep/ .emotion {
  width: 20px;
  height: 20px;
  vertical-align: text-bottom;
}

.details-inner-content-wrap .inner-content-class {
  width:intrinsic;
  // width: -moz-max-content;
  // width: -webkit-max-content;
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