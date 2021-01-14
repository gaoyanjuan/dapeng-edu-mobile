<template>
  <div class="formal-homework-page">
    <m-navbar :title="navTitle" />
    <div class="content-wrap">
      <section v-if="courseType === 'VIP'" class="college-wrap">
        <div
          :class="index === collegeIndex ? 'college-item college-item-active':'college-item'"
          v-for="(item, index) in college"
          :key="index"
          @click="collegeChange(index, item)"
        >
          {{ item.name }}
        </div>
      </section>

      <section class="homework-wrap">
        <div class="homework-list-wrap">
          <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
            
            <template v-if="course.list.length">
              <div v-for="(item, index) in course.list" :key="index" @click="toTasksPage(item)">
                <homework-course :course="item"></homework-course>
              </div>
            </template>

            <template v-if="!course.list.length && finished">
              <div class="homework-blank-wrap">
                <img class="blank-img" :src="blank" alt="空白" />
                <span class="blank-txt">
                  {{courseType === 'TEST' ? '暂无课程～' : '该学院列表暂无课程～' }}
                </span>
              </div>
            </template>
          </van-list>
          
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Formal-Homework',
  layout: 'navbar',
  head () {
    return {
      title: `${this.$route.query.courseType === 'TEST' ? '提交体验课作业' : '提交正式课作业'}-大鹏教育-千万人的兴趣学习社区`,
    }
  },
  data: () => ({
    loading: false,
    finished: false,
    collegeIndex: 0,
    courseType: 'TEST',
    finishedText: '没有更多了',
    navTitle: '提交体验课作业',
    blank: require('@/assets/icons/blank/have-no-course.png'),
    load: require('@/assets/icons/homework/loading.gif')
  }),
  

  async asyncData ({route, store, app}) {
    if (process.browser) return { isServiceload : false }
    try {
      const type = route.query.courseType

      if(type === 'VIP' && store.getters['colleges/homeworkCollegesGetters'].length === 1) {
        await store.dispatch('colleges/appendColleges', { collegeType : 'RELEASE_TASK' })
      }

      return { isServiceload: true }
    } catch (err) {
      console.log(err)
    }
  },

  watch: {
    'course.status' : function (newVal, oldVal) {
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
    'course.list' :function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedText = ''
      } else {
        this.finishedText ='没有更多了'
      }
    },
    '$route.query': function (newQuery, oldQuery) {
      this.clearOpenCourses()
      this.appendOpenCourses({
        collegeId: newQuery.college,
        type: newQuery.courseType,
        clear: true,
        page: 1,
      })
    }
  },

  async created() {
    this.courseType = this.$route.query.courseType

    this.courseType === 'TEST' ? this.navTitle = '提交体验课作业' : this.navTitle = '提交正式课作业'
    if (!this.isServiceload) {
      if (this.college.length === 1 && this.courseType === 'VIP') {
        this.$store.dispatch('colleges/appendColleges', {collegeType: 'RELEASE_TASK'})
      }
    }
  },
  mounted() {
    if(this.courseType === 'VIP') {
      this.collegeIndex = this.college.findIndex((res) => {
        return res.id === (this.$route.query.college || '')
      })
    }

    this.$store.commit('homework/clearOpenCourses')

    if(this.course.list.length === 0) {
      this.appendOpenCourses({
        collegeId: this.$route.query.college || '',
        type: this.courseType,
        clear: false,
        page: 1
      })
    }
  },
  methods: {
     ...mapActions('homework', [
      'appendOpenCourses'
    ]),
    ...mapMutations('homework', [
      'clearOpenCourses'
    ]),
    onLoad() {
      if (this.course.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.course.status === 'loading') return false
      const newPage = this.course.pageInfo.pages + 1
      this.appendOpenCourses({
        collegeId: this.$route.query.college || '',
        type: this.courseType,
        clear: false,
        page: newPage
      })
    },
    
    collegeChange(index, item) {
      if (this.course.status === 'loading') return false
      this.collegeIndex = index
      if(this.$route.query.college === item.id ) return
      this.$router.replace({ query: { ...this.$route.query, college: item.id } })
    },

    toTasksPage(params) {
      this.$router.push({
        path: '/homework-list/homework-select',
        query: { 
          id: params.id,
          title: params.title,
          courseType: this.courseType
        }
      })
    },
  },
  computed: {
    ...mapGetters({
      college: 'colleges/homeworkCollegesGetters',
      course: 'homework/openCoursesGetters',
    })
  },
  destroyed () {
    this.clearOpenCourses()
  },
}
</script>
<style lang="less" scoped>
.content-wrap {
  padding-top: 44px;
}

.college-wrap {
  margin-top: 21px;
  margin-left: 17px;
  display: flex;
  flex-wrap: wrap;
}

.college-item {
  width: 78px;
  height: 24px;
  margin-right: 8px;
  margin-bottom: 8px;
  background: #f7f7f7;
  border-radius: 4px;
  color: #75737e;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: @dp-font-regular;
}

.college-item-active {
  background: #0cb65b;
  color: #fff;
}

.homework-wrap {

  .homework-list-wrap {
    padding: 16px;
  }
}

.homework-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  .blank-img {
    width: 240px;
    height: 126px;
  }

  .blank-txt {
    margin-top: 12px;
    font-size: 14px;
    font-family: @semibold;
    font-weight: 600;
    color: #8D8E8E;
  }
}
</style>
