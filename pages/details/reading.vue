<template>
  <div>
    <!-- Header Block -->
    <m-navbar title="阅读详情" />
    
    <!-- Body Block -->
    <section v-if="reading" class="posts-details-wrap">
      <!-- Title -->
      <div class="posts-title"> {{reading.title}} </div>

      <!-- Avatar -->
      <m-avatar
        avatar-style="width:40px; height:40px;"
        :user-info="reading.user"
        :attention="reading.isAttention"
        :submit-time="reading.createTime"
      />

      <!-- Content -->
      <div class="posts-content">
        <div class="posts-inner-text" ref="richText" v-html="reading.content"></div>
        <div class="posts-label">阅读·{{ reading.college.name.replace(/学院/, '') }}</div>
      </div>
    </section>

    <!-- Footer Block -->
    <section v-if="reading" class="posts-comment-wrap">
      <m-details-footer
        :propCommentCount="reading.commentCount"
        :propPraiseCount="reading.praiseCount"
        contentType="TEXT"
        topicType="ARTICLE"
        :detailData="reading"
      />
    </section>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name:'P-Reading-Details',
  layout:'navbar',
  data:() => ({}),

  computed:{
    ...mapGetters({
      reading:'reading/readingDetailsGetters',
      commentList:'comment/commentListGetters',
      likeList:'comment/likesListGetters'
    })
  },

  created () {
    
    if(!this.reading && this.$route.query.id) {
      const _this = this

      this.getDetails({id: this.$route.query.id}).then( res => {
        if (res && res.data) {
          this.$store.commit('details/changeIsPraise', res.data.isPraise)
          this.$store.commit('details/changeIsCollection', res.data.isCollection)
          this.$store.commit('details/changeCommentCount', res.data.commentCount)
          this.$store.commit('details/changePraiseCount', res.data.praiseCount)
          this.appendBrowser({id: this.$route.query.id})
        }
        const imgList = this.$refs.richText.getElementsByTagName('img')
        imgList.forEach((element, index) => {
          element.addEventListener('click', function () {
            _this.ImagePreview({ images: res.data.img, startPosition:index})
          })
        })
      })
    }

    if(!this.commentList.data.length && this.$route.query.id) {
      this.getComment({ topicId: this.$route.query.id, topicType: 'ARTICLE' })
    }

    if(!this.likeList.data.length && this.$route.query.id) {
      this.getLikes({ page: 1, type: 'ARTICLE', id: this.$route.query.id})
    }
  },

  methods:{
    ...mapActions({
      getDetails: 'reading/appendReadingDetails',
      appendBrowser: 'reading/appendReadingBrowse',
      getComment: 'comment/queryCommentList',
      getLikes: 'comment/queryLikesList',
      
    }),

    ...mapMutations({
      clearDetails: 'reading/clearReadingDetails'
    }),
  },
  destroyed () {
    this.clearDetails()
  }
}
</script>

<style lang="less" scoped>

.posts-details-wrap {
  width: 100%;
  margin-top: 44px;
  padding:16px;
  background-color: @dp-white;
  border-bottom: 15px solid #F8F8F8;
}

.posts-details-wrap .posts-title {
  width: 343px;
  min-height: 28px;
  font-size: 20px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #18252C;
  line-height: 28px;
  margin-bottom: 12px;
  word-wrap: break-word;
  word-break: break-all;
}

.posts-details-wrap .posts-content {
  width: 100%;
  min-height: 300px;
  background-color: @dp-white;
}

.posts-content .posts-inner-text {
  width: 343px;
  height: auto;
  margin-top: 12px;
}

.posts-content .posts-inner-text {
  /deep/ & img {
    width: 343px;
    height: 220px;
    border-radius: 8px;
    margin-top: 12px;
    margin-bottom: 12px;
    object-fit: cover;
  }

  /deep/ & p {
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #36404A;
    line-height: 24px;
  }

  /deep/ & p:not(:first-child) {
    margin-top: 15px;
  }
}

.posts-content .posts-label {
  width: 69px;
  height: 24px;
  background: #F7F7F7;
  border-radius: 12px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #465156;
  line-height: 24px;
  text-align: center;
  margin-top: 16px;
}

.posts-comment-wrap {
  padding: 16px 16px 45px;
}

</style>