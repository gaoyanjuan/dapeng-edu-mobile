<template>
  <div>
    <!-- Swiper -->
    <m-swipe :banner="worksBannerListGetters"/>

    <!-- 话题 -->
    <transition name="component-fade" mode="out-in">
      <m-topic-card v-if="showTopic" :topic="worksGetters" channel="WORKS"/>
    </transition>

    <!-- 二级菜单 -->
    <m-menus menus-type="college" :menus="workCollegesGetters" @switchCollegeName="switchCollegeName"/>

    <section class="works-wrap">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedTxt" @load="onLoad">
        <template v-if="workListGetters.list.length">
          <m-posts 
            v-for="(item, index) in workListGetters.list"
            :id="item ? item.id: ''"
            :key="item ? item.id + index : index"
            listType="work"
            :propIndex="index"
            :courseType="item.courseType"
            :listItemData="item"
            :modifiedTime="item.createTime"
            path="/details/works"
            propSquareType="WORKS"
          />
        </template>
        <template v-if="!workListGetters.list.length && finished">
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
  name: 'M-Works',
  data: () => ({
    loading: false,
    finished: false,
    collegeType: '全部',
    finishedTxt:'没有更多了',
    blank:require('@/assets/icons/blank/have-no-works.png')
  }),
  watch: {
    'workListGetters.status': function (newVal, oldVal) {
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
    'workListGetters.list':function (newVal, oldVal) {
      if(!newVal.length) {
        this.finishedTxt = ''
      } else {
        this.finishedTxt ='没有更多了'
      }
    }
  },
  mounted(){
    if(!this.workListGetters.list.length) {
      this.finishedTxt = ''
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
    ...mapActions('work', [
      'appendWorkList'
    ]),
    onLoad() {
      if (this.workListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.workListGetters.status === 'loading') return false
      const newPage = this.workListGetters.pageInfo.pages + 1
      this.appendWorkList({
        categoryIds: this.$route.query.college,
        page: newPage
      })
      // this._squareLoading({ 
      //   page_area: '作品',
      //   page_area_sec:this.collegeType,
      //   request_type: '手动上拉刷新'
      // })
    },
    switchCollegeName(params) {
      this.collegeType = params.name
    }
  },
  computed:{
    ...mapGetters('banner', [
      'worksBannerListGetters'
    ]),
    ...mapGetters('colleges', [
      'workCollegesGetters'
    ]),
    ...mapGetters('work', [
      'workListGetters'
    ]),
    ...mapGetters('topic', [
      'worksGetters'
    ]),

    showTopic() {
      return this.worksGetters.list.length > 0
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

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>