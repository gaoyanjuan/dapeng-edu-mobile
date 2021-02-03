<template>
  <div class="my-honor">
    <m-navbar title="我的荣誉" />
    <div ref="certDiv" class="honor-back" v-if="certificatesGetters">
      <div class="cer_comain">
        <img src="@/assets/icons/mine/jiekezhengshu.png" alt="" />
        <div class="xy_message">
          <p>
            <strong>{{ certificatesGetters.nickname }}</strong
            >同学已修完大鹏教育<br />的{{ certificatesGetters.setMealName }} ，特此证明。
          </p>
        </div>
        <div class="xy_content">
          <p>姓名：{{ certificatesGetters.nickname }}</p>
          <p>性别：{{ certificatesGetters.sex }}</p>
          <p>身份证号：{{ certificatesGetters.card }}</p>
        </div>
        <table class="score_table">
          <tr>
            <th>序列号</th>
            <th>课程</th>
            <th>成绩</th>
          </tr>
          <tr v-for="( item ,index ) in certificatesGetters.courses" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.title }}</td>
            <td>合格</td>
          </tr>
        </table>
        <div class="bott_yz">
          <img src="@/assets/icons/mine/jkzs_dpyinzhang.png" alt="" />
          <p>证书编号：{{ certificatesGetters.num }}</p>
          <p>发证时间：{{ certificatesGetters.cerTime | honorDate }}</p>
        </div>
      </div>
    </div>
    <div class="blank-endorsed" v-else>
      <img src="@/assets/icons/mine/ip-deep.png">
      <p>未取得证书，加油学习吧~</p>
    </div>
    <van-popup v-model="show">
      <img class="close-img" @click="handelClose" src="@/assets/icons/mine/close.png" alt="">
      <img class="popup-img" :src="img" alt="">
      <h1>长按图片保存哦~</h1>
    </van-popup>
    <button @click="handleUploading"></button>
  </div>
</template>
<script>
import { dataURLtoBlob } from '@/plugins/assist'
import html2canvas from 'html2canvas'
import {mapGetters,mapActions } from "vuex"
import { validateEmpty } from '@/utils/validate.js'
export default {
  layout: "navbar",
  data() {
    return {
      certificates: {},
      img: '',
      show:false,
    };
  },
  mounted() {
    // 链接访问时判断是否登录
    if (!this.$login()) return
    if (validateEmpty(this.certificatesGetters)) {
      this.getCertificatesList()
    }
  },
  computed: {
    ...mapGetters("user", ["certificatesGetters"]),
  },
  methods: {
    ...mapActions("user", ["getCertificatesList"]),
    handleUploading () {
      this.show = true
      this.generatedImage(`结课证书${Date.parse(new Date())}.png`)
    },
    handelClose () {
      this.show = false
    },
    // 获取下载证书url  
    generatedImage (imgName) {
      const _this = this
      window.pageYOffset = 0
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      // eslint-disable-next-line no-undef
      // const imageWrapper = document.getElementById('certDiv')
      // console.log(document.getElementById('certDiv'))
      html2canvas(this.$refs.certDiv, {
        // scale: 1,
        scale: 2, // 图片质量增大至300dpi标准
        useCORS: true
        // x: imageWrapper.getBoundingClientRect().left + 8
      }).then(function (canvas) {
        const imgUri = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream') // 获取生成的图片的url
        // 将base64转为blob
        const blob = dataURLtoBlob(imgUri) 
        const files = new window.File([blob],imgName,{ type: blob.type })
        // 将blob转为img
        _this.img = window.URL.createObjectURL(files)
      })
    },
  },
}
</script>
<style lang="less" scoped>
.my-honor {
  .honor-back {
    background: #723a1c;
    overflow: hidden;
    position: relative;
    height: 100%;
    margin: 45px 0;
    width: 100%;
    .cer_comain {
      position: relative;
      background-image: url("~@/assets/icons/mine/zs_sm.png");
      overflow: hidden;
      border-radius: 5px;
      margin: 5px;
      height: 760px;
      & > img {
        width: 222px;
        height: 115px;
        margin: 30px 72px;
      }
      .xy_message {
        text-align: center;
        & > p {
          font-size: 14px;
          font-weight: 500;
          font-family: @dp-font-semibold;
          & > strong {
            font-size: 16px;
            margin-right: 10px;
            font-weight: 600;
          }
        }
      }
      .xy_content {
        margin: 36px 0 20px 36px;
        font-size: 12px;
        font-weight: 400;
        & > p {
          color: #040000;
          padding-bottom: 5px;
          font-family: @dp-font-semibold;
        }
      }
      .score_table {
        width: 309px;
        height: 325px;
        border: 1px solid #333;
        overflow: hidden;
        margin-left: 29px;
        border-spacing: 2px;
        & tr {
          border: 1px solid#333;
          & th {
            min-width: 40px;
            font-size: 14px;
            text-align: center;
            border: 1px solid#333;
            font-weight: 600;
          }
          & > td {
            font-size: 12px;
            text-align: center;
            border: 1px solid#333;
            font-weight: 400;
          }
        }
      }
      .bott_yz {
        position: absolute;
        bottom: 20px;
        right: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #040000;
        & > img {
          width: 175px;
          height: 131px;
          position: absolute;
          bottom: -50px;
          left: 13px;
        }
      }
    }
  }
  .blank-endorsed {
    position: relative;
   & > img {
    position: absolute;
    top: 230px;
    left: 80px;
   }
   & > p {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #989899;
    position: absolute;
    top: 370px;
    left: 108px;
    // line-height: 20px;
   }
  }
  .van-popup {
    width: 300px;
    height: 410px;
    & > .close-img {
      width: 36px;
      height: 29px;
      position: absolute;
      right: 3px;
    }
    & > .popup-img {
      width: 187px;
      height: 348px;
      margin: 10px 58px 0 56px;
    }
    & > h1 {
      font-size: 0.26rem;
      color: #666;
      text-align: center;
      line-height: 40px;
      font-weight: 400;
    }
  }
  button {
    background-image: url("~@/assets/icons/mine/icon_sctp.png");
    width: 55px;
    height: 21px;
    position: absolute;
    top: 60px;
    right: 15px;
    background-size: cover;
    border: none;
  }
}
</style>