<template>
	<view class="cart" v-if="cart.length !=0">
		<my-address></my-address>
		<view class="cart-tittle">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-tittle-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="( item,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
					<my-goods :showNum="true" :redio="true" :goods="item" @radio-change="radioChangeHandler"
						@num-change="numberChangeHandler">
					</my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<!-- 空白 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="empty-text">空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {

		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			swipeActionClickHandler(goods) {
				this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart {
		padding-bottom: 50px;
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.empty-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}

	.cart-tittle {
		height: 40px;
		display: fix;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-tittle-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
</style>
