<template>
  <div v-if="growth" class="p-details">
    <!-- Back last page -->
    <m-navbar :title="title" :show-right-menu="showRightMenuFlag" @onOpenMenus="onShowMenus"/>

    <!-- Main Block -->
    <div class="details-content-wrap">
      <!-- Gallery -->
      <m-gallery
        :photos="growth.img"
        :photoInfo="growth.imgInfo"
        :item="growth"
        @openComment="openComment"
        @onLove="onLove"
        @onCollect="onCollect"
      />

      <div class="details-inner-content-wrap">
        <!-- Avatar -->
        <m-avatar
          avatar-style="width:36px; height:36px;"
          :user-info="growth.user"
          :attention="growth.isAttention"
          :submit-time="growth.createTime"
        />
        
        <!-- Conetnt -->
        <div class="inner-content-txt">
          <span class="txt" v-html="$options.filters.formatEmotions(growth.content)"></span>
        </div>

        <!-- classification -->
        <div class="inner-content-class">
          <m-posts-class
            :remark="growth.topicType === 'LIFE' ? '动态' : '活动'"
            :labels="growth.labels"
          />
        </div>

        <!-- Label -->
        <div class="inner-content-lab">
          <m-topic-label label-type="成长" :activityData="growth.activity"/>
        </div>
      </div>
    </div>

    <!-- Middle Block -->
    <div class="details-split-line"></div>

    <!-- Footer Block -->
    <div class="details-footer-wrap" id="report">
      <m-details-footer
        :contentType="growth.type"
        :topicType="growth.topicType"
        :detailData="growth"
        ref="detailsFooter"
        isGrowth="growth"
      />
    </div>
    <!-- 菜单弹层 -->
    <template v-if="showMenusPopup">
      <hover-point-btn
        :btnList="growthBtn"
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
    title:'帖子详情',
    commentSelected: true,
    likeSelected: false,
    showMenusPopup: false,
    deleteDialogParams: {
      show: false
    },
    growthBtn: [
      { name: '删除', functionName: 'delete' }
    ]
  }),
  computed:{
    ...mapGetters({
      growth:'growth/growthDetailsGetters',
      userInfo: 'user/userInfoGetters'
    }),
    showRightMenuFlag() {
      if(this.growth.user && this.growth.user.userId === ( this.userInfo ? this.userInfo.userId : '') ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      deletePosts: 'user/deletePosts',
    }),
    /** 打开/关闭菜单 */
    onShowMenus() {
      this.showMenusPopup = !this.showMenusPopup
    },
    chooseItem(val) {
      this.showMenusPopup = false
      if (val === '删除') {
        this.deleteGrowth()
      }
    },
    // 删除成长
    deleteGrowth() {
      this.showMenusPopup = false
      this.deleteDialogParams.show = true
    },
    confirmDelete() {
      this.deletePosts({ id: this.growth.id }).then(()=>{
        this.$toast('删除成功')
        this.$router.go(-1)
      })
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