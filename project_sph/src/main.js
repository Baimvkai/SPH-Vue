import Vue from 'vue'
import App from './App.vue'
// 三级联动组件（全局组件）
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { MessageBox,Button } from 'element-ui';

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name, Pagination)
// element注册组件
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

Vue.config.productionTip = false

// 引入MockServe.js---mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一接口api文件夹里的全部请求函数
import * as API from '@/api'

import VueLazyload from 'vue-lazyload'
const loadimage = require('./assets/loading.gif')
Vue.use(VueLazyload, {
  // 默认图片
  loading: loadimage,
})

// 映入表单验证插件
import "@/plugins/validate"

new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库
  store,
  // 全局事件总线配置
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
}).$mount('#app')
