<template>
  <div class="my-honor">
    <m-navbar title="我的荣誉" />
    <div class="honor-back">
      <div class="cer_comain">
        <img src="@/assets/icons/mine/jiekezhengshu.png" alt="" />
        <button></button>
        <div class="xy_message">
          <p>
            <strong>{{ honor.name }}</strong
            >同学已修完大鹏教育<br />{{ honor.content }}
            ，特此证明。
          </p>
        </div>
        <div class="xy_content">
          <p>姓名：{{ honor.name }}</p>
          <p>性别：{{ honor.sex }}</p>
          <p>身份证号：{{ honor.number }}</p>
        </div>
        <table class="score_table">
          <tr>
            <th>序列号</th>
            <th>课程</th>
            <th>成绩</th>
          </tr>
          <tr v-for="item in tables" key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.content }}</td>
            <td>{{ item.qualified }}</td>
          </tr>
        </table>
        <div class="bott_yz">
          <img src="@/assets/icons/mine/jkzs_dpyinzhang.png" alt="">
          <p>证书编号：{{honor.certificate}}</p>
          <p>发证时间：{{honor.issueDate}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "navbar",
  data() {
    return {
      honor: {
        content: "的设计师超值VIP套餐（4合1）+影视+UI",
        name: "于于于",
        sex: "女",
        number: "1235645656446",
        certificate:'45655487436',
        issueDate:'2020年12月30日'
      },
      tables: [
        {
          id: "1",
          content: "PS综合案例提升模块",
          qualified: "合格",
        },
        { id: "2", content: "PS功能精通课", qualified: "合格" },
        { id: "3", content: "电商设计行业实战课", qualified: "合格" },
        { id: "4", content: "影视后期行业实战课", qualified: "合格" },
        { id: "5", content: "UI设计行业实战课", qualified: "合格" },
        { id: "6", content: "AI功能精通课", qualified: "合格" },
        { id: "7", content: "AI综合案例提升课", qualified: "合格" },
        { id: "8", content: "审美专项课", qualified: "合格" },
        { id: "9", content: "网页设计行业实战课", qualified: "合格" },
        { id: "10", content: "影楼设计行业实战课", qualified: "合格" },
        { id: "11", content: "广告设计行业实战课", qualified: "合格" },
      ],
    };
  },
};
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
          & th{
            min-width: 40px;
            font-size: 14px;
            text-align: center;
            border: 1px solid#333;
            font-weight: 600;
          }
          &> td {
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
}
</style>