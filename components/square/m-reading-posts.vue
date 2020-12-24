<template>
  <div v-if="item" class="m-reading">
    <div class="reading-posts-card" @click="toDetail">

      <!-- Header Block -->
      <div v-if="item.coverImgSmall.length === 1" class="reading-header-row" @click="toDetail">
        <div class="posts-title van-multi-ellipsis--l2">{{ item.title }}</div>
        <img class="posts-cover" :src="item.coverImgSmall[0]" alt="" />
      </div>

      <div v-else class="reading-header-row-more" @click="toDetail">
        <div class="posts-title van-multi-ellipsis--l2"> {{ item.title }} </div>
        <div class="posts-photos-wrap" v-if="item.coverImgSmall">
          <img class="posts-photo" v-for="(ele, j) in item.coverImgSmall" :key="j" :src="ele" alt="" />
        </div>
      </div>

      <!-- Body Block -->
      <div class="reading-body-row">
        <div class="posts-label">
          阅读 {{ item.college.name ? '· ' :'' }}{{ item.college | filterCollageName }}
        </div>
        
        <div v-for="item in item.labels" :key="item.labelId" class="posts-label-other">
          {{ item.labelName }}
        </div>
      </div>

      <!-- Footer Block -->
      <div class="reading-footer-row">
        <div class="footer-left-side">
          <span class="posts-author"> {{ item.user.nickname }} </span>
          <span class="posts-date"> {{ item.createTime | commonDate }} </span>
        </div>
        <span class="posts-comment"> {{ item.commentCount | studentsCount }}评论 </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'M-Reading-Posts',
  props:{
    /** 
     * 数据对象 
    * */
    item:{
      type:Object,
      default:{}
    },
    pageName: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: ''
    },
    propIndex:{
      type: Number,
      default: 0
    }
  },

  methods:{
    toDetail() {
      this.$cookiz.set('isLogin', false, { path: '/' })

      this.$store.commit('changeListData', {
        listType: 'arttcle',
        propIndex: this.propIndex,
        anchorId: this.item.id
      })

      this.$router.push({ path: `/details/reading?id=${this.item.id}` })
    }
  }
}
</script>

<style lang="less" scoped>

.m-reading:not(:first-child) {
  margin-top: 16px;
}

.reading-posts-card {
  width: 100%;
  max-height: 228px;
  min-height: 142px;
  padding: 16px;
  background-color: @dp-white;
}

// 单张图片
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

.reading-header-row .posts-title {
  width: 220px;
  height:48px;
  font-size: 16px;
  font-family: @regular;
  font-weight: 400;
  color: #18252C;
  line-height: 24px;
  margin-right: 12px;
  word-break: break-all;
  word-wrap: break-word;
  align-self: flex-start;
}

// 多张题图
.reading-header-row-more .posts-title {
  width: 343px;
  max-height: 48px;
  min-height: 24px;
  font-size: 16px;
  font-family: @regular;
  font-weight: 400;
  color: #18252C;
  line-height: 24px;
  word-break: break-all;
  word-wrap: break-word;
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
  line-height: 24px;
  margin-top: 12px;
  .l-flex-row-def();

  & > div:not(:last-child) {
    margin-right: 8px;
  }
}

.reading-body-row .posts-label {
  width: auto;
  height: 24px;
  line-height: 24px;
  text-align: center;
  padding: 0 8px;
  background: #F7F7F7;
  border-radius: 12px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #465156;
  text-align: center;
}

.reading-body-row .posts-label-other {
  width: auto;
  height: 24px;
  line-height: 24px;
  padding: 0 8px;
  background: #E6F7EE;
  border-radius: 12px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #0CB65B;
  text-align: center;
}

.reading-footer-row {
  width: 100%;
  height: 24px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reading-footer-row .footer-left-side {
  display: flex;
  align-items: center;
}

.footer-left-side .posts-author {
  max-width: 160px;
  height: 16px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 16px;
  margin-left: 8px;
  margin-right: 8px;
}

.footer-left-side .posts-date {
  width: fit-content;
  height: 16px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 16px;
}

.reading-footer-row .posts-comment {
  width: auto;
  height: 16px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 16px;
  justify-self: flex-end;
}
</style>