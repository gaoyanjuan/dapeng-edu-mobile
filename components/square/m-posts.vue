<template>
  <div class="m-works">
    <van-skeleton title avatar :row="8" :loading="loading">
      <!-- header -->
      <m-avatar
        avatar-style="width:40px; height:40px;"
        :submit-time="modifiedTime"
        :userInfo="user"
        :square-type="squareType"
        :attention="isAttention"
        v-on:onOpenMenus="onShowMenus"
      />

      <!-- content -->
      <div class="works__cot">
        <div class="work__row--txt" @click="toDetail" v-html="$options.filters.formatEmotions(content)"></div>
        <div v-if="imgInfo" class="work__row__photos--group">
          <m-photos :photos="imgInfo" @openImagePreview="openImagePreview"></m-photos>
          <m-posts-remark v-if="recommendType" :label="recommendType" source="listPage"/>
        </div>
      </div>

      <!-- classification -->
      <div class="works__class" @click="toDetail">
        <m-posts-class :remark="college ? `${squareType}·${college.name.replace(/学院/, '')}` : `${squareType}`" />
      </div>

      <!-- Label -->
      <div class="works__lab">
        <m-label
          v-if="task || activity"
          :labelData="task"
          :activityData="activity"
          :isRequirement="isRequirement"
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
            <img class="fot__love" :src="love" alt="love" />
            <span class="fot__nums">{{ listItemData.praisesCount | studentsCount }}</span>
          </div>
          <!-- 收藏 -->
          <div class="fot__rh__star--wrap" @click="onCollect">
            <img class="fot__star" :src="star" alt="star" />
          </div>
        </div>
      </div>
    </van-skeleton>

    <!-- 帖子 菜单弹层 -->
    <van-popup v-model="showMenusPopup" round overlay-class="menus__popup">
      <nuxt-link tag="div" :to='`/copy-form?taskId=${task.taskId}&id=${user.userId}`' class="menus__popup__item">Ta抄作业</nuxt-link>
      <div class="menus__popup__item" @click="handleCopyJobNummer">作业号</div>
      <div class="menus__popup__item" @click="onShowMenus">取消</div>
    </van-popup>

    <!-- 顶部Navbar  菜单弹层 -->
    <van-popup round overlay-class="menus__popup">
      <nuxt-link v-if="squareType === '作业'" tag="div" to="" class="menus__popup__item">编辑</nuxt-link>
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
  </div>
</template>

<script>
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
    activity: {
      type: Object,
      default: () => {
        return null
      }
    },
    college: {
      type: Object,
      default: () => {
        return null
      }
    },
    squareType: {
      type: String,
      default: '作业'
    },
    activity: {
      type: Object,
      default: () => {
        return null
      }
    },
    college: {
      type: Object,
      default: () => {
        return null
      }
    },
    modifiedTime: {
      type: Number,
      default: 0
    },
    commentList: {
      type: Object,
      default: () => {
        return null
      }
    },
    dataType: {
      type: String,
      default: ''
    },
    courseType: {
      type: String,
      default: ''
    },
    imgInfo: {
      type: Array,
      default: () => {
        return []
      }
    },
    user: {
      type: Object,
      default: () => {
        return {
          nickname: '佚名',
          avatar: ''
        }
      }
    },
    recommendType: {
      type: String,
      default: ''
    },
    task: {
      type: Object,
      default: () => {
        return null
      }
    },
    content: {
      type: String,
      default: ''
    },
    listItemData:{
      type: Object,
      require: true,
      default: function () {
        return null
      }
    },
    isRequirement: {
      type: Boolean,
      default: false
    },
    /**是否关注 */
    isAttention: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    loading: true,
    showMenusPopup:false,
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
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods: {
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
      this.imagePreview.images = this.imgInfo
      this.imagePreview.startPosition = index
      this.imagePreview.loveNums = this.listItemData.praisesCount
      this.imagePreview.commentNums = this.listItemData.commentCount
      this.imagePreview.show = true
    },
    /** 打开/关闭菜单 */
    onShowMenus() {
      this.showMenusPopup = !this.showMenusPopup
    },
     // 评论操作
    openComment() {
      console.log('comment')
    },
    // 收藏
    onCollect() {
      console.log('collect')
    },
    //喜欢操作
    onLove() {
      console.log('love')
    },
    /** 进入详情 */
    toDetail () {
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
    },
    // 删除
    deleteItem() {

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
}

.fot__rh--wrap .fot__nums {
  margin-left: 4px;
}

/** menus-popup */
.m-works /deep/.van-popup {
  width: 284px;
  height: 138px;
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
