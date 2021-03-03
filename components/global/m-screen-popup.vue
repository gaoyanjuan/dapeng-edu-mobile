<template>
  <div>
    <van-popup v-model="screen.show" :style="popupClass" @click-overlay="onClose" round>
      <div class="screen-popup-wrapper">
        <van-swipe class="my-swipe" :autoplay="3000">
          <van-swipe-item v-for="item in screen.list" :key="item.id" @click="openPage(item.url)">
            <img class="images" v-lazy="item.img"/>
          </van-swipe-item>
        </van-swipe>
      </div>
    </van-popup>

    <div v-if="screen.show" @click="onClose">
      <img class="screen-popup-close" :src="close" alt="close" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:'M-Screen-Popup',
  props:{
    screen: {
      type: Object,
      default: function () {
        return {
          show: false,
          list: []
        }
      }
    }
  },
  data: () => ({
    popupClass:{ width: '7rem', height: '9.6rem' },
    close: require('@/assets/icons/popup/popup-close.png'),
  }),

  methods: {
    ...mapActions({
      deleteScreenList:'user/deleteScreenList'
    }),

    onClose() {
      this.screen.show = false

      let ids = []
      this.screen.list.forEach(ele => { ids.push(ele.id) })
      this.deleteScreenList(ids)
    },

    openPage(url) {
      if(url) {
        window.open(url, '_blank')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup--round {
  border-radius: 6px;
}

.van-popup--center {
  top: 47%;
}

/deep/.van-swipe__indicators {
  width: auto;
  padding: 3px 5px;
  position: absolute;
  right: 16px;
  left: auto;
  transform: none;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}

/deep/.van-swipe__indicators .van-swipe__indicator {
  width: 6px;
  height: 6px;
  background: #D8D8D8;
  opacity: 0.5;
}

/deep/.van-swipe__indicators .van-swipe__indicator--active {
  width: 14px;
  height: 6px;
  background: #FFFFFF;
  border-radius: 3px;
}

.screen-popup-wrapper {
  width: 100%;
  height: 100%;
}

.my-swipe .van-swipe-item {
  width: 7rem;
  height: 9.6rem;
}

.my-swipe .images {
  width: 100%;
  height: 9.6rem;
  object-fit: cover;
}

.screen-popup-close {
  width: 42px;
  height: 42px;
  position: fixed;
  top: 77%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2010;
}
</style>