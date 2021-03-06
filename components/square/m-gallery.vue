<template>
  <div>
    <van-swipe
      v-if="photos"
      class="swipe-photos"
      :style="photosHei"
      :loop="loop"
      :stop-propagation="false"
      @change="onPhotosChange"
    >
      <van-swipe-item v-for="(item, i) in photos" :key="i" @click="openImagePreview(i)">
        <img :src="item" :alt="item" />
      </van-swipe-item>
      <template #indicator>
        <div class="swipe-photos-indicator">
          {{ current + 1 }}/{{ photos.length }}
        </div>
      </template>
    </van-swipe>

    <!--Image preview -->
    <m-image-preview
      :image-preview="imagePreview"
      @openComment="openComment"
      @onLove="onLove"
      @onCollect="onCollect"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name:'Gallery',
  props:{
    photos:{
      type: Array,
      default:[]
    },
    /**图片数据 */
    photoInfo:{
      type: Array,
      default:[]
    },
    /** 其它数据 */
    item:{
      type: Object,
      default:{}
    },
    /** 调用来源 */
    pageName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    current: 0,
    loop:false,
    photosHei:'height:300px;',
    // 图片预览
    imagePreview: {
      show: false,
      images: [],
      startPosition: 1,
      isPraise: false,
      isCollection: false,
      commentCount: 0,
      praiseCount: 0
    },
  }),
  computed: {
    ...mapGetters({
      detailsGetters: 'details/detailsGetters'
    }),
    ...mapGetters({
      userinfo: 'user/userInfoGetters'
    })
  },
  mounted() {
    this.calcuSwiperWrap()
  },
  watch: {
    'detailsGetters': function (newVal) {
      this.imagePreview = {
        ...this.imagePreview,
        isPraise: newVal.isPraise,
        isCollection: newVal.isCollection,
        praiseCount: newVal.praiseCount,
        commentCount: newVal.commentCount,
      }
    }
  },
  methods: {
    // 评论操作
    openComment() {
      if(!this.$login()) {
        return 
      }
      this.$emit('openComment')
    },
    // 收藏
    onCollect() {
      if(!this.$login()) {
        return 
      }
      this.$emit('onCollect')
    },
    //喜欢操作
    onLove() {
      if(!this.$login()) {
        return 
      }
      this.$emit('onLove')
    },
    // 监听图片切换
    onPhotosChange(index) {
      this.current = index
    },
    /**
     * 打开图片预览
     * @iamges:图片列表
     * @index：当前图片索引
     */
    openImagePreview(index) {
      let drawed = { show: false, list: []}

      if(this.$route.query.from === 'personal' && this.item.doodlingImg) {
        if(this.userinfo.userId === this.item.user.userId) {
          drawed.show = true
          drawed.list = this.item.doodlingImg
        }
      }

      this.imagePreview = {
        images: this.handleFilterImage(),
        startPosition: index,
        isPraise: this.detailsGetters.isPraise,
        isCollection: this.detailsGetters.isCollection,
        praiseCount: this.detailsGetters.praiseCount,
        commentCount: this.detailsGetters.commentCount,
        drawed: drawed.list,
        isDrawed: drawed.show,
        show: true
      }
    },
    // 图片提取器
    handleFilterImage() {
      let gallery = []
      this.photos.forEach(function(item){
        gallery.push(item)
      })
      return gallery
    },
    /** 
     * 计算Swipe 容器高度
     * 如果大于500,容器高为500px;
     * 如果小于200,容器高为200px;
     * 如果在最高和最低像素区间，
     * 取图片高度作为容器高度。
    */
    calcuSwiperWrap() {
      if(this.photoInfo && this.photoInfo[0]) {
        const width = document.documentElement.clientWidth
        const imgWidth = parseInt(this.photoInfo[0].width) || 375
        const imgHeight = parseInt(this.photoInfo[0].height) || 300
        const height = width / imgWidth * imgHeight
        if (height > 500) {
          this.photosHei = `height: 500px;`
        } else if (height < 200) {
          this.photosHei = `height: 200px;`
        } else {
          this.photosHei = `height:${height}px;`
        }
      }
      
    },
  },
}
</script>

<style lang="less" scoped>

.swipe-photos .van-swipe-item {
  background-color: #F5F5F5;
  position: relative;
}

.van-swipe-item > img {
  width: 100%;
  min-height: 200px;
  max-height: 500px;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.swipe-photos-indicator {
  position: absolute;
  right: 16px;
  top: 16px;
  padding: 2px 5px;
  font-size: 12px;
  color: @dp-white;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
}
</style>