<template>
  <div class="p-copy-form">
    <!-- Navbar -->
    <m-navbar
      :title="navTitle"
      :show-right-text="true"
      :submit-status="submitStatus"
      :right-text="rightText"
      v-on:onClickRight="onSubmitConfirm"
    />

    <div class="container">
      <!-- 作业描述 -->
      <section class="homework-desc-row">

        <!-- 标题 -->
        <div v-if="showTitle" class="title">
          <template v-if="requirement"> {{ requirement.title }} </template>
          <template v-else-if="homeworkDetails"> {{homeworkDetails.task.title}} </template>
        </div>

        <!-- 富文本 -->
        <div class="rich-input">
          <van-field v-model.trim="content"
            :autosize="autosize"
            type="textarea"
            :maxlength="maxCount"
            :placeholder="placeholder"
            @focus="onFocus"
            @blur="onBlur"
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

      <!-- 活动标签 -->
      <section v-if="$route.query.contentType && activityData" class="activity-posts-label-row">
        <img class="activity-icon" :src="activity" alt="topic"/>
        <span class="activity-txt"> {{ activityData.activityDisplay && activityData.activityDisplay.displayName }}</span>
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
      <section v-if="submitType === 'VIP' || submitType === 'TEST'" class="homework-label-row">
        <template v-if="requirement"> {{ requirement.college | filterCollageName }} </template>
        <template v-else-if="homeworkDetails"> {{ homeworkDetails.college | filterCollageName }} </template>
      </section>

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

      <!-- 添加标签 -->
      <section class="homework-label-select-row">

        <div class="label-select-header" @click="openLabelPop">
          <div class="label-left-side">
            <img class="label-row" :src="label_row" />
            <span class="label-title">添加标签</span>
          </div>
          <img class="label-arrow" :src="label_arrow" />
        </div>

        <div class="label-select-wrap">
          <van-tag v-for="item in labelList" :key="item.labelId" round closeable plain @close="cancelLabel(item)">
            {{ item.labelName }}
          </van-tag>
        </div>
      </section>

    </div>

    <!-- 底部唤起APP -->
    <m-submit-open-app :show-footer="openAppPop" @closeFooter="onCloseFooter"/>

    <!-- 添加标签 -->
    <m-label-popup :show-popup="labelPop" :labels="hotLabel" @append-labels="appendLabels"/>

    <!-- 图片预览 -->
    <m-upload-image-preview :image-preview="imagePreview" @onDelete="onDelete"/>

    <!-- 完善用户名 -->
    <m-username-popup :show-popup="usernamePop" @submit="onSubmitConfirmAgain"/>

    <!-- 作业号&联系客服 -->
    <m-homework-number-popup :show-popup="homeworkNumberPop" @closed="onClosed"/>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Client from '@/utils/client'
