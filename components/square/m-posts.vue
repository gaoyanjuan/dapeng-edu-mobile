<template>
  <div class="m-works" @click="toDetail" v-if="listItemData">
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
      <div class="work__row--txt" v-html="$options.filters.formatEmotions(listItemData.content)"></div>
      <div class="work__row__photos--group">
        <m-photos v-if="listItemData.type === 'TEXT' && listItemData.imgInfo" :photos="listItemData.imgSmall" @openImagePreview="openImagePreview"></m-photos>
        <m-homework-video :videoImg="listItemData.videoImg" v-if="listItemData && listItemData.type === 'VIDEO'" @toDetail="toDetail"></m-homework-video>
        <m-posts-remark v-if="listItemData.recommendType" :label="listItemData.recommendType" source="listPage"/>
      </div>
    </div>

    <!-- classification -->
    <div class="works__class">
      <m-posts-class
        :remark="listItemData.college && listItemData.college.name ? `${squareType}·${listItemData.college.name.replace(/学院/, '')}` : `${squareType}`"
        :labels="listItemData.labels"
      />
    </div>

    <!-- Label -->
    <div class="works__lab">
      <m-topic-label
        v-if="listItemData.task || listItemData.activity"
        :labelData="listItemData.task"
        :activityData="listItemData.activity"
        :isRequirement="listItemData.isRequirement"
      />
    </div>

    <!-- comment 体验课不展示讲师评论 -->
    <div class="works__comment" v-if="showComment" @click.stop="">
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
        <div class="fot__rh__commernt--wrap" @click.stop="openComment">
          <img class="fot__comment" :src="comment" alt="comment" />
          <span class="fot__nums">{{ commentCount | studentsCount }}</span>
        </div>
        <!-- 喜欢 -->
        <div class="fot__rh__love--wrap" @click.stop="onLove">
          <img class="fot__love" v-if="isPraise" :src="unLove" alt="love" />
          <img class="fot__love" v-else :src="love" alt="unlove" />
          <span class="fot__nums">{{ praiseCount | studentsCount }}</span>
        </div>
        <!-- 收藏 -->
        <div class="fot__rh__star--wrap" @click.stop="onCollect">
          <img class="fot__star" :src="isCollection ? unStar : star" alt="star" />
        </div>
      </div>
    </div>

    <div @click.stop="">
      <!-- 帖子 菜单弹层 -->
      <van-popup v-model="showMenusPopup" round overlay-class="menus__popup" :transition-appear="true">
        <div v-if="showCopyFlag" class="menus__popup__item" @click.stop="toCopyForm">Ta抄作业</div>
        <div class="menus__popup__item" @click.stop="handleCopyJobNummer">作业号</div>
        <div class="menus__popup__item" @click.stop="onShowMenus">取消</div>
      </van-popup>

      <!-- 复制作业号 -->
      <m-copy-code :show-popup="showCopyCode" @closed="onClosed"/>

      <!-- 顶部Navbar  菜单弹层 -->
      <van-popup v-model="showPublishMenusPopup" round overlay-class="menus__popup" :transition-appear="true">
        <div v-if="canEdit" class="menus__popup__item" @click.stop="editHomework">编辑</div>
        <div v-if="showonCollect" class="menus__popup__item" @click.stop="onCollect">{{ isCollection ? '取消收藏' : '收藏' }}</div>
        <div v-if="canDelete" class="menus__popup__item" @click.stop="deleteItem">删除</div>
        <div v-if="pageName === 'myHomework' && listItemData.type !== 'VIDEO'" class="menus__popup__item" @click="handleCopyJobNummer">作业号</div>
        <div class="menus__popup__item" @click.stop="onShowMenus">取消</div>
      </van-popup>
    </div>

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

    <!-- 评论框弹层 -->
    <m-comment-popup ref="commentPopup" :comment="commentPop" @sendComment="sendComment" @click.native.stop="stop"/>
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
    listType: {
      type: String,
      default: ''
    },
    propSquareType: {
      type: String,
      default: 'HOMEWORK'
    },
    isGrowth: {
      type: String,
      default: ''
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
    popPraiseCount: 0,
    popIsPraise: false,
    popIsCollection: false,
    popCommentCount: 0,
    commentPop: { show: false },
    showMenusPopup:false,
    showCopyCode: { show: false, jobNummer: null },
    // 图片预览
    imagePreview: {
      show: false,
      images: [],
      drawed: [],
      isDrawed: false,
      startPosition: 1,
      isPraise: false,
      isCollection: false,
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
    },
    commentFlag: true
  }),
  computed: {
    ...mapGetters({
      userinfo: 'user/userInfoGetters'
    }),
    canEdit () {
      return this.pageName === 'myHomework' && this.listItemData.type !== 'VIDEO' && this.listItemData.approvedLevel === '0'
    },
    canDelete () {
      if (this.pageName === 'myHomework') {
        return this.pageName === 'myHomework' && this.listItemData.type !== 'VIDEO' && this.listItemData.approvedLevel === '0'
      } else {
        return this.userinfo && this.userinfo.userId === this.listItemData.user.userId
      }
    },
    // 主体id
    mainId () {
      if (this.isGrowth) {
        return this.listItemData.tagsId
      } else {
        return this.listItemData.id
      }
    },
    // 是否需要回显
    praiseCount () {
      if (this.$isSave(this.$route.name)) {
        return this.listItemData.praiseCount
      } else {
        return this.popPraiseCount
      }
    },
    isPraise () {
      if (this.$isSave(this.$route.name)) {
        return this.listItemData.isPraise
      } else {
        return this.popIsPraise
      }
    },
    isCollection () {
      if (this.$isSave(this.$route.name)) {
        return this.listItemData.isCollection
      } else {
        return this.popIsCollection
      }
    },
    commentCount () {
      if (this.$isSave(this.$route.name)) {
        return this.listItemData.commentCount
      } else {
        return this.popCommentCount
      }
    },
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
      } else if (this.propSquareType === 'POST') {
        return '动态'
      } else if (this.propSquareType === 'ARTICLE') {
        return '阅读'
      } else if (this.propSquareType === 'MOVIE') {
        return '长视频'
      }
    },
    typePath () {
      if (this.propSquareType === 'WORKS') {
        return '/details/works'
      } else if (this.propSquareType === 'HOMEWORK') {
        return '/details/homework'
      } else if (this.propSquareType === 'LIFE') {
        return '/details/dynamic'
      } else if (this.propSquareType === 'ACTIVITY_POST') {
        return '/details/growth'
      }
    },
    showCopyFlag () {
      if(this.userinfo && this.userinfo.userId === this.listItemData.user.userId) {
        return false
      } else {
        return true
      }
    },
    showonCollect () {
      if (this.userinfo) {
        return this.$route.query.userId !== this.userinfo.userId
      }
    },
    functionName () {
      return this.$getFunctionName(this.listType)
    },
    showComment() {
      if(this.commentList && this.courseType && this.courseType !=='TEST') {
        return true
      }else if(this.commentList && this.courseType && this.courseType ==='TEST') {
        if(!this.userinfo || !this.userinfo.userId) {
          return false
        }
        if(this.pageName === 'homework' || this.pageName === 'requirement') {
          if(this.userinfo && this.userinfo.userId && this.userinfo.userId === this.listItemData.user.userId) {
            return true
          }else {
            return false
          }
        }else {
          return true
        }
        
      }
    }
  },
  created () {
    if (!this.$isSave(this.$route.name)) {
      this.popIsPraise = this.listItemData.isPraise
      this.popIsCollection = this.listItemData.isCollection
      this.popPraiseCount = this.listItemData.praiseCount
      this.popCommentCount= this.listItemData.commentCount
    }
  },
  methods: {
    stop () {},
    ...mapActions({
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike',
      queryCollection: 'comment/queryCollection',
      queryDeleteCollection: 'comment/queryDeleteCollection',
      appendNewComment: 'comment/appendNewComment',
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
      if(!this.$login()) {
        return 
      }
      this.showCopyCode.show = true
      this.showCopyCode.jobNummer = this.listItemData.identificationCode
      this.showMenusPopup = false
      this.showPublishMenusPopup = false
    },
    /** 关闭弹窗 */
    onClosed() {
      this.showCopyCode.show = false
    },
    /**
     * 打开图片预览
     * @iamges:图片列表
     * @index：当前图片索引
     */
    openImagePreview(index) {
      let drawed = { show: false, list: []}

      if(this.pageName === 'myHomework' && this.listItemData.doodlingImg ) {
        if(this.userinfo.userId === this.listItemData.user.userId) {
          drawed.show = true
          drawed.list = this.listItemData.doodlingImg
        }
      }

      this.imagePreview = {
        show: true,
        drawed: drawed.list,
        isDrawed: drawed.show,
        startPosition: index,
        images: this.listItemData.img,
        isPraise: this.isPraise,
        isCollection: this.isCollection,
        praiseCount: this.praiseCount,
        commentCount: this.commentCount
      }
    },

    /** 打开/关闭菜单 */
    onShowMenus() {
      if(this.pageName.indexOf('my')!== -1 && this.pageName !== 'myRecommend') {
        // 是否是作业
        if (this.listItemData.approvedLevel) {
          if (this.userinfo && this.userinfo.userId === this.listItemData.user.userId) {
            this.showPublishMenusPopup = !this.showPublishMenusPopup
            return
          } else {
            this.showMenusPopup = !this.showMenusPopup
            return
          }
        }
        this.showPublishMenusPopup = !this.showPublishMenusPopup
        return
      }
      this.showMenusPopup = !this.showMenusPopup
    },
    sendComment (text) {
      if(!this.commentFlag) return false
      this.commentFlag = false
      this.appendNewComment({
        topicId: this.mainId,
        topicType: this.propSquareType,
        content: text,
        label: {
          contentType: this.listItemData.type
        }
      })
      .then(({status, data}) => {
        this.commentFlag = true
        this.$refs.commentPopup.resetPopup()
        if (!data.highRisk && data.id) {
          this.$toast('评论成功')
          if (this.$isSave(this.$route.name)) {
            this.$store.commit(`${this.functionName}`, {
              index: this.propIndex,
              type: 'comment',
              value: 1
            })
          }  else {
            this.popCommentCount += 1
          }
        }
      })
      .catch((error) => {
        this.commentFlag = true
        if (error && error.data && error.data.message) {
          this.$toast(error.data.message)
        }
      })
    },
     // 评论操作
    openComment() {
      if(!this.$login()) {
        return 
      }
      this.commentPop.show = true
    },
    // 收藏
    onCollect() {
      if(!this.$login()) {
        return 
      }
      if (this.isCollection) {
        if (this.$isSave(this.$route.name)) {
          this.$store.commit(`${this.functionName}`, {
            index: this.propIndex,
            type: 'collect',
            value: false
          })
        } else {
          this.popIsCollection = false
        }
        this.imagePreview = {
          ...this.imagePreview,
          isCollection: this.isCollection
        }
        this.queryDeleteCollection({
          id: this.mainId,
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
          if (this.$isSave(this.$route.name)) {
          this.$store.commit(`${this.functionName}`, {
              index: this.propIndex,
              type: 'collect',
              value: true
            })
          } else {
            this.popIsCollection = true
          }
          this.imagePreview = {
            ...this.imagePreview,
            isCollection: this.isCollection
          }
        })
        this.showPublishMenusPopup = false
      } else {
        if (this.$isSave(this.$route.name)) {
          this.$store.commit(`${this.functionName}`, {
            index: this.propIndex,
            type: 'collect',
            value: true
          })
        } else {
          this.popIsCollection = true
        }
        this.imagePreview = {
          ...this.imagePreview,
          isCollection: this.isCollection
        }
        this.queryCollection({
          id: this.mainId,
          type: this.propSquareType,
          createdId: this.listItemData.user.userId,
          contentType: this.listItemData.type
        })
        this.showPublishMenusPopup = false
      }
    },
    //喜欢操作
    onLove() {
      if(!this.$login()) {
        return 
      }
      if (this.isPraise) {
        if (this.$isSave(this.$route.name)) {
          this.$store.commit(`${this.functionName}`, {
            index: this.propIndex,
            type: 'love',
            value: {
              praise: false,
              count: -1
            }
          })
        } else {
          this.popIsPraise = false
          this.popPraiseCount -= 1
        }
        this.imagePreview = {
          ...this.imagePreview,
          praiseCount: this.praiseCount,
          isPraise: this.isPraise
        }
        this.queryUnLike({
          id: this.mainId,
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
      } else {
        if (this.$isSave(this.$route.name)) {
          this.$store.commit(`${this.functionName}`, {
            index: this.propIndex,
            type: 'love',
            value: {
              praise: true,
              count: 1
            }
          })
        } else {
          this.popIsPraise = true
          this.popPraiseCount += 1
        }
        this.imagePreview = {
          ...this.imagePreview,
          praiseCount: this.praiseCount,
          isPraise: this.isPraise
        }
        this.queryLike({
          id: this.mainId,
          type: this.propSquareType,
          createdId: this.listItemData.user.userId,
          contentType: this.listItemData.type
        })
      }
    },
    /** 进入详情 */
    toDetail () {
      let from = ''
      // 只有个人中心页-才会看到涂鸦
      if(this.$route.name === 'personal-center-publish') {
        from = 'personal'
      }
      
      this.$cookiz.remove('isLogin')
      this.$store.commit('changeListData', {
        listType: this.listType,
        propIndex: this.propIndex,
        anchorId: this.mainId
      })
      if (this.propSquareType) {
        if (this.listItemData.tagsId) {
          this.$router.push({
            path: this.typePath,
            query: {
              id: this.mainId,
              tagsId: this.listItemData.tagsId,
              topicType: this.listItemData.topicType,
              from: from
            }
          })
        } else {
          this.$router.push({
            path: this.typePath,
            query: {
              id: this.mainId,
              from: from
            }
          })
        }
      } else {
        if (this.listItemData.tagsId) {
          this.$router.push({
            path: this.typePath,
            query: {
              id: this.mainId,
              tagsId: this.listItemData.tagsId,
              topicType: this.listItemData.topicType,
              from: from
            }
          })
        } else {
          this.$router.push({
            path: this.typePath,
            query: {
              id: this.mainId,
              from: from
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
    },
    toCopyForm() {
      if(!this.$login()) {
        return 
      }
      this.$router.push({
        path: `/copy-form?taskId=${this.listItemData.id ? this.listItemData.id : '' }&id=${this.listItemData.user.userId ? this.listItemData.user.userId: '' }`
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
  height: 24px;
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
