import store from "./stoe"

export default {
	namespaced:true,
	 // state 数据
	  state: () => ({
	    // 收货地址
	    address: JSON.parse(uni.getStorageSync('address')||'{}'),
		token:uni.getStorageSync('token') || '',
		 userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		 // 重定向的 Object 对象
		 redirectInfo: null
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
		},
  updateUserInfo(state, userinfo) {
      state.userinfo = userinfo

      this.commit('m_user/saveUserInfoToStorage')
    },
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
      console.log(state.redirectInfo)
    }
		
	  },
	
	  // 数据包装器
	  getters: {
		  addstr(state){
			  if(!state.address.cityName) return ''
			  return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		  }
	  },
}