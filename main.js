
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from "@escook/request-miniprogram"	

uni.$http=$http

$http.baseUrl='https://applet-base-api-t.itheima.net'
// 轮播图的接口：https://applet-base-api-t.itheima.net/slides
// 九宫格接口：https://applet-base-api-t.itheima.net/categories
// 本地生活 获取并渲染商铺列表的数据：https://applet-base-api-t.itheima.net/categories/${this.data.query.id}/shops
$http.beforeRequest=function(options){
	uni.showLoading({
		title:'加载中。。'
	})
}
$http.afterRequest=function(options){
	uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif