<template>
  <div 
    :class="[
      audioType === 'mobile'?'audio-box-mobile':'',
      audioType === 'mobile-list'? 'audio-box-mobile-list':''
      ]" 
    @click.stop="palyAudio">
    <img :src="audioImg">
    <span>{{ countDownTime }}s</span>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import audio from '@/assets/images/audio-img/mobile/audio.png'
import audioPlay from '@/assets/images/audio-img/mobile/audio.gif'
export default {
  props: {
    audioType:{
      type: String,
      default: 'mobile'
    },
    propIndex:{
      type: Number,
      default: 0
    },
    audioCount:{
      type: Number,
      default: 0
    },
    audioUrl: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      audioImg: audio,
      audio: null,
      countDownTime: 0,
      countDownItme: null
    }
  },
  computed:{
    ...mapGetters('device',['audioActiveGetters'])
  },
  watch:{
    audioActiveGetters(val) {
      if(val !== this.propIndex) {
        this.audio.pause()
        this.audioImg = audio
        clearInterval(this.countDownItme)
        this.countDownItme = null
        this.countDownTime = this.audioCount
      }
    }
  },
  mounted () {
    this.countDownTime = this.audioCount
    this.audio = new Audio(this.audioUrl)
  },
  beforeDestroy() {
    this.audio.pause()
    clearInterval(this.countDownItme)
    this.countDownItme = null
  },
  methods: {
    ...mapMutations('device',['appendAudioActive']),
    palyAudio () {
      const _this = this
      
      this.appendAudioActive(this.propIndex)
      if (this.audio.paused) {
        if(this.audioActiveGetters === this.propIndex) {
          this.audio.load()
          this.audio.play()
          this.countDownItme = setInterval(() => {
            if (this.countDownTime >0) {
              _this.countDownTime --
            }
          }, 1000);
          this.audioImg = audioPlay
        }
        this.audio.onended = () => {
          clearInterval(this.countDownItme)
          this.countDownItme = null
          this.audioImg = audio
          this.countDownTime = this.audioCount
        }
      } else {
        this.audio.pause()
        this.audioImg = audio
        clearInterval(this.countDownItme)
        this.countDownItme = null
        this.countDownTime = this.audioCount
      }
    }
  }
}
</script>
<style lang="less" scoped>
.audio-box-mobile {
  height: 18px;
  width: 63px;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  user-select:none;
  cursor: pointer;
  &>img {
    width: 63px;
    height: 18px;
  }
  &>span {
    position: absolute;
    right: 6px;
    font-size: 12px;
    font-family: @dp-font-medium;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 16px;
  }
}
.audio-box-mobile-list {
  height: 18px;
  width: 63px;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  user-select:none;
  margin: 9px 0 0 48px;
  cursor: pointer;
  &>img {
    width: 63px;
    height: 18px;
  }
  &>span {
    position: absolute;
    right: 6px;
    font-size: 12px;
    font-family: @dp-font-medium;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 16px;
  }
}
</style>