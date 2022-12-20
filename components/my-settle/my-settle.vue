<template>
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<view class="amount-box">
			合计：<text class="amount" >￥{{checkedGoodsAmount}}</text>
		</view>
		<view class="btn-settle" @click="settlement">
			结算（{{checkedCount}}）
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				  seconds: 3,
				    timer: null
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart']),
			isFullCheck(){
			return	this.checkedCount==this.total?true:false
			}
		},
		methods:{
			...mapMutations('m_cart',['updataAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeAllState(){
				this.updataAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				 if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				   //  再判断用户是否选择了收货地址
				   if (!this.addstr) return uni.$showMsg('请选择收货地址！')
				 
				   //  最后判断用户是否登录了
				   if (!this.token) return this.delayNavigate()
				   this.payOrder()
			},
			delayNavigate(){
				this.showTips(this.seconds)
			  // 1. 将定时器的 Id 存储到 timer 中
			  this.timer = setInterval(() => {
				this.seconds--

				// 2. 判断秒数是否 <= 0
				if (this.seconds <= 0) {
				  // 2.1 清除定时器
				  clearInterval(this.timer)
				
				  // 2.2 跳转到 my 页面
				  uni.switchTab({
					url: '/pages/my/my',
					success:()=>{
						this.updateRedirectInfo({
							openType:'switchTab',
							from:'/pages/cart/cart'
						})
					}
				  })
				this.seconds=3
				  // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
				  return
				}

				this.showTips(this.seconds)
			  }, 1000)
			},
			showTips(n) {
			  // 调用 uni.showToast() 方法，展示提示消息
			  uni.showToast({
			    // 不展示任何图标
			    icon: 'none',
			    // 提示的消息
			    title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
			    // 为页面添加透明遮罩，防止点击穿透
			    mask: true,
			    // 1.5 秒后自动消失
			    duration: 1500
			  })
			},
			async payOrder() {
			  // 1. 创建订单
			  // 1.1 组织订单的信息对象
			  const orderInfo = {
			    // order_price: this.checkedGoodsAmount,
			    order_price: 0.01,
			    consignee_addr: this.addstr,
			    goods: this.cart.filter(x => x.goods_state).map(x => ({
			      goods_id: x.goods_id,
			      goods_number: x.goods_count,
			      goods_price: x.goods_price
			    }))
			  }
			
			  // 1.2 发起请求创建订单
			  const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
			  if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				console.log(res,'res1')
			  // 1.3 得到服务器响应的“订单编号”
			  const orderNumber = res.message.order_number
			
			  // 2. 订单预支付
			  // 2.1 发起请求获取订单的支付信息
			  const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
			  // 2.2 预付订单生成失败
			  console.log(res2,'res2')
			  if (res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
			  // 2.3 得到订单支付相关的必要参数
			  const payInfo = res2.message.pay
			
			  // 3. 发起微信支付
			  // 3.1 调用 uni.requestPayment() 发起微信支付
			  const [err, succ] = await uni.requestPayment(payInfo)
			  // 3.2 未完成支付
			  if (err) return uni.$showMsg('订单未支付！')
			  // 3.3 完成了支付，进一步查询支付的结果
			  const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
			  // 3.4 检测到订单未支付
			  console.log(res3,'res3')
			  if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
			  // 3.5 检测到订单支付完成
			  uni.showToast({
			    title: '订单支付完成！',
			    icon: 'success'
			  })
			},
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	z-index: 99999;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #c00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #c00000;
		height: 50px;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
		color: white;
	}
}
</style>