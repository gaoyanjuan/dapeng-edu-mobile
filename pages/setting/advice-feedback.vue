<template>
  <div class="advice-feedback">
    <m-navbar fixed title="意见反馈" />
    <div class="issue-content">
      <p>请描述你要反馈的问题</p>
      <div class="content-text">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="登录失败" clickable @click="radio = '1'">
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell title="直播闪退" clickable @click="radio = '2'">
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
            <van-cell title="直播卡顿" clickable @click="radio = '3'">
              <template #right-icon>
                <van-radio name="3" />
              </template>
            </van-cell>
            <van-cell title="奖品未收到" clickable @click="radio = '4'">
              <template #right-icon>
                <van-radio name="4" />
              </template>
            </van-cell>
            <van-cell title="其他" clickable @click="radio = '5'">
              <template #right-icon>
                <van-radio name="5" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="help_title">问题和建议</div>
      <van-field
        v-model="content"
        required
        rows="3"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="请您填写在使用过程中的问题还有您对我们的建议，以便我们提供更好的服务"
        show-word-limit
      />
    </div>
    <div class="footer">
      <button @click="onSubmit">确认提交</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { validateEmpty } from '@/utils/validate.js'
export default {
  layout: "navbar",
  data() {
    return {
      radio: "5",
      content: "",
    };
  },
  mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return
  },
  methods: {
    ...mapActions("user", ["postFeedback"]),
    async onSubmit() {
      if (validateEmpty(this.content)) {
        this.$toast("请输入内容")
        return
      }
      const params = {
        title: this.radio,
        content: this.content,
      }
      await this.postFeedback(params).then((res) => {
        if (res.status === 201) {
          this.$toast({
            message: `反馈成功`,
            position: "bottom",
            duration: 2000,
          })
        }
        // setTimeout(() => {
        //   this.$router.push({ path: "./help-feedback" })
        // }, 1000)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.advice-feedback {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  .issue-content {
    margin: 60px 0px;
    & > p {
      font-weight: 500;
      color: #747c80;
      font-size: 12px;
      line-height: 5px;
      padding-left: 16px;
      height: 18px;
      font-family: @dp-font-medium;
    }
    /deep/.van-cell {
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #18252c;
    }
    /deep/ .van-radio__icon--checked .van-icon {
      color: #fff;
      background-color: green;
      border-color: green;
    }
    .help_title {
      font-size: 12px;
      margin-top: 8px;
      font-family: @dp-font-medium;
      padding-left: 16px;
      font-weight: 500;
      color: #747c80;
    }
    /deep/.van-field__control::placeholder {
      font-family: @dp-font-regular;
      font-size: 14px;
      font-weight: 400;
      color: #a3a8ab;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 50%;
    margin-left: -50%;
    & > button {
      width: 375px;
      height: 49px;
      border: none;
      background: #ffffff;
      font-size: 18px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #0cb65b;
      line-height: 20px;
    }
  }
}
</style>


