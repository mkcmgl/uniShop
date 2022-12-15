<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}" @click="searchBoxHandle">
		<view class="my-searchj-box"  :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props: {
		  // 背景颜色
		  bgcolor: {
		    type: String,
		    default: '#C00000'
		  },
		  // 圆角尺寸
		  radius: {
		    type: Number,
		    // 单位是 px
		    default: 18
		  }
		},
		methods:{
			searchBoxHandle(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my-searchj-box{
		height: 36px;
		background-color: #ffff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>