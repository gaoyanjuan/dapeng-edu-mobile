<template>
  <div class="area">
    <m-navbar
      title="修改地址"
      right-text="完成"
      :show-info-right-text="true"
      :accomplish-status="accomplishStatus"
      @onClickRight="onSaveHandle"
    />
    <!-- 修改地址内容 -->
    <div class="modified-content">
      <div class="modified-area-box" @click="onShowAreaHandle">
        <div class="left-title">地区</div>
        <div class="area-list">{{
            addressArea
              ? addressArea.split('@').join('&nbsp;&nbsp;')
              : '请输入地区'
          }}</div>
      </div>
      <div class="modified-address-box">
        <div class="left-title">地址</div>
        <div class="detail-address">
          <van-field
            v-model.trim="familyAddress"
            :autosize="autosize"
            type="textarea"
            :maxlength="maxCount"
            placeholder="请输入您的详细地址"
            @input="onChangeInput"
          />
        </div>
      </div>
      <!-- 字数限制 -->
      <div class="show-word-limit">
        <span v-if="wordsLimit">字数已经上限，不可再输入哦~</span>
        <span v-else></span>
        <span :class="wordsLimit ? 'warning-num':''">
          {{ dynamicNums }} 
        </span>
      </div>
      <van-popup v-model="showAreaPopup" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="areaConfirm"
          @cancel="areaCancel"
        />
      </van-popup>
    </div>
  </div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import areaList from '@/assets/emotion/area'
export default {
  layout:'navbar',
  data() {
    return {
      showAreaPopup: false,
      familyAddress: '',
      areaList,
      addressArea: '',
      /** 字数限制 */
      wordsLimit: false,
      /** 动态文字 */
      dynamicNums:'',
      /** 描述框大小*/
      autosize: { maxHeight: 100, minHeight: 100},
      // 完成的状态
      accomplishStatus:false,
      userId: ''
    }
  },
  computed: {
    ...mapGetters('user', [
      'userInfoGetters'
    ]),
    maxCount() {
      return 60
    }
  },
   mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
    
    // 获取用户信息
    if (this.userInfoGetters.address) {
      this.addressArea = this.userInfoGetters.address
      this.familyAddress = this.userInfoGetters.familyAddress
      this.userId = this.userInfoGetters.userId
    } else {
      this.getUserDetails().then((res)=> {
        this.addressArea = res.data.address
        this.familyAddress = res.data.familyAddress
        this.userId = res.data.userId
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'getUserDetails',
      'editUserInfo'
    ]),
    /*
    显示地区选择面板
    */
    onShowAreaHandle() {
      this.showAreaPopup = true
    },
    //确认选中
    areaConfirm(res) {
      this.showAreaPopup = false
      const area = res[0].name + '@' + res[1].name + '@' + res[2].name
      this.addressArea = area
      this.accomplishStatus = true
    },
    // 取消选中
    areaCancel() {
      this.showAreaPopup = false
    },
    // 计算字数
    calcContent(words, nums) {
      if(words.length === nums) {
        this.wordsLimit = true
        this.dynamicNums = nums
      } else if(words.length === 0) {
        this.wordsLimit = false
        this.dynamicNums = '只能输入60个字哦'
      } else {
        this.wordsLimit = false
        this.dynamicNums = words.length
      }
    },
    // 字数监听
    onChangeInput(words) {
      this.calcContent(words ,60)
      if (this.familyAddress) {
        this.accomplishStatus = true
      } else {
        this.accomplishStatus = false
      }
    },
    // 点击完成
    onSaveHandle() {
      if (!this.familyAddress) {
        this.$toast({
          message: `请填写地址`,
          position: 'bottom',
          duration: 2000
        })
        return
      }
      const params = {
        userId:this.userId,
        address: this.addressArea,
        familyAddress: this.familyAddress
      }
      this.editUserInfo(params).then(res=> {
        if (res.status === 200) {
          this.$toast({
            message: `保存成功`,
            position: 'bottom',
            duration: 2000
          })
          this.getUserDetails()
        }
      }).catch((error) => {
        if (error && error.data) {
          this.$toast({
            message: `${error.data.message}`,
            position: 'bottom',
            duration: 2000
          })
        } else {
          this.$toast({
            message: `保存失败`,
            position: 'bottom',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.area {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  background: @dp-app-bgc;
  & > .modified-content {
    margin-top: 56px;
    & > .modified-area-box {
      height: 52px;
      line-height: 52px;
      padding: 12px 32px 13px 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: @dp-white;
      & > .left-title {
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #18252C;
      }
      & > .area-list {
        width: 85%;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #18252C;
      }
    }
    & > .modified-address-box {
      overflow: hidden;
      margin-top: 12px;
      background: @dp-white;
      padding: 12px 32px 13px 32px;
       & > .left-title {
        float: left;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #18252C;
      }
       & > .detail-address {
        float: left;
        width: 85%;
        font-size: 27px;
        color: #999;
        text-align: left;
        padding-left: 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
    & > .show-word-limit {
      background: @dp-white;
      font-family: @dp-font-regular;
      font-weight: 400;
      padding: 0 32px 12px 32px;
      margin-bottom: 12px;
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
/deep/ .van-cell {
  padding: 0;
}
/deep/ .van-popup {
  width: 375px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
