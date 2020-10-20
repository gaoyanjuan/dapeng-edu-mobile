<template>
   <section class="menus-wrap">
    <client-only>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide
          v-for="(item, index) in menus"
          :key="index"
          :class="cindex === index ? 'menus-item-active' : 'menus-item'"
          @click.native="changeCollege(index, item)"
        >
          {{ item.name }}
        </swiper-slide>
      </swiper>
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'Menus',
  props:{
    menus:{
      type:Array,
      default:[]
    },
    /***
     * 【Params】college:学院
     * 【Params】type:最新、最热
     */
    menusType:{
      type:String,
      default:''
    },
    automatic: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    cindex: 0,
    swiperOption: {
      slidesPerView: 'auto',
      spaceBetween: 10,
      freeMode: true,
    }
  }),
  watch: {
    '$route.query': function (newVal, oldVal) {
      if (!this.automatic) return false
      if (!newVal[this.menusType]) {
        this.changeCollege(0, this.menus[0])
      }
    }
  },
  mounted () {
    for (let index = 0; index < this.menus.length; index++) {
      const element = this.menus[index]
      if (element.id === this.$route.query[this.menusType]) {
        this.cindex = index
        break
      }
    }
  },
  methods: {
    changeCollege(index, item) {
      // 禁止路由重复点击
      if (this.$route.query[this.menusType] === item.id) return
      this.cindex = index
      this.$router.replace({
        query: {
          ...this.$route.query,
          [this.menusType] : item.id
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.menus-wrap {
  width: 100%;
  height: 56px;
  padding: 16px 0 16px 16px;
  background-color: @dp-white;
}

.swiper {
  & .menus-item {
    width: 48px;
    height: 24px;
    font-size: 14px;
    font-weight: 400;
    color: #a3a8ab;
    line-height: 24px;
    text-align: center;
    font-family: @dp-font-regular;
  }
  & .menus-item-active {
    width: 48px;
    height: 24px;
    font-size: 14px;
    font-weight: 500;
    color: #0cb65b;
    line-height: 24px;
    background: #e6f7ee;
    border-radius: 14px;
    text-align: center;
    font-family: @dp-font-medium;
  }
}
</style>
