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
          <img class="header-btn-delete" :src="deletes" @click.stop="confirm()"/>
        </div>
      </template>
    </van-image-preview>

    <!-- Dialog -->
    <m-dialog :dialog="dialog" @confirm="onDelete()"></m-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImagesPreview',
  props: {
    imagePreview: {
      type: Object,
      default() {
        return {
          show: false,
          images: [],
          startPosition: 1
        }
      }
    }
  },
  data() {
    return {
      index: 0,
      dialog: {show:false},
      showMenusPopup:false,
      deletes:require('@/assets/icons/preview/delete.png'),
      close: require('@/assets/icons/preview/close.png'),
    }
  },
  methods: {

    /** 下标更新  */
    onChange(index) {
      this.index = index
    },
    /** 关闭图片预览*/
    onClose() {
      this.imagePreview.show = false
    },
    /** 唤起删除确认弹框 */
    confirm() {
      this.dialog.show = true
    },
    /** 删除 */
    onDelete() {
      this.$emit('onDelete', this.index)
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
    .header-btn-delete {
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
}
</style>
