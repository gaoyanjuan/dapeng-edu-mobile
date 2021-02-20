<template>
  <section class="m-adviser-wrapper">

    <!-- 未开通体验课-客服 -->
    <template v-if="showStatus === 'service'">
      <img class="m-adviser" :src="adviser" alt="adviser" />
      <span class="m-text">您当前还未开通体验课，快联系客服老师开通吧～</span>
      <div class="m-btn" @click="onContact">联系客服</div>
    </template>

    <!-- 未开通体验课-班主任 -->
    <template v-else-if="showStatus === 'adviser'">

      <img class="m-adviser-sm" :src="adviser_sm" alt="adviser" />
      <span class="m-text">您当前还未开通体验课，快联系班主任开通吧～</span>

      <!-- 微信 -->
      <template v-if="adviserInfo.groupType === '1'">
        <div class="m-qr-wrap" v-if="adviserInfo.groupQr">
          <img class="qr" :src="adviserInfo.groupQr" />
        </div>
        <div class="m-qq-wechat">微信：{{ adviserInfo.groupCode }}</div>
      </template>

       <!-- QQ -->
      <template v-else>
        <div class="m-qr-wrap" v-if="adviserInfo.groupQr">
          <img class="qr" :src="adviserInfo.groupQr" />
        </div>
        <div class="m-qq-wechat">QQ群：{{ adviserInfo.groupCode }}</div>
      </template>

      <!-- 复制并打印 -->
      <div class="m-btn" v-if="adviserInfo.groupType === '1'" @click="onCopy">复制并打开微信</div>
      <div class="m-btn" v-else @click="onCopy">复制并打开QQ</div>
    </template>


  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:'M-Adviser',
  data:() => ({
    showStatus: '',
    adviserInfo: null,
    adviser: require('@/assets/icons/course/lar-adviser.png'),
    adviser_sm: require('@/assets/icons/course/sm-adviser.png'),
  }),

  async mounted() {
    await this.getZcAdviser().then( res => {
      this.adviserInfo = res.data
      this.showStatus = 'adviser'
    }).catch( err => {
      // 展翅无此量，显示客服
      if (err.data && err.data.code === 409) {
        this.showStatus = 'service'
      }
    })
  },

  methods:{
    ...mapActions('publish', [
      'getZcAdviser'
    ]),

    onContact() {
      window.open(process.env.leyuUrl, '_blank')
    },

    onCopy() {
      this.$copyText(this.adviserInfo.groupCode).then( (e) => {
        this.$toast('复制成功')
        this.callQQ()
      }, function(e) {
        console.log('Can not copy')
      })
    },

    callQQ() {
      // 微信则复制、QQ则复制且唤起
      if(this.adviserInfo.groupType === '0') {
        if(this.adviserInfo.qrCodeUrl) {
          window.location.href = this.adviserInfo.qrCodeUrl
        } else {
          window.location.href = 'mqqwpa://'
        }
      } else {
        window.location.href = 'weixin://'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-adviser-wrapper {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.m-adviser-wrapper .m-adviser {
  width: 107px;
  height: 115px;
}

.m-adviser-wrapper .m-adviser-sm {
  width: 58px;
  height: 63px;
}
  
.m-adviser-wrapper .m-text {
  width: 230px;
  font-size: 16px;
  font-family: @regular;
  font-weight: 400;
  color: #465156;
  line-height: 22px;
  text-align: center;
  margin-top: 20px;
}

.m-adviser-wrapper .m-qr-wrap {
  width: 134px;
  height: 134px;
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  background-image: url('~@/assets/icons/course/qr_bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  .qr {
    width: 116px;
    height: 116px;
  }
}

.m-adviser-wrapper .m-qq-wechat {
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #36404A;
  line-height: 16px;
  margin-top: 12px;
}

.m-adviser-wrapper .m-btn {
  width: 220px;
  height: 40px;
  
  font-size: 14px;
  font-family: @medium;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 40px;
  text-align: center;
  margin-top: 28px;

  background-color: transparent;
  background-image: url('~@/assets/icons/course/contact-btn-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>