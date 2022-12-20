<template>
	<view class="login-comntainer">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="warn" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="tips-text">
			登陆后尽享更多权益
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapState} from "vuex"
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			getUserInfo(e){
				console.log(e)
				   if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
				   console.log(e.detail.userInfo)
				   this.updateUserInfo(e.detail.userInfo)
				    this.getToken(e.detail)
			},
			async getToken(info){
				 // 调用微信登录接口
				  const [err, res] = await uni.login().catch(err => err)
				  // 判断是否 uni.login() 调用失败
				  console.log(err,res)
				  if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
				console.log(info)
				  // 准备参数对象
				  const query = {
				    code: res.code,
				    encryptedData: info.encryptedData,
				    iv: info.iv,
				    rawData: info.rawData,
				    signature: info.signature
				  }
				const token={
									  token:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
				}
				 this.updateToken(token.token)
				  // 换取 token
				  const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				  this.navigateBack()
				  // if (loginResult.meta.status !== 200) {
					 //  console.log(loginResult)
					 //  return uni.$showMsg('登录失败！')
				  // }

			},
			navigateBack(){
				if(this.redirectInfo&&this.redirectInfo.openType==='switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete:()=>{
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		}
	}
</script>

<style lang="scss">
.login-comntainer{
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 750rpx;
	background-color: #f8f8f8;
	align-items: center;
	overflow: hidden;
	position: relative;
	&::after{
		content: '';
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		width: 90%;
		border-radius: 100px;
		background-color: #c00000;
		margin: 15px 0;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>