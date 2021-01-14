<template>
  <div class="m-record-list-wrapper">
    
    <!-- 课程章节信息 -->
    <van-sticky offset-top="2.24rem" v-if="chapters">
      <div class="record-list-header">总共{{ chapters.info.chapterNumber }}章·{{ chapters.info.nodeNumber }}节课 </div>
    </van-sticky>

    <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
      <van-collapse v-model="activeNames" accordion :border="false">
        <van-collapse-item v-for="(item, i) in chapters.list" :title="item.title" :name="i" :key="i">
          <div v-for="(lecture, j) in item.lectures" class="record-item" :key="j">
            <span :class="lecture.haveLearned ? 'record-item-title-active':'record-item-title'">{{ lecture.title }}</span>
            <span class="record-item-percentage" v-if="lecture.haveLearned"> 已看：{{ lecture.percentage }}%</span>
          </div>
        </van-collapse-item>
      </van-collapse>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'M-Record-List',

  data:() => ({
    loading: false,
    finished: false,
    activeNames: ['1'],
    finishedTxt: '没有更多了',
  }),

  watch:{
    'chapters.status' : function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
      }
    },
    
    'chapters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt = '没有更多了'
      }
    }
  },

  computed: {
    ...mapGetters({
      chapters: 'course/recordChaptersGetters'
    }),

    courseId() {
      return this.$route.query.courseId
    },
  },

  created() {
    this.initRecordPage()
  },

  methods: {
     ...mapMutations({
      clearChapter :'course/clearRecordChapter'
    }),
    
    ...mapActions({
      appendRecordChapters :'course/appendRecordChapters'
    }),

    initRecordPage() {
      const params = {
        page: 1,
        courseId:this.courseId
      }

      this.appendRecordChapters(params)
    },

    onLoad() {
      if (this.chapters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.chapters.status === 'loading') return false
      const newPage = this.chapters.pageInfo.pages + 1
      this.appendRecordChapters({ courseId: this.courseId, page: newPage })
    },
  },

  beforeDestroy() {
    this.clearChapter()
  }
}
</script>

<style lang="less" scoped>
.m-record-list-wrapper {
  width: 100%;
  position: relative;
}

.record-list-header {
  width: 375px;
  height: 32px;
  padding: 0 16px;
  line-height: 32px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #75737E;
  background: #FFFFFF;
}

.van-collapse {
  /deep/ .van-cell {
    width: 100%;
    height: 40px;
    font-size: 15px;
    font-family: @medium;
    font-weight: 600;
    color: #18252C;
    background: #F7F7F7;

    &::after {
      border-bottom: none;
    }
  }

  /deep/.van-collapse-item__content {
    padding: 0;
  }
}

.record-item {
  width: 100%;
  max-height: 70px;
  padding: 16px;
  font-weight: 400;
  font-family: @regular;
  display: flex;
  flex-direction: column;
  position: relative;

  &-title {
    font-size: 15px;
    line-height: 14px;
    color: #18252C;
  }

  &-title-active {
    font-size: 15px;
    line-height: 14px;
    color: #75737EFF;
  }

  &-percentage {
    font-size: 13px;
    color: #75737E;
    line-height: 13px;
    margin-top: 8px;
  }
  
  &:not(:first-child) {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: 345px;
      height: 1px;
      background: #EAEAEAFF;
    }
  }
}
</style>
