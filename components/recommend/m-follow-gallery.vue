<template>
  <section class="follow-wrap">
    
    <!-- 为你推荐 操作 -->
    <div class="fg-nav">
      <h3>为你推荐</h3>
      <nuxt-link class="nav-more" to="/follow" tag="div">
        <span>更多</span><img :src="more" alt="" />
      </nuxt-link>
    </div>

    <!-- 为你推荐 滑动区域 -->
    <div class="fg-content">
      <client-only>
        <template v-if="popularUsersGetters">
          <swiper class="swiper" :options="swiperOptions">
            <swiper-slide v-for="(item, index) in popularUsersGetters" :key="index">
              <div class="user-card">
                <img class="avatar" v-lazy="item.avatar" />
                <span class="nickname">{{ item.nickname }}</span>
                <span :class="item.isFlower ? 'btn-unfollow': 'btn-follow'" @click="handleFollow(item, index)"></span>
              </div>
            </swiper-slide>
            <swiper-slide class="card-more">
              <nuxt-link to="/follow" class="card-more-txt" tag="span">更多推荐</nuxt-link>
            </swiper-slide>
          </swiper>
        </template>
        <!-- <template v-if="!popularUsersGetters">
          <div class="">
            正在加载
          </div>
        </template> -->
      </client-only>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'FollowGallery',
  data: () => ({
    swiperOptions: {
      slidesPerView: 3.5,
      spaceBetween: 10,
      freeMode: true,
    },
    avatar: require('@/assets/icons/common/avatar.png'),
    more: require('@/assets/icons/square/more.png'),
  }),
  computed: {
    ...mapGetters({
      popularUsersGetters: 'attention/popularUsersGetters',
    })
  },
  methods:{
    ...mapActions({
      queryFollowing: 'attention/queryFollowing',
      deleteFollowing: 'attention/deleteFollowing'
    }),
    ...mapMutations({
      changeFollowing: 'attention/changePopularUsersStatus',
    }),
    /** 关注事件 */
    handleFollow (item, index) {
      if(!this.$login()) { return }
      if (item.isFlower) {
        this.changeFollowing(index)
        this.deleteFollowing({
          id: item.userId
        })
      } else {
        this.changeFollowing(index)
        this.queryFollowing({
          id: item.userId
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.follow-wrap {
  width: 100%;
  height: 204px;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  background: @dp-white;
}

.follow-wrap .fg-nav {
  display: flex;
  width: 100%;
  height: 22px;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  & > h3 {
    font-size: 16px;
    font-family: @dp-font-semibold;
    font-weight: 600;
    color: rgba(24, 37, 44, 1);
  }
  & > .nav-more {
    display: flex;
    align-items: center;
  }
  & > .nav-more span {
    font-size: 12px;
    font-family: @dp-font-regular;
    font-weight: 400;
    color: rgba(163, 168, 171, 1);
  }
  & > .nav-more img {
    width: 12px;
    height: 12px;
  }
}

.follow-wrap .fg-content {
  width: 100%;
  height: 138px;
  margin-top: 12px;
}

.swiper {
  width: 100%;
  height: 150px;
  padding-top: 5px;
  overflow: hidden;
}

.swiper .swiper-slide {
  width: 100px;
  height: 138px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 5px 0 rgba(232, 232, 232, 1);
  border-radius: 6px;
}

.swiper .card-more {
  width: 60px !important;
  height: 138px;
  border-radius: 6px;
  position: relative;
  writing-mode: vertical-lr;
  -webkit-writing-mode: vertical-lr;
  -ms-writing-mode: vertical-lr;
  background: rgba(240, 240, 240, 1);
}

.card-more .card-more-txt {
  width: 100%;
  height: 138px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 500;
  color: rgba(116, 124, 128, 1);
}

.swiper-slide:first-child {
  margin-left: 16px;
}

.swiper-slide .user-card {
  width: 100%;
  height: 138px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
  & > .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
  }
  & > .nickname {
    width: 80px;
    text-align: center;
    overflow: hidden;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    height: 20px;
    font-size: 14px;
    font-family: @dp-font-medium;
    font-weight: 600;
    color: rgba(24, 37, 44, 1);
    line-height: 20px;
  }
  /**  未关注 **/
  & > .btn-follow {
    width: 59px;
    height: 28px;
    background-image: url('~@/assets/icons/posts/posts-follow.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  /** 已关注 */
  & > .btn-unfollow {
    width: 59px;
    height: 28px;
    background-image: url('~@/assets/icons/square/hotlists-unfollow.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
