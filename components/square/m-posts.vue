<template>
  <div class="m-works">
    <van-skeleton title avatar :row="8" :loading="loading">
      <!-- header -->
      <m-avatar
        avatar-style="width:40px; height:40px;"
        :submit-time="modifiedTime"
        :userInfo="user"
        :square-type="squareType"
        :attention="listItemData.isAttention"
        v-on:onOpenMenus="onShowMenus"
        :pageName="pageName"
        :listItemData="listItemData"
      />

      <!-- content -->
      <div class="works__cot">
        <div class="work__row--txt" @click="toDetail" v-html="$options.filters.formatEmotions(listItemData.content)"></div>
        <div class="work__row__photos--group">
          <m-photos v-if="listItemData.imgInfo" :photos="listItemData.imgSmall" @openImagePreview="openImagePreview"></m-photos>
          <m-homework-video :videoImg="listItemData.videoImg" v-if="listItemData.type === 'VIDEO'"></m-homework-video>
          <m-posts-remark v-if="listItemData.recommendType" :label="listItemData.recommendType" source="listPage"/>
        </div>
      </div>

      <!-- classification -->
      <div class="works__class" @click="toDetail">
        <m-posts-class :remark="listItemData.college ? `${squareType}·${listItemData.college.name.replace(/学院/, '')}` : `${squareType}`" />
      </div>

      <!-- Label -->
      <div class="works__lab">
        <m-label
          v-if="listItemData.task || listItemData.activity"
          :labelData="listItemData.task"
          :activityData="listItemData.activity"
          :isRequirement="listItemData.isRequirement"
        />
      </div>

      <!-- comment 体验课不展示讲师评论 -->
      <div class="works__comment" v-if="commentList && courseType !=='TEST'">
        <m-teacher-audio
          :teacherName="commentList.user ? commentList.user.nickname : ''"
          :teacherType="courseType"
          :time="commentList.createTime"
          :audioUrl="commentList.ext ? commentList.ext.approvedAudioUrl : ''"
          :content="commentList.content"
          :audioCount="commentList.ext ? commentList.ext.approvedAudioLength : 0"
          :isAudio="commentList.ext ? commentList.ext.approvedType === 'AUDIO' : false"
          :propIndex="propIndex"
        />
      </div>
      
      <!-- footer -->
      <div class="works__fot">
        <div class="fot__rh--wrap">
          <!-- 评论 -->
          <div class="fot__rh__commernt--wrap" @click="openComment">
            <img class="fot__comment" :src="comment" alt="comment" />
            <span class="fot__nums">{{ listItemData.commentCount | studentsCount }}</span>
          </div>
          <!-- 喜欢 -->
          <div class="fot__rh__love--wrap" @click="onLove">
            <img class="fot__love" v-if="isPraise" :src="unLove" alt="love" />
            <img class="fot__love" v-else :src="love" alt="unlove" />
            <span class="fot__nums">{{ praiseCount | studentsCount }}</span>
          </div>
          <!-- 收藏 -->
          <div class="fot__rh__star--wrap" @click="onCollect">
            <img class="fot__star" :src="isCollection ? unStar : star" alt="star" />
          </div>
        </div>
      </div>
    </van-skeleton>

    <!-- 帖子 菜单弹层 -->
    <van-popup v-model="showMenusPopup" round overlay-class="menus__popup">
      <nuxt-link v-if="propSquareType === 'HOMEWORK'" tag="div" :to="`/copy-form?taskId=${listItemData.task ? listItemData.task.taskId : '' }&id=${listItemData.user.userId ? listItemData.user: '' }`" class="menus__popup__item">Ta抄作业</nuxt-link>
      <div class="menus__popup__item" @click="handleCopyJobNummer">作业号</div>
      <div class="menus__popup__item" @click="onShowMenus">取消</div>
    </van-popup>

    <!-- 顶部Navbar  菜单弹层 -->
    <van-popup v-model="showPublishMenusPopup" round overlay-class="menus__popup">
      <div v-if="pageName === 'myHomework' && listItemData.type !== 'VIDEO'" class="menus__popup__item" @click="editHomework">编辑</div>
      <div class="menus__popup__item" @click="deleteItem">删除</div>
      <div class="menus__popup__item" @click="onShowMenus">取消</div>
    </van-popup>

    <!--Image preview -->
    <m-image-preview
      :image-preview="imagePreview"
      @openComment="openComment"
      @onLove="onLove"
      @onCollect="onCollect"
    />

    <!-- 删除二次确认弹窗 -->
    <m-delete-dialog
      :deleteDialogParams="deleteDialogParams"
      @confirmDelete="confirmDelete"
    />

  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'WorksCard',
  props:{
    propIndex:{
      type: Number,
      default: 0
    },
    path:{
      type: String,
      default: ''
    },
    propSquareType: {
      type: String,
      default: 'HOMEWORK'
    },
    modifiedTime: {
      type: Number,
      dafault: 0
    },
    commentList: {
      type: Object,
      default: () => {
        return null
      }
    },
    courseType: {
      type: String,
      default: ''
    },
    listItemData: {
      type: Object,
      require: true,
      default: function () {
        return {
          user: {
            nickname: '佚名',
            avatar: ''
          },
          task: {
            taskId: ''
          }
        }
      }
    },
    pageName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    loading: true,
    showMenusPopup:false,
    isPraise: false,
    isCollection: false,
    praiseCount: 0,
    // 图片预览
    imagePreview: {
      show: false,
      images: [],
      startPosition: 1,
      commentNums:0,
      loveNums:0
    },
    comment: require('@/assets/icons/posts/posts-comment.png'),
    love: require('@/assets/icons/posts/posts-love.png'),
    star: require('@/assets/icons/posts/posts-star.png'),
    unLove: require('@/assets/icons/posts/posts-unlove.png'),
    unStar: require('@/assets/icons/posts/posts-unstar.png'),
    showPublishMenusPopup: false,
    deleteDialogParams: {
      show: false
    }
  }),
  computed: {
    user () {
      if (this.listItemData) {
        return this.listItemData.user
      }
    },
    squareType () {
      if (this.propSquareType === 'WORKS') {
        return '作品'
      } else if (this.propSquareType === 'HOMEWORK') {
        return '作业'
      } else if (this.propSquareType === 'LIFE') {
        return '动态'
      } else if (this.propSquareType === 'ACTIVITY_POST') {
        return '活动'
      }
    },
    typePath () {
      if (this.propSquareType === 'WORKS') {
        return '/details/works-page-details'
      } else if (this.propSquareType === 'HOMEWORK') {
        return '/details/homework-page-details'
      } else if (this.propSquareType === 'LIFE') {
        return '/details/dynamic-page-details'
      } else if (this.propSquareType === 'ACTIVITY_POST') {
        return '/details/growth-page-details'
      }
    },
  },
  created () {
    if (this.listItemData) {
      this.praiseCount = this.listItemData.praiseCount
      this.isPraise = this.listItemData.isPraise
      this.isCollection = this.listItemData.isCollection
    }
  },
  watch: {
    'listItemData': function (newVal, oldVal) {
      this.praiseCount = newVal.praiseCount
      this.isPraise = newVal.isPraise
      this.isCollection = newVal.isCollection
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods: {
    ...mapActions({
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike',
      queryCollection: 'comment/queryCollection',
      queryDeleteCollection: 'comment/queryDeleteCollection',
      deleteHomework: 'user/deleteHomework',
      appendPublishHomework: 'user/appendPublishHomework',
      deleteWorks: 'user/deleteWorks',
      appendPublishWorks: 'user/appendPublishWorks',
      deleteDynamics: 'user/deleteDynamics',
      appendPublishDynamic: 'user/appendPublishDynamic',
      deletePosts: 'user/deletePosts',
      appendPublishGrowth: 'user/appendPublishGrowth'
    }),
    ...mapMutations('user', [
      'clearPublishHomework',
      'clearPublishWorks',
      'clearPublishDynamic',
      'clearPublishGrowth',
      'deleteUserLikes',
      'deleteUserFavorites'
    ]),
    /** 复制作业号 */
    handleCopyJobNummer() {
      /**
       * vue-clipboard2 Usage
       * https://www.npmjs.com/package/vue-clipboard2
       */
      const identCode = this.listItemData.identificationCode
      this.$copyText(identCode).then(function (e) {
        console.log(e.text)
      }, function(e) {
        console.log('Can not copy')
      })
      this.showMenusPopup = false
    },
    /**
     * 打开图片预览
     * @iamges:图片列表
     * @index：当前图片索引
     */
    openImagePreview(index) {
      this.imagePreview.images = this.handleFilterImage(this.listItemData.imgInfo)
      this.imagePreview.startPosition = index
      this.imagePreview.loveNums = this.listItemData.praisesCount
      this.imagePreview.commentNums = this.listItemData.commentCount
      this.imagePreview.show = true
    },
    // 图片提取器
    handleFilterImage(images) {
      let gallery = []
      images.forEach((item) => {
        gallery.push(item.url)
      })
      return gallery
    },
    /** 打开/关闭菜单 */
    onShowMenus() {
      if(this.pageName.indexOf('my')!== -1) {
        this.showPublishMenusPopup = !this.showPublishMenusPopup
        return
      }
      this.showMenusPopup = !this.showMenusPopup
    },
     // 评论操作
    openComment() {
      console.log('comment')
    },
    // 收藏
    onCollect() {
      if (this.isCollection) {
        this.isCollection = false
        this.queryDeleteCollection({
          id: this.listItemData.id,
          type: this.propSquareType
        }).then(()=>{
          if (this.pageName === 'userCollection') {
            let payload = {
              type: this.propSquareType,
              index: this.propIndex
            }
            this.deleteUserFavorites(payload)
          }
          
        })
        .catch(() => {
          this.isCollection = true
        })
      } else {
        this.isCollection = true
        this.queryCollection({
          id: this.listItemData.id,
          type: this.propSquareType,
          createdId: this.listItemData.user.userId,
          contentType: this.listItemData.type

        }).catch(() => {
          this.isCollection = false
        })
      }
    },
    //喜欢操作
    onLove() {
      if (this.isPraise) {
        this.isPraise = false
        this.praiseCount -= 1
        this.queryUnLike({
          id: this.listItemData.id,
          type: this.propSquareType
        }).then(()=>{
          if (this.pageName === 'userLike') {
            let payload = {
              type: this.propSquareType,
              index: this.propIndex
            }
            this.deleteUserLikes(payload)
          }
        })
        .catch(() => {
          this.isPraise = true
          this.praiseCount += 1
        })
      } else {
        this.isPraise = true
        this.praiseCount += 1
        this.queryLike({
          id: this.listItemData.id,
          type: this.propSquareType,
          createdId: this.listItemData.user.userId,
          contentType: this.listItemData.type
        }).catch(() => {
          this.isPraise = false
          this.praiseCount -= 1
        })
      }
    },
    /** 进入详情 */
    toDetail () {
      if (this.propSquareType) {
        if (this.listItemData.tagsId) {
          this.$router.push({
            path: this.typePath,
            query: {
              id: this.listItemData.id,
              tagsId: this.listItemData.tagsId,
              topicType: this.listItemData.topicType,
            }
          })
        } else {
          this.$router.push({
            path: this.typePath,
            query: {
              id: this.listItemData.id,
            }
          })
        }
      } else {
        if (this.listItemData.tagsId) {
          this.$router.push({
            path: this.path,
            query: {
              id: this.listItemData.id,
              tagsId: this.listItemData.tagsId,
              topicType: this.listItemData.topicType,
            }
          })
        } else {
          this.$router.push({
            path: this.path,
            query: {
              id: this.listItemData.id,
            }
          })
        }
      }
    },
    // 删除
    deleteItem() {
      this.deleteDialogParams.show = true
      this.showPublishMenusPopup = false
    },
    confirmDelete() {
      if(this.propSquareType === 'HOMEWORK') {
        this.deleteHomework({ id: this.listItemData.id })
        .then(() => {
          this.$toast('删除成功')
          this.clearPublishHomework()
          this.appendPublishHomework({
            userId: this.$route.query.userId,
            page: 1,
            size: 10
          })
        })
      }else if(this.propSquareType === 'WORKS') {
        this.deleteWorks({ id: this.listItemData.id })
        .then(() => {
          this.$toast('删除成功')
          this.clearPublishWorks()
          this.appendPublishWorks({
            userId: this.$route.query.userId,
            page: 1,
            size: 10
          })
        })
      }else if(this.propSquareType === 'LIFE') {
        this.deleteDynamics({ id: this.listItemData.id })
        .then(() => {
          this.$toast('删除成功')
          this.clearPublishDynamic()
          this.appendPublishDynamic({
            userId: this.$route.query.userId,
            page: 1,
            size: 10
          })
        })
      }else if(this.propSquareType === 'ACTIVITY_POST') {
        this.deletePosts({ id: this.listItemData.id })
        .then(() => {
          this.$toast('删除成功')
          this.clearPublishGrowth()
          this.appendPublishGrowth({
            userId: this.$route.query.userId,
            page: 1,
            size: 10
          })
        })
      }
      this.deleteDialogParams.show = false
    },
    // 编辑作业
    editHomework() {
      this.$router.push({
        path: '/submit',
        query: {
          action: 'edit',
          type: this.listItemData.courseType,
          id: this.listItemData.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
/** Variables */
@marginTop: 16px;
@between: ~'space-between';
@around: ~'space-around';
@evenly: ~'space-evenly';
@font-m: @dp-font-medium;
@font-r: @dp-font-regular;

/** Mixins */
.c-flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: @between;
}
.c-flex-cloumn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: @between;
}

/** Style Start */
.m-works {
  width: 100%;
  min-height: 215px;
  padding: 16px;
  z-index: 1;
  background-color: @dp-white;
}

.m-works:not(:first-child) {
  margin-top: 16px;
}

/*** Conent */
.m-works > .works__cot {
  width: 100%;
  height: auto;
  margin-top: @marginTop;
}

.works__cot > .work__row--txt {
  width: auto;
  max-height: 72px;
  font-size: 16px;
  font-family: @font-r;
  font-weight: 400;
  color: #18252c;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  /deep/.emotion {
    width: 20px;
    height: 20px;
    vertical-align: text-bottom;
  }
}

.works__cot > .work__row__photos--group {
  margin-top: 12px;
  position: relative;
}

// classification
.m-works > .works__class {
  margin-top: 12px;
}

// Label
.m-works > .works__lab {
  width: 100%;
  position: relative;
  margin-top: 8px;
}

// Comment
.m-works > .works__comment {
  width: 100%;
  margin-top: 16px;
}

// Footer
.m-works > .works__fot {
  width: 100%;
  height: 24px;
  margin-top: @marginTop;
}

.works__fot > .fot__rh--wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.fot__rh--wrap .fot__comment,
.fot__rh--wrap .fot__love,
.fot__rh--wrap .fot__star {
  width: 24px;
  height: 24px;
}

.fot__rh--wrap .fot__nums {
  font-size: 12px;
  font-family: @dp-font-medium;
  font-weight: 500;
  color: #747C80;
}

.fot-flex-style {
  width: 57px;
  height: 24px;
  display: flex;
  align-items: center;
}

.fot__rh--wrap .fot__rh__commernt--wrap,
.fot__rh--wrap .fot__rh__love--wrap {
  margin-right: 17px;
  .fot-flex-style()
}

.fot__rh--wrap .fot__rh__star--wrap {
  width: 24px;
  height: 24px;
  line-height: 24px;
}

.fot__rh--wrap .fot__nums {
  margin-left: 4px;
}

/** menus-popup */
.m-works /deep/.van-popup {
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
/** Style End */
</style>
