import 'babel-polyfill';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './plugins/element.js'
import './assets/css/global.css'
import $ from 'jquery' 

import dialogDrags from './router/dialogDrags.js'

window.jQuery = $
window.$ = $

//声明一个 $bus 
const bus = new Vue();
Vue.prototype.$bus = bus

//全局引入 柱状表格 echarts工具
import echarts from 'echarts' 
Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'
// 导入树形表格插件
import TreeTable from 'vue-table-with-tree-grid'
import Fragment from 'vue-fragment'

// 导入富文本插件
import * as Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'
// 导入样式表
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)

import { Loading } from 'element-ui'
Vue.use(Loading.directive);

//进度条
import { Progress } from 'element-ui'
Vue.use( Progress );

// 上传组件
import uploader from 'vue-simple-uploader'
Vue.use(uploader)

//侧边弹出层
import { Drawer } from 'element-ui'
Vue.use( Drawer );

import 'nprogress/nprogress.css'
import {MessageBox} from "element-ui"
Vue.prototype.$confirm = MessageBox.confirm
// 字体图标库组件
import eIconPicker from 'e-icon-picker'
import "e-icon-picker/lib/symbol.js"
import 'e-icon-picker/lib/index.css'//基础样式
import 'font-awesome/css/font-awesome.min.css' //font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css' //element-ui 图标库

import { hasPerms } from '@/permission/index'

Vue.use(eIconPicker, {
  FontAwesome: true,
  ElementUI: true,
  eIcon: true,  // 自带的图标，来自阿里妈妈
  eIconSymbol: true,  // 是否开启彩色图标
  zIndex: 1000
})

// md5加密
import md5 from 'js-md5'
import { Base64 } from 'js-base64'
Vue.prototype.$md5 = md5
Vue.prototype.base64 = Base64

// 进行全局注册富文本编辑器
Vue.use(VueQuillEditor)
Vue.use(Fragment.Plugin)

Vue.config.productionTip = false

Vue.prototype.axios = axios
Vue.prototype.hasPerms = hasPerms

// 日期时间过滤器
Vue.filter('formatDate', function(millisecond) {
  if (!millisecond) return ''
  const dt = new Date(millisecond)
  const y = dt.getFullYear().toString()
  const M = (dt.getMonth() + 1).toString().padStart(2, '0')
  const d = dt.getDate().toString().padStart(2, '0')
  const hh = dt.getHours().toString().padStart(2, '0')
  const mm = dt.getMinutes().toString().padStart(2, '0')
  const ss = dt.getSeconds().toString().padStart(2, '0')
  
  // return `${y}-${M}-${d} ${hh}:${mm}:${ss}`
  return `${y}-${M}-${d}`
})

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
