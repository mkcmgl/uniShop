<template>
	<view>
		<view class="cart-tittle">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-tittle-text">购物车</text>
		</view>
		<block v-for="( item,i) in cart" :key="i">
			<my-goods :showNum="true" :redio="true" :goods="item" @radio-change="radioChangeHandler"></my-goods>
		</block>
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

			};
		},
		methods: {
			...mapMutations('m_cart',['updateGoodsState']),
			radioChangeHandler(e) {
			this.updateGoodsState(e)
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
