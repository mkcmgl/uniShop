export default {
	 namespaced:true,
	 state:()=>({
		 cart:[]
	 }),
	 mutations:{
		 addToCart(state,goods){
			 console.log('xx')
			 const findResult=state.cart.find((x)=>x.goods_id === goods.goods_id)
			 if(!findResult){
				 state.cart.push(goods)
			 }else{
				 findResult.goods_count++
			 }
			 console.log('xx',state.cart,findResult)
		 }
	 },
	 getters:{
		 total(state){
			 let c=0
			 state.cart.forEach(x=>c+=x.goods_count)
			 return c
		 }
	 }
}