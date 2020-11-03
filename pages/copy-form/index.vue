<template>
  <div class="p-copy-form">
    <!-- Navbar -->
    <m-navbar
      title="TA抄作业"
      :show-right-text="true"
      :submit-status="submitStatus"
      v-on:onClickRight="onSubmitHandle"
    />

    <div class="container">
      <!-- 投诉描述 -->
      <section class="complaint-desc-row">
        <div class="label">投诉描述</div>
        <div class="rich-input">
          <van-field v-model="content"
            :autosize="{ maxHeight: 138, minHeight: 138}" 
            type="textarea"
            maxlength="200"
            show-word-limit
            placeholder="提供更多信息有助于投诉被快速处理"
          />
        </div>
      </section>

      <!-- 图片证据  -->
      <section class="photos-evidence-row">
        <div class="label-wrap">
          <span>图片证据</span>
          <span>最多四张</span>
        </div>
        <div class="upload-wrap">
          <van-uploader 
            v-model="fileList"
            :max-count="4"
            :deletable="false"
            :max-size="2 * 1024 * 1024"
            :preview-full-image="false"
            :after-read="onUploadAfterRead"
            :before-read="onUploadBeforeRead"
            @oversize="onOversize"
            @click-preview="onClickPreview"
          >
            <div class="upload-area"></div>
          </van-uploader>
        </div>
      </section>

      <!-- 联系电话  -->
      <section class="contact-number-row">
        <div class="label">联系电话</div>
        <div class="contact-number-input">
          <van-field v-model="contactNumber" clearable placeholder="请输入您的联系电话" />
        </div>
      </section>

      <!-- 联系电话  -->
      <footer class="footer-row">
        <p>您的投诉将在7天内处理，请勿重复提交，处理结果</p> 
        <p>将第一时间在通知消息中反馈，或咨询大鹏客服QQ:706559568</p>
      </footer>
    </div>

    <!-- 图片预览 -->
    <m-upload-image-preview :image-preview="imagePreview" @onDelete="onDelete"/>
  </div>
</template>

<script>
export default {
  name:'CopyForm',
  layout:'navbar',
  data:() => ({
    /** 描述 */
    content:'',
    /** 联系电话 */
    contactNumber:'',
    // 图片上传列表
    fileList: [],
    // 可提交状态
    submitStatus: false,
    // 上传状态
    uploadStatus: true,
    // 图片总大小
    totalImgSize: 0,
    // 上传上限
    maxImgLimit: 1024 * 1024 * 9,
    // 图片预览
    imagePreview: {
      show: false,
      images: [],
      startPosition: 1,
    },
  }),
  watch: {
    content(x, o) {
      if (x.trim().length !== 0) {
        this.submitStatus = true
      } else {
        this.submitStatus = false
      }
    }
  },
  methods:{

    /** 提交 */
    onSubmitHandle(){
      if (!this.submitStatus) return false
      this.$myToast('提交成功我们将第一时间处理')
      setTimeout(() => {
        this.$router.push('/')
      }, 2500)
    },

    /** 文件上传至服务器 */
    onUploadAfterRead(file) {
      const _this = this
      file.status = 'uploading'
      file.message = '上传中...'
      this.uploadStatus = false
      const render = new FileReader()
      render.readAsDataURL(file.file)
      render.onload = (event) => {
        const formData = new FormData()
        formData.append('content', file.file)
        setTimeout(() => {
          file.status = 'done'
          file.message = '上传成功'
          _this.uploadStatus = true
        }, 1000)
      }
    },

    /** 上传前置处理 */
    onUploadBeforeRead(file) {
      // 图片类型校验
      const allowImgType = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowImgType.includes(file.type)) {
        console.log('上传图片仅支持jpg/png/gif格式图片')
        return false
      }
      // 图片大小限制
      if (this.totalImgSize + file.size > this.maxImgLimit) {
        console.log('上传总大小超过限制')
        return false
      } else {
        this.totalImgSize += file.size
      }
      return true
    },

    /**
     * 监听上传文件大小
     * 自动过滤2M以上的图片
     */
    onOversize(data) {
      if (data.file.size > 2 * 1024 * 1024) {
        console.log('请上传2M以内的图片')
      }
    },

    /**
   * 打开图片预览
   * @iamges:图片列表
   * @index：当前图片索引
   */
    onClickPreview(file,detail) {
      this.imagePreview.images = this.pickImages()
      this.imagePreview.startPosition = detail.index
      this.imagePreview.show = true
    },

    // 图片提取器
    pickImages() {
      let gallery = []
      this.fileList.forEach(function(item){
        gallery.push(item.content)
      })
      return gallery
    },
    
    /** 删除文件预览时触发 */
    onDelete(index) {
      this.fileList.splice(index, 1)
      this.imagePreview.show = false
    },
  }
}
</script>

<style lang="less" scoped>
.p-copy-form .container {
  min-height: 100vh;
  padding: 44px 16px 18px;
  background-color: @dp-white;
  position: relative;
}

/*** 投诉描述 Style */
.complaint-desc-row .label {
  width: auto;
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 20px;
  margin-top: 21px;
}

.complaint-desc-row .label::after {
  content: '*';
  color: #F7534F;
  font-size: 20px;
  margin-left: 4px;
}

.complaint-desc-row .rich-input {
  margin-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #EBEFEA;
}

.complaint-desc-row .rich-input {
  /deep/.van-cell {
    padding: 0;
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #18252C;
  }
}

.complaint-desc-row .rich-input {
  /deep/.van-field__word-limit {
    font-size: 14px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #D1D3D5;
  }
}

.complaint-desc-row .rich-input {
  /deep/.van-field__control::placeholder {
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #D1D3D5;
  }
}

.complaint-desc-row .rich-input {
  /deep/.van-field__control {
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #18252C;
  }
}

/** 图片证据 */
.photos-evidence-row .label-wrap{
  margin-top:18px;
  .l-flex-row();
}

.photos-evidence-row .label-wrap span:first-child {
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 20px;
}

.photos-evidence-row .label-wrap span:last-child {
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #D8D8D8;
  line-height: 20px;
}

.photos-evidence-row .upload-wrap {
  margin-top: 12px;
}

.upload-wrap .upload-area {
  position: relative;
  width: 74px;
  height: 74px;
  background-image: url('~assets/icons/common/upload-area-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.upload-wrap .upload-area::after {
  content: '';
  width: 31px;
  height: 31px;
  background-image: url('~assets/icons/common/upload-plus.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.photos-evidence-row .upload-wrap {
  /deep/.van-uploader__wrapper {
    flex-wrap: nowrap;
  }
  /deep/ .van-uploader__preview {
    margin-right: 16px;
    overflow: hidden;
  }
  /deep/.van-image {
    width: 74px;
    height: 74px;
    border-radius: 6px;
  }
}

/** 联系电话 Style */
.contact-number-row .label {
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 20px;
  margin-top: 30px;
}

.contact-number-row .contact-number-input {
  margin-top: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid #EBEFEA;
  /deep/ .van-cell {
    padding: 0;
  }
  /deep/.van-field__control::placeholder {
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #D1D3D5;
  }
  /deep/.van-field__control {
    font-size: 16px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: #18252C;
  }
}

/** 底部说明文字 Style */
.footer-row {
  width: 375px;
  height: 32px;
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.footer-row p {
  font-size: 11px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A3A8AB;
  line-height: 16px;
}
</style>