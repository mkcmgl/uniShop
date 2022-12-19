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
			isFullCheck(){
			return	this.checkedCount==this.total?true:false
			}
		},
		methods:{
			...mapMutations('m_cart',['updataAllGoodsState']),
			changeAllState(){
				this.updataAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				 if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
				   //  再判断用户是否选择了收货地址
				   if (!this.addstr) return uni.$showMsg('请选择收货地址！')
				 
				   //  最后判断用户是否登录了
				   if (!this.token) return this.delayNavigate()
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
					url: '/pages/my/my'
				  })

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
			}
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