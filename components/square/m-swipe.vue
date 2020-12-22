<template>
  <section class="swiper-wrap">
    <client-only>
      <swiper
        ref="mySwiper"
        class="swiper"
        :options="swiperOptions"
        @slideChange="slideChange()"
      >
        <swiper-slide v-for="(item, i) in banner" :key="i">
          <a :href="item.redirectContent" target="_blank">
            <img :src="item.imgInfo" :alt="item.name" />
          </a>
        </swiper-slide>
      </swiper>
      <!-- 分页 -->
      <span class="pagination">
        {{ pagination }}/{{ banner.length }}
      </span>
    </client-only>
  </section>
</template>

<script>
export default {
  name: 'M-Swipe',
  props:{
    banner:{
      type:Array,
      default:[]
    }
  },
  data: () => ({
    pagination: '1',
    swiperOptions: {
      loop: true,
      speed: 300,
      slidesPerView: 1.1,
      centeredSlides: true,
      spaceBetween: 10,
      touchRatio: 0.2,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    },
  }),
  methods: {
    slideChange(e) {
      const swiper = this.$refs.mySwiper.$swiper
      this.pagination = swiper.realIndex + 1
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-wrap {
  width: 100%;
  height: 140px;
  overflow: hidden;
  margin: 20px 0 8px;
  position: relative;
  background-color: @dp-white;
}

.swiper {
  width: 100%;
  max-height: 140px;
  overflow: visible;
}

.swiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 8px;
}

.swiper-slide img {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  object-fit: cover;
}

.swiper-wrap .pagination {
  width: 40px;
  height: 20px;
  display: block;
  position: absolute;
  right: 28px;
  bottom: 6px;
  font-size: 11px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  text-align: center;
  background-color: transparent;
  background-image: url('~@/assets/icons/common/swipe-pagtion-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 11;
}
</style>
