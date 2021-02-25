<template>
  <div v-if="homework" class="p-details">
    <!-- Back last page -->
    <m-navbar
      :show-right-menu="true"
      @onOpenMenus="onShowMenus"
      :title="homework.type === 'TEXT' ? '作业详情' : '小视频详情'"
    />

    <!-- Main Block -->
    <div class="details-content-wrap">
      <!-- Gallery TEXT:图文-->
      <m-gallery
        v-if="homework.type === 'TEXT' && homework.imgInfo"
        :photos="homework.img"
        :photoInfo="homework.imgInfo"
        :item="homework"
        @openComment="openComment"
        @onLove="onLove"
        @onCollect="onCollect"
      />
      
      <!-- Small Video VIDEO:小视频 -->
      <m-details-small-video
        v-if="homework.type === 'VIDEO'"
        :video="homework.vid"
      />

      <div class="details-inner-content-wrap">
        <!-- Avatar -->
        <m-avatar 
          avatar-style="width:36px; height:36px;"
          :user-info="homework.user"
          :attention="homework.isAttention"
          :submit-time="homework.lastModifiedTime"
        />
        
        <!-- Conetnt -->
        <div class="inner-content-txt">
          <m-posts-remark
            class="label-star"
            v-if="homework.recommendType"
            :label="homework.recommendType"
            source="detailsPage"
          />
          <span class="txt" :class="homework.recommendType ? 'label-index' : ''" v-html="$options.filters.formatEmotions(homework.content)"></span>
        </div>

        <!-- classification -->
        <div class="inner-content-class">
          <m-posts-class
            :remark="homework.college && homework.college.name ? `作业·${homework.college.name.replace(/学院/, '')}` : '作业'"
            :labels="homework.labels"
          />
        </div>

        <!-- Label -->
        <div class="inner-content-lab">
          <m-topic-label label-type="作业" :label-data="homework.task" />
        </div>
      </div>
    </div>

    <!-- Middle Block -->
    <div class="details-split-line"></div>

    <!-- Footer Block -->
    <div class="details-footer-wrap" id="report">
      <m-details-footer
        :courseType="homework.courseType"
        :contentType="homework.type"
        topicType="HOMEWORK"
        :detailData="homework"
        ref="detailsFooter"
      />
    </div>
    <!-- 菜单弹层 -->
    <template v-if="showMenusPopup">
      <hover-point-btn
        :btnList="homeworkList"
        @chooseItem="chooseItem"
      />
    </template>
    <!-- 复制作业号 -->
    <m-copy-code :show-popup="showCopyCode" @closed="onClosed"/>

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
    showCopyCode: { show: false, jobNummer: null },
    deleteDialogParams: {
      show: false
    },
    homeworkList:[],
    showMenusPopup:false
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
      this.$nextTick(()=>{
        if (this.userInfo) {
          // 已登录
          if (this.homework.user.userId === this.userInfo.userId) {
            // 我发布的
            if (this.homework.approvedLevel && this.homework.approvedLevel === '0') {
              // 分数为0时
              this.homeworkList = [
                { name: '编辑', functionName: 'edit' },
                { name: '删除', functionName: 'delete' },
                { name: '作业号', functionName: 'copy' }
              ]
            } else {
              this.homeworkList = [
                { name: '作业号', functionName: 'copy' }
              ]
            }
          } else {
            // TA发布的作业
            this.homeworkList = [
              { name: 'TA抄作业', functionName: 'report' },
              { name: '作业号', functionName: 'copy' }
            ]
          }
        } else if (!this.userinfo) {
          // 未登录
          this.homeworkList = [
            { name: 'TA抄作业', functionName: 'report' },
            { name: '作业号', functionName: 'copy' }
          ]
        }
      })
    },
    chooseItem(val) {
      this.showMenusPopup = false
      switch (val) {
        case "编辑":
          this.editHomework()
          break;
        case "删除":
          this.deleteHomeWork()
          break;
        case "TA抄作业":
          this.toCopyForm()
          break;
        case "作业号":
          this.handleCopyJobNummer()
          break;
        default:
          break;
      }
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
    handleCopyJobNummer() {
      if(!this.$login()) {
        return 
      }
      this.showCopyCode.show = true
      this.showCopyCode.jobNummer = this.homework.identificationCode
      this.showMenusPopup = false
    },
    /** 关闭弹窗 */
    onClosed() {
      this.showCopyCode.show = false
    },
    toCopyForm() {
      if(!this.$login()) {
        return 
      }
      this.$router.push({
        path: `/copy-form?taskId=${this.homework.id ? this.homework.id : '' }&id=${this.homework.user.userId ? this.homework.user.userId: '' }`
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
  position: relative;
  .label-star {
    display: inline-block;
    height: 24px;
    position: absolute;
  }
  .label-index {
    text-indent: 90px;
  }
}

.inner-content-txt .txt {
  display: block;
  font-size: 16px;
  font-family: @regular;
  font-weight: 400;
  color: #18252C;
  line-height: 24px;
  word-break: break-all;
  word-wrap: break-word;
  min-height: 24px;
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
  font-family: @regular;
  font-weight: 400;
  color: #465156;
}

.inner-content-lab {
  width: 100%;
  position: relative;
  margin-top: 12px;
}

</style>
