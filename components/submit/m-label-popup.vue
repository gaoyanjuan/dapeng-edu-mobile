<template>
  <van-popup v-model="showPopup.show"  position="bottom" round :style="{ height: '80%' }">
    <div class="label-container">

      <!-- 已选标签 -->
      <div class="selected-labels-wrap">
        <div class="label-header-row">
          <span class="header-left-title">已选标签</span>
          <span class="header-right-btn" @click="onFinish">完成</span>
        </div>

        <div class="label-body-row">
          <template v-if="labelSel.length">
            <van-tag v-for="item in labelSel" :key="item.labelId" @close="labelCancel(item)" round closeable plain>
              {{ item.labelName }}
            </van-tag>
          </template>

          <template v-if="!labelSel.length && !wait">
            <div class="no-have-label">添加个性标签，找到更多合拍伙伴～</div>
          </template>
        </div>
      </div>

      <!-- 热门标签 -->
      <div class="hot-labels-wrap">
        <div class="header-left-title">热门标签</div>
        
        <div class="label-body-row">
          <span v-for="item in labels.list" :key="item.labelId" @click="onLabel(item)" 
            :class="labelSelId === item.labelId ? 'tag tag-active' : 'tag'" >
            {{ item.labelName }}
          </span>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name:'LabelPop',
  props:{
    showPopup: {
      type:Object,
      default: {
        show:false
      }
    },
    labels:{
      type: Object,
      default: {}
    }
  },
  data:() => ({
    // 当前选中的标签
    labelSelId: null,
    // 已选中的标签
    labelSel: [],
    // 解决标签消失延迟
    // 而产生的样式问题
    wait: false
  }),

  watch:{
    labelSel(n, o){
      if(!n.length) {
        this.wait = true
        setTimeout(() => {
          this.wait = false
        }, 500)
      }
    }
  },

  methods:{
    onLabel(params) {
      this.labelSelId = params.labelId

      const label = this.labels.list.filter( item => {
        return item.labelId === params.labelId
      })

      const labelSel = this.labelSel.filter( item => {
        return item.labelId === label[0].labelId
      })
      
      // 已选标签数量是否超过3
      if(this.labelSel.length === 3) {
        this.$toast('选择标签数量已达上限 ~')
        return
      }

      // 已选标签是否存在
      if(labelSel.length) {
        this.$toast('不能选择已有的标签哦 ~')
        return
      }
      
      this.labelSel.push(label[0])
    },

    labelCancel(params) {
      this.labelSel.forEach((item, index) => {
        if(item.labelId === params.labelId) {
          this.labelSel.splice(index, 1)
        }
      })
    },

    onFinish() {
      this.$emit('append-labels', this.labelSel)
      this.showPopup.show = false
    },
  }
}
</script>

<style lang="less" scoped>

.label-container {
  width: 100%;
  height: 100%;
  padding: 24px 16px;
}

.selected-labels-wrap .label-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-left-title {
    font-size: 18px;
    font-family: @semibold;
    font-weight: 600;
    color: #18252C;
  }

  .header-right-btn {
    font-size: 14px;
    font-family: @regular;
    font-weight: 400;
    color: #0CB65B;

    &:active {
      color: #78d8a5;
    }
  }
}

.selected-labels-wrap .label-body-row {
  width: 100%;
  max-height: 112px;
  min-height: 30px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;

  & > span.van-tag {
    margin-right: 8px;
    margin-top: 15px;
  }

  .no-have-label {
    width: 100%;
    height: 100px;
    font-size: 14px;
    line-height: 100px;
    font-family: @regular;
    font-weight: 400;
    color: #A3A8AB;
    text-align: center;
  }
}

.hot-labels-wrap {
  width: 100%;
  margin-top: 20px;

  .header-left-title {
    font-size: 18px;
    font-family: @semibold;
    font-weight: 600;
    color: #18252C;
  }

  .label-body-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;

    .tag {
      display: inline-block;

      min-width: 30px;
      height: 27px;
      line-height: 27px;
      padding: 0 16px;
      
      background: #F7F7F7;
      border-radius: 14px;

      text-align: center;
      font-size: 12px;
      font-family: @regular;
      font-weight: 400;
      color: #465156;

      margin-right: 8px;
      margin-top: 15px;
      cursor: pointer;
    }

    .tag-active {
      color: #0CB65B;
      font-weight: 500;
      font-family: @semibold;
      background: rgba(12, 182, 91, 0.07);
    }
  }
}
</style>
