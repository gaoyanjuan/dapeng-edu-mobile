<template>
  <div>
    <!-- Header Block -->
    <m-navbar v-if="!$route.query.share" title="视频详情" />

    <m-call-app v-else></m-call-app>

    <!-- Player Block -->
    <div :class="$route.query.share ? '': 'video-posts-player'">
      <div id="player"></div>
    </div>
    
    <!-- Body Block -->
    <section v-if="video" class="video-posts-details-wrap">
      <m-avatar
        avatar-style="width:40px; height:40px;"
        :user-info="video.user"
        :attention="video.isAttention"
        :submit-time="video.createTime"
      />

      <div class="video-posts-content">
        {{ video.title }}
      </div>

      <div class="video-posts-box">
        <m-posts-class
          :remark="video.college && video.college.name ? `视频·${ video.college.name.replace(/学院/, '') }` : '视频'"
          :labels="video.labels"
        />
      </div>

      <div class="play-count">
        {{ video.playCount | commonCount }}次播放
      </div>
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

    <!-- 悬浮唤起APP 按钮-->
    <m-call-app-btn v-if="$route.query.share"></m-call-app-btn>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name:'Video-Page-Details',
  layout:'navbar',
  head () {
    return {
      title: '视频详情-大鹏教育-千万人的兴趣学习社区',
    }
  },
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
          // hideRepeat: true,
          hideSwitchPlayer: true,
          vid: res.data.video.id
        })

        this.player.on('s2j_onPlayStart', () => {
          this.appendBrowseCount({ id: this.video.id })
        })

        if (res && res.data) {
          this.$store.commit('details/changeIsPraise', res.data.isPraise)
          this.$store.commit('details/changeIsCollection', res.data.isCollection)
          this.$store.commit('details/changeCommentCount', res.data.commentCount)
          this.$store.commit('details/changePraiseCount', res.data.praiseCount)
        }
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
      appendBrowseCount: 'reading/appendBrowseCount',
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

.video-posts-box {
  margin-top: 18px;
}

.play-count {
  margin-top: 12px;
  height: 16px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 16px;
}

</style>