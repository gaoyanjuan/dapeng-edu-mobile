<template>
  <div class="search-user">
    <div class="head">
      <div class="left-arrow" @click="goBack">
        <img :src="arrow" alt="arrow">
      </div>
      <div class="search-input">
        <input type="text"
          v-model="searchData"
          placeholder="输入关键词搜索用户"
          class="input-group"
        >
      </div>
      <div class="search-text" @click="handleSearch()">搜索</div>
    </div>
    <div class="search-list">
      <div class="search-list-tabs">
        <van-tabs v-model="activeName" @click="tabClick" >
          <van-tab v-for="(item,index) in tabs" :key="index">
            <template #title>
              <div class="van-title-wrap">
                <div class="van-title-content">{{ item.title }}</div>
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </div>
      <div class="user-content" v-if="this.$route.query.keywords">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finishedTxt"
          @load="onLoad"
          :immediate-check="false"
        >
          <div class="user-item"
            v-for="(item, index) in userList"
            :key="index"
            @click="toPersonalInfo(item)">
            <div class="user-avatar" >
              <img ref="headerImg" v-if="item.avatar" :src="item.avatar" alt="头像">
              <img ref="headerImg" v-if="!item.avatar" :src="defaultImg" alt="头像">
            </div>
            <div class="user-name">{{item.nickname}}</div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'navbar',
  data() {
    return {
      arrow: require('@/assets/icons/course/icon-back-arrow.png'),
      defaultImg: require('@/assets/icons/common/dp_default_headImg.jpg'),
      searchData:'',
      userList: [],
      tabs: [
        // { title: '课程', index: 1 },
        { title: '用户', index: 2 }
      ],
      loading: false,
      finished: false,
      activeName: 1,
      currentPage:1,
      finishedTxt: '没有更多了'
    }
  },
  computed: {
    ...mapGetters('user', ['userGetters']),
    courseUrl() {
      return this.validateSystemHostName().COURSE_HOST 
    }
  },
  mounted() {
    if(this.$route.query.keywords) {
      let params = {
        page: 1,
        size: 10,
        nickname: this.$route.query.keywords
      }
      this.searchData = this.$route.query.keywords
      this.appendUserList(params).then(({data,pageInfo}) =>{
        this.userList = data
        data.map((item,index) =>{
          this.userId = item.userId
        }) 
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'appendUserList'
    ]),
    goBack() {
      this.$router.go(-1)
    },
    // 搜索
    handleSearch() {
      if (this.$route.query.keywords !== this.searchData) {
        this.$router.replace({
          path: '/search/user',
          query: {
            keywords: this.searchData
          }
        })
        let params = {
          page: 1,
          size: 10,
          nickname: this.searchData
        }
        this.appendUserList(params).then(({data,pageInfo}) =>{
          this.userList = data
        })
      }
    },
    // tab切换
    tabClick(index) {
      if (index === 0 ) {
        this.$router.push({
          path:'/search/course'
        })
      }
    },
    onLoad() {
      let params = {
        page: ++this.currentPage,
        size: 10,
        nickname: this.searchData
      }
      this.appendUserList(params).then(({data,pageInfo}) =>{
        
        this.userList = this.userList.concat(data).map((item, index) => ({ ...item, index }))
        this.loading = false
        if (data < 10) {
          this.finished = true
        }
      })
    },
    toPersonalInfo(item) {
      this.$router.push({
        path: '/personal-center/publish',
        query: {
          userId: item.userId
        }
      })
    }
  },
   watch: {
    $route (val) {
      this.searchData = this.$route.query.keywords

      // 路由变化从第一页开始搜索
      this.currentPage = 1
    }
  }
}
</script>
<style lang="less" scoped>
.search-user {
  height: 100vh;
  background: #fff;
  & > .head {
    position: fixed;
    display: block;
    top: 0px;
    width: 375px;
    background: #fff;
    height: 44px;
    line-height: 44px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    & > .left-arrow {
      
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
    height: calc(100vh - 44px);
    & > .search-list-tabs {
      position: fixed;
      top: 44px;
      width: 375px;
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
    & > .user-content {
      height: 550px;
      & > .van-list {
        margin-top: 105px;
        & > .user-item{
          height: 55px;
          line-height: 55px;
          display: flex;
          justify-content: flex-start;
          margin-left: 16px;
          & > .user-avatar {
            & > img {
              width: 40px;
              height: 40px;
              line-height: 40px;
              border-radius: 50%;
              z-index: 1;
              object-fit: cover;
            }
          }
          & > .user-name {
            width: 250px;
            height: 40px;
            line-height: 40px;
            margin-left:16px;
            font-size: 14px;
            font-weight: 500;
            font-family: @dp-font-semibold;
            color: #18252C;
          }
        }
      }
    }
  }
}

/deep/ .van-tabs {
  width: 50px !important;
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


