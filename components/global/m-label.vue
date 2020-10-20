<template>
  <div class="m-label">
    <!-- Homework -->
    <div
      v-if="labelData"
      class="label__homework--wrap"
      @click.stop="toWorkRequirement"
    >
      <img class="label__homework" :src="homework" alt="homework" />
      <span class="label__homework__txt">{{ labelData.title }}</span>
      <img class="label__homework__enter" :src="enter" alt="enter" />
    </div>

    <!-- Topic -->
    <div 
      v-if="activityData" 
      class="label__topic--wrap"
      @click="toActivityDetails"
    >
      <img class="label__topic" :src="topic" alt="topic" />
      <span class="label__topic__txt">{{ activityData.displayName }}</span>
      <span class="label__topic__bar">|</span>
      <span class="label__topic__nums">{{ activityData.joinCount ? activityData.joinCount : '0' }}人参加</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'Lable',
  props: {
    labelData:{
      type: Object,
      default: () => {
        return null
      }
    },
    activityData: {
      type: Object,
      default: () => {
        return null
      }
    },
    isRequirement: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    homework: require('@/assets/icons/label/label-homework.png'),
    enter: require('@/assets/icons/label/label-enter.png'),
    topic: require('@/assets/icons/label/label-topic.png'),
  }),
  methods: {
    toWorkRequirement() {
      if (this.isRequirement) return false
      this.$router.push({
        path: '/requirement',
        query: {
          taskId: this.labelData.taskId
        }
      })
    },
    /**
     * 进入活动详情
     */
    toActivityDetails() {
      if(this.activityData) {
        location.href= this.activityData.detailPagesURL
      }
    }
  }
}
</script>

<style lang="less" scoped>

// HomeWork
.m-label .label__homework--wrap {
  width: max-content;
  max-width: 95%;
  height: 24px;
  padding: 4px 8px;
  background: #E6F7EE;
  border-radius: 12px;
  cursor: pointer;
  .l-flex-row-def()
}

.label__homework--wrap .label__homework {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

.label__homework--wrap .label__homework__txt {
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #0CB65B;
  margin-right: 12px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.label__homework--wrap .label__homework__enter {
  width: 12px;
  height: 12px;
}


// Topic
.m-label .label__topic--wrap {
  height: 24px;
  padding: 4px 8px;
  background:#FFEFF2;
  border-radius: 12px;
  color: #FF6389;
  font-size: 12px;
  cursor: pointer;
  display: inline-block;
}

.label__topic--wrap .label__topic {
  width: 14px;
  height: 14px;
  margin: 2px 4px 0 0;
  float: left;
}

.label__topic--wrap .label__topic__txt {
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #FF6389;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 280px;
  float: left;
}

.label__topic--wrap .label__topic__bar {
  margin:0 3px;
}
.label__topic--wrap .label__topic__nums {
  min-width: 15%;
}
</style>