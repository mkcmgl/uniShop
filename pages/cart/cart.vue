<template>
	<view>
		<my-address></my-address>
		<view class="cart-tittle">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-tittle-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="( item,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
					<my-goods :showNum="true" :redio="true" :goods="item"
					 @radio-change="radioChangeHandler" @num-change="numberChangeHandler">
					 </my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>

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
			 options:[
					{
						text: '删除',
						style: {
							backgroundColor: '#C00000'
						}
					}
				  ]
			};
		},
		methods: {
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioChangeHandler(e) {
			this.updateGoodsState(e)
			},
			numberChangeHandler(e){
				this.updateGoodsCount(e)
			},
			swipeActionClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
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
