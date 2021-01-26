<template>
  <div v-if="imagePreview.images" @click.stop>

    <!-- Images Preview Block -->
    <van-image-preview
      v-model="imagePreview.show"
      :loop="false"
      :images="imagePreview.images"
      :start-position="imagePreview.startPosition"
      class-name="images-preview-wrapper"
      @close="onClose"
      @change="onChange"
    >
      <template v-slot:index>
        <div class="images-preview-header">
          <img class="header-btn-close" :src="close" @click.stop="onClose"/>
          <span class="header-index">{{ index + 1 }} / {{ imagePreview.images.length }}</span>
          <img class="header-btn-more" :src="more" @click.stop="onMore"/>
        </div>
      </template>

      <template v-slot:cover>
        <div class="images-preview-footer">

          <div class="footer-left-side-wrap">
            <div v-if="imagePreview.isDrawed && imagesMode" class="btn-change-photos btn-original" @click="lookScrawl">查看涂鸦图</div>
            <div v-else-if="imagePreview.isDrawed && !imagesMode" class="btn-change-photos btn-scrawl" @click="lookOriginal">查看原图</div>
          </div>

          <div class="footer-right-side-wrap">
            <div class="footer-comment-cloumn" @click.stop="openComment">
              <img class="icon" :src="comment" alt="" />
              <span class="nums">{{ imagePreview.commentCount | studentsCount }}</span>
            </div>

            <div class="footer-love-cloumn" @click.stop="onLove">
              <img class="icon" v-if="imagePreview.isPraise" src="@/assets/icons/posts/posts-unlove.png" alt="unlove" />
              <img class="icon" v-else src="@/assets/icons/posts/posts-love.png" alt="love" />
              <span class="nums">{{ imagePreview.praiseCount | studentsCount }}</span>
            </div>
          </div>

        </div>
      </template>
    </van-image-preview>

    <!-- Menus Popup Block -->
    <van-popup v-model="showMenusPopup" round overlay-class="menus-popup" :transition-appear="true">
      <div class="menus-popup-item" @click.stop="onCollect">{{ imagePreview.isCollection ? '取消收藏' : '收藏' }}</div>
      <div class="menus-popup-item" @click.stop="onSaveImage">保存图片</div>
      <div class="menus-popup-item" @click.stop="showMenusPopup = false">取消</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'ImagesPreview',
  props: {
    showBtn: {
      type: Boolean,
      default: false
    },
    imagePreview: {
      type: Object,
      default() {
        return {
          images: [],
          drawed: [],
          show: false,
          isDrawed: false,
          startPosition: 1,
          isPraise: false,
          isCollection: false,
          commentCount: 0,
          praiseCount: 0
        }
      }
    }
  },
  data() {
    return {
      index: 0,
      commentCount: 0,
      praiseCount: 0,
      isPraise: false,
      isCollection: false,
      showMenusPopup:false,
      imagesMode: true,
      originalImages: [],
      more:require('@/assets/icons/preview/more.png'),
      close: require('@/assets/icons/preview/close.png'),
      comment: require('@/assets/icons/preview/comment.png'),
      love: require('@/assets/icons/preview/love.png'), 
    }
  },

  watch:{
    'imagePreview.show':{
      immediate: false,
      handler (val) {
        if(val && this.imagePreview.isDrawed) {
          let res = this.imagePreview.drawed[this.index]
          if(res.isDrawed) {
            this.imagePreview.isDrawed = true
          } else {
            this.imagePreview.isDrawed = false
          }
        }
      }
    }
  },

  methods: {

    /** 评论 */
    openComment() {
      if(!this.$login()) {
        return 
      }
      this.$emit('openComment')
      this.onClose()
    },
    /** 收藏 */
    onCollect() {
      if(!this.$login()) {
        return 
      }
      this.$emit('onCollect')
      this.showMenusPopup = false
    },
    /** 喜欢 */
    onLove() {
      if(!this.$login()) {
        return 
      }
      this.$emit('onLove')
    },
    /** 下标更新  */
    onChange(index) {
      if(this.imagePreview.drawed.length) {
        let res = this.imagePreview.drawed[index]
        if(res.isDrawed) {
          this.imagePreview.isDrawed = true
        } else {
          this.imagePreview.isDrawed = false
        }
      }
      
      this.index = index
    },
    /** 关闭图片预览*/
    onClose() {
      this.imagesMode = true
      this.imagePreview.show = false
    },
    /** 更多 */
    onMore(){
      this.showMenusPopup = true
    },
    /** 保存图片 */
    onSaveImage() {
      const imgUrl = this.imagePreview.images[this.index]
      let a = document.createElement('a')
      let event = new MouseEvent('click')
      a.download = imgUrl
      a.href = imgUrl
      a.dispatchEvent(event)
      this.showMenusPopup = false
    },

    /** 打开涂鸦模式 */
    lookScrawl() {
      let arr = []

      // 先备份一份原图
      this.originalImages = this.imagePreview.images

      this.imagePreview.drawed.forEach(element => {
        arr.push(element.graffiti.url)
      })
      this.imagePreview.images = arr
      this.imagesMode = false
    },

    /*** 打开原图模式 */
    lookOriginal() {
      this.imagePreview.images = this.originalImages
      this.imagesMode = true
    }
  }
}
</script>

<style lang="less" scoped>

/** images-preview  */
.images-preview-wrapper {

  /deep/ .van-image-preview__index {
    width: 100%;
    height: 128px;
    position: absolute;
    top: 0;
    color: #fff;
    background-color: transparent;
    background-image: url('~@/assets/icons/preview/header-shadow.png');
    background-size: 100% 128px;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .images-preview-header {
    width: 375px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 12px;
    left: 50%;
    padding: 0 16px;
    transform: translateX(-50%);

    .header-btn-close,
    .header-btn-more {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .header-index {
      font-size: 14px;
      font-family: @medium;
      font-weight: 500;
    }
  }

  /deep/ .van-image-preview__cover {
    width: 100%;
    height: 128px;
    position: absolute;
    bottom: 0;
    top: auto;
    color: #fff;
    background-color: transparent;
    background-image: url('~@/assets/icons/preview/footer-shadow.png');
    background-size: 100% 128px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .images-preview-footer {
    width: 375px;
    height: 32px;
    position: absolute;
    bottom: 12px;
    left: 50%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translateX(-50%);
  }

  .images-preview-footer .footer-left-side-wrap {
    display: flex;
    align-items: center;

    .btn-change-photos {
      width: 94px;
      height: 32px;
      line-height: 32px;  
      font-size: 14px;
      font-family: @medium;
      font-weight: 600;
      text-align: center;
    }

    .btn-scrawl {
      color: #5D2D09;
      background-image: url('~@/assets/icons/preview/artwork-btn-bg.png');
      background-color: transparent;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }

    .btn-original {
      color: #FFFFFF;
      background-image: url('~@/assets/icons/preview/scrawl-btn-bg.png');
      background-color: transparent;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .images-preview-footer .footer-right-side-wrap {
    display: flex;
    align-items: center;
    
    .footer-comment-cloumn,
    .footer-love-cloumn {
      width: 59px;
      display: flex;
      align-items: center;
      cursor: pointer;

      .icon {
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }

      .nums {
        font-size: 14px;
        font-family: @regular;
        font-weight: 400;
      }
    }

    .footer-comment-cloumn {
      margin-right: 9px;
    }
  }
}

/** menus-popup */
/deep/.van-popup {
  width: 284px;
  height: 138px;
  overflow: hidden;
}

/deep/.van-popup--center.van-popup--round {
  border-radius: 8px;
}

.van-popup .menus-popup-item {
  width: 100%;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
  font-family: @regular;
  font-weight: 400;
  color: #18252C;
  text-align: center;
  border-bottom: 1px solid #F7F7F7;
  cursor: pointer;
}

.van-popup .menus-popup-item:active {
  background-color:#f2f3f5;
}

.van-popup .menus-popup-item:last-child{
  border-bottom:none;
}
</style>
