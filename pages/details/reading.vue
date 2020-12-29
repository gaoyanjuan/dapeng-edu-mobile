<template>
  <div class="p-details">
    <!-- Header Block -->
    <m-navbar
      :show-right-menu="showRightMenuFlag"
      @onOpenMenus="onShowMenus"
      title="阅读详情"
    />
    
    <!-- Body Block -->
    <section v-if="reading" class="posts-details-wrap">
      <!-- Title -->
      <div class="posts-title"> {{reading.title}} </div>

      <!-- Avatar -->
      <m-avatar
        avatar-style="width:40px; height:40px;"
        :user-info="reading.user"
        :attention="reading.isAttention"
        :submit-time="reading.createTime"
      />

      <!-- Content -->
      <div class="posts-content">
        <div class="posts-inner-text" ref="richText" v-html="reading.content"></div>
        <div class="posts-label">阅读·{{ reading.college.name.replace(/学院/, '') }}</div>
      </div>
    </section>

    <!-- Footer Block -->
    <section v-if="reading" class="posts-comment-wrap">
      <m-details-footer
        :propCommentCount="reading.commentCount"
        :propPraiseCount="reading.praiseCount"
        contentType="TEXT"
        topicType="ARTICLE"
        :detailData="reading"
      />
    </section>
    <!-- 菜单弹层 -->
    <van-popup v-model="showMenusPopup" round overlay-class="menus__popup" :transition-appear="true">
      <div class="menus__popup__item" @click="deleteRead">删除</div>
      <div class="menus__popup__item" @click="onShowMenus">取消</div>
    </van-popup>
    
    <!-- 删除二次确认弹窗 -->
    <m-delete-dialog :deleteDialogParams="deleteDialogParams" @confirmDelete="confirmDelete"></m-delete-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name:'P-Reading-Details',
  layout:'navbar',
  data:() => ({
    showMenusPopup: false,
    deleteDialogParams: {
      show: false
    }
  }),

  computed:{
    ...mapGetters({
      reading:'reading/readingDetailsGetters',
      commentList:'comment/commentListGetters',
      likeList:'comment/likesListGetters',
      userInfo: 'user/userInfoGetters'
    }),
    showRightMenuFlag() {
      if(this.reading && this.reading.user && this.reading.user.userId === ( this.userInfo ? this.userInfo.userId : '') ) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    
    if(!this.reading && this.$route.query.id) {
      const _this = this

      this.getDetails({id: this.$route.query.id}).then( res => {
        if (res && res.data) {
          this.$store.commit('details/changeIsPraise', res.data.isPraise)
          this.$store.commit('details/changeIsCollection', res.data.isCollection)
          this.$store.commit('details/changeCommentCount', res.data.commentCount)
          this.$store.commit('details/changePraiseCount', res.data.praiseCount)
        }
        const imgList = this.$refs.richText.getElementsByTagName('img')
        imgList.forEach((element, index) => {
          element.addEventListener('click', function () {
            _this.ImagePreview({ images: res.data.img, startPosition:index})
          })
        })
      })
    }

    if(!this.commentList.data.length && this.$route.query.id) {
      this.getComment({ topicId: this.$route.query.id, topicType: 'ARTICLE' })
    }

    if(!this.likeList.data.length && this.$route.query.id) {
      this.getLikes({ page: 1, type: 'ARTICLE', id: this.$route.query.id})
    }
  },

  methods:{
    ...mapActions({
      getDetails: 'reading/appendReadingDetails',
      getComment: 'comment/queryCommentList',
      getLikes: 'comment/queryLikesList',
      deleteReading: 'user/deleteReading'
    }),

    ...mapMutations({
      clearDetails: 'reading/clearReadingDetails'
    }),
    /** 打开/关闭菜单 */
    onShowMenus() {
      this.showMenusPopup = !this.showMenusPopup
    },
    // 删除作品
    deleteRead() {
      this.showMenusPopup = false
      this.deleteDialogParams.show = true
    },
    confirmDelete() {
      this.deleteReading({ id: this.reading.id }).then(()=>{
        this.$toast('删除成功')
        this.$router.go(-1)
      })
    }
  },
  destroyed () {
    this.clearDetails()
  },
}
</script>

<style lang="less" scoped>

.posts-details-wrap {
  width: 100%;
  margin-top: 44px;
  padding:16px;
  background-color: @dp-white;
  border-bottom: 15px solid #F8F8F8;
}

.posts-details-wrap .posts-title {
  width: 343px;
  min-height: 28px;
  font-size: 20px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #18252C;
  line-height: 28px;
  margin-bottom: 12px;
  word-wrap: break-word;
  word-break: break-all;
}

.posts-details-wrap .posts-content {
  width: 100%;
  min-height: 300px;
  background-color: @dp-white;
}

.posts-content .posts-inner-text {
  width: 343px;
  height: auto;
  margin-top: 12px;
}

.posts-content .posts-inner-text {
  /deep/ & img {
    width: 343px;
    height: 220px;
    border-radius: 8px;
    margin-top: 12px;
    margin-bottom: 12px;
    object-fit: cover;
  }

  /deep/ & p {
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #36404A;
    line-height: 24px;
  }

  /deep/ & p:not(:first-child) {
    margin-top: 15px;
  }
}

.posts-content .posts-label {
  width: 69px;
  height: 24px;
  background: #F7F7F7;
  border-radius: 12px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #465156;
  line-height: 24px;
  text-align: center;
  margin-top: 16px;
}

.posts-comment-wrap {
  padding: 16px 16px 45px;
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
</style>