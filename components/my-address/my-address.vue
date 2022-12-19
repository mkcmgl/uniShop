<template>
	<view>
		<!-- 选择收获地址按钮盒子 -->
		<view class="adress-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress" >请选择收货地址+</button>
		</view>
		<!-- 渲染收货信息盒子 -->
		<view class="address-info-box" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：ask
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：13883888192
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					重庆市九龙坡区重庆市九龙坡区重庆市九龙坡区重庆市九龙坡区重庆市九龙坡区重庆市九龙坡区
				</view>
			</view>
		</view>
		
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	export default {
		name:"my-address",
		data() {
			return {
				address:{}
			};
		},
		methods:{
			async chooseAddress(){
				const res= await uni.chooseAddress()
				console.log(res)
			}
		}
	}
</script>

<style lang="scss">
.address-border{
	display: block;
	width: 100%;
	height: 5px;
}
.adress-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;

}
.address-info-box{
	height: 90px;
	display: flex;
	font-size: 12px;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		.row1-right{
			display: flex;
			justify-content: space-between;
		}
	}
	.row2{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		.row2-left{
			white-space: nowrap;
		}
	}
}
</style>