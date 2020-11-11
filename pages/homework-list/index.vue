<template>
  <div class="formal-homework-page">
    <m-navbar :title="navTitle" />
    <div class="content-wrap">
      <section v-if="courseType === 'VIP'" class="college-wrap">
        <div
          :class="index === collegeIndex ? 'college-item college-item-active':'college-item'"
          v-for="(item, index) in workCollegesGetters"
          :key="index"
          @click="collegeChange(index, item)"
        >
          {{ item.name }}
        </div>
      </section>

      <section class="homework-wrap">
        <div class="homework-list-wrap">
          <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
            
            <template v-if="list.length">
              <nuxt-link tag="div" :to="'/homework-list/homework-select?courseType=' + courseType">
                <homework-course v-for="(item, index) in list" :key="index"></homework-course>
              </nuxt-link>
            </template>

            <template v-if="!list.length && finished">
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Formal-Homework',
  layout: 'navbar',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      finishedText: '没有更多了',
      courseType: 'TEST',
      navTitle: '提交体验课作业',
      collegeIndex: 0,
      blank: require('@/assets/icons/blank/have-no-course.png'),
    }
  },
  async asyncData({ route, store, error }) {
    if (process.browser)
      return {
        isServiceload: false
      }
    try {
      if (store.getters['colleges/workCollegesGetters'].length === 1) {
        await store.dispatch('colleges/appendColleges', {
          collegeType: 'SQUARE_WORK'
        })
      }
      return {
        isServiceload: true
      }
    } catch (err) {
      error({ statusCode: err.data.code, message: err.data.message })
    }
  },
  created() {
    if (this.$route.query.courseType) {
      this.courseType = this.$route.query.courseType
    }
    if (this.courseType === 'TEST') {
      this.navTitle = '提交体验课作业'
    } else {
      this.navTitle = '提交正式课作业'
    }
    if (process.browser && !this.isServiceload) {
      if (this.$store.getters['colleges/workCollegesGetters'].length === 1) {
        this.$store.dispatch('colleges/appendColleges', {
          collegeType: 'SQUARE_WORK'
        })
      }
    }
  },
  methods: {
    collegeChange(index, item) {
      this.collegeIndex = index
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 6; i++) {
          this.list.push(i)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 15) {
          this.finished = true
        }
        if (this.list.length === 0) {
          this.finished = true
          this.finishedText = ''
        }
      }, 1000)
    }
  },
  computed: {
    ...mapGetters('colleges', ['workCollegesGetters'])
  }
}
</script>
<style lang="less" scoped>
.formal-homework-page {
  .content-wrap {
    padding-top: 44px;
  }
  .college-wrap {
    margin-top: 21px;
    margin-left: 17px;
    display: flex;
    flex-wrap: wrap;
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
  }
  .homework-wrap {
    .homework-list-wrap {
      margin-left: 17px;
      margin-top: 20px;
    }
    .homework-blank-wrap {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .homework-blank-wrap .blank-img {
      width: 240px;
      height: 126px;
      margin-top: 24px;
    }
    .homework-blank-wrap .blank-txt {
      margin-top: 12px;
      width: max-content;
      height: 20px;
      font-size: 14px;
      font-family: @dp-font-semibold;
      font-weight: 600;
      color: #8d8e8e;
      line-height: 20px;
    }
  }
}
</style>
