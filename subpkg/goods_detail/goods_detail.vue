<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			
			<swiper-item v-for="(item,i) in good_info.pics" :key="i">
			<img :src=" item.pics_big" @click="preview(i)" >
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				good_info:{}
			};
		},
		onLoad(option){
			const goods_id=option.goods_id
			this.getGoodsData(goods_id)
		},
		methods:{
			async getGoodsData(goods_id){
				const {data:res}=await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
				if(res.meta.status!==200) return uni.showMsg()
				this.good_info=res.message
			},
			preview(i){
				uni.previewImage({
					current:i,
					urls:this.good_info.pics.map(x=>x.pics_big)
				})
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height:750rpx;
	image{
		width: 100%;
		height:100%;
	}
}
</style>
