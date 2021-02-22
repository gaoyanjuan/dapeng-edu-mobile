<template>
  <section class="part-time">
    <!--LOGO设计 操作 -->
    <div class="fg-nav">
      <div class="navLogo">
        <p @click="showPopup">LOGO设计</p>
        <img :src="change" alt="" />
      </div>
      <div class="nav-change">
        <div 
            v-for="(item, i) in menus"
            :class="menusIndex === i ? 'menus-item-active' : 'menus-item'"
            :key="i"
            @click="changeMenus(i, item)"
          >
            {{ item.name }}
          </div>
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
    ...mapGetters('logo', 
      ["getTagsList", "getSortList"]
    )
  },
  data: () => ({
    btnLimited: false,
    menusIndex: 0,
    menus:[{id:'HOTTEST',name:'不限'},{id:'NEWEST',name:'最新'}],
    show: false, 
    active: 2,
    change: require("@/assets/icons/common/drop.png"),
  }),
  mounted() {
    this.menus.forEach( (item, inx) => {
      if(item.id === this.$route.query.type) {
        this.menusIndex = inx
      }
    })
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    handlePart() {},
      /** 切换菜单事件 */
    changeMenus(index, item) {
      // 禁止路由重复点击
      if (this.$route.query.type === item.id) return
      this.menusIndex = index
      this.$router.replace({
        query: {
          ...this.$route.query,
        }
      })
    },
    // changeLimited() {
    //   this.btnLimited = true;
    // },
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
      & > .menus-item-active {
        width: fit-content;
        padding: 0px 10px;
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: #0cb65b;
        line-height: 20px;
        background: #e6f7ee;
        border-radius: 14px;
        text-align: center;
        font-family: @dp-font-medium;
        margin-right: 16px;
        cursor: pointer;
      }
       & > .menus-item {
        min-width: 28px;
        max-width: 42px;
        height: 20px;
        font-size: 14px;
        font-weight: 400;
        color: #a3a8ab;
        line-height: 20px;
        text-align: center;
        font-family: @dp-font-regular;
        margin-right: 16px;
        cursor: pointer;
      }
      // .unlimited {
      //   color: #18252c;
      // }
      // .newest {
      //   margin-left: 20px;
      //   color: #0cb65b;
      // }
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
