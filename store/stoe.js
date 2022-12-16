import Vue from 'vue'
import Vuex from 'vuex'
import mouduleCart from '@/store/cart.js'
Vue.use(Vuex)
const store= new Vuex.Store({
	modules:{
		'm_cart':mouduleCart
		}
})
export default store