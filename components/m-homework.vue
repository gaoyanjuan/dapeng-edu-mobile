<template>
  <div>
    <!-- Swiper -->
    <m-swipe />

    <!-- 二级菜单 -->
    <m-menus menus-type="college" v-show="$route.query.courseType !== 'CHILD'" :menus="[{ id:'', name: '全部' }].concat(taskCollegesGetters)" />

    <section class="works-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="homeworkListGetters.list.length">
          <m-posts
            v-for="(item, index) in homeworkListGetters.list"
            :key="index"
            squareType="作业"
            :commentList="item.commentList"
            :dataType="item.type"
            :imgInfo="item.imgSmall"
            :courseType="item.courseType"
            :user="item.user"
            :college="item.college"
            :recommendType="item.recommendType"
            :task="item.task"
            :content="item.content"
            :modifiedTime="item.lastModifiedTime"
            :listItemData="item"
            :path="navRoute"
            :propIndex="index"
          />
        </template>
        <template v-if="!homeworkListGetters.list.length && finished">
          <div class="works-blank-wrap">
            <img class="blank-img" :src="blank" alt="" />
            <span class="blank-txt">暂无内容～</span>
          </div>
        </template>
      </van-list>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Homework',
  data: () => ({
    list: [],
    loading: false,
    finished: false,
    finishedTxt: '没有更多了',
    navRoute:'/details/homework-page-details',
    blank:require('@/assets/icons/blank/have-no-homework.png')
  }),
  computed:{
    ...mapGetters('colleges', [
      'taskCollegesGetters'
    ]),
    ...mapGetters('homework', [
      'homeworkListGetters'
    ])
  },
  watch: {
    'homeworkListGetters.status': function (newVal, oldVal) {
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
    'homeworkListGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  mounted(){
    if(!this.homeworkListGetters.list.length) {
      this.finishedTxt = ''
    }
  },
  methods:{
    ...mapActions('homework', [
      'appendHomeworkList'
    ]),
    onLoad() {
      if (this.homeworkListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.homeworkListGetters.status === 'loading') return false
      const newPage = this.homeworkListGetters.pageInfo.pages + 1
      this.appendHomeworkList({
        categoryIds: this.$route.query.college,
        courseType: this.$route.query.courseType,
        page: newPage
      })
    }
  }
}
</script>

<style lang="less" scoped>
.works-wrap {
  width: 100%;
  min-height: calc(100vh - 339px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}

.works-wrap .works-blank-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.works-wrap .works-blank-wrap .blank-img {
  width: 240px;
  height: 126px;
  margin-top: 24px;
}

.works-wrap .works-blank-wrap .blank-txt {
  margin-top: 12px;
  width: max-content;
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #8D8E8E;
  line-height: 20px;
}
</style>
