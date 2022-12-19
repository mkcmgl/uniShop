import Vue from 'vue'
import Vuex from 'vuex'
import mouduleCart from '@/store/cart.js'
import moduleUser  from '@/store/uesr.js'
Vue.use(Vuex)
const store= new Vuex.Store({
	modules:{
		'm_cart':mouduleCart,
		'm_user':moduleUser 
		}
})
export default store