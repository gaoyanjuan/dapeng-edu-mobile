<template>
  <div class="m-living-wrapper">

    <!-- 当前选择期标题 -->
    <div class="state-select-header" v-if="selected" @click="openStagePop">
      <span class="stage-txt">{{selected.title}}（{{calcState()}}）</span>
      <img v-if="this.liveStage.length > 1" class="icon-select" :src="select" alt="select"/>
    </div>

    <!-- 当前选择期下的章节列表 -->

    <!-- 用户可选择期 Popup -->
    <m-stage-popup :stagePop="stagePop" @changeStage="changeStage"></m-stage-popup>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'M-Living-List',
  
  data: () => ({
    liveStage:[],
    selected: null,
    stagePop: { show: false, list: [] },
    select: require('@/assets/icons/course/stage-select.png')
  }),

  computed: {
    courseId() {
      return this.$route.query.courseId
    },
  },

  created() {
    this.initChapterStage()
  },

  methods:{
    ...mapActions({
      appendStages: 'course/appendStages',
    }),

    initChapterStage() {
      const params = {courseId:this.courseId}

      this.appendStages(params).then( res => {
        this.liveStage = res.data.liveStage
        this.selected = res.data.liveStage[0]
      })
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
      this.selected = this.liveStage[index]
      this.stagePop.show = false
    },

    openStagePop() {
      if(this.liveStage.length <= 1) {
        return false
      }

      this.stagePop.show = true
      this.stagePop.list = []

      this.liveStage.forEach(element => {
        this.stagePop.list.push(element.title)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.state-select-header {
  width: 375px;
  height: 40px;
  padding: 12px 16px;
  background: #FFF8EE;
  .l-flex-row();

  .stage-txt {
    max-width: 260px;
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
</style>
