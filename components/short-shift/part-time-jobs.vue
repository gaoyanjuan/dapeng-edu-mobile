<template>
  <section class="part-time">
    <!--LOGO设计 操作 -->
    <div class="fg-nav">
      <div class="navLogo" @click="showPopup">
        <p>{{ this.name }}</p>
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
     <div class="tabs-wrap">
        <van-tabs v-model="active">
          <van-tab v-for="(item, index) in getTabsList" :title="item.name" :key="item.id">
            <div class="box" v-if="item.id===1">
              <van-button
                size="small"
                v-for="(item, index) in getTagsList"
                :key="index"
                :class=" class2id==item.id?'highlight':''"
                @click="handlePart(index)"
              >
                <p>{{ item.name }}</p>
              </van-button>
            </div>
            <div class="box" v-else>
              <van-button
                size="small"
                v-for="(item, index) in getSortList"
                :key="index"
                :class=" class2id==item.id?'highlight':''"
                @click="handleIT(index)"
              >
                <p>{{ item.name }}</p>
              </van-button>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </van-popup>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "FollowGallery",
  computed: {
    ...mapGetters('logo', 
      ["getTagsList", "getSortList","getTabsList"]
    ),
    ...mapGetters('task-part', [
      'taskPartListGetters'
    ])
  },
  data: () => ({
    menusIndex: 0,
    menus:[{id:'HOTTEST',name:'不限'},{id:'NEWEST',name:'最新'}],
    show: false, 
    active: 0,
    px:'',
    class1id:'1',
    class2id:'1',
    name:'',
    change: require("@/assets/icons/common/drop.png"),
    menuId:'1'
  }),
  watch:{
    'taskPartListGetters.status' : function (newVal, oldVal) {
      if (newVal === 'loading') {
        this.loading = true
        this.finished = false
      } else if (newVal === 'load') {
        this.loading = false
        this.finished = false
      } else if (newVal === 'over') {
        this.finished = true
      }
    },
  },
  mounted() {
    this.menusIndex = this.$route.query.px === '4'? 1:0
    this.active =this.$route.query.class1id === '38'? 1:0
    this.name = this.$route.query.name || 'LOGO设计'
    this.class1id = this.$route.query.class1id || 1
    this.class2id = this.$route.query.class2id || this.getTagsList[1].id
    this.px = this.$route.query.px || ''
  },
  methods: {
    ...mapActions("task-part", ["appendTaskPartList"]),
    ...mapMutations('task-part', ['clearNewTaskList']),
    // 外部切换按钮
    showPopup() {
      this.show = true;
    },
    /* 设计类按钮 */
    handlePart(i) {
      this.name = this.getTagsList[i].name;
      this.class1id = this.getTabsList[this.active].id
      this.class2id = this.getTagsList[i].id
      let query = {
        class1id:this.class1id,
        class2id:this.class2id,
        px:this.px
      }
      this.show = false;
      this.clearNewTaskList()
      this.appendTaskPartList({page: 1,query})
      this.$emit('setParams',this.class1id,this.class2id,this.px)
      this.$router.replace({
        query: {
          class1id:this.class1id,
          class2id:this.class2id,
          px : this.px,
          name:this.name
        }
      })
    },
    /* IT/软件类按钮 */
    handleIT(i){
      this.name = this.getSortList[i].name;
      this.class1id = this.getTabsList[this.active].id
      this.class2id = this.getSortList[i].id
      let query = {
        class1id:this.class1id,
        class2id:this.class2id,
        px:this.px
      }
      this.show = false;
      this.clearNewTaskList()
      this.appendTaskPartList({page: 1,query})
      this.$emit('setParams',this.class1id,this.class2id,this.px)
      this.$router.replace({
        query: {
          class1id:this.class1id,
          class2id:this.class2id,
          px : this.px,
          name:this.name 
        }
      })
    },
      /** 切换菜单事件 */
    changeMenus(index, item) {
      // 禁止路由重复点击
      if (this.$route.query.type === item.id) return
      if (item.id ==='HOTTEST') {
        this.px = ''
      }else {
        this.px = '4'
      }
      let query = {
        class1id:this.class1id,
        class2id:this.class2id,
        px:this.px
      }
      this.$emit('setParams',this.class1id,this.class2id,this.px)
      this.menusIndex = index
      this.$router.replace({
        query: {
          class1id:this.class1id,
          class2id:this.class2id,
          px: this.px,
          name:this.name 
        }
      }),
      this.clearNewTaskList()
      this.appendTaskPartList({page: 1,query })
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
  margin:20px 0 0 25px;
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
.highlight {
  border: 1px solid #0CB65B !important;
   & > .van-button__content {
    color: #0CB65B !important;
   }
}
/deep/.van-tabs {
  font-size: 14px;
  font-family: @dp-font-regular;
  font-weight: 400;
  color: #747C80;
  line-height: 20px;
}

/deep/.van-tabs__wrap {
  margin-right: 180px;

}

/deep/ .van-popup__close-icon--top-right {
  top: 4px;
}

/deep/.van-tab--active {
  font-size: 16px;
  font-family: @semibold;
  font-weight: 600;
  color: #18252C;
  animation: 0.5s appear;
}

/deep/.van-tabs__line {
  width: 26px;
  height: 4px;
  bottom: 20px;
  background: #0CB65B;
  border-radius: 2px;
  background-image: none;
}
/deep/.van-sticky--fixed {
  transform: translateX(-50%)!important;
}
</style>
