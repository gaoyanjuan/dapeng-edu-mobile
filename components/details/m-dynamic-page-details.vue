<template>
  <div v-if="dynamic" class="p-details">
    <!-- Back last page -->
    <m-navbar :title="title" :attention="dynamic.isAttention" :show-right-menu="showRightMenuFlag" @onOpenMenus="onShowMenus"/>

    <!-- Main Block -->
    <div class="details-content-wrap">
      <!-- Gallery -->
      <m-gallery :photos="dynamic.img" :photoInfo="dynamic.imgInfo" :item="dynamic"/>

      <div class="details-inner-content-wrap">
        <!-- Avatar -->
        <m-avatar
          avatar-style="width:36px; height:36px;"
          :user-info="dynamic.user"
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
          <div class="inner-content-class-wrap">
            <span>动态</span>
          </div>
        </div>
        <!-- Label -->
        <div class="inner-content-lab">
          <m-label label-type="动态" :activityData="dynamic.activity" />
        </div>
      </div>
    </div>

    <!-- Middle Block -->
    <div class="details-split-line"></div>

    <!-- Footer Block -->
    <div class="details-footer-wrap" id="report">
      <m-details-footer
        :propCommentCount="dynamic.commentCount"
        :propPraiseCount="dynamic.praiseCount"
        :contentType="dynamic.type"
        topicType="LIFE"
        :detailData="dynamic"
      />
    </div>
     <!-- 菜单弹层 -->
    <van-popup v-model="showMenusPopup" round overlay-class="menus__popup">
      <div class="menus__popup__item" @click="deleteDynamic">删除</div>
      <div class="menus__popup__item" @click="onShowMenus">取消</div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'Details',
  data:() => ({
    title:'动态详情',
    commentSelected: true,
    likeSelected: false,
    showMenusPopup: false
  }),
  computed:{
    ...mapGetters({
      dynamic:'dynamic/dynamicDetailsGetters',
      userInfo: 'user/userInfoGetters'
    }),
    showRightMenuFlag() {
      if(this.dynamic.user.userId === ( this.userInfo ? this.userInfo.userId : '') ) {
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
    // 删除成长
    deleteDynamic() {
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

/** menus-popup */
.p-details /deep/.van-popup {
  width: 284px;
  height: 92px;
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