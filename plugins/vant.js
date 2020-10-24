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
  Lazyload,
  Field,
  Grid,
  GridItem
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
  .use(Field)
  .use(Grid)
  .use(GridItem)
  .use(Lazyload, {
    // 懒加载默认图片
    loading: require('@/assets/icons/common/photos-bg.png')
  })

Vue.prototype.ImagePreview = ImagePreview