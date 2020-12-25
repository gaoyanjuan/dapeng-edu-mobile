import Vue from 'vue'
import {
  Button,
  Tabbar,
  TabbarItem,
  List,
  NavBar,
  Empty,
  Popup,
  ActionSheet,
  Tab,
  Tabs,
  Uploader,
  ImagePreview,
  Toast,
  Sticky,
  Overlay,
  Swipe,
  SwipeItem,
  Lazyload,
  Field,
  Grid,
  GridItem,
  Dialog,
  Checkbox,
  Area
} from 'vant'

Vue.use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(List)
  .use(NavBar)
  .use(Empty)
  .use(Popup)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(Uploader)
  .use(ImagePreview)
  .use(Toast)
  .use(Sticky)
  .use(Overlay)
  .use(Swipe)
  .use(SwipeItem)
  .use(Field)
  .use(Grid)
  .use(GridItem)
  .use(Dialog)
  .use(Checkbox)
  .use(Area)
  .use(Lazyload, {
    // 懒加载默认图片
    loading: require('@/assets/icons/common/photos-bg.png')
  })

Vue.prototype.ImagePreview = ImagePreview

/** 重置Vant 配置 */

Toast.setDefaultOptions({ position: 'bottom'})