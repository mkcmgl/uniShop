<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item  v-for="(item,index) in imgList" :key="item.id">
				<view class="swiper-item">
					<img :src="item.image" >
				</view>
			</swiper-item>
？ latst one day
		</swiper>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:{}
			};
		},
		onLoad() {
			this.gitSwiperList()
		},
		methods:{
		async gitSwiperList(){
			console.log('????????????')
			const res=await	uni.$http.get('/slides')
			console.log(res)
			if(res.statusCode !==200){
				return uni.showToast({
					title:'数据请求失败',
					duration:1500,
					icon:'none'
				})
			}
		
				this.imgList=res.data
		
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height:330rpx;
	.swiper-item,image{
		width: 100%;
		height: 100%;
	}
}

</style>