import { formatSlashDate } from '@/plugins/filters'
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
    // 处理后的图片
    imageInfo: [],
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
    usernamePop:{ show: false, info: null},
    // 作业号弹窗状态
    homeworkNumberPop: { show: false, jobNummer: null },
    // 添加标签
    labelPop: { show: false },
    // 唤起APP
    openAppPop: { show: false },
    // 图片预览
    imagePreview: {
      show: false,
      images: [],
      startPosition: 1,
    },
    // 默认选择的学院
    collegeIndex: null,
    // 成长下-活动数据
    activityData: null,
    // 标签
    labelList: [],
    // label 背景
    label:require('@/assets/icons/submit/college-label.png'),
    // 活动 label
    activity: require('@/assets/icons/label/label-topic.png'),
    // label 添加标签
    label_row:require('@/assets/icons/submit/label.png'),
    label_arrow:require('@/assets/icons/submit/label-arrow.png'),
  }),

  watch: {
    /**
     * 【作品、动态、体验课、正式课发布】
     * 四个发布对应四个提交规则，以下监听，分别针对不同的规则
     * ***************************************************
     * 作品发布：文字选填、学院和图片必选，针对操作，监听底部唤起显示与隐藏
     * 动态发布：文字选填，图片必选，针对操作，监听底部唤起显示与隐藏
     * 体验课与正式课，无底部唤起APP,文字和图片必选
     */
    content(n, o) {

      if(this.submitType === 'LIFE' || this.submitType === 'WORKS') {
        if(n.length) { this.openAppPop.show = false }
        if(!n.length && !this.fileList.length) { this.openAppPop.show = true }
      }
    },

    fileList(n, o) {
      if(this.submitType === 'VIP' || this.submitType === 'TEST') {
        if (n.length && this.uploadStatus) { this.submitStatus = true }
      }
      
      if(this.submitType === 'WORKS' || this.submitType === 'LIFE') {
        if (n.length && this.submitType === 'WORKS' && this.uploadStatus) { this.submitStatus = this.collegeIndex !== null }
        if (n.length && this.submitType === 'LIFE' && this.uploadStatus) { this.submitStatus = true }
        if (n.length) { this.openAppPop.show = false }
        if (!n.length && !this.content.length) { this.openAppPop.show = true }
      }
      
      if (!n.length) { this.submitStatus = false }
    },

    collegeIndex(n, o) {
      if(this.submitType === 'WORKS') {
        if( n !== null) {
          this.submitStatus = this.fileList.length !== 0
        } else {
          this.submitStatus = false
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      // 上传作业-作业要求
      requirement: 'homework/requirementDetailsGetters',
      // 作业详情
      homeworkDetails:'homework/homeworkDetailsGetters',
      // 学院列表
      collegeList: 'colleges/submitWorkCollegesGetters',
      // 用户信息
      userInfo: 'user/userInfoGetters',
      // 推荐标签
      hotLabel: 'publish/hotLabelGetters'
    }),

    // 当前发布类型
    submitType: function () {
      return this.$route.query.type
    },

    // 导航 右侧按钮文字
    rightText: function () {
      if(this.submitType === 'LIFE' || this.submitType === 'WORKS') {
        return '发布'
      } else {
        return '提交'
      }
    },

    // 内容字符数
    maxCount: function() {
      if(this.submitType === 'LIFE' || this.submitType === 'WORKS') {
        return 200
      } else {
        return 60
      }
    },

    // Placeholder
    placeholder: function() {
      if(this.submitType === 'LIFE' || this.submitType === 'WORKS') {
        return '说一说你的想法吧，有助于获得更高的关注度'
      } else {
        return '说说你的作业思路吧~'
      }
    },

    // 是否展示标题
    showTitle: function() {
      if(this.submitType === 'LIFE' || this.submitType === 'WORKS') {
        return false
      } else {
        return true
      }
    },

    // 导航栏
    navTitle: function () {
      switch (this.submitType) {
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
    }
  },

  async created(){

    if(this.$route.query.action === 'edit') {
      const _this = this

      if(this.submitType === 'VIP' || this.submitType === 'TEST') {
        await this.$store.dispatch(
          'homework/appendHomeworkDetails', 
          { id : this.$route.query.id }
        )
      }
      
      if (this.homeworkDetails) {
        this.content = this.homeworkDetails.content
        this.homeworkDetails.imgInfo.forEach( ele => {
          _this.fileList.push(ele)
          _this.imageInfo.push(ele)
          _this.totalImgSize += ele.size
        })
      }
    }

    if(this.submitType === 'WORKS') {
      this.dynamicNums = '只能输入200个字哦'
      this.openAppPop.show = true
      this.getColleges({collegeType: 'RELEASE_WORK'})

    } else if (this.submitType === 'LIFE') {
      this.dynamicNums = '只能输入200个字哦'
      this.openAppPop.show = true
      this.getActivities()
      
    } else {
      this.dynamicNums = '只能输入60个字哦'
      this.openAppPop.show = false
    }

    // 查询热门标签
    this.getHotLabelList()
  },

  methods:{
    ...mapActions({
      // 获取用户信息（4.0）
      getUserInfo: 'user/getUserDetails',
      // 获取图片上传授权
      getMySTS: 'publish/getMySTS',
      // 展翅订单查询，是否存在此人
      getZcAdviser: 'publish/getZcAdviser',
      // 查询学院列表
      getColleges: 'colleges/appendColleges',
      // 发布作业
      publishHomework: 'publish/addNewHomework',
      // 修改作业
      editHomework:'publish/editHomework',
      // 发布作品
      publishWorks:'publish/addNewWorks',
      // 发布动态
      publishDynamic: 'publish/addNewDynamic',
      // 推荐标签
      getHotLabel: 'publish/getHotLabel',
      // 查询活动详情
      getActivitiesDetails: 'activities/appendActivitiesDetail',
      // 获取用户发布的作业
      getUserPublished: 'user/appendPublishHomework'
    }),

    ...mapMutations({
      // 清空作业详情
      clearHomeworkDetails:'homework/clearHomeworkDetails',
      clearPublishHomework: 'user/clearPublishHomework',
      clearhotLabel: 'publish/clearhotLabel'
    }),

    // 提交前确认
    async onSubmitConfirm(){

      // 提交状态是否为True
      if (!this.submitStatus) return false

      // 提交作品时先检查是否有提交作业
      if(this.submitType === 'WORKS') {
        const res = await this.getUserPublished()
        if(res.data.length === 0) {
          this.$toast('未提交过作业不允许发作品')
          return
        }
      }

      // 判断用户是否已经完善用户名
      if (!this.usernamePop.show) {
        const res = await this.getUserInfo()
        if(!res.data.loginName) {
          this.usernamePop.info = res.data
          this.usernamePop.show = true
          return
        }
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
    async onSubmit() {

      if (this.$route.query.action === 'edit') {
        let res = await this.handleEditHomework()
        if(res.status === 200) {
          this.sucessToast('homework')
        } else {
          this.submitLock = true
          res.data.message && this.$toast(res.data.message)
        }
      }

      if (this.$route.query.action === void 0) {

        if( this.submitType === 'TEST' || this.submitType === 'VIP') {
        
          let res = await this.submitHomework()
          if( res.status === 201) {
            if(this.submitType === 'TEST') {

              this.homeworkNumberPop.jobNummer = res.data.identificationCode
              // 体验课，需要判断是否存在顾问
              await this.getCounselor()
            } else {
              this.sucessToast('homework')
            }
            
          } else {
            this.submitLock = true
            res.data.message && this.$toast(res.data.message)
          }
        }
      }
      
      if (this.submitType === 'WORKS') {
        let res = await this.submitWorks()
        if(res.status === 201) {
          this.sucessToast('works')
        } else {
          this.submitLock = true
          res.data.message && this.$toast(res.data.message)
        }
      }
      
      if (this.submitType === 'LIFE') {
        let res = await this.submitDynamic()
        if(res.status === 201) {
          this.sucessToast('dynamic')
        } else {
          this.submitLock = true
          res.data.message && this.$toast(res.data.message)
        }
      }
    },

    /** 提示成功 & 跳转 */
    sucessToast(name) {
      if(this.submitType === 'VIP' || this.submitType === 'TEST') {
        this.$myToast('作业提交成功')
      }

      if(this.submitType === 'WORKS') {
        this.$myToast('作品发布成功')
        this.clearPublishHomework()
      }

      if(this.submitType === 'LIFE') {
        this.$myToast('动态发布成功')
      }

      setTimeout(() => {
        this.submitLock = true
        this.$router.push({
          path: '/personal-center/publish',
          query:{ type:name, userId: this.userInfo.userId }
        })
      }, 2500)
    },

    /** 编辑作业 */
    handleEditHomework() {
      return this.editHomework({
        imgInfo: this.imageInfo,
        content: this.content,
        source: 'MOBILE',
        id: this.homeworkDetails.id,
        labels: this.labelList
      }).then( res => {
        return res
      }).catch( err => {
        return err
      })
    },

    /** 提交作业【体验课、正式课】 */
    submitHomework() {
      return this.publishHomework({
        imgInfo: this.imageInfo,
        content: this.content,
        source: 'PC',
        type: 'TEXT',
        labels: this.labelList,
        title: this.requirement.title,
        taskId: this.requirement.taskId
      }).then( res => {
        return res
      }).catch( err => {
        return err
      })
    },

    /** 提交作品 */
    submitWorks() {
      let index = this.collegeIndex
      return this.publishWorks({
        imgInfo: this.imageInfo,
        content: this.content,
        source: 'MOBILE',
        labels: this.labelList,
        collegeId: this.collegeList[index].id
      }).then( res => {
        return res
      }).catch( err => {
        return err
      })
    },

    /** 提交动态 */
    submitDynamic() {
      let params = {
        imgInfo: this.imageInfo,
        content: this.content,
        labels: this.labelList,
        source: 'MOBILE',
        type: 'TEXT',
      }

      if(this.$route.query.contentType) {
        params.activityId = this.activityData.id
        params.activityType = this.activityData.activity.type
      }

      return this.publishDynamic(params).then( res => {
        return res
      }).catch( err => {
        return err
      })
    },

    /** 作业提交成功，检查是否存在顾问 */
    getCounselor() {
      this.getZcAdviser( this.requirement.college.id).then( res => {
        if(res.status === 409) {
          this.homeworkNumberPop.show = true
        } else {
          this.sucessToast('homework')
        }
      })
    },

    /** 获取活动数据 */
    getActivities() {
      if(this.$route.query.contentType === 'ACTIVITY_POST') {
        const activityId = process.env.global.activityId
        this.getActivitiesDetails(activityId).then((res) => {
          this.activityData = res
        })
      }
    },

    /** 获取热门标签 */
    getHotLabelList() {
      let channel = this.submitType === ('VIP' || 'TEST') ? 'HOMEWORK': this.submitType
      this.getHotLabel({ topicType: channel })
    },

    /** 图片文件上传至服务器 */
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

    /* 创造图片对象 */
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

        // 作品类型下-设置提交状态需要学院
        if(_this.submitType === 'WORKS') {
          if( _this.collegeIndex !== null) {
           _this.submitStatus = true
          }
        } else {
          _this.submitStatus = true
        }
      }
      imgObj.src = img
    },

    /** 上传前置处理 */
    onUploadBeforeRead(file) {
      return new Promise((resolve, reject) => {
        // 图片类型校验
        const allowImgType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if (!allowImgType.includes(file.type)) {
          this.$toast('上传图片仅支持jpg/png/gif/webp格式图片')
          reject()
        }

        // 图片大小限制
        if ((this.totalImgSize + file.size) > this.maxImgLimit) {
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
      const _this = this
      this.fileList.forEach(function(item){
        if(_this.$route.query.action === 'edit') {
          gallery.push(item.url)
        } else {
          gallery.push(item.content)
        }
      })
      return gallery
    },
    
    /** 删除文件预览时触发 */
    onDelete(index) {

      // 更新图片文件总大小
      let spliceImgSize = 0
      if (this.fileList[index].file) {
        spliceImgSize = this.fileList[index].file.size
      } else {
        spliceImgSize = this.fileList[index].size
      }
      
      this.totalImgSize -= spliceImgSize
      this.fileList.splice(index, 1)
      this.imageInfo.splice(index, 1)
      this.imagePreview.show = false
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

    /** 监听获取焦点事件 */
    onFocus() {
      if(this.submitType === 'WORKS' || this.submitType === 'LIFE') {
        this.openAppPop.show = false
      }
    },

    /** 监听失去焦点事件 */
    onBlur() {
      if(this.submitType === 'WORKS' || this.submitType === 'LIFE') {
        if (!this.content.length && !this.fileList.length) {
          this.openAppPop.show = true
        }
      }
    },

    /** 计算字数 */
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

    /*** 添加标签 */
    appendLabels(params) {
      this.labelList = params
    },

    /** 关闭底部唤起 */
    onCloseFooter() {
      this.openAppPop.show = false
    },

    /** 打开标签弹层 */
    openLabelPop() {
      this.labelPop.show = true
    },

    /** 关闭标签 */
    cancelLabel(params) {
      this.labelList.forEach((item, index) => {
        if(item.labelId === params.labelId) {
          this.labelList.splice(index, 1)
        }
      })
    },
    
    /** 关闭弹窗，跳转我的作业 */
    onClosed() {
      this.sucessToast('homework')
    },
  },

  destroy() {
    this.clearhotLabel()
    this.clearHomeworkDetails()
  },
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

/** 活动标签 */
.activity-posts-label-row {
  width: fit-content;
  display: flex;
  align-items: center;
  margin-top: 12px;
  height: 24px;
  line-height: 24px;
  padding: 4px 8px;
  background: #FFEFF2;
  border-radius: 12px;
}

.activity-posts-label-row .activity-icon {
  width: 14px;
  height: 14px;
  margin-right: 4px;
}

.activity-posts-label-row .activity-txt {
  max-width: 230px;
  height: 16px;
  font-size: 12px;
  font-family: @regular;
  font-weight: 400;
  color: #FF6B92;
  line-height: 16px;
  .text-ellipsis();
}

/** 上传区域 */
.homework-photos-row .upload-wrap {
  margin-top: 12px;
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

/** 添加标签 */
.homework-label-select-row {
  width: 100%;
  margin-top: 15px;
  padding-bottom: 80px;
}

.homework-label-select-row .label-select-header {
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:active {
    background-color:#f2f3f5;
  }

  .label-left-side {
    display: flex;
    align-items: center;

    .label-row {
      width: 24px;
      height: 24px;
      margin-right: 4px;
    }

    .label-title {
      font-size: 14px;
      font-family: @semibold;
      font-weight: 600;
      color: #36404A;
    }
  }

  .label-arrow {
    width: 12px;
    height: 12px;
  }
}

.homework-label-select-row .label-select-wrap {
  width: 100%;
  margin-top: 10px;

  & > span {
    margin-right: 10px;
  }
}

</style>