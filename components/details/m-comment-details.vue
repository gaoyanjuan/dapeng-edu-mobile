<template>
  <div>
    <m-navbar :title="`${commentDetailsGetters.replyCount ? commentDetailsGetters.replyCount : '0'}条回复`"/>
    <div class="page">
      <div v-if="commentDetailsGetters.type">
        <div class="comment-box" >
          <m-details-comment
            :user="commentDetailsGetters.user"
            :time="commentDetailsGetters.createTime"
            :thumbNumber="commentDetailsGetters.praiseCount"
            :content="commentDetailsGetters.content"
            :isTeacher="commentDetailsGetters.type === 'MARK'"
            :isAudio="commentDetailsGetters.ext ? commentDetailsGetters.ext.approvedType === 'AUDIO' : false"
            :audioUrl="commentDetailsGetters.ext ? commentDetailsGetters.ext.approvedAudioUrl : ''"
            :audioCount="commentDetailsGetters.ext ? commentDetailsGetters.ext.approvedAudioLength : 0"
            :teacherType="$route.query.courseType"
          />
        </div>
        <div class="line"></div>
        <div class="replies-title">全部回复</div>
      </div>
      <section class="list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          loading-text="正在努力加载"
          @load="onLoad"
        >
          <div class="replies-box">
            <div class="replies-comment-box" v-for="(item, index) in repliesGetters.data" :key="index">
              <m-details-comment
                :user="item.user"
                :parentUser="item.parentUser"
                :replyUser="commentDetailsGetters.user"
                :time="item.createTime"
                :thumbNumber="item.praisesCount"
                :content="item.content"
                :contentImages="(item.images instanceof Array) && item.images.length > 0 ? item.images[0].url : ''"
              />
            </div>
          </div>
        </van-list>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      finished: false
    }
  },
  computed: {
    ...mapGetters('comment', [
      'commentDetailsGetters',
      'repliesGetters'
    ])
  },
  watch: {
    'repliesGetters.status': function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
        this.loading = false
      }
    }
  },
  mounted () {},
  destroyed () {
    this.clearRepliesList()
  },
  methods: {
    ...mapActions('comment', [
      'queryRepliesList'
    ]),
    ...mapMutations('comment', [
      'clearRepliesList'
    ]),
    onLoad () {
      if (this.repliesGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.repliesGetters.status === 'loading') return false
      const newStartTime = this.repliesGetters.data.slice(-1)[0].createTime
      this.queryRepliesList({
        id: this.$route.query.id,
        startTime: newStartTime
      }).then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 0 16px;
  padding-top: 33px;
  .comment-box {
    margin-top: 33px;
  }
}
.replies-title {
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 14px;
  font-family: @dp-font-medium;
  font-weight: 500;
  color: #18252C;
  line-height: 20px;
}
.list {
  padding-bottom: 65px;
}
.replies-box {
  &>:nth-child(1) {
    padding-top: 0px;
  }
  &>div {
    padding-top: 36px;
  }
}
.line {
  margin-top: 17px;
  width: 100%;
  height: 1px;
  background: #EBEFEA;
  border-radius: 0px;
}
.finally {
  text-align: center;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #D1D3D5;
  line-height: 20px;
  padding-bottom: 126px;
  padding-top: 28px;
}
</style>