<template>
  <section class="page-course-wrapper">
    <m-navbar title="我的体验课"></m-navbar>
    
    <!-- 课程服务列表TITLE -->
    <div class="course-list-nav-row" v-if="showAdviser">
      <img class="nav" :src="nav" />
      <span class="nav-txt">已开通的课程服务列表</span>
    </div>

    <!-- 已开通的课程服务列表 -->
    <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">    
      <template v-if="showAdviser">
        <m-course v-for="(item, index) in userCourseListGetters.list" :key="index" :course="item" :id="item.id"/>
      </template>

      <!-- 无顾问 -->
      <template v-if="!showAdviser && finished">
        <m-adviser></m-adviser>
      </template>
    </van-list>

  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  layout:'navbar',

  data: () => ({
    list: [],
    loading: false,
    finished: false,
    finishedTxt: '没有更多了',
    nav: require('@/assets/icons/course/nav.png'),
  }),

  watch:{
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
      'userCourseListGetters'
    ]),

    showAdviser() {
      return this.userCourseListGetters.list.length
    }
  },

  mounted() {
    if(!this.$login()) return
    
    if(this.userCourseListGetters.list.length === 0) {
      this.getCourseList({ type: 'TRIAL', page: 1 })
    }

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
      this.getCourseList({ type: 'TRIAL', page: newPage })
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
}

.course-list-nav-row {
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 16px;
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

</style>
