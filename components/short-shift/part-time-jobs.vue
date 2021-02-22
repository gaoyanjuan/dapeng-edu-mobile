<template>
  <section class="part-time">
    <!--LOGO设计 操作 -->
    <div class="fg-nav">
      <div class="navLogo">
        <p @click="showPopup">LOGO设计</p>
        <img :src="change" alt="" />
      </div>
      <div class="nav-change">
        <span
          @click="changeLimited"
          :class="btnLimited === true ? 'newest' : ''"
          >不限</span
        >
        <span class="newest">最新</span>
      </div>
    </div>
    <!-- LOGO设计弹窗 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      :style="{ height: '47%' }"
    >
      <van-tabs v-model="active">
        <van-tab title="设计类">
          <div class="box">
            <van-button
              size="small"
              v-for="(item, index) in getTagsList"
              :key="index"
              @click="handlePart()"
            >
              <p>{{ item.name }}</p>
            </van-button>
          </div>
        </van-tab>
        <van-tab title="IT/软件类">
          <div class="box">
            <van-button
              size="small"
              v-for="(item, index) in getSortList"
              :key="index"
            >
              <p>{{ item.name }}</p>
            </van-button>
          </div>
        </van-tab>
      </van-tabs>
    </van-popup>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FollowGallery",
  computed: {
    ...mapGetters(["getTagsList", "getSortList"]),
  },
  data: () => ({
    btnLimited: false,
    show: false,
    active: 2,
    change: require("@/assets/icons/common/drop.png"),
  }),

  methods: {
    showPopup() {
      this.show = true;
    },
    handlePart() {},
    changeLimited() {
      this.btnLimited = true;
    },
  },
};
</script>

<style lang="less" scoped>
.part-time {
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  .fg-nav {
    display: flex;
    width: 100%;
    height: 22px;
    padding: 0 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .navLogo {
      display: flex;
      & > p {
        font-size: 16px;
        font-weight: 600;
        color: #18252c;
        line-height: 16px;
      }
      & > img {
        color: #18252c;
        margin-left: 6px;
        margin-bottom: 7px;
      }
    }
    .nav-change {
      display: flex;
      align-items: center;
      cursor: pointer;
      & > .nav-change span {
        font-size: 14px;
        font-weight: 400;
        color: #18252c;
        line-height: 14px;
      }
      .newest {
        margin-left: 20px;
        color: #0cb65b;
      }
    }
  }
  .van-popup {
    background: #ffffff;
    border-radius: 8px 8px 0px 0px;
  }
}
.part-time .box {
  box-sizing: border-box;
  overflow: hidden;
  margin-left: 25px;
  .van-button--small {
    width: 100px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
    margin: 0 12px 16px 0;
    & > .van-button__content {
      font-size: 14px;
      font-weight: 400;
      color: #465156;
      text-align: center;
      line-height: 14px;
    }
  }
}
</style>
