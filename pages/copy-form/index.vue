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
            placeholder="提供更多信息有助于投诉被快速处理"
          />
        </div>
        <!-- 字数限制 -->
        <div class="show-word-limit">
          <span :class="this.content.length >=200 ? 'warning-num':''">
            {{ this.content.length }} 
          </span>
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
            :max-size="9 * 1024 * 1024"
            :preview-full-image="false"
            :after-read="onUploadAfterRead"
            :before-read="onUploadBeforeRead"
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
          <van-field v-model="contactNumber" @focus="onFocus" @blur="onBlur" :maxlength="13" clearable placeholder="请输入您的联系电话" />
        </div>
      </section>

      <!-- 底部说明文字  -->
      <footer class="footer-row" ref="footer">
        <p>您的投诉将在7天内处理，请勿重复提交，</p> 
        <p>处理结果将在第一时间在通知消息中反馈，或直接联系在线客服。</p>
      </footer>
    </div>

    <!-- 图片预览 -->
    <m-upload-image-preview :image-preview="imagePreview" @onDelete="onDelete"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Client from '@/utils/client'
import { formatSlashDate } from '@/plugins/filters'

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
    // 处理后的图片
    imageInfo: [],
    // 可提交状态
    submitStatus: false,
    // 提交作业安全锁
    submitLock: true,
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
    content(n, o) {
      if (n.trim().length !== 0) {
        this.submitStatus = true
      } else {
        this.submitStatus = false
      }
    },
  },

  computed: {
    ...mapGetters({
      userInfo: 'user/userInfoGetters'
    })
  },

  mounted() {
    this.$nextTick(() => { 
      this.listenHight()
    })
  },
  methods:{
    ...mapActions({
      // 获取图片上传授权
      getMySTS: 'publish/getMySTS',
      // 投诉抄袭作业
      complaint: 'homework/appendComplaint'
    }),

    /** 提交 */
    onSubmitHandle(){
      if (!this.submitStatus) return false

      if (!this.submitLock) return false
      if(!(/^[0-9]*$/.test(this.contactNumber))) {
        this.$toast('请输入正确的手机号')
        return false
      }
      this.submitLock = false
      
      let params = {
        taskId: this.$route.query.taskId,
        data: {
          imgInfo: this.imageInfo,
          complainPhone: this.contactNumber,
          reason: this.content.trim(),
          respondentId: this.$route.query.id
        }
      }
      this.complaint(
        params
      ).then((res) => {
        if(res.status === 201) {
          this.submitLock = true
          this.$myToast(`<p>提交成功</p><p>我们将第一时间处理</p>`)
          setTimeout(() => {
            this.$router.push('/')
          }, 1500)
        }
      }).catch((err) => {
        console.log(err)
      })
    },

    /** 文件上传至服务器 */
    async onUploadAfterRead(file) {
      
      const _this = this
      file.status = 'uploading'
      file.message = '上传中...'
      this.uploadStatus = false
      this.submitStatus = false

      const res = await this.getMySTS()
      const { accessKeyId, accessKeySecret, securityToken } = res.data
      const ossConfig = {
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        stsToken: securityToken
      }

      const fileName = this.generateFileName(file)
      const render = new FileReader()
      render.readAsDataURL(file.file)
      render.onload = (event) => {
        const client = Client(ossConfig)
        client.put(fileName, file.file).then(({ res }) => {
          if (res.statusCode === 200) {
            const url = process.env.ossUrl + '/' + fileName
            file.status = 'done'
            file.message = '上传成功'
            _this.uploadStatus = true
            _this.handleMakeImage(file, url)
          }
        }).catch(error => {
          file.status = 'failed'
          file.message = '上传失败'
          _this.uploadStatus = true
        })
      }
    },

    /**
     * 生成OSS图片文件名
     * 域名/年-月-日/userId/反转时间戳_SDU=
    */
    generateFileName(file) {
      const userId = this.userInfo.userId
      const date = formatSlashDate(new Date())
      let reverseDate = Math.round(new Date() / 1000).toString()
      reverseDate = reverseDate.split('').reverse().join('')
      return date + '/' + userId +'/'+ reverseDate + '_SDU=.' + file.file.name.split('.').pop()
    },

    // 创造图片对象 */
    handleMakeImage(e, url) {
      const _this = this
      const img = window.URL.createObjectURL(e.file)
      const imgObj = new Image()
      const filename = e.file.name.split('.').shift()
      const exp = e.file.type.replace(/image\//, '')
      imgObj.onload = () => {
        _this.imageInfo.push({
          filename: `${filename}.${exp}`,
          size: e.file.size,
          height: imgObj.height,
          width: imgObj.width,
          url: url
        })
        if( _this.content.length) {
          _this.submitStatus = true
        }
      }
      imgObj.src = img
    },

    /** 上传前置处理 */
    onUploadBeforeRead(file) {
      return new Promise((resolve, reject) => {
        // 图片类型校验
        const allowImgType = ['image/jpeg', 'image/png', 'image/gif']
        if (!allowImgType.includes(file.type)) {
          this.$toast('上传图片仅支持jpg/png/gif格式图片')
          reject()
        }

        // 图片大小限制
        if (this.totalImgSize + file.size > this.maxImgLimit) {
          this.$toast('图片超过9M，上传失败！')
          reject()
        }

        // 图片长度与长宽乘积限制在4096
        const img = window.URL.createObjectURL(file)
        const imgObj = new Image()
        imgObj.onload = () => {
          if(imgObj.width > 4096 || imgObj.height > 4096) {
            this.$toast('图片长度超过4096，上传失败！')
            reject()
          } else if ((imgObj.width * imgObj.height) > (4096 * 4096)) {
            this.$toast('图片超过4096*4096，上传失败！')
            reject()
          } else {
            if ((this.totalImgSize + file.size) <= this.maxImgLimit) {
              this.totalImgSize += file.size
            }
            resolve()
          }
        }
        imgObj.src = img
      })
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
      const spliceImgSize = this.fileList[index].file.size
      // 更新图片文件总大小
      this.totalImgSize -= spliceImgSize
      this.fileList.splice(index, 1)
      this.imageInfo.splice(index, 1)
      this.imagePreview.show = false
    },

    /** 监听联系电话Input 事件 */
    onFocus() {
      this.$refs.footer.style.display = 'none'
    },

    /** 监听联系电话Blur  事件*/
    onBlur() {
      this.$refs.footer.style.display = 'block'
    },

    /** 监听页面高度 */
    listenHight() {
      const height = this.$el.clientHeight
      window.addEventListener('resize', () => {
        const thisHeight = this.$el.clientHeight
        if(height - thisHeight < 50){
          this.$refs.footer.style.display = 'block'
        } else {
          this.$refs.footer.style.display = 'none'
        }
      })
    }
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
.complaint-desc-row {
  border-bottom: 1px solid #EBEFEA;
}
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
.complaint-desc-row .show-word-limit {
  width: 100%;
  font-family: @regular;
  font-weight: 400;
  text-align: right;
  margin-bottom: 12px;
  & span {
    font-size: 14px;
    color: #D1D3D5;
  }

  & span.warning-num {
    color: #F7534F;
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
.contact-number-row {
  padding-bottom: 80px;
}

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