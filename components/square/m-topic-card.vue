<template>
  <div>
    <div class="topic-wrapper">

      <!-- Nav -->
      <div class="topic-nav-row">
        <div class="nav-left-side">
          <span class="nav-title">热门话题</span>
          <img class="nav-icon-hot" :src="label_hot" alt="hot" />
        </div>
        <div v-if="showChange" class="nav-right-side" @click="changeTopic">
          <img class="nav-btn-change" :src="change" alt="change" />
          <span class="nav-btn-txt">换一换</span>
        </div>
      </div>

      <!-- Topic List -->
      <div class="topic-list-row">
        <transition-group name="fade-list" tag="div" appear>
          <div class="topic-item" v-for="(item, index) in topic.list" :key="index">

            <div class="topic-left-side">
              <span class="topic-item-index" :class="indexClass(index)">{{(topic.pageInfo.pages - 1) * 5 + (index + 1)}}</span>
              <span class="topic-item-title">{{ item.name }}</span>
            </div>

            <div class="topic-right-side">
              <img v-if="topic.pageInfo.pages === 1" class="topic-item-hot" :src="hot" alt="hot" />
              <span class="topic-item-num">{{ item.participationCount | commonCount }}人参与</span>
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Footer  -->
    <div class="topic-footer-row"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name:'M-Topic-Card',
  props:{
    topic:{
      type: Object,
      default: {}
    },
    channel: {
      type:String,
      default: ''
    }
  },
  computed:{
    indexClass() {
      return function(index) {
        let inxClass = ''
        if(this.topic.pageInfo.pages === 1) {
          if(index === 0) {
            inxClass = 'topic-item-level-one'
          }
          if(index === 1) {
            inxClass = 'topic-item-level-two'
          }
          if(index === 2) {
            inxClass = 'topic-item-level-three'
          }
        }
        return inxClass
      }
    }
  },
  data: () => ({
    showChange: true,
    hot: require('@/assets/icons/topic/hot.png'),
    label_hot: require('@/assets/icons/topic/label-hot.png'),
    change: require('@/assets/icons/topic/btn-change.png')
  }),

  mounted() {
    if(this.topic.list.length < 5) {
      this.showChange = false
    }
  },

  methods:{
    ...mapActions({
      appendTopicList: 'topic/appendTopicList'
    }),

    async changeTopic() {
      const newPage = this.topic.pageInfo.pages + 1
      await this.appendTopicList({page : newPage ,topicType: this.channel })
    }
  }
}
</script>

<style lang="less" scoped>

.topic-wrapper {
  width: 100%;
  max-height: 205px;
  padding: 12px 16px;
  background-color: @dp-white;
}

.topic-wrapper .topic-nav-row {
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topic-wrapper .topic-nav-row .nav-left-side {
  display: flex;
  align-items: center;

  .nav-title {
    font-size: 18px;
    font-family: @semibold;
    font-weight: 600;
    color: #18252C;
  }

  .nav-icon-hot {
    width: 26px;
    height: 15px;
    margin-left: 4px;
  }
}

.topic-wrapper .topic-nav-row .nav-right-side {
  display: flex;
  align-items: center;

  .nav-btn-change {
    width: 14px;
    height: 12px;
    margin-right: 2px;
  }

  .nav-btn-txt {
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
    color: #0CB65B;
  }
}

.topic-wrapper .topic-list-row {
  width: 100%;
  margin-top: 12px;

  .topic-item:not(:first-child) {
    margin-top: 8px;
  }
}

.topic-wrapper .topic-list-row .topic-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .topic-left-side, .topic-right-side {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: @regular;
    font-weight: 400;
  }

  &-index {
    max-width: 20px;
    font-size: 15px;
    font-family: @medium;
    font-weight: 400;
    color: #D1D3D5;
    // text-align: center;
  }

  &-level-one {
    color: #FF3510;
  }

  &-level-two {
    color: #FFB239;
  }

  &-level-three {
    color: #FFD139;
  }

  &-title {
    width: 208px;
    font-size: 16px;
    color: #18252C;
    margin-left: 16px;
    .text-ellipsis()
  }

  &-hot {
    width: 14px;
    height: 14px;
  }

  &-num {
    color: #747C80;
    margin-left: 4px;
  }
}

.topic-footer-row {
  width: 100%;
  height: 12px;
  background-color: #F8F8F8;
}

.fade-list-enter-active {
  transition: all .3s ease;
}

.fade-list-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-list-enter, .fade-list-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>