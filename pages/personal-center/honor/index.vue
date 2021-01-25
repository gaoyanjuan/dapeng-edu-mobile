<template>
  <div class="my-honor">
    <m-navbar title="我的荣誉" />
    <div class="honor-back" v-if="honor&&tables">
      <div class="cer_comain">
        <img src="@/assets/icons/mine/jiekezhengshu.png" alt="" />
        <button></button>
        <div class="xy_message">
          <p>
            <strong>{{ honor.nickname }}</strong
            >同学已修完大鹏教育<br />{{ honor.setMealName }}
            ，特此证明。
          </p>
        </div>
        <div class="xy_content">
          <p>姓名：{{ honor.nickname }}</p>
          <p>性别：{{ honor.sex }}</p>
          <p>身份证号：{{ honor.card }}</p>
        </div>
        <table class="score_table">
          <tr>
            <th>序列号</th>
            <th>课程</th>
            <th>成绩</th>
          </tr>
          <tr v-for="item in tables">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>合格</td>
          </tr>
        </table>
        <div class="bott_yz">
          <img src="@/assets/icons/mine/jkzs_dpyinzhang.png" alt="" />
          <p>证书编号：{{ honor.num }}</p>
          <p>发证时间：{{ honor.cerTime | commonDate }}</p>
        </div>
      </div>
    </div>
    <div class="blank-endorsed" v-else>
      <img src="@/assets/icons/mine/ip-deep.png">
      <p>未取得证书，加油学习吧~</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  layout: "navbar",
  data() {
    return {
      honor: {},
      tables: [],
    };
  },
  mounted() {
    // 链接访问时判断是否登录
    if (!this.$login()) return
    this.unsubscribe()
  },
  methods: {
    ...mapActions("user", ["getCertificatesList"]),
    async unsubscribe() {
      await this.getCertificatesList().then((res) => {
        this.honor = res.data[0]
        this.tables = res.data[0]
        let course = []
        this.tables.courses.map((item) => {
          course.push(item)
          return course
        })
        this.tables = course
      })
    }
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
      & > button {
        background-image: url("~@/assets/icons/mine/icon_sctp.png");
        width: 55px;
        height: 21px;
        position: absolute;
        top: 15px;
        right: 15px;
        background-size: cover;
        border: none;
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
}
</style>