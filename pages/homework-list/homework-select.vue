<template>
  <div class="homework-select-page">
    <m-navbar :title="$route.query.title" />

    <section v-if="courseType === 'VIP'">
      <template v-if="stages.length">
        <van-tabs v-model="active" sticky @click="onTabsClick" :swipe-threshold="3" :ellipsis="false" :line-width="tab_line_width">
          <van-tab v-for="(item, index) in stages" :key="index" >
            
            <template #title>
              <div class="van-title-wrap">
                <div class="van-title-content">{{ item.title }}</div>
                <img v-if="item.recommend" class="recommend-image" :src="recommendImg" />
              </div>
            </template>

            <section class="homework-info-wrap" :style="{ paddingTop: `2.34rem` }">
              <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoadVip">
                <template v-if="vip_tasks.list.length">
                  <homework-course-chapter v-for="(item, index) in vip_tasks.list" :key="index" :chapter="item"/>
                </template>
                <template v-if="!vip_tasks.list.length && finished">
                  <div class="have-no-posts-wrap">
                    <img class="icon" :src="blank" alt="" />
                    <span class="txt">暂无内容</span>
                  </div>
                </template>
              </van-list>
            </section>

          </van-tab>
        </van-tabs>
      </template>
      <template v-if="!stages.length && stagesLoad">
        <div class="have-no-posts-wrap">
          <img class="icon" :src="blank" alt="" />
          <span class="txt">暂无内容</span>
        </div>
      </template>
    </section>
    

    <section v-if="courseType === 'TEST'" class="homework-info-wrap" :style="{ paddingTop: `1.17rem` }" >
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
        <template v-if="trials_tasks.list.length">
          <homework-course-chapter v-for="(item, index) in trials_tasks.list" :key="index" :chapter="item" />
        </template>
        <template v-if="!trials_tasks.list.length && finished">
          <div class="have-no-posts-wrap">
            <img class="icon" :src="blank" alt="" />
            <span class="txt">暂无内容</span>
          </div>
        </template>
      </van-list>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Homework-Select',
  layout: 'navbar',

  data: () => ({
    active: 0,
    stages:[],
    stagesLoad:false,
    loading: false,
    finished: false,
    courseType: 'TEST',
    tab_line_width: 65,
    finishedText: '没有更多了',
    blank: require('@/assets/icons/blank/have-no-homework.png'),
    recommendImg: require('@/assets/icons/homework/recommend-homework.png'),
  }),

  watch: {
    'trials_tasks.status' : function (newVal, oldVal) {
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
    'trials_tasks.list' :function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    },
    'vip_tasks.status' : function (newVal, oldVal) {
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
    'vip_tasks.list' :function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    }
  },

  async asyncData ({route, store, app}) {
    if (process.browser) return { isServiceload : false }

    try {
      const type = route.query.courseType
      if(type === 'TEST' && !store.getters['homework/trialsCoursesGetters'].list.length) {
        await store.dispatch('homework/appendTrialsCourses', { id : route.query.id, page: 1 })
      }
      return { isServiceload: true }
    } catch (err) {
      console.log(err)
    }
  },

  computed: {
    ...mapGetters({
      trials_tasks: 'homework/trialsCoursesGetters',
      vip_tasks: 'homework/vipCoursesGetters'
    })
  },

  created() {
    const _this = this

    if (this.$route.query.courseType) {
      this.courseType = this.$route.query.courseType
    }

    if (!this.isServiceload && this.courseType === 'TEST') {
      this.$store.dispatch('homework/appendTrialsCourses', { id : this.$route.query.id, page: 1 })
    }

    if(this.courseType === 'VIP') {
      this.appendStagesList({ courseId: this.$route.query.id }).then( res => {
        this.stages = res.data || []
        loadVipCourse(this.stages)
        this.stagesLoad = true
      })
    }
  
    function loadVipCourse (stages) {
      if(!stages.length) return
      _this.appendVipCourses({ id: stages[0].id, page: 1})
    }
  },

  methods: {
    ...mapMutations('homework', [
      'clearTrialsCourses',
      'clearVipCourses',
      'clearStagesList'
    ]),
    ...mapActions('homework', [
      'appendTrialsCourses',
      'appendVipCourses',
      'appendStagesList'
    ]),

    // 体验课
    onLoad() {
      if (this.trials_tasks.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.trials_tasks.status === 'loading') return false
      const newPage = this.trials_tasks.pageInfo.pages + 1
      this.appendTrialsCourses({
        id:  this.$route.query.id,
        page: newPage
      })
    },

    // 正式课
    onLoadVip() {
      if (this.vip_tasks.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.vip_tasks.status === 'loading') return false
      const newPage = this.vip_tasks.pageInfo.pages + 1
      this.appendVipCourses({
        id: this.stages[this.active].id,
        page: newPage
      })
    },

    // 菜单切换
    onTabsClick(index) {
      this.clearVipCourses()
      this.appendVipCourses({ id: this.stages[index].id, page: 1})
    }
  },
  destroyed () {
    this.clearTrialsCourses()
    this.clearVipCourses()
    this.clearStagesList()
  },
}
</script>
<style lang="less" scoped>
.homework-select-page {
  .homework-info-wrap {
    margin-left: 16px;
  }
  .van-title-wrap {
    .van-title-content {
      // max-width: 65px;
      .text-ellipsis()
    }
    .recommend-image {
    position: absolute;
    right: 2px;
    top: 0px;
    width: 36px;
    height: 27px;
  }
  }
  /deep/.van-tabs {
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #747c80;
    line-height: 20px;
  }
  /deep/.van-tab {
    flex: 0;
    padding: 0 16px;
  }
  /deep/.van-tab--active {
    font-size: 14px;
    font-family: @dp-font-medium;
    font-weight: 600;
    color: #00b93b;
    animation: 0.5s appear;
  }
  /deep/.van-tabs__line {
    width: 64px;
    height: 4px;
    bottom: 15px;
    background: #0cb65b;
    border-radius: 2px;
    background-image: none;
  }
  /deep/.van-tabs__wrap {
    height: 48px;
  }
  /deep/.van-tab {
    padding-top: 8px;
  }
  /deep/.van-sticky {
    position: fixed;
    width: 10rem;
    top: 44px;
    z-index: 99;
    left: 50%;
    transform: translateX(-50%);
    right: 0;
  }
  /deep/.van-sticky--fixed {
    top: 44px;
  }

  .have-no-posts-wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    & .icon {
      width: 240px;
      height: 126px;
    }

    & .txt {
      font-size: 14px;
      font-weight: 600;
      color: #8D8E8E;
      margin-top: 12px;
    }
  }
}
</style>
