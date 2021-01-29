<template>
  <div class="personalized-signature">
    <m-navbar
      title="个性签名"
      right-text="完成"
      :show-info-right-text="true"
      :accomplish-status="accomplishStatus"
      @onClickRight="onSaveHandle"
    />
    <!-- 修改个性签名 -->
    <div class="modified-content">
      <div class="modified-name-box">
        <van-field
          v-model="introduction"
          type="textarea"
          :maxlength="maxCount"
          placeholder="请输入您的签名哦~"
          @input="onChangeInput"
        />
        <div class="show-word-limit">
          <span v-if="wordsLimit">字数已经上限，不可再输入哦~</span>
          <span v-else></span>
          <span :class="wordsLimit ? 'warning-num':''">
            {{ dynamicNums }} 
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  layout:'navbar',
  data() {
    return {
      introduction: '',
      /** 字数限制 */
      wordsLimit: false,
      /** 动态文字 */
      dynamicNums:'只能输入30个字哦',
      /** 描述框大小*/
      autosize: { maxHeight: 50, minHeight: 50},
      /** 头部完成的状态*/
      accomplishStatus:true,
      userId: '',
      userNameModel: '',
    }
  },
  computed: {
    ...mapGetters('user', [
      'userInfoGetters'
    ]),
    maxCount() {
      return 30
    }
  },
  mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
    
    // 获取个性签名
    if (this.userInfoGetters.introduction) {
      this.introduction = this.userInfoGetters.introduction
      this.userNameModel = this.userInfoGetters.loginName
      this.userId = this.userInfoGetters.userId
    } else {
      this.getUserDetails().then((res)=> {
        this.introduction = res.data.introduction
        this.userNameModel = res.data.loginName
        this.userId = res.data.userId
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'getUserDetails',
      'editUserInfo'
    ]),
    // 计算字数
    calcContent(words, nums) {
      if(words.length === nums) {
        this.wordsLimit = true
        this.dynamicNums = nums
      } else if(words.length === 0) {
        this.wordsLimit = false
        this.dynamicNums = '只能输入30个字哦'
      } else {
        this.wordsLimit = false
        this.dynamicNums = words.length
      }
    },
    // 字数监听
    onChangeInput(words) {
      this.calcContent(words ,30)
    },
    // 点击完成
    onSaveHandle() {
      const params = {
        userId:this.userId,
        introduction: this.introduction,
        
      }
      this.editUserInfo(params).then(res=> {
        if (res.status === 200) {
          this.$toast('保存成功')
          this.getUserDetails()
        }
      }).catch((error) => {
        if (error && error.data) {
          this.$toast(error.data.message)
        } else {
          this.$toast('保存失败')
        }
      })
    }
  }
  
}
</script>
<style lang="less" scoped>
.personalized-signature {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  background: @dp-app-bgc;
  & > .modified-content {
    margin-top: 44px;
    & > .modified-name-box {
      padding: 8px 0 0;
      position: relative;
      box-sizing: border-box;
      margin-bottom: 8px;
      & > .show-word-limit {
        background: @dp-white;
        font-family: @dp-font-regular;
        font-weight: 400;
        padding: 12px 32px 12px 32px;
        overflow: hidden;
        & > span:first-child {
          float: left;
          font-size: 12px;
          color: #FF3510;
        }
        & > span:last-child {
          float: right;
          font-size: 14px;
          color: #D1D3D5;
        }
        & > span.warning-num {
          float: right;
          color: #FF3510;
        }
      }
    }
  }
}
</style>
