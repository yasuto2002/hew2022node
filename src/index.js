//vueモジュールからcreateAppメソッドを取り込み
// import {
//   createApp
// } from 'vue'
//作成したコンポーネントファイルを取り込み
// import App from './App.vue'

//Vue3のオブジェクトを生成
// var app = createApp(App)
//#appの中に組み込み
// app.mount('#app')
import jQuery from "jquery";
global.jquery = jQuery;
global.$ = jQuery;
window.$ = window.jQuery = require("jquery");
import {
  createApp
} from 'vue'
import App from './App.vue'
// import './index.css'
import {
  router
} from './router'
import {
  store
} from './store.js'

var app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
