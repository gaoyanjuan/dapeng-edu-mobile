<template>
  <div v-if="growth" class="p-details">
    <!-- Back last page -->
    <m-navbar :title="title" :attention="growth.isAttention" :show-right-menu="true" @onOpenMenus="onShowMenus"/>

    <!-- Main Block -->
    <div class="details-content-wrap">
      <!-- Gallery -->
      <m-gallery :photos="growth.img" :photoInfo="growth.imgInfo" :item="growth"/>

      <div class="details-inner-content-wrap">
        <!-- Avatar -->
        <m-avatar
          avatar-style="width:36px; height:36px;"
          :user-info="growth.user"
          :submit-time="growth.createTime"
        />
        
        <!-- Conetnt -->
        <div class="inner-content-txt">
          <span class="txt" v-html="$options.filters.formatEmotions(growth.content)"></span>
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
        <m-tab-item :selected="likeSelected" name="喜欢" :count="growth.praiseCount">
          <m-like-list />
        </m-tab-item>
      </m-tabs>
    </div>

    <!-- 底部评论框 -->
    <div class="details-footer-comment-wrap">
      <div class="footer-input" @click="openComment"> 留下你的评论吧 </div>
      <img class="footer-icon-like" :src="like" alt="like" @click="onLikeEvent"/>
      <img class="footer-icon-comment" :src="comment" alt="comment" @click="commentPop.show = true"/>
      <img class="footer-icon-collect" :src="collect" alt="collect" @click="onCollectEvent"/>
    </div>

    <!-- 菜单弹层 -->
    <van-popup v-model="showMenusPopup" round overlay-class="menus__popup">
      <div class="menus__popup__item" @click="deleteGrowth">删除</div>
      <div class="menus__popup__item" @click="onShowMenus">取消</div>
    </van-popup>

    <!-- 评论框弹层 -->
    <m-comment-popup :comment="commentPop" @sendComment="sendComment"/>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'Details',
  data:() => ({
    title:'帖子详情',
    commentSelected: true,
    likeSelected: false,
    showMenusPopup: false,
    commentPop: { show: false },
    comment: require('@/assets/icons/posts/posts-comment.png'),
    like: require('@/assets/icons/posts/posts-love.png'),
    collect: require('@/assets/icons/posts/posts-star.png'),
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
  methods: {
    /** 打开/关闭菜单 */
    onShowMenus() {
      this.showMenusPopup = !this.showMenusPopup
    },
    // 删除成长
    deleteGrowth() {},

    // 打开评论弹窗
    openComment() {
      this.commentPop.show = true
    },

    // 删除成长
    deleteDynamic() {},

    // 喜欢事件
    onLikeEvent() { console.log('like') },

    // 收藏事件
    onCollectEvent() { console.log('collect') },

    // 评论发送
    sendComment() { console.log('发送成功') }
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


/** footer comment */
.details-footer-comment-wrap {
  width: 375px;
  height: 41px;

  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;

  display: flex;
  align-items: center;
  padding: 0 16px;

  background-color: @dp-white;
  background-image: url('~@/assets/icons/comment/footer-comment-bg.png');
  background-repeat: no-repeat;
  background-size: 375px 41px;
  background-position: center;

  .footer-icon-like,
  .footer-icon-comment,
  .footer-icon-collect {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  
  .footer-icon-like,
  .footer-icon-comment {
    margin-right: 20px;
  }
}

.details-footer-comment-wrap .footer-input {
  width: 215px;
  height: 30px;
  line-height: 30px;
  padding-left: 18px;
  margin-right: 16px;
  background: #F7F7F7;
  border-radius: 18px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #A6AEA9;
  cursor: pointer;
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