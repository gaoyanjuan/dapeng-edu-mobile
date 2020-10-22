<template>
  <div id="m-activities">
    <div class="m-activities-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <m-activities-card :cardData="cardData" v-for="(cardData, idx) in this.activitiesList" :key="idx" />
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'm活动列表页',
  data() {
    return {
      activitiesList: [],
      loading: false,
      finished: false,
      currentPage: 1
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('activities', [
      'appendActivities'
    ]),
    onLoad() {
      let params = {
        page: this.currentPage++,
        size: 5,
        linkContentTypes: 'ACTIVITY_POST,WORKS,HOMEWORK,LIFE'
      }
      this.appendActivities(params)
      .then(({ data,pageInfo }) => {
        this.activitiesList = this.activitiesList.concat(data).map((item, index) => ({ ...item, index }))
        this.loading = false
        if (data < 5) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="less">
#m-activities {
  .m-activities-list {
    padding-top: 20px;
    padding-bottom: 100px;
  }
}
</style>