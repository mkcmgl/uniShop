import store from "./stoe"

export default {
	namespaced:true,
	 // state 数据
	  state: () => ({
	    // 收货地址
	    address: JSON.parse(uni.getStorageSync('address')||'{}'),
	  }),
	
	  // 方法
	  mutations: {
	    // 更新收货地址
	    updateAddress(state, address) {
	      state.address = address
		  this.commit('m_user/saveAddressToStorage')
	    },
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(store.address))
		}
	  },
	
	  // 数据包装器
	  getters: {},
}