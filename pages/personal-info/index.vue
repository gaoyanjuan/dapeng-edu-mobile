<template>
  <div class="personal-info">
    <!-- 返回上一页 -->
    <m-navbar title="编辑资料" />
    <div class="info-header">
      <div class="left-text">头像</div>
      <div class="right-avatar">
        <img src="~@/assets/icons/common/dp_default_headImg.jpg" alt="">
      </div>
    </div>
    <!-- 分割线 -->
    <div class="cut-off-line"></div>
    <div class="form-list">
      <div class="form-item">
        <div class="left-text">大鹏号</div>
        <span class="right-content">dp123456</span>
      </div>
      <div class="form-item">
        <div class="left-text">学籍号</div>
        <span class="right-content">暂无</span>
      </div>
      <nuxt-link class="form-item" tag="div" to='/personal-info/information-edit/user-name'>
        <div class="left-text">用户名</div>
        <span class="right-content">大鹏小甜甜</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <div class="form-item">
        <div class="left-text">绑定手机号</div>
        <span class="right-content">15544687952</span>
      </div>
      <!-- 分割线 -->
      <div class="cut-off-line"></div>
      <nuxt-link class="form-item" tag="div" to='/personal-info/information-edit/true-name'>
        <div class="left-text">真实姓名</div>
        <span class="right-content">张三同学</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <div class="form-item" @click="onGenderHandle">
        <div class="left-text">性别</div>
        <span v-if="userInfo.gender === 'S'" class="right-content">保密</span>
        <span v-if="userInfo.gender === 'M'" class="right-content">男</span>
        <span v-if="userInfo.gender === 'F'" class="right-content">女</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </div>
      <nuxt-link class="form-item" tag="div" to='/personal-info/information-edit/area'>
        <div class="left-text">所在地区</div>
        <span class="right-content">北京市</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link class="form-item" tag="div" to=''>
        <div class="left-text">个性签名</div>
        <span class="right-content">限制30字</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <van-action-sheet
        v-model="showGender"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
      />
    </div>
  </div>
</template>
<script>
export default {
  layout:'navbar',
  data() {
    return {
      showGender: false,
      userInfo: {},
      actions: [
        {
          name: '男',
          identification: 'M'
        },
        {
          name: '女',
          identification: 'F'
        },
        {
          name: '保密',
          identification: 'S'
        }
      ]
    }
  },
  methods: {
    //性别弹出层
    onGenderHandle() {
      this.showGender = true
    },
    // 性别选择
    onSelect(item) {
      this.showGender = false
      this.userInfo.gender = item.identification
    }
  }
}
</script>
<style lang="less" scoped>
.personal-info {
  position: relative;
  background: @dp-white;
  & > .info-header {
    height: 88px;
    margin-left: 15px;
    margin-top: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > .left-text {
      width: 60px;
      height: 20px;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #383640;
      line-height: 20px;
      display: inline-block;
    }
    & > .right-avatar {
      margin-right: 30px;
      height: 60px;
      line-height: 60px;
      & > img {
        width: 60px;
        height:60px;
        border-radius: 50%;
      }
    }
  }
  & > .form-list {
    margin: 0 15px;
    & > .form-item {
      height: 44px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > .left-text {
        width: 70px;
        height: 20px;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #383640;
        line-height: 20px;
        display: inline-block;
      }
      & > .right-content {
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #A3A8AB;
        line-height: 20px;
        margin-right: 27px;
      }
      & > .right-arrow {
        position: absolute;
        right: 16px;
        float: right;
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
    }
  }
}
.cut-off-line {
  height:12px;
  background: @dp-app-bgc;
}
</style>
