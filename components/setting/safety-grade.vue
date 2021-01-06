<template>
  <div class="safety-grade" :class="gradeColor">
    <div class="grade-score">{{scoreNum}}</div>
    <div class="account-tip">
      <img
        class="star"
        v-for="(item,index) in starGrade"
        :key="index"
        src="@/assets/icons/mine/icon-star.png" 
        alt="">
      <img v-if="(this.scoreNum % 20) !== 0" class="half-star" src="@/assets/icons/mine/icon-half-star.png" alt="">
      <!-- <div class="account-text">账号安全等级中等</div> -->
    </div>
    <div class="account-text">账号安全等级{{grade}}</div>
  </div>
</template>
<script>
export default {
  props: {
    scoreNum: {
      type:Number,
      default:0
    }
  },
  data() {
    return {
      grade:''
    }
  },
  mounted() {
    
  },
  computed: {
    gradeColor () {
      if (this.scoreNum < 50) {
        this.grade = '危险'
        return 'safety-grade-danger'
      } else if (this.scoreNum >= 50 && this.scoreNum<=70 ) {
        this.grade = '中等'
        return 'safety-grade-medium'
      } else {
        this.grade = '较高'
        return 'safety-grade-higher'
      }
    },
    starGrade() {
      let result = []
      let integer = Math.floor(this.scoreNum / 20); // 整数星星判断
      for (let i = 0; i < integer; i++) {
        result.push(i)
      }
      return result
    },
  }
}
</script>
<style lang="less" scoped>
.safety-grade {
  width: 343px;
  height: 88px;
  background: @dp-white;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  & > .grade-score {
    width: 72px;
    height: 84px;
    float: left;
    font-size: 60px;
    font-family: @dp-font-medium;
    font-weight: 500;
    line-height: 84px;
    margin-left: 20px;
  }
  & > .account-tip {
    width: 112px;
    float: left;
    height: 84px;
    line-height: 60px;
    margin-left: 10px;
    & > .star {
      width: 16px;
      height: 16px;
      line-height: 16px;
    }
    & > .half-star {
      width: 16px;
      height: 16px;
      line-height: 16px;
      margin-left: -5px;
    }
  }
  & > .account-text {
      width: 112px;
      height: 20px;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #5E5E5E;
      line-height: 20px;
      position: absolute;
      top:50%;
      left: 102px;
      // transform: translateY(-50%);
    }
}
.safety-grade-danger {
  background: rgba(250, 100, 0, .1);
  color: #F8904B;
}
.safety-grade-medium {
  background: rgba(255, 191, 14, .1); 
  color: #EFBA31;
}
.safety-grade-higher {
  background: rgba(0, 201, 64, .1);
  color: #07C160;
}
</style>


