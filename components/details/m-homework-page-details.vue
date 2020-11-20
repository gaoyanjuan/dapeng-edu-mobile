<template>
  <div v-if="homework" class="p-details">
    <!-- Back last page -->
    <m-navbar
      :attention="homework.isAttention"
      :show-right-menu="showRightMenuFlag"
      @onOpenMenus="onShowMenus"
      :title="homework.type === 'TEXT' ? '作业详情' : '小视频详情'"
    />

    <!-- Main Block -->
    <div class="details-content-wrap">
      <!-- Gallery TEXT:图文-->
      <m-gallery v-if="homework.type === 'TEXT'" :photos="homework.img" :photoInfo="homework.imgInfo" :item="homework"/>
      
      <!-- Small Video VIDEO:小视频 -->
      <m-details-small-video v-if="homework.type === 'VIDEO'" :video="homework.vid"/>

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
    <van-popup v-model="showMenusPopup" round overlay-class="menus__popup" :transition-appear="true">
      <template v-if="homework.user.userId === (userInfo ? userInfo.userId : '' )">
        <div class="menus__popup__item" @click="editHomework">编辑</div>
        <div class="menus__popup__item" @click="deleteHomeWork">删除</div>
        <div class="menus__popup__item" @click="onShowMenus">取消</div>
      </template>
      <template v-else>
        <div class="menus__popup__item">Ta抄作业</div>
        <div class="menus__popup__item">作业号</div>
        <div class="menus__popup__item" @click="onShowMenus">取消</div>
      </template>
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
    showMenusPopup: false,
    showRightMenu: true,
    deleteDialogParams: {
      show: false
    }
  }),
  computed:{
    ...mapGetters({
      homework:'homework/homeworkDetailsGetters',
      userInfo: 'user/userInfoGetters'
    }),
    
    showRightMenuFlag() {
      if(this.homework.approvedLevel && this.homework.approvedLevel !== '0' && this.homework.user.userId === ( this.userInfo ? this.userInfo.userId : '') ) {
      return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions({
      deleteHomework: 'user/deleteHomework',
    }),
    
    /** 打开/关闭菜单 */
    onShowMenus() {
      this.showMenusPopup = !this.showMenusPopup
    },

    // 删除作业
    deleteHomeWork() {
      this.showMenusPopup = false
      this.deleteDialogParams.show = true
    },
    confirmDelete() {
      this.deleteHomework({ id: this.homework.id }).then(()=>{
        this.$toast('删除成功')
        this.$router.go(-1)
      })
    },

    // 编辑作业
    editHomework() {
      this.$router.push({
        path: '/submit',
        query: {
          action: 'edit',
          type: this.homework.courseType,
          id: this.homework.id
        }
      })
    },
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
  // height: 138px;
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
