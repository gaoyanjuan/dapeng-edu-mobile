<template>
  <div v-if="item" class="m-reading">

    <van-skeleton title :row="6" :loading="loading">
      <div class="reading-posts-card">

        <!-- Header Block -->
        <template v-if="item.coverImgSmall.length === 1">
          <nuxt-link tag="div" class="reading-header-row" :to="`/details/reading-page-details?id=${item.id}`">
            <img class="posts-cover" :src="item.coverImgSmall[0]" alt="" />
            <div class="posts-right-side-wrap">
              <span class="posts-title">{{ item.title }}</span>
              <span class="posts-content">{{ content }}</span>
            </div>
          </nuxt-link>
        </template>

        <template v-else>
          <nuxt-link tag="div" class="reading-header-row-more" :to="`/details/reading-page-details?id=${item.id}`">
            <div class="posts-title"> {{ item.title }} </div>
            <div class="posts-content"> {{ content }} </div>
            <div class="posts-photos-wrap" v-if="item.coverImgSmall">
              <img class="posts-photo" v-for="(ele, j) in item.coverImgSmall" :key="j" :src="ele" alt="" />
            </div>
          </nuxt-link>
        </template>

        <!-- Body Block -->
        <div class="reading-body-row">
          <div class="posts-label">阅读 {{ item.college.name ? '· ' :'' }}{{ item.college | filterCollageName }}</div>
          <div class="posts-author"> {{ item.user.nickname }} </div>
          <div class="posts-date"> {{ item.createTime | commonDate }} </div>
        </div>

        <!-- Footer Block -->
        <div class="reading-footer-row">
          <div class="posts-commernt-wrap" @click="onComment">
            <img class="posts-comment" :src="comment" alt="comment" />
            <span class="posts-nums">{{ item.commentCount | studentsCount }}</span>
          </div>
          <div class="posts-love-wrap" @click="onLove">
            <img class="posts-love" :src="isPraise ? unLove : love" alt="love" />
            <span class="posts-nums">{{ praiseCount | studentsCount }}</span>
          </div>
          <div class="posts-star-wrap" @click="onCollect">
            <img class="posts-star" :src="isCollection ? unStar : star" alt="star" />
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:'M-Reading-Posts',
  props:{
    /** 
     * 数据对象 
    * */
    item:{
      type:Object,
      default:{}
    }
  },
  data:() => ({
    loading: true,
    isPraise: false,
    isCollection: false,
    praiseCount: 0,
    comment: require('@/assets/icons/posts/posts-comment.png'),
    love: require('@/assets/icons/posts/posts-love.png'),
    unLove: require('@/assets/icons/posts/posts-unlove.png'),
    star: require('@/assets/icons/posts/posts-star.png'),
    unStar: require('@/assets/icons/posts/posts-unstar.png'),
  }),
  computed:{
    content() {
      return this.item.content.replace(/<[^>]+>/g, "").replace(/&nbsp;/gi, '')
    }
  },
  created() {
    if (this.item) {
      this.praiseCount = this.item.praiseCount
      this.isPraise = this.item.isPraise
      this.isCollection = this.item.isCollection
    }
  },
  watch: {
    'item': function (newVal, oldVal) {
      this.praiseCount = newVal.praiseCount
      this.isPraise = newVal.isPraise
      this.isCollection = newVal.isCollection
    },
  },
  mounted(){
    setTimeout(() => {
      this.loading = false
    }, 500)
  },

  methods:{
    ...mapActions({
      queryLike: 'comment/queryLike',
      queryUnLike: 'comment/queryUnLike',
      queryCollection: 'comment/queryCollection',
      queryDeleteCollection: 'comment/queryDeleteCollection',
    }),

    onComment() {},

    onLove() {
      if(!this.$login()) {
        return 
      }
      if (this.isPraise) {
        this.isPraise = false
        this.praiseCount -= 1
        this.queryUnLike({
          id: this.item.id,
          type: 'ARTICLE'
        })
      } else {
        this.isPraise = true
        this.praiseCount += 1
        this.queryLike({
          id: this.item.id,
          type: 'ARTICLE',
          createdId: this.item.user.userId,
          contentType: 'TEXT'
        })
      }
    },

    onCollect() {
      if(!this.$login()) {
        return 
      }
      if (this.isCollection) {
        this.isCollection = false
        this.queryDeleteCollection({
          id: this.item.id,
          type: 'ARTICLE'
        })

      } else {
        this.isCollection = true
        this.queryCollection({
          id: this.item.id,
          type: 'ARTICLE',
          createdId: this.item.user.userId,
          contentType: 'TEXT'
        })
      }
    },
  }
}
</script>

<style lang="less" scoped>

.van-skeleton {
  padding-top: 20px;
}

.m-reading:not(:first-child) {
  margin-top: 12px;
}

.reading-posts-card {
  width: 100%;
  max-height: 266px;
  min-height: 182px;
  padding: 16px;
  background-color: @dp-white;
}

.reading-header-row {
  width: 100%;
  height: 74px;
  overflow: hidden;
  .l-flex-row();
}

.reading-header-row .posts-cover {
  width: 111px;
  height: 74px;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
}

.reading-header-row .posts-right-side-wrap {
  width: 220px;
  height: 74px;
  margin-left: 12px;
  cursor: pointer;
  .l-flex-column();
  
  & .posts-title {
    width: 220px;
    height:48px;
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #18252C;
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  & .posts-content {
    width: 220px;
    height: 20px;
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #A3A8AB;
    line-height: 20px;
    margin-top: 4px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}

.reading-header-row-more .posts-title {
  width: 343px;
  max-height: 48px;
  min-height: 24px;
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #18252C;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  cursor: pointer;
  overflow: hidden;
}

.reading-header-row-more .posts-content {
  width: 343px;
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 20px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.reading-header-row-more .posts-photos-wrap {
  display: flex;
  align-items: center;
  margin-top: 12px;
  & :not(:last-child) {
    margin-right: 5px;
  }
  & .posts-photo {
    width: 111px;
    height: 74px;
    border-radius: 4px;
    object-fit: cover;
    cursor: pointer;
  }
}

.reading-body-row {
  width: 100%;
  height: 24px;
  margin-top: 12px;
  .l-flex-row-def();
}

.reading-body-row .posts-label {
  width: 70px;
  height: 24px;
  background: #F7F7F7;
  border-radius: 12px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #465156;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}

.reading-body-row .posts-author {
  max-width: 160px;
  height: 16px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 16px;
  margin-left: 8px;
  margin-right: 8px;
}

.reading-body-row .posts-date {
  width: fit-content;
  height: 16px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 16px;
}

.reading-footer-row {
  width: 100%;
  height: 24px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}


.reading-footer-row .posts-comment,
.reading-footer-row .posts-love,
.reading-footer-row .posts-star {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.reading-footer-row .posts-nums {
  font-size: 12px;
  font-family: @dp-font-medium;
  font-weight: 500;
  color: #747C80;
}

.reading-footer-flex-style {
  width: 57px;
  height: 24px;
  display: flex;
  align-items: center;
}

.reading-footer-row .posts-commernt-wrap,
.reading-footer-row .posts-love-wrap {
  margin-right: 17px;
  .reading-footer-flex-style()
}

.reading-footer-row .posts-star-wrap {
  width: 24px;
  height: 24px;
}

.reading-footer-row .posts-nums {
  margin-left: 4px;
}

</style>