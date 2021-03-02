<template>
  <div class="search-course">
    <div class="head">
      <div class="left-arrow" @click="goBack">
        <img :src="arrow" alt="arrow">
      </div>
      <div class="search-input">
        <input type="text"
          v-model="searchData"
          placeholder="输入关键词搜索课程"
          class="input-group"
        >
      </div>
      <div class="search-text">搜索</div>
    </div>
    <div class="search-list">
      <div class="search-list-tabs">
        <van-tabs v-model="activeName" @click="tabClick">
          <van-tab v-for="(item,index) in tabs" :key="index">
            <template #title>
              <div class="van-title-wrap">
                <div class="van-title-content">{{ item.title }}</div>
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </div>
      <div class="course-content">
        <div class="course-item"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'navbar',
  data() {
    return {
      arrow: require('@/assets/icons/course/icon-back-arrow.png'),
      searchData:'',
      tabs: [
        { title: '课程', index: 1 },
        { title: '用户', index: 2 }
      ],
      activeName: 0
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    tabClick(index) {
      if (index === 1 ) {
        this.$router.push({
          path:'/search/user'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search-course {
  background: #fff;
  & > .head {
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    & > .left-arrow {
      vertical-align: middle;
      img{
        width: 24px;
        height: 24px;
      }
    }
    & > .search-input {
      & > .input-group {
        vertical-align: middle;
        width: 275px;
        height: 34px;
        background: #F5F5F5;
        border-radius: 17px;
        border: none;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #D1D3D5;
        background-image: url('~@/assets/icons/course/icon-search.png');
        background-repeat: no-repeat;
        background-position: center;
        background-position-x: 12px;
        letter-spacing: 1px;
        outline:none;
        padding:0 0 0 38px;
        margin-bottom: 4px;
      }
    }
    & > .search-text {
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #18252C;
    }
  }
  & > .search-list {
    & > .search-list-tabs {
      display: flex;
      margin-bottom: 20px;
      padding-left: 23px;
      background: #fff;
      box-shadow: 0px 1px 0px 0px #EAEAEA;
      & > .tab {
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #747C80;
        padding: 10px;
      }
      & > .tab-active {
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #0CB65B;
        padding: 10px;
      }
    }
  }
}
/deep/ .van-tabs {
  width: 100px !important;
}
/deep/ .van-tabs__line {
  width: 30px;
  height: 4px;
  top: 38px;
  background: #00B93B;
  border-radius: 2px;
}
/deep/ .van-tab--active {
  font-size: 16px;
  font-weight: 500;
  color: #00B93B;
}
/deep/.van-tab {
  width: 28px;
  font-size: 16px;
  font-weight: 500;
}
/deep/ .van-tab__text--ellipsis {
  width: 80px;
  text-align: center;
}
</style>


