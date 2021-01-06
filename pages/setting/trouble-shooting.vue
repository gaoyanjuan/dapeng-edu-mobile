<template>
  <div class="trouble-shooting">
    <m-navbar title="问题解答" />
    <div class="trouble-content">
      <div class="content-text" v-html="`${content[id]}`"></div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "navbar",
  data() {
    return {
      content: [
        "",
        `<h2>大鹏教育的网址是什么？</h2>
        <p>大鹏教育官方网址：www.dapengjiaoyu.com</p><p>大鹏教育M站网址：m.dapengjiaoyu.com</p><p>两种客户端账号密码一致。</p>`,
        `<h2>账号和密码可以修改吗？</h2>
        <p style='padding-right:30px'>可以修改。登录成功后，在“我的-设置-账号与安全” 选择修改密码/更换手机号。</p>`,
        `<h2>如何报名课程？</h2> <p>若已有班主任可直接联系主任咨询报名课程详情。<br>
         若未有班主任老师 ，可联系客服老师咨询报名课程的问题。<br> 联系方式如下：<br>官方电话：400-101-8899<br>
         官方公众号：bjdpjy</p>`,
        `<h2>如何联系班主任？</h2> <p>如您还未有专属班主任为您进行服务，请联系我们的客服老师，会尽快为你安排。<br>
         联系方式如下：<br>官方电话：400-101-8899 <br>官方公众号：bjdpjy</p>`,
        `<h2>进入直播间出现卡顿情况如何解决？</h2>
        <p>进入直播时，直播卡顿建议您尝试切换网络(4G/WiFi)直播过程中，开启弹幕可能导致直播卡顿，建议您可以选择关闭弹幕来减轻卡顿的情况
        ，切换网络后若依旧卡顿，建议您请尝试退出程序或网页，重新进入可以减轻卡顿情况。</p>`,
        `<h2>提交后的作业是否可以修改？</h2>
        <p>已被讲师点评的作业无法进行修改与删除；未被讲师点评的作业，可对作业进行修改与删除的操作。</p>`,
        `<h2>M站页面混乱布局出错如何解决？</h2>
        <p>建议您清除缓存，重新登录即可解决该问题。电脑端：按住“ctrl+F5”可直接清除缓存
          手机端：在浏览器中找到“设置-清除缓存”即可。</p>`,
        `<h2>修改绑定手机号码，手机丢了，无法接收验证码怎么办？</h2>
        <p>若已绑定手机号 ，可在"我的-设置-账号与安全-更换手机号",输入要更改的手机号，点击获取验证码，验证码会发送到您变更后的手机号码中，输入验证码点击“确认更换”即可修改成功。</p>`,
        `<h2>忘记密码怎么找回密码？</h2>
        <p>可使用手机号+验证码登录，登录后可在“我的-设置-账号与安全-忘记密码”中使用手机号+验证码来重置您的登录密码。
         若未绑定手机号，在登录界面点击“找回密码”，选择“官方客服QQ”或“官方客服微信”，联系客服老师找回密码。</p>`,
      ],
      id: "",
    };
  },
  mounted() {
    this.id = this.$route.query.id;
  },
};
</script>
<style lang="less" scoped>
.trouble-shooting {
  overflow: hidden;
  position: relative;
  background: @dp-white;
  /deep/ .trouble-content {
    margin: 60px 15px;
    /deep/ h2 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    /deep/ p {
      color: #383640;
      font-size: 14.5px;
      line-height: 22px;
      font-family: @dp-font-medium;
    }
  }
}
</style>


