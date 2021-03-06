<template>
  <div class="p-requirement" v-if="requirementDetails">
    <!-- Back last page -->
    <m-navbar title="作业要求" />

    <!-- Main Block -->
    <div class="requirement-content-wrap">
      <div class="requirement-content-title">{{ requirementDetails.title }}</div>
      <div class="requirement-content-title-line"></div>
      <div class="requirement-content-info-wrap">
        <div class="content-info-row">
          <div>课程名称：</div>
          <div>{{ requirementDetails.courseTitle }}</div>
        </div>
        <div class="content-info-row">
          <div><span>讲</span><span>师：</span></div>
          <div>{{ requirementDetails.user && requirementDetails.user.nickname }}</div>
        </div>
        <div class="content-info-row">
          <div>作业要求：</div>
          <div v-html="requirementDetails.content"></div>
        </div>
        <div class="content-info-row">
          <div>授课时间：</div>
          <div>{{ requirementDetails.teachingTime | requireDataH5 }}</div>
        </div>
        <div class="content-info-row">
          <div>截止时间：</div>
          <div>{{ requirementDetails.startDate | requireDataH5 }}</div>
        </div>
      </div>
      <div class="requirement-content-example">
        <div class="example-txt">
          <span>作业案例：</span>
          <span>已提交：{{ requirementDetails.total | studentsCount }}份</span>
        </div>
        <img class="example-photo"
          v-if="requirementDetails.coverImg"
          :src="requirementDetails.coverImg"
          :alt="requirementDetails.title"
          @click="openImagePreview" 
        />
        <div class="player-box" v-if="requirementDetails && requirementDetails.vid">
          <div id="player"></div>
        </div>
      </div>
    </div>

    <!-- Middle Block -->
    <div class="requirement-split-line"></div>

    <!-- Footer Block -->
    <div class="requirement-footer-wrap">
      <div class="requirement-footer-title">同学作业</div>
      <div class="requirement-footer-title-line"></div>
      <div class="requirement-footer-list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <m-posts
            v-for="(item, idx) in requirementList"
            :key="item ? item.id + idx : idx"
            :isRequirement="true"
            :commentList="item.comments"
            :dataType="item.type"
            :imgInfo="item.imgSmall"
            :courseType="item.courseType"
            :user="item.user"
            :college="item.college"
            :recommendType="item.recommendType"
            :task="item.task"
            :listItemData="item"
            :modifiedTime="item.lastModifiedTime"
            :propIndex="idx"
            path="/details/homework"
            squareType="作业"
            pageName="requirement"
            :isShowMySubmit="true"
          />
        </van-list>
      </div>
    </div>

    <!-- Footer Button -->
    <div v-if="requirementDetails.submitStatus === 'SUBMIT'" class="requirement-btn-wrap">
      <nuxt-link tag="img" class="publish" :src="submit" alt="submit" :to="`/submit?type=${submitType}&taskId=${$route.query.taskId}`" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'MRequirement',
  data() {
    return{
      page: 1,
      requirementList: [],
      requirementDetails: null,
      loading: false,
      finished: false,
      submit: require('@/assets/icons/common/requirement-submit.png')
    }
  },
  computed: {
    ...mapGetters('homework', [
      'requirementListGetters'
    ]),
    submitType: function () {
      if(this.$route.query.type) {
        return this.$route.query.type
      } else {
        return this.requirementDetails.courseType
      }
    }
  },
  mounted() {
    this.appendRequirementDetails({ id: this.$route.query.taskId })
    .then(({ data }) => {
      this.requirementDetails = data
      this.$nextTick(() => {
        this.showPolyvPlayer()
      })
    })
  },
  methods: {
    ...mapActions('homework', [
      'appendRequirementList',
      'appendRequirementDetails'
    ]),
    onLoad() {
      let params = {
        page: this.page++,
        size: 5,
        taskId: this.$route.query.taskId
      }
      this.appendRequirementList(params)
      .then(({ data,pageInfo }) => {
        this.requirementList = this.requirementList.concat(data).map((item, index) => ({ ...item, index }))
        this.loading = false
        if (data < 5) {
          this.finished = true
        }
      })
    },

    openImagePreview() {
      if( !this.requirementDetails.coverImg) return
      this.ImagePreview([this.requirementDetails.coverImg])
    },
    
    showPolyvPlayer() {
      if (this.requirementDetails && this.requirementDetails.vid) {
        this.player = polyvPlayer({
          wrap: '#player',
          hideSwitchPlayer: true,
          width: '100%',
          height: '198px',
          vid: this.requirementDetails.vid,
          cover_display: 'scaleAspectFit'
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

.requirement-content-wrap {
  margin-top: 44px;
  padding: 16px;
}

.requirement-split-line {
  width: 100%;
  height: 15px;
  background-color: #F8F8F8;
}

.requirement-content-wrap .requirement-content-title {
  min-height: 25px;
  font-size: 18px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #33404B;
  line-height: 25px;
}

.requirement-content-wrap .requirement-content-title-line {
  width: 345px;
  height: 1px;
  margin-top: 16px;
  background-color: #F7F7F7;
}

.requirement-content-wrap .requirement-content-info-wrap {
  margin-top: 15px;
}

.requirement-content-info-wrap .content-info-row {
  width: 100%;
  min-height: 22px;
  display: flex;
  align-items: center;
}

.requirement-content-info-wrap .content-info-row:not(:first-child) {
  margin-top: 8px;
}

.requirement-content-info-wrap .content-info-row >:nth-child(1) {
  width: 80px;
  white-space:pre;
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #A6AEA9;
  line-height: 22px;
  display: flex;
  justify-content: space-between;
  align-self: flex-start;
}

.requirement-content-info-wrap .content-info-row >:nth-child(2) {
  width: calc(100% - 80px);
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #36404A;
  line-height: 22px;
  word-break: break-all;
}

.requirement-content-wrap .requirement-content-example {
  margin-top: 40px;
}

.requirement-content-example .example-txt {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.requirement-content-example .example-txt > span {
  height: 22px;
  font-size: 16px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #36404A;
  line-height: 22px;
}

.requirement-content-example .example-photo {
  margin-top: 12px;
  width: 100%;
  height: 198px;
  border-radius: 6px;
  object-fit: cover;
}

.requirement-content-example .player-box {
  margin-top: 12px;
  border-radius: 6px;
  width: 100%;
  overflow: hidden;
}

.requirement-footer-wrap .requirement-footer-title {
  font-size: 18px;
  font-family: @dp-font-semibold;
  font-weight: 600;
  color: #33404B;
  padding: 16px;
}

.requirement-footer-wrap .requirement-footer-title-line {
  height: 1px;
  width: 93%;
  margin: 0 auto;
  background-color: #EDEDED;
}

.requirement-footer-wrap .requirement-footer-list {
  padding-bottom: 45px;
}

.requirement-btn-wrap {
  position: fixed;
  right: 21px;
  bottom: 41px;
  width: 46px;
  height: 46px;
  cursor: pointer;
}

.requirement-btn-wrap .publish {
  width: 46px;
  height: 46px;
}
</style>
