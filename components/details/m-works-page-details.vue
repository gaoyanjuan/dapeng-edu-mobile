<template>
  <div v-if="works" class="p-details">
    <!-- Back last page -->
    <m-navbar
      :show-right-menu="showRightMenuFlag"
      @onOpenMenus="onShowMenus"
      :title="works.type === 'TEXT' ? '作品详情' : '小视频详情'"
    />

    <!-- Main Block -->
    <div class="details-content-wrap">

      <!-- Gallery TEXT:图文-->
      <m-gallery
        v-if="works.type === 'TEXT'"
        :photos="works.img"
        :photoInfo="works.imgInfo"
        :item="works"
        @openComment="openComment"
        @onLove="onLove"
        @onCollect="onCollect"
      />

      <!-- Small Video VIDEO:小视频 -->
      <m-details-small-video v-if="works.type === 'VIDEO'" :video="works.vid"/>

      <div class="details-inner-content-wrap">
        <!-- Avatar -->
        <m-avatar
          avatar-style="width:36px; height:36px;"
          :user-info="works.user"
          :attention="works.isAttention"
          :submit-time="works.createTime"
        />
        
        <!-- Conetnt -->
        <div class="inner-content-txt">
          <m-posts-remark
            v-if="works.recommendType"
            :label="works.recommendType"
            source="detailsPage"
          />
          <span class="txt" v-html="$options.filters.formatEmotions(works.content)"></span>
        </div>

        <!-- classification -->
        <div class="inner-content-class">
          <div class="inner-content-class-wrap">
            <span>作品 {{ works.college ? `·${works.college.name.replace(/学院/, '')}` : '' }}</span>
          </div>
        </div>

        <!-- Label -->
        <div class="inner-content-lab">
          <m-label label-type="作品" :activityData="works.activity" />
        </div>
      </div>
    </div>

    <!-- Middle Block -->
    <div class="details-split-line"></div>

    <!-- Footer Block -->
    <div class="details-footer-wrap" id="report">
      <m-details-footer
        :contentType="works.type"
        topicType="WORKS"
        :detailData="works"
        ref="detailsFooter"
      />
    </div>
    <!-- 菜单弹层 -->
    <van-popup v-model="showMenusPopup" round overlay-class="menus__popup" :transition-appear="true">
      <div class="menus__popup__item" @click="deleteWork">删除</div>
      <div class="menus__popup__item" @click="onShowMenus">取消</div>
    </van-popup>
    
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
    }
  }),
  computed:{
    ...mapGetters({
      works: 'work/worksDetailsGetters',
      userInfo: 'user/userInfoGetters'
    }),
    showRightMenuFlag() {
      if(this.works.user && this.works.user.userId === ( this.userInfo ? this.userInfo.userId : '') ) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      deleteWorks: 'user/deleteWorks',
    }),
    /** 打开/关闭菜单 */
    onShowMenus() {
      this.showMenusPopup = !this.showMenusPopup
    },
    // 删除作品
    deleteWork() {
      this.showMenusPopup = false
      this.deleteDialogParams.show = true
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
    confirmDelete() {
      this.deleteWorks({ id: this.works.id }).then(()=>{
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

/** menus-popup */
.p-details /deep/.van-popup {
  width: 284px;
  // height: 92px;
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
  font-family: @dp-font-regular;
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