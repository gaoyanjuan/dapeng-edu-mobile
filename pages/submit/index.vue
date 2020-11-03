<template>
  <div class="p-copy-form">
    <!-- Navbar -->
    <m-navbar
      :title="onCalcTitle()"
      :show-right-text="true"
      :submit-status="submitStatus"
      :right-text="onCalcRightText()"
      v-on:onClickRight="onSubmitConfirm"
    />

    <div class="container">
      <!-- 作业描述 -->
      <section class="homework-desc-row">
        <div v-if="onCalcShowTitle()" class="title">作业标题·作业标题</div>

        <!-- 富文本 -->
        <div class="rich-input">
          <van-field v-model.trim="content"
            :autosize="autosize"
            type="textarea"
            :maxlength="onCalcMaxCount()"
            :placeholder="onCalcPlaceholder()"
            @input="onChangeInput"
          />
        </div>

        <!-- 字数限制 -->
        <div class="show-word-limit">
          <span v-if="wordsLimit">字数已经上限，不可再输入哦~</span>
          <span v-else></span>
          <span :class="wordsLimit ? 'warning-num':''">
            {{ dynamicNums }} 
          </span>
        </div>
      </section>

      <!-- 作业图片  -->
      <section class="homework-photos-row">
        <div class="upload-wrap">
          <van-uploader 
            v-model="fileList"
            :max-count="9"
            :deletable="false"
            :max-size="9 * 1024 * 1024"
            :preview-full-image="false"
            :after-read="onUploadAfterRead"
            :before-read="onUploadBeforeRead"
            @oversize="onOversize"
            @click-preview="onClickPreview"
          >
            <div class="upload-area"></div>
          </van-uploader>
        </div>

        <div class="upload-tips">
          提示：最多可上传9张图片，大小不超过9M
        </div>
      </section>

      <!-- 作业类型标签  -->
      <section v-if="submitType === 'VIP' || submitType === 'TEST'" class="homework-label-row">设计</section>

      <!-- 作品--添加学院 -->
      <section v-if="submitType === 'WORKS'" class="works-college-wrap">
        <div class="college-label-row">
          <img class="college-label" :src="label" alt="label" />
          <span class="college-txt">添加学院</span>
        </div>

        <div class="college-list-row">
          <div v-for="(item, i) in collegeList" :key="i"
            :class="collegeIndex === i ? 'college-item college-item-active':'college-item'"
            @click="changeCollege(i, item)"
          >
            {{ item.name }}
          </div>
        </div>
      </section>

      <!-- 生活动态标签 -->
      <section v-if="submitType === 'LIFE'" class="dynamic-label-row">动态</section>

    </div>

    <!-- 底部唤起APP -->
    <m-submit-open-app :show-footer="openAppPop" @closeFooter="onCloseFooter"/>

    <!-- 图片预览 -->
    <m-upload-image-preview :image-preview="imagePreview" @onDelete="onDelete"/>

    <!-- 完善用户名 -->
    <m-username-popup :show-popup="usernamePop" @submit="onSubmitConfirmAgain"/>

    <!-- 作业号&联系客服 -->
    <m-homework-number-popup :show-popup="homeworkNumberPop" @closed="onClosed"/>
  </div>
</template>

