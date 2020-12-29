<template>
  <div class="personalized-signature">
    <m-navbar
      title="个性签名"
      right-text="完成"
      :show-right-text="true"
    />
    <!-- 修改个性签名 -->
    <div class="modified-content">
      <div class="modified-name-box">
        <van-field
          v-model.trim="introduction"
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
export default {
  layout:'navbar',
  data() {
    return {
      introduction: '',
      /** 字数限制 */
      wordsLimit: false,
      /** 动态文字 */
      dynamicNums:'',
      /** 描述框大小*/
      autosize: { maxHeight: 50, minHeight: 50},
    }
  },
  computed: {
    maxCount() {
      return 30
    }
  },
  methods: {
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
    }
  }
  
}
</script>
<style lang="less" scoped>
.personalized-signature {
  overflow: hidden;
  position: relative;
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
