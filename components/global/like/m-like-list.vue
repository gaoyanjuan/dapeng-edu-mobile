<template>
  <div class="like-list">
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text="正在努力加载"
      @load="onLoad"
    >
      <template v-for="(item, index) in likesListGetters.data">
        <m-like-item
          :key="index"
          :userName="item.user ? item.user.nickname : '佚名'"
          :headImg="item.user ? item.user.avatar : ''"
          :time="item.createTime"
        />
      </template>
      <template v-if="likesListGetters.data.length === 0 && finished">
        <div class="blank">
          <img class="none-love-blank" :src="blank" alt="空白占位" />
          <span class="none-love-txt">暂无喜欢哦～</span>
        </div>
      </template>
      <div class="finished-text" v-if="finished && likesListGetters.data.length > 0">
        没有更多了
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  props: {},
  data () {
    return {
      loading: false,
      finished: false,
      blank:require('@/assets/icons/blank/have-no-love.png')
    }
  },
  destroyed () {
    this.clearLikesList()
  },
  watch: {
    'likesListGetters.status': function (newVal, oldVal) {
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
  computed: {
    ...mapGetters('comment', [
      'likesListGetters'
    ])
  },
  methods: {
    ...mapActions('comment', [
      'queryLikesList'
    ]),
    ...mapMutations('comment', [
      'clearLikesList'
    ]),
    onLoad () {
      if (this.likesListGetters.status === 'over') {
        this.finished = true
        return false
      }
      if (this.likesListGetters.status === 'loading') return false
      const newPage = this.likesListGetters.pageInfo.pages + 1
      this.queryLikesList({
        ...this.likesListGetters.params,
        page: newPage
      }).then(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less">
.like-list {
  &>:last-child {
    margin-bottom: 0;
  }
}

.blank {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 60px;
  margin-bottom: 60px;
}

.blank .none-love-blank {
  width: 240px;
  height: 126px;
}

.blank .none-love-txt {
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