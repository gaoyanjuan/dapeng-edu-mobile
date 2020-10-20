<template>
  <div class="m-works">
    <van-skeleton title avatar :row="8" :loading="loading">
      <!-- header -->
      <m-avatar
        avatar-style="width:40px; height:40px;"
        :submit-time="modifiedTime"
        :userInfo="user"
      />

      <!-- content -->
      <div class="works__cot">
        <div class="work__row--txt" @click="toDetail" v-html="$options.filters.formatEmotions(content)"></div>
        <div v-if="imgInfo" class="work__row__photos--group">
          <div @click="toDetail"><m-photos :photos="imgInfo" /></div>
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
          <div class="fot__rh__commernt--wrap">
            <img class="fot__comment" :src="comment" alt="comment" />
            <span class="fot__nums">{{ listItemData.commentCount | studentsCount }}</span>
          </div>
          <div class="fot__rh__love--wrap">
            <img class="fot__love" :src="love" alt="love" />
            <span class="fot__nums">{{ listItemData.praisesCount | studentsCount }}</span>
          </div>
        </div>
      </div>
    </van-skeleton>
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
    }
  },
  data: () => ({
    loading: true,
    comment: require('@/assets/icons/posts/posts-comment.png'),
    love: require('@/assets/icons/posts/posts-love.png')
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods: {
    toDetail () {
      if (this.listItemData.tagsId) {
        this.$router.push({
          path: this.path,
          query: {
            id: this.listItemData.id,
            tagsId: this.listItemData.tagsId,
            topicType: this.listItemData.type,
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
.fot__rh--wrap .fot__love {
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

.fot__rh--wrap .fot__rh__commernt--wrap {
  margin-right: 17px;
  .fot-flex-style()
}

.fot__rh--wrap .fot__rh__love--wrap {
  .fot-flex-style()
}

.fot__rh--wrap .fot__nums {
  margin-left: 4px;
}
/** Style End */
</style>
