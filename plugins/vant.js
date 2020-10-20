import Vue from 'vue'
import {
  Button,
  Tabbar,
  TabbarItem,
  List,
  NavBar,
  Skeleton,
  Empty,
  Popup,
  ActionSheet,
  Tab,
  Tabs,
  Uploader,
  Area,
  ImagePreview,
  Toast,
  Sticky,
  Overlay,
  Swipe,
  SwipeItem,
  Lazyload
} from 'vant'

Vue.use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(List)
  .use(NavBar)
  .use(Skeleton)
  .use(Empty)
  .use(Popup)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(Uploader)
  .use(Area)
  .use(ImagePreview)
  .use(Toast)
  .use(Sticky)
  .use(Overlay)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload, {
    // 懒加载默认图片
    loading: require('@/assets/images/common/photos-bg.png')
  })

Vue.prototype.ImagePreview = ImagePreview