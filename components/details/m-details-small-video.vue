<template>
  <!-- Player Block -->
  <div class="details-video-player">
    <div id="player"></div>
  </div>
</template>

<script>
export default {
  name:'M-Details-Small-Video',

  props:{
    video:{
      type:String,
      default:'' 
    }
  },

  data: () => ({
    player: null,
  }),

  mounted() {
    this.player = polyvPlayer({
      wrap: '#player',
      width: '100%',
      height: '375px',
      vid: this.video,
      hideRepeat: true,
      hideSwitchPlayer: true,
    })
  },
}
</script>