<script>
export default {
  name:'Submit',
  layout:'navbar',
  data:() => ({
    /** 描述 */
    content:'',
    /** 描述框大小*/
    autosize: { maxHeight: 120, minHeight: 120},
    /** 字数限制 */
    wordsLimit: false,
    /** 动态文字 */
    dynamicNums:'',
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
    // 提交作业安全锁
    submitLock: true,
    // 完善用户名状态
    usernamePop:{ show: false },
    // 作业号弹窗状态
    homeworkNumberPop: { show: false },
    // 唤起APP
    openAppPop: { show: false },
    // 图片预览
    imagePreview: {
      show: false,
      images: [],
      startPosition: 1,
    },
    // 默认选择的学院
    collegeIndex:0,
    // 学院列表
    collegeList:[
      {name:'设计'},{name:'美术'},{name:'国画'},{name:'书法'},
      {name:'短视频'},{name:'篆刻'},{name:'吉他'},{name:'开发'},
      {name:'古筝'},{name:'口播'}
    ],
    label:require('@/assets/icons/submit/college-label.png'),
  }),
  watch: {
    content(x, o) {
      if (x.length !== 0) {
        this.submitStatus = this.fileList.length !== 0
      } else {
        this.submitStatus = false
      }
    },
    fileList(x, o) {
      if (x.length !== 0) {
        this.submitStatus = this.content.length !== 0
      } else {
        this.submitStatus = false
      }
    }
  },
  computed: {
    // 当前发布类型
    submitType: function () {
      return this.$route.query.type
    }
  },
  mounted(){
    
    /** 根据URL参数，决定展示剩余文字数 */
    const type = this.$route.query.type
    if(type === 'WORKS' || type === 'LIFE') {
      this.dynamicNums = '只能输入200个字哦'
      this.openAppPop.show = true
    } else {
      this.dynamicNums = '只能输入60个字哦'
      this.openAppPop.show = false
    }
  },
  methods:{

    // 提交前确认
    onSubmitConfirm(){

      // 提交状态是否为True
      if (!this.submitStatus) return false

      // 判断用户是否已经完善用户名
      if (!this.usernamePop.show) {
         this.usernamePop.show = true
         return
      }

      // 等待图片上传成功后
      if (this.uploadStatus && this.submitLock) {
        this.submitLock = false
        this.onSubmit()
      }
    },

    /** 完善用户名后再次提交确认 */
    onSubmitConfirmAgain() {
      this.usernamePop.show = false
      this.onSubmit()
    },

    /** 上传 */
    onSubmit() {
      // 是否存在顾问逻辑
      // this.homeworkNumberPop.show = true
      this.$myToast('提交成功我们将第一时间处理')
      setTimeout(() => {
        this.submitLock = true
        this.$router.push('/personal-center/personal-publish?type=homework')
      }, 2500)
    },

    /** 图片文件上传至服务器 */
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
          if(imgObj.width >= 4096 || imgObj.height >= 4096) {
            this.$toast('图片长度超过4096，上传失败！')
            reject()
          } else if ((imgObj.width * imgObj.height) > (4096 * 4096)) {
            this.$toast('图片超过4096*4096，上传失败！')
            reject()
          } else {
            this.totalImgSize += file.size
            resolve()
          }
        }
        imgObj.src = img
      })
    },

    /** 计算图片单边长度 */
    calcImgLength(file) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = function () {
          resolve({ width:img.width, height:img.height})
        }
        img.src = file
      })
    },

    /**
     * 监听上传文件大小
     * 自动过滤9M以上的图片
     */
    onOversize(data) {
      if (data.file.size > 9 * 1024 * 1024) {
        this.$toast('图片超过9M，上传失败！')
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
      const spliceImgSize = this.fileList[index].file.size
      // 更新图片文件总大小
      this.totalImgSize -= spliceImgSize
      this.fileList.splice(index, 1)
      this.imagePreview.show = false
    },

    /** 根据URL参数，决定显示Title */
    onCalcTitle() {
      switch (this.$route.query.type) {
        case 'TEST':
          return '提交体验课作业'
          break;
        case 'VIP':
          return '提交正式课作业'
          break;
        case 'WORKS':
          return '作品发布'
          break;
        case 'LIFE':
          return '发布动态'
          break;
      }
    },

    /** 根据URL参数，决定显示右侧按钮文字 */
    onCalcRightText() {
      const type = this.$route.query.type
      if(type === 'LIFE' || type === 'WORKS') {
        return '发布'
      } else {
        return '提交'
      }
    },

    /** 根据URL参数，决定Placeholder */
    onCalcPlaceholder() {
      const type = this.$route.query.type
      if(type === 'LIFE' || type === 'WORKS') {
        return '说一说你的想法吧，有助于获得更高的关注度'
      } else {
        return '说说你的作业思路吧~'
      }
    },

    /** 根据URL参数，决定是否展示标题 */
    onCalcShowTitle() {
      const type = this.$route.query.type
      if(type === 'LIFE' || type === 'WORKS') {
        return false
      } else {
        return true
      }
    },

    /** 计算内容字符数 */
    onCalcMaxCount() {
      const type = this.$route.query.type
      if(type === 'LIFE' || type === 'WORKS') {
        return 200
      } else {
        return 60
      }
    },

    /** 监听字数 */
    onChangeInput(words) {
      const type = this.$route.query.type
      if(type === 'WORKS' || type === 'LIFE') {
        this.calcContent(words ,200)
      } else {
        this.calcContent(words ,60)
      }
    },

    /** 监听字数 */
    calcContent(words, nums) {
      if(words.length === nums) {
        this.wordsLimit = true
        this.dynamicNums = nums
      } else if(words.length === 0) {
        this.wordsLimit = false
        this.dynamicNums = '只能输入'+ nums +'个字哦'
      } else {
        this.wordsLimit = false
        this.dynamicNums = words.length
      }
    },

    /*** 添加学院 */
    changeCollege(index, item) {
      this.collegeIndex = index
    },

    /** 关闭底部唤起 */
    onCloseFooter() {
      this.openAppPop.show = false
    },
    
    /** 关闭弹窗，跳转我的作业 */
    onClosed() {
      this.$router.push('/personal-center/personal-publish?type=homework')
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

/*** 作业描述 Style */
.homework-desc-row .title {
  width: 100%;
  min-height: 21px;
  font-size: 14px;
  font-family: @semibold;
  font-weight: 600;
  color: #363D35;
  line-height: 21px;
  padding: 14px 0;
  border-bottom:1px solid #F5F5F5;
}

.homework-desc-row .rich-input {
  margin-top: 10px;

  /deep/.van-cell {
    font-size: 16px;
    font-family: @regular;
    font-weight: 400;
    color: #18252C;
    padding: 0;
  }

  /deep/.van-field__word-limit {
    font-size: 14px;
    font-family: @regular;
    font-weight: 400;
    color: #D1D3D5;
  }

  /deep/.van-field__control::placeholder {
    font-size: 14px;
    font-family: @regular;
    font-weight: 400;
    color: #C7CEC9;
  }

  /deep/.van-field__control {
    font-size: 16px;
    font-family: @regular;
    font-weight: 400;
    color: #18252C;
  }
}

.homework-desc-row .show-word-limit {
  width: 100%;
  height: 17px;
  font-family: @regular;
  font-weight: 400;
  .l-flex-row();

  & span:first-child {
    font-size: 12px;
    color: #FF3510;
  }

  & span:last-child {
    font-size: 14px;
    color: #D1D3D5;
  }

  & span.warning-num {
    color: #FF3510;
  }
}

/** 上传区域 */
.homework-photos-row .upload-wrap {
  margin-top: 18px;
}

.homework-photos-row .upload-tips {
  width: auto;
  height: 17px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #75737E;
  line-height: 17px;
  margin-top: 16px;
}

.homework-photos-row .upload-wrap .upload-area {
  position: relative;
  width: 82px;
  height: 82px;
  background-image: url('~assets/icons/common/upload-area-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.homework-photos-row .upload-wrap .upload-area::after {
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

.homework-photos-row .upload-wrap {
  /deep/.van-uploader__wrapper {
    flex-wrap: wrap;
  }
  /deep/ .van-uploader__preview {
    margin-right: 5px;
    margin-bottom: 5px;
    overflow: hidden;

    &:nth-child(4n+4) {
      margin-right: 0;
    }
  }
  /deep/.van-image {
    width: 82px;
    height: 82px;
    border-radius: 4px;
  }
}

/** 作业标签 */
.homework-label-row {
  width: 76px;
  height: 47px;
  line-height: 47px;
  text-align: center;
  margin-top: 15px;

  position: relative;
  left: -10px;
  
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #3D4954;

  background-color: transparent;
  background-image: url('~@/assets/icons/common/submit-label-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

/** 作品学院 */
.works-college-wrap {
  width: 100%;
  margin-top: 24px;

  .college-label-row {
    display: flex;
    align-items: center;
    height: 24px;

    .college-label {
      width: 24px;
      height: 24px;
      margin-right: 4px;
    }

    .college-txt {
      font-size: 14px;
      font-family: @semibold;
      font-weight: 600;
      color: #36404A;
    }
  }

  .college-list-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 7px;

    .college-item {
      width: 76px;
      height: 47px;
      text-align: center;
      line-height: 47px;

      font-size: 12px;
      font-family: @regular;
      font-weight: 400;
      color: #36404A;

      background-color: transparent;
      background-image: url('~@/assets/icons/submit/college-bg.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      cursor: pointer;
    }

    .college-item-active {
      background-image: url('~@/assets/icons/submit/college-active-bg.png');
    }
  }
}

/** 动态标签 */
.dynamic-label-row {
  width: 56px;
  height: 27px;
  text-align: center;
  line-height: 27px;
  margin-top: 24px;

  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #3D4954;


  background-color: transparent;
  background-image: url('~@/assets/icons/submit/dynamic-label-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  cursor: pointer;
}
</style>