<template>
  <div class="m-playback-wrapper">
    
    <!-- 当前选择期标题 -->
    <div class="state-select-header">
      <van-sticky offset-top="2.24rem">
        <div class="stage-row" v-if="selected" @click="openStagePop">
          <span class="stage-txt van-ellipsis">{{selected.title}}（{{calcState()}}）</span>
          <img v-if="this.playbackStage.length > 1" class="icon-select" :src="select" alt="select"/>
        </div>
      </van-sticky>
    </div>

    <!-- 当前选择期下的章节列表 -->
    <div class="state-chapter-content">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="chapters.list.length">
          <m-chapter v-for="item in chapters.list" :key="item.id" :chapter="item" :stage="selected"></m-chapter>
        </template>

        <template v-if="!chapters.list.length && finished">
          <div class="chapter-blank-wrap">
            <img class="blank-img" :src="blank" alt="" />
            <span class="blank-txt">暂无直播回放课程～</span>
          </div>
        </template>
      </van-list>
    </div>

    <!-- 用户可选择期 Popup -->
    <m-stage-popup :stagePop="stagePop" @changeStage="changeStage"></m-stage-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name:'M-Playback-List',

  data: () => ({
    playbackStage:[],
    selected: null,
    loading: false,
    finished: false,
    finishedTxt: '没有更多了',
    stagePop: { show: false, list: [] },
    select: require('@/assets/icons/course/stage-select.png'),
    blank: require('@/assets/icons/blank/have-no-course.png')
  }),

  watch:{
    selected(newVal, oldVal) {
      this.clearChapter()
      this.getChapterList()
    },

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
      chapters: 'course/playbackChaptersGetters'
    }),

    courseId() {
      return this.$route.query.courseId
    }
  },

  created() {
    this.initChapterStage()
  },

  methods:{
    ...mapMutations({
      clearChapter :'course/clearPlaybackChapter'
    }),
    
    ...mapActions({
      appendStages: 'course/appendStages',
      appendPlaybackChapters :'course/appendPlaybackChapters'
    }),

    initChapterStage() {
      const params = {courseId:this.courseId}

      this.appendStages(params).then( res => {
        if(res.data.playbackStage.length === 0) {
          this.finishedTxt = ''
          this.finished = true
          return false
        }

        this.playbackStage = res.data.playbackStage
        this.selected = res.data.playbackStage[0]
      })
    },

    getChapterList() {
      const params = {
        page: 1,
        courseId: this.courseId,
        stageId: this.selected.id
      }

      this.appendPlaybackChapters(params)
    },

    onLoad() {
      if (this.chapters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.chapters.status === 'loading') return false
      const newPage = this.chapters.pageInfo.pages + 1
      this.appendPlaybackChapters({ courseId: this.courseId, stageId: this.selected.id, page: newPage })
    },

    // 当前选择期状态
    calcState () {
      switch (this.selected.state) {
        case 'UNSTART':
          return '尚未开始'
          break;
        case 'LIVING':
          return this.selected.completeChapter + '/' + this.selected.totalChapter + '节'
          break;
        case 'FINISH':
          return '已完结'
          break;
      }
    },

    changeStage(index) {
      this.selected = this.playbackStage[index]
      this.stagePop.show = false
    },

    openStagePop() {
      if(this.playbackStage.length <= 1) {
        return false
      }

      this.stagePop.show = true
      this.stagePop.list = []

      this.playbackStage.forEach(element => {
        this.stagePop.list.push(element.title)
      })
    }
  },

  beforeDestroy() {
    this.clearChapter()
  }
}
</script>

<style lang="less" scoped>
.m-living-wrapper {
  width: 100%;
  position: relative;
}

.state-select-header {
  width: 375px;
  height: 40px;
}

.state-select-header .stage-row {
  width: 375px;
  height: 40px;
  padding: 12px 16px;
  background: #FFF8EE;
  .l-flex-row();

  .stage-txt {
    max-width: 280px;
    font-size: 15px;
    font-family: @medium;
    font-weight: 500;
    color: #FF8C0F;
  }

  .icon-select {
    width: 12px;
    height: 12px;
  }
}

.state-chapter-content {
  padding-top: 0;
}

.chapter-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  .blank-img {
    width: 240px;
    height: 126px;
  }

  .blank-txt {
    height: 20px;
    font-size: 14px;
    font-family: @semibold;
    font-weight: 600;
    color: #8D8E8E;
    margin-top: 12px;
  }
}
</style>