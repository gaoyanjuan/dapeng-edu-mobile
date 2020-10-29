<template>
  <div :style="{ height: `${height}px` }" class="water-fall-container">
    <div ref="wraper" :style="{ opacity: isReady ? 1 : 0.2 }" class="water-fall-wrapper van-clearfix">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils/util.js'

export default {
  props: {
    width: {
      type: String,
      default: '300px'
    },
    gap: {
      type: String,
      default: '10px'
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      height: 0,
      itemWidth: 0,
      isReady: false
    }
  },
  computed: {
    w() {
      const w = this.width.toString()
      if (/^\d*$/.test(w)) {
        return `${w}px`
      }
      return w
    },
    h() {
      const h = this.height.toString()
      if (/^\d*$/.test(h)) {
        return `${h}px`
      }
      return h
    }
  },
  watch: {
    data() {
      // 监听数据变化，重置瀑布流
      this.initWaterFall()
    }
  },
  mounted() {
    // 初始化瀑布流
    this.initWaterFall()

    window.addEventListener('resize', this.initWaterFall)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initWaterFall)
  },
  methods: {
    async allReady() {
      // 排序自组件
      const children = this.$children
      const len = children.length
      const promiseMap = []
      for (let i = 0; i < len; i++) {
        const { $el } = this.$children[i]
        promiseMap.push(isReady($el))
      }
      // 图片加载完成
      const images = await Promise.all(promiseMap)
      return images
    },
    getColNum() {
      // 获取列数，设置容器宽度
      const conW = this.$el.clientWidth
      const itemW = this.$children[0].$el.clientWidth
      // const colNum = ~~(conW / itemW)
      const colNum = 2
      // this.$refs.wraper.style.width = `${colNum * itemW}px`
      this.itemWidth = itemW
      return colNum
    },
    setPos(hMap) {
      const len = this.$children.length
      for (let i = 0; i < len; i++) {
        // 获取最小高度对应组下标
        const minHeight = Math.min(...hMap)
        const minIndex = hMap.findIndex((item) => item === minHeight)

        // 设置item位置
        const { $el } = this.$children[i]
        hMap[minIndex] += $el.clientHeight
        if(minIndex !== 0) {
          $el.style.left = `${(this.itemWidth * minIndex) + 10}px`
        } else {
          $el.style.left = `${this.itemWidth * minIndex}px`
        }
        
        $el.style.top = `${minHeight}px`
        
        // 设置最外层容器高度
        this.height = Math.max(...hMap)
      }
    },

    initWaterFall() {
      debounce(async () => {
        // 初始化瀑布流
        if (!this.$children.length) {
          console.warn('not found waterFallItem')
          return
        }
        // 等待图片加载
        // await this.allReady()
        this.isReady = true
        // 设置容器宽度
        const colNum = this.getColNum()
        // 获取默认各组高度
        const hMap = getDefaultHeightMap(colNum)
        this.setPos(hMap)
      })
    }
  }
}

// 等待图片加载完成，获取高度（在resize的时候等待图片加载),只会判断每个waterFallItem组件中，只能放一张图片
function isReady(el) {
  return new Promise((resolve) => {
    let img
    if (el.tagName === 'IMG') {
      img = el
    } else {
      img = el.querySelector('img')
    }
    if (!img) {
      resolve()
    } else if (img.complete) {
      resolve()
      return
    }
    img.onload = resolve
    img.onerror = resolve
  })
}

// 获取各组默认高度 [0, 0, 0 ...]
function getDefaultHeightMap(colNum = 1, arr = []) {
  if (arr.length < colNum) {
    arr.push(0)
    return getDefaultHeightMap(colNum, arr)
  }
  return arr
}
</script>

<style>
.water-fall-wrapper {
  position: relative;
  height: 200px;
}
</style>
