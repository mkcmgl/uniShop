<template>
	<view v-if="goods_info.goods_name" class="goods">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">

			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<img :src=" item.pics_big" @click="preview(i)">
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info-box">
			<view class="goods-price">
				￥{{goods_info.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yw">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>

		<!-- 商品导航 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
	
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(option) {
			const goods_id = option.goods_id
			this.getGoodsData(goods_id)
		},
		methods: {
			...mapMutations('m_cart', ['addToCart']),
			async getGoodsData(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, '<img style=display:block')
					.replace(/webp/g, 'jpg')
				this.goods_info = res.message
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				if (e.content.text === '购物车') {
					// 切换到购物车页面
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goods_info.goods_id, // 商品的Id
						goods_name: this.goods_info.goods_name, // 商品的名称
						goods_price: this.goods_info.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
						goods_state: true // 商品的勾选状态
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px 10px 0 10px;

		.goods-price {
			color: #C00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				margin-right: 10px
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yw {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}

	}

	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;

	}

	.goods {
		padding-bottom: 50px;
	}
</style>
