import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/filters'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// vant
import {
    ActionSheet,
    AddressEdit,
    Button,
    Cell,
    CellGroup,
    Checkbox,
    Collapse,
    CollapseItem,
    Dialog,
    Divider,
    Empty,
    Field,
    Icon,
    Lazyload,
    NavBar,
    NumberKeyboard,
    Overlay,
    PasswordInput,
    Radio,
    RadioGroup,
    Rate,
    ShareSheet,
    Sku,
    Stepper,
    Swipe,
    SwipeItem,
    Tab,
    Tabs,
    Toast,
    Uploader
} from 'vant'
//Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

{Vue.use(Sku)
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  Vue.use(Tab)
  Vue.use(Uploader)
  Vue.use(Field);
  Vue.use(Button)
  Vue.use(NavBar)
  Vue.use(Empty)
  Vue.use(Tabs)
Vue.use(ActionSheet)
Vue.use(ShareSheet)
Vue.use(AddressEdit)
Vue.use(Dialog)
Vue.use(Lazyload)
Vue.use(Stepper)
Vue.use(Toast)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Collapse);
Vue.use(CollapseItem)
Vue.use(Divider)}
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(Overlay)
Vue.use(Checkbox)
Vue.use(Rate)
Vue.use(Icon);
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})
NProgress.configure({
  easing: 'ease',  // 动画方式
  speed: 500,  // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 20, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
router.afterEach(() => {
  NProgress.done()
})

new Vue({
  el:"#app",
  render: h => h(App),
  store,
  router
})
