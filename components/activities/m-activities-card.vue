<template>
  <div class="m-activities-card" @click="toActivitiesDetail">
    <div class="m-activities-card-img">
      <img
        :src="cardData.activityDisplay.cover"
        :alt="cardData.activityDisplay.displayName"
        :title="cardData.displayName"
        v-lazy="cardData.activityDisplay.cover"
      />
    </div>
    <template>
      <span class="card-status" v-if="cardData.state === 'OVER'">已结束</span>
      <span class="card-status card-status-living" v-if="cardData.state === 'ONGOING'">进行中</span>
      <span class="card-status card-status-not" v-if="cardData.state === 'NOT_STARTED'">未开始</span>
    </template>
    <div class="m-card-bottom">
      <div class="card-msg" :title="cardData.activityDisplay.displayName">{{ cardData.activityDisplay.displayName }}</div>
      <div class="card-time">{{ cardData.rules.startDate | activitiesDate }}-{{ cardData.rules.endDate | activitiesDate }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      default: null
    }
  },
  methods: {
    toActivitiesDetail() {
      const activity = this.cardData.activityDisplay

      this.$matomo.setDocumentTitle('活动/'+ activity.displayName )
      this.$matomo.trackPageView()

      const url = activity.detailPagesURL || activity.rankingListDetailPagesURL
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
  .m-activities-card {
    margin-bottom: 24px;
    padding: 0 16px;
    width: 100%;
    position: relative;
    .m-activities-card-img {
      width: 100%;
      height: 140px;
      border-radius: 6px;
      >img {
        width: 100%;
        height: 140px;
        border-radius: 6px;
        object-fit: cover;
      }
    }
    .card-status {
      width: 51px;
      height: 19px;
      position: absolute;
      right: 16px;
      top: 12px;
      line-height: 20px;
      text-align: center;
      font-family: @dp-font-regular;
      font-size: 12px;
      font-weight: 400;
      color: #FFFFFF;
      border-radius: 6px 0px 0px 6px;
      background: url('~@/assets/icons/activities/activities-finish.png') no-repeat center center;
      background-size: 51px 19px;
    }
    .card-status-living {
      background: url('~@/assets/icons/activities/activities-living.png') no-repeat center center;
      background-size: 51px 19px;
    }
    .card-status-not {
      background: url('~@/assets/icons/activities/activities-not.png') no-repeat center center;
      background-size: 51px 19px;
    }
    .m-card-bottom {
      margin-top: 8px;
      position: relative;
      .card-msg {
        max-width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        height: 24px;
        font-size: 18px;
        font-family: @dp-font-semibold;
        font-weight: 600;
        color: #18252C;
        line-height: 24px;
      }
      .card-time {
        height: 16px;
        line-height: 16px;
        font-size: 11px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #5A5A5A;
        margin-top: 2px;
      }
      .card-number {
        margin-left: 24px;
        font-size: 14px;
        font-family: @dp-font-regular;
        font-weight: 400;
        color: #A3A8AB;
      }
    }
  }
</style>