<template>
  <div class="m-avatar">
    <div class="avatar-left-side-wrap">
      <head-image :headImg="userInfo ? userInfo.avatar : ''" imgWidth="40px" imgHeight="40px"></head-image>
      <div class="avatar-info-wrap">
        <span class="info-nickname">{{ userInfo ? userInfo.nickname : '佚名' }}</span>
        <span class="info-date">{{ submitTime | commonDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Avatar',
  props:{
    avatarStyle:{
      type:String,
      default:''
    },
    userInfo:{
      type:Object,
      default: () => {
        return null
      }
    },
    submitTime: {
      type:Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>

.m-avatar {
  width: 100%;
  height: 40px;
  .l-flex-row();
}

.m-avatar .avatar-left-side-wrap {
  .l-flex-row();
}

.avatar-left-side-wrap .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.m-avatar .avatar-info-wrap {
  margin-left: 8px;
  .l-flex-column-def();
}

.avatar-info-wrap .info-nickname {
  height: 20px;
  font-size: 14px;
  font-family: @dp-font-medium;
  font-weight: 600;
  color: #18252c;
  line-height: 20px;
}

.avatar-info-wrap .info-date {
  height: 17px;
  font-size: 12px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #9fa4a7;
  line-height: 17px;
  margin-top: 3px;
}
</style>