<template>
  <div>
    <!-- Swiper -->
    <m-swipe :banner="postBannerListGetters"/>
    
    <!-- 二级菜单 -->
    <van-sticky :offset-top="`1.1733rem`">
      <section class="menus-wrap">
        <div class="menus-left-side-wrap">
          <div 
            v-for="(item, i) in menus"
            :class="menusIndex === i ? 'menus-item-active' : 'menus-item'"
            :key="i"
            @click="changeMenus(i, item)"
          >
            {{ item.name }}
          </div>
        </div>
        <img class="btn-publish-posts" :src="publish" alt="我要发贴" @click="enterSubmit"/>
      </section>
    </van-sticky>

    <section class="works-wrap">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <m-posts
          v-for="(item, index) in growthListGetters.list"
          :key="index"
          :id="item ? item.id: ''"
          listType="growth"
          :propIndex="index"
          :listItemData="item"
          :modifiedTime="item.createTime"
          path="/details/growth"
          :propSquareType="item.topicType"
          isGrowth="growth"
        />
      </van-list>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'M-Growth',
  data: () => ({
    list: [],
    menusIndex: 0,
    loading: false,
    finished: false,
    menus:[{id:'HOTTEST',name:'最热'},{id:'NEWEST',name:'最新'}],
    publish:require('@/assets/icons/square/posts-btn-bg.png'),
  }),
  watch: {
    'growthListGetters.status': function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
      }
    }
  },
  mounted () {

    this.menus.forEach( (item, inx) => {
      if(item.id === this.$route.query.type) {
        this.menusIndex = inx
      }
    })

    this.$nextTick(() => {
      if (this.$store.state.anchorId) {
        const element = document.getElementById(this.$store.state.anchorId)
        if (element)
        element.scrollIntoView({
          behavior: 'auto'
        })
      }
    })
  },
  methods:{
    ...mapActions('growth', [
      'appendGrowthList'
    ]),
    onLoad() {
      if (this.growthListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.growthListGetters.status === 'loading') return false
      const newPage = this.growthListGetters.pageInfo.pages + 1
      let type
      if (this.$route.query.type) {
        type = this.$route.query.type
      } else {
        type = this.menus[0].id
      }
      this.appendGrowthList({
        type,
        page: newPage
      })
    },

    /** 发帖事件 */
    enterSubmit() {
      if(!this.$login()) return
      this.$router.push(`/submit?type=LIFE&contentType=ACTIVITY_POST`)
    },

    /** 切换菜单事件 */
    changeMenus(index, item) {
      // 禁止路由重复点击
      if (this.$route.query.type === item.id) return
      this.menusIndex = index
      this.$router.replace({
        query: {
          ...this.$route.query,
          type : item.id
        }
      })
    }
  },
  computed: {
    ...mapGetters('banner', [
      'postBannerListGetters'
    ]),
    ...mapGetters('growth', [
      'growthListGetters'
    ])
  }
}
</script>

<style lang="less" scoped>
.works-wrap {
  width: 100%;
  min-height: calc(100vh - 133px);
  padding-bottom: 65px;
  background-color: #f8f8f8;
}

.menus-wrap {
  width: 100%;
  height: 56px;
  padding: 0 16px;
  background-color: @dp-white;
  .l-flex-row();
}

.menus-wrap .menus-left-side-wrap {
  display: flex;
  align-items: center;

  & > div.menus-item {
    min-width: 28px;
    max-width: 42px;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #a3a8ab;
    line-height: 20px;
    text-align: center;
    font-family: @dp-font-regular;
    margin-right: 16px;
    cursor: pointer;
  }

  & > div.menus-item-active {
    width: fit-content;
    padding: 0px 10px;
    height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #0cb65b;
    line-height: 20px;
    background: #e6f7ee;
    border-radius: 14px;
    text-align: center;
    font-family: @dp-font-medium;
    margin-right: 16px;
    cursor: pointer;
  }
}

.menus-wrap .btn-publish-posts {
  width: 107px;
  height: 36px;
}
</style>
