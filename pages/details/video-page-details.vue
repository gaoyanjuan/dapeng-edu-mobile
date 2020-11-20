<template>
  <div>
    <!-- Header Block -->
    <m-navbar title="视频详情" />

    <!-- Player Block -->
    <div class="video-posts-player">
      <div id="player"></div>
    </div>
    
    <!-- Body Block -->
    <section v-if="video" class="video-posts-details-wrap">
      <m-avatar
        avatar-style="width:40px; height:40px;"
        :user-info="video.user"
        :submit-time="video.createTime"
      />

      <div class="video-posts-content">
        {{ video.title }}
      </div>

      <div class="video-posts-label">视频·{{ video.college.name.replace(/学院/, '') }}</div>
    </section>

    <!-- Footer Block -->
    <section v-if="video" class="video-posts-comment-wrap">
      <m-details-footer
        :propCommentCount="video.commentCount"
        :propPraiseCount="video.praiseCount"
        contentType="VIDEO"
        topicType="MOVIE"
        :detailData="video"
      />
    </section>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name:'Video-Page-Details',
  layout:'navbar',
  data:() => ({
    player: null,
  }),
  computed:{
    ...mapGetters({
      video:'video/videoDetailsGetters',
      commentList:'comment/commentListGetters',
      likeList:'comment/likesListGetters'
    })
  },
  created () {
    if(!this.video && this.$route.query.id) {
      this.getDetails({id: this.$route.query.id}).then( res => {
        this.player = polyvPlayer({
          wrap: '#player',
          width: '100%',
          height: '211px',
          hideRepeat: true,
          hideSwitchPlayer: true,
          vid: res.data.video.id
        })
      })
    }

    if(!this.commentList.data.length && this.$route.query.id) {
      this.getComment({ topicId: this.$route.query.id, topicType: 'MOVIE' })
    }

    if(!this.likeList.data.length && this.$route.query.id) {
      this.getLikes({ page: 1, type: 'MOVIE', id: this.$route.query.id})
    }
  },
  methods:{
    ...mapActions({
      getDetails: 'video/appendVideoDetails',
      getComment: 'comment/queryCommentList',
      getLikes: 'comment/queryLikesList',
    }),

    ...mapMutations({
      clearDetails: 'video/clearVideoDetails'
    }),
  },

  destroyed () {
    this.clearDetails()
  }
}
</script>

<style lang="less" scoped>

/deep/ .pv-video-player {
  height: 221px !important;
  width: 375px !important;
}

.video-posts-player {
  margin-top: 44px;
}

.video-posts-comment-wrap {
  padding: 16px 16px 45px;
}

.video-posts-details-wrap {
  width: 100%;
  padding: 16px;
  background-color: @dp-white;
  border-bottom: 15px solid #F8F8F8;
}

.video-posts-content {
  width: 100%;
  min-height: 28px;
  font-size: 20px;
  font-family: @semibold;
  font-weight: 600;
  color: #18252C;
  line-height: 28px;
  margin-top: 16px;
}

.video-posts-label {
  width: 69px;
  height: 24px;
  background: #F7F7F7;
  border-radius: 12px;

  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #465156;
  line-height: 24px;
  margin-top: 16px;
  text-align: center;
}

</style>