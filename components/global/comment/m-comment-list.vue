<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text="正在努力加载"
      @load="onLoad"
    >
      <template v-for="(item, index) in commentListGetters.data">
        <m-comment-item
          :isTeacher="item.type === 'MARK'"
          :key="item.id + index"
          :itemIndex="index"
          :contentType="contentType"
          :commentItem="item"
          :user="item.user"
          :teacherType ="courseType"
          :contentImages="(item.imgInfo instanceof Array) && item.imgInfo.length > 0 ? item.imgInfo[0].url : ''"
          :isAudio="item.ext ? item.ext.approvedType === 'AUDIO' : false"
          :replies="item.replies"
          :audioUrl="item.ext ? item.ext.approvedAudioUrl : ''"
          :audioCount="item.ext ? item.ext.approvedAudioLength : 0"
        />
      </template>
      <template v-if="commentListGetters.data.length === 0 && finished">
        <div class="blank">
          <img class="none-comment-blank" :src="blank" alt="空白占位" />
          <span class="none-comment-txt">暂无评论哦～</span>
        </div>
      </template>
      <div class="finished-text" v-if="finished && commentListGetters.data.length > 0">
        没有更多了
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  props: {
    contentType: {
      type: String,
      default: ''
    },
    courseType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      blank:require('@/assets/icons/blank/have-no-comment.png')
    }
  },
  computed: {
    ...mapGetters('comment', [
      'commentListGetters'
    ])
  },
  mounted () {},
  destroyed () {
    this.clearCommentList()
  },
  watch: {
    'commentListGetters.status': function (newVal, oldVal) {
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
  methods: {
    ...mapActions('comment', [
      'queryCommentList'
    ]),
    ...mapMutations('comment', [
      'clearCommentList'
    ]),
    onLoad () {
      // 页面首次加载不会走watch
      if (this.commentListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.commentListGetters.status === 'loading') return false
      const newStartTime = this.commentListGetters.data.slice(-1)[0].createTime
      this.queryCommentList({
        ...this.commentListGetters.params,
        startTime: newStartTime
      })
    }
  }
}
</script>

<style lang="less" scoped>
.blank {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 60px;
  margin-bottom: 60px;
}

.blank .none-comment-blank {
  width: 240px;
  height: 126px;
}

.blank .none-comment-txt {
  margin-top: 12px;
  width: max-content;
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #8D8E8E;
  line-height: 20px;
}
.finished-text {
  height: 50px;
  text-align: center;
  color: #969799;
  font-size: 14px;
  line-height: 50px;
}
</style>