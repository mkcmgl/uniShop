<template>
	<view>
		<!-- 选择收获地址按钮盒子 -->
		<view class="adress-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress" >请选择收货地址+</button>
		</view>
		<!-- 渲染收货信息盒子 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="right" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{address.provinceName}}-{{address.cityName}}-{{address.countyName}}-{{address.detailInfo}}
				</view>
			</view>
		</view>
		
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {mapMutations,mapState}from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
		
				const [err,succ]= await uni.chooseAddress().catch(err=>err)
				console.log(succ)
				if(succ  &&succ.errMsg==='chooseAddress:ok'){
					console.log('succ')
					this.updateAddress(succ)
				}
				if(err){
					if(err.errMsg === 'chooseAddress:fail auth deny'|| err.errMsg === 'chooseAddress:fail authorize no response'){
						// 重新授权
							this.reAuth()
					}
				}
					console.log(this.address,'add')
			
				
			},
			async reAuth(){
			const [err2,confirmResult]=	await uni.showModal({
					content:'检测到您没有打开地址权限，是否去设置打开',
					confirmText:'确认',
					cancelText:'取消',
				})
				if(err2) return err2
				if(confirmResult.cancel)return uni.$showMsg('您取消了地址授权!')
				if(confirmResult.confirm) return uni.openSetting({
					success:(settingResult)=>{
						 if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
						      //  地址授权的值等于 false，提示用户 “您取消了地址授权”
						 if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
					}
				})
			}

			
		},
		computed: {
		...mapState('m_user',['address']),
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
		align-items: center;
		margin-top: 10px;
		.row2-left{
			white-space: nowrap;
		}
	}
}
</style>