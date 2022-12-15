<template>
	<view>
		<view class="search-box"></view>
		<uni-search-bar @confirm="search" @input="input"  placeholder="点击搜索"
		 cancelButton="none"
		 :radius="100"></uni-search-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// input(e){
				
			// },
			// search(e){
				
			// }
		}
	}
</script>

<style lang="scss">

.search-box{
	position: sticky;
	top: 0;
	z-index: 999999;
}
</style>
