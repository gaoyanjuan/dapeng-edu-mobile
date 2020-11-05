<template>
  <div class="the-tabs">
    <ul class="heads">
      <li
        v-for="(tab, index) in tabs"
        :class="{ active: tab.isActive }"
        @click="selectTab(tab)"
        :key="index"
        ref="tabName"
      >
        <span class="tab-name" >{{ tab.name }}</span><span class="tab-count">({{(tab.count === 0 ? 0 : tab.count) | studentsCount }})</span>
      </li>
    </ul>
    <div class="line" :style="{left:underlineLeft+'px'}"></div>
    <div class="tab-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  data () {
    return {
      tabs: [],
      underlineLeft: 0,
      selectedIndex: 0,
      left: 4
    }
  },
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.$nextTick(() => {
      this.tabs.forEach((tab, index) => {
        if (index > 0) {
          this.left += 20 + this.$refs.tabName[index - 1].clientWidth
        }
        if (tab.isActive) {
          this.selectedIndex = index
          this.underlineLeft = this.left
        }
      })
    })
  },
  methods: {
    selectTab(selectedTab) {
      this.left = 4
      this.tabs.forEach((tab, index) => {
        tab.isActive = tab.name === selectedTab.name
        if (index > 0) {
          this.left += 20 + this.$refs.tabName[index - 1].clientWidth
        }
        if (tab.isActive) {
          if (this.selectedIndex < index) {
            this.left -= 4
          }
          this.selectedIndex = index
          this.underlineLeft = this.left
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.the-tabs {
  .heads {
    display: flex;
    &>li {
      margin-left: 20px;
      font-size: 14px;
      font-family: @dp-font-semibold;
      font-weight: 600;
      color: #A3A8AB;
      line-height: 22px;
      z-index: 10;
      .tab-count {
        margin-left: 2px;
        font-size: 12px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #A3A8AB;
        line-height: 17px;
      }
    }
    &>:nth-child(1) {
      margin-left: 0px;
    }
    .active  {
      &>.tab-name {
        font-size: 16px;
        color: #18252C;
      }
      .tab-count {
        color: #18252C;
      }
    }
  }
  .tab-body {
    margin-top: 17px;
  }
  .line {
    z-index: 5;
    width: 24px;
    height: 6px;
    background: linear-gradient(316deg, #0CB65B 0%, #1CDC94 100%);
    position: relative;
    top: -7px;
    transition: all 0.3s;
  }
}

</style>
