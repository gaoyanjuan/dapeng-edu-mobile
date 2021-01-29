<template>
  <div class="personal-info">
    <!-- 返回上一页 -->
    <m-navbar title="编辑资料" />
    <div class="info-header">
      <div class="left-text">头像</div>
      <div class="right-avatar">
        <van-uploader :after-read="afterRead">
          <img :src="userInfo.avatar" alt="">
        </van-uploader>
      </div>
    </div>
    <div class="form-list">
      <div class="form-item">
        <div class="left-text">大鹏号</div>
        <span class="right-content">{{userInfo.dpAccount}}</span>
      </div>
      <div class="form-item" v-if="userInfo.studentSatusId">
        <div class="left-text">学籍号</div>
        <span class="right-content">{{userInfo.studentSatusId}}</span>
      </div>
      <div class="form-item" v-else>
        <div class="left-text">学籍号</div>
        <span class="right-content">暂无</span>
      </div>
      <nuxt-link class="form-item" tag="div" to='/account-setting/information-edit/user-name'>
        <div class="left-text">用户名</div>
        <span class="right-content">{{userInfo.loginName}}</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <div class="form-item">
        <div class="left-text">绑定手机号</div>
        <span v-if="userInfo.mobile" class="right-content">{{userInfo.mobile | maskMobile}}</span>
        <span v-else class="right-content">尚未绑定</span>
      </div>
    </div>
    <div class="form-list">
      <nuxt-link class="form-item" tag="div" to='/account-setting/information-edit/true-name'>
        <div class="left-text">真实姓名</div>
        <span class="right-content">{{userInfo.trueName}}</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <div class="form-item" @click="onGenderHandle">
        <div class="left-text">性别</div>
        <span v-if="userInfo.gender === 'S'" class="right-content">保密</span>
        <span v-if="userInfo.gender === 'M'" class="right-content">男</span>
        <span v-if="userInfo.gender === 'F'" class="right-content">女</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </div>
      <nuxt-link class="form-item" tag="div" to='/account-setting/information-edit/area'>
        <div class="left-text">所在地区</div>
        <span class="right-content">{{
          userInfo.address
            ? userInfo.address.split('@').join('&nbsp;&nbsp;')
            : ''
        }}</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <nuxt-link class="form-item" tag="div" to='/account-setting/information-edit/personalized-signature'>
        <div class="left-text">个性签名</div>
        <span class="right-content">{{
          userInfo.introduction ? userInfo.introduction : '请填写'
        }}</span>
        <img class="right-arrow" src="@/assets/icons/mine/icon-right-arrow.png" alt="">
      </nuxt-link>
      <van-action-sheet
        v-model="showGender"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Client from '@/utils/client'
import { formatSlashDate } from '@/plugins/filters'
export default {
  layout:'navbar',
  data() {
    return {
      showGender: false,
      userInfo: {},
      actions: [
        {
          name: '男',
          identification: 'M',
          color: '#18252C'
        },
        {
          name: '女',
          identification: 'F',
          color: '#18252C'
        },
        {
          name: '保密',
          identification: 'S',
          color: '#18252C'
        }
      ],
      activeColor:'#0CB65B',
      normalColor:'#18252C'
    }
  },
  mounted() {
    // 链接访问时判断是否登录
    if(!this.$login()) return

    this.getUserDetails().then((res)=> {
      this.userInfo = res.data
    })
  },
  methods: {
    ...mapActions('user', [
      'getUserDetails',
      'editUserInfo'
    ]),
    ...mapActions({
      // 获取图片上传授权
      getMySTS: 'publish/getMySTS',
    }),
    updateInfo(key, value) {
      this.editUserInfo({
        userId: this.userInfo.userId,
        [key]: value
      })
    },
    //性别弹出层
    onGenderHandle() {
      this.actions.map(item =>{
        this.userInfo.gender === item.identification ? item.color = this.activeColor : item.color = this.normalColor
      })
      this.showGender = true
    },
    // 性别选择
    onSelect(item) {
      this.showGender = false
      this.userInfo.gender = item.identification
      this.updateInfo('gender', this.userInfo.gender)
    },
    // 上传头像
    async afterRead(file) {
      const isIMAGE = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif'
      ].includes(file.file.type)
      const isLt5M = file.file.size / 1024 / 1024 < 5
      if (!isIMAGE) {
          this.$toast('上传图片仅支持jpg/png/gif格式图片')
          return false
        }
      if (!isLt5M) {
          this.$toast('上传文件大小不能超过 5MB!')
          return false
        }
      const _this = this
      const res = await this.getMySTS()
      const { accessKeyId, accessKeySecret, securityToken } = res.data
      const ossConfig = {
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        stsToken: securityToken
      }
      const userinfo = this.$cookiz.get('userinfo')
      const fileName = this.generateFileName(file)
      const render = new FileReader()
      render.readAsDataURL(file.file)
      render.onload = (event) => {
        const client = Client(ossConfig)
        client.put(fileName, file.file).then(({ res }) => {
          if (res.statusCode === 200) {
            this.userInfo.avatar = res.requestUrls[0]
            this.updateInfo('avatar', res.requestUrls[0])
            this.$store.commit('setUserAvatar', res.requestUrls[0])
            userinfo.avatar = res.requestUrls[0]
            this.$cookiz.set('userinfo',userinfo, {
              path: '/'
            })
            this.$toast({
              message: `上传成功`,
              position: 'bottom',
              duration: 2000
            })
          }
        }).catch(error => {
          this.$toast({
              message: `上传失败`,
              position: 'bottom',
              duration: 2000
            })
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
    }
  }
}
</script>
<style lang="less" scoped>
.personal-info {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  background: @dp-app-bgc;
  & > .info-header {
    background: @dp-white;
    height: 88px;
    margin-top: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > .left-text {
      width: 60px;
      height: 20px;
      margin-left: 15px;
      font-size: 14px;
      font-family: @dp-font-regular;
      font-weight: 400;
      color: #383640;
      line-height: 20px;
      display: inline-block;
    }
    & > .right-avatar {
      margin-right: 30px;
      height: 60px;
      line-height: 60px;
      .van-uploader {
        .van-uploader__wrapper {
          .van-uploader__input-wrapper {
            & > img {
              width: 60px;
              height:60px;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  & > .form-list {
    margin-top: 12px;
    background: @dp-white;
    & > .form-item {
      margin: 0 15px;
      height: 44px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > .left-text {
        width: 80px;
        height: 20px;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #383640;
        line-height: 20px;
        display: inline-block;
      }
      & > .right-content {
        width: 80%;
        text-align: right;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #A3A8AB;
        line-height: 20px;
        margin-right: 19px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      & > .right-arrow {
        position: absolute;
        right: 8px;
        float: right;
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
    }
  }
}
.active {
  color: #0CB65B;
}
</style>
