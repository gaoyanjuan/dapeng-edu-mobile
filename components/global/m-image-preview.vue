<template>
  <div v-if="imagePreview.images">

    <!-- Images Preview Block -->
    <van-image-preview
      v-model="imagePreview.show"
      :loop="false"
      :images="imagePreview.images"
      :start-position="imagePreview.startPosition"
      class-name="images-preview-wrapper"
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
          show: false,
          images: [],
          startPosition: 1,
          isPraise: false,
          isCollection: false,
          commentCount:0,
          praiseCount:0
        }
      }
    }
  },
  data() {
    return {
      index: 0,
      showMenusPopup:false,
      more:require('@/assets/icons/preview/more.png'),
      close: require('@/assets/icons/preview/close.png'),
      comment: require('@/assets/icons/preview/comment.png'),
      love: require('@/assets/icons/preview/love.png'),
      isPraise: false,
      isCollection: false,
      commentCount: 0,
      praiseCount: 0
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
      this.index = index
    },
    /** 关闭图片预览*/
    onClose() {
      this.imagePreview.show = false
    },
    /** 更多 */
    onMore(){
      this.showMenusPopup = true
    },
    /** 保存图片 */
    onSaveImage() {
      const imgUrl = this.imagePreview.images[this.index]
      window.open(imgUrl,'_blank')
      this.showMenusPopup = false
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
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    bottom: 12px;
    left: 50%;
    padding: 0 16px;
    transform: translateX(-50%);

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
