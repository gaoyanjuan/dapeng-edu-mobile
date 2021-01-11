<template>
  <section class="page-course-wrapper">
    <m-navbar title="我的正式课"></m-navbar>

    <!-- 我的正式课学院列表 -->
    <van-sticky offset-top="1.17333rem">
      <m-course-menus v-if="formalCollegeListGetters.length" :menus="formalCollegeListGetters" />
    </van-sticky>
    
    <!-- 课程服务列表TITLE -->
    <div class="course-list-nav-row" v-if="showCourse">
      <img class="nav" :src="nav" />
      <span class="nav-txt">已开通的课程服务列表</span>
    </div>

    <!-- 已开通的课程服务列表 -->
    <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">    
      <template v-if="showCourse">
        <m-course v-for="(item, index) in userCourseListGetters.list" :key="index" :course="item" :id="item.id"/>
      </template>

      <template v-if="!showCourse && finished">
        <div class="course-blank-wrap">
          <img class="blank-img" :src="blank" alt="" />
          <span class="blank-txt">您还未报名正式课～</span>
        </div>
      </template>
    </van-list>
    
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  layout:'navbar',
  name: 'Formal',

  async asyncData ({route, store, error}) {
    if (store.getters['course/formalCollegeListGetters'].length === 0) {
      await store.dispatch('course/appendFormalCollegeList')
    }
  },

  data: ()=> ({
    list: [],
    loading: false,
    finished: false,
    defCollege: '',
    finishedTxt: '没有更多了',
    nav: require('@/assets/icons/course/nav.png'),
    blank: require('@/assets/icons/blank/have-no-course.png'),
  }),

  watch:{
    '$route.query': function (newQuery, oldQuery) {
      this.clearCourseList()
      this.defCollege = newQuery.college
      this.getCourseList({ type: 'VIP' , collegeId: newQuery.college, page: 1 })
    },
    'userCourseListGetters.status' : function (newVal, oldVal) {
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
    'userCourseListGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt = '没有更多了'
      }
    }
  },

  computed: {
    ...mapGetters('course', [
      'userCourseListGetters',
      'formalCollegeListGetters'
    ]),

    showCourse() {
      return this.userCourseListGetters.list.length
    },

    college() {
      return this.$route.query.college
    }
  },

  created() {
    // 多学院列表 ~
    if(this.formalCollegeListGetters.length) {

      // 如果路由未带学院ID，则取已开通课程学院第一个
      this.defCollege =  this.college || this.formalCollegeListGetters[0].id
      if(!this.userCourseListGetters.list.length) {
        this.getCourseList({ type: 'VIP', collegeId: this.defCollege, page: 1 })
      }
      return
    }

    // 单学院列表 ~
    if(!this.userCourseListGetters.list.length) {
      this.getCourseList({ type: 'VIP', page: 1 })
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.$store.state.anchorId) {
        const element = document.getElementById(this.$store.state.anchorId)
        if (element) {
          element.scrollIntoView({
            behavior: 'auto'
          })
        }
      }
    })
  },

  methods:{
    ...mapMutations({
      clearCourseList :'course/clearCourseList'
    }),

    ...mapActions({
      getCourseList :'course/appendUserCourseList'
    }),
    
    onLoad() {
      if (this.userCourseListGetters.status === 'over') {
        this.finished = true
        return false
      }
      
      if (this.userCourseListGetters.status === 'loading') return false

      const newPage = this.userCourseListGetters.pageInfo.pages + 1
      this.getCourseList({ type: 'VIP', collegeId: this.defCollege, page: newPage })
    }
  },

  beforeDestroy() {
    const isDetails = this.$isDetails(this.$route.name)
    if (!isDetails) {
      this.clearCourseList()
    }
  }
}
</script>

<style lang="less" scoped>
.page-course-wrapper {
  width: 100%;
  height: 100vh;
  padding-top: 44px;
  overflow: scroll;
  background: #F8F8F8;
  position: relative;
}

.course-list-nav-row {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  padding: 16px;
  background: @dp-white;
  border-bottom: 1px solid #F7F7F7;

  .nav {
    width: 15px;
    height: 16px;
    margin-right: 5px;
  }

  .nav-txt {
    font-size: 16px;
    font-family: @semibold;
    font-weight: 600;
    color: #18252C;
  }
}


.course-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.course-blank-wrap .blank-img {
  width: 240px;
  height: 126px;
}

.course-blank-wrap .blank-txt {
  height: 20px;
  font-size: 14px;
  font-family: @semibold;
  font-weight: 600;
  color: #8D8E8E;
  margin-top: 12px;
}
</style>