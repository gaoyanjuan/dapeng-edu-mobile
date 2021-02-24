import Vue from 'vue'
import {
  Button,
  Tabbar,
  TabbarItem,
  List,
  NavBar,
  Empty,
  Picker,
  Popup,
  ActionSheet,
  Tab,
  Tabs,
  Uploader,
  ImagePreview,
  Card ,
  Toast,
  Sticky,
  Overlay,
  Swipe,
  SwipeCell,
  SwipeItem,
  Lazyload,
  Field,
  Grid,
  RadioGroup,
  Radio,
  GridItem,
  Icon ,
  Dialog,
  Cell,
  CellGroup,
  Checkbox,
  Area,
  Tag,
  Collapse,
  CollapseItem,
  Image,
  Badge
} from 'vant'

Vue.use(Button)
  .use(Tabbar)
  .use(TabbarItem)
  .use(List)
  .use(Picker)
  .use(NavBar)
  .use(Empty)
  .use(Popup)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(Uploader)
  .use(SwipeCell)
  .use(Card )
  .use(Toast)
  .use(Sticky)
  .use(Overlay)
  .use(Swipe)
  .use(ImagePreview)
  .use(Uploader)
  .use(SwipeItem)
  .use(Field)
  .use(Grid)
  .use(GridItem)
  .use(Dialog)
  .use(RadioGroup)
  .use(Radio)
  .use(Cell)
  .use(CellGroup)
  .use(Checkbox)
  .use(Area)
  .use(Tag)
  .use(Icon)
  .use(Collapse)
  .use(CollapseItem)
  .use(Image)
  .use(Badge)
  .use(Lazyload, {
    // 懒加载默认图片
    loading: require('@/assets/icons/common/photos-bg.png')
  })

Vue.prototype.ImagePreview = ImagePreview

/** 重置Vant 配置 */

Toast.setDefaultOptions({
  position: 'bottom'
})
