<template>
	<view>
		<view class="goods-list">
			<block v-for="(item,i) in goodsList" :key="i">
			<my-goods :goods="item"></my-goods>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					      // 查询关键词
					      query: '',
					      // 商品分类Id
					      cid: '',
					      // 页码值
					      pagenum: 1,
					      // 每页显示多少条数据
					      pagesize: 10
				},
				goodsList:[],
				total:0,
			};
		},
		onLoad(options){
			  this.queryObj.query = options.query || ''
			  this.queryObj.cid = options.cid || ''
			  this.getGoodsList()
		},
		methods:{
			async getGoodsList(){
			 const{data:res}=	await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
			 if(res.meta.status!==200) return uni.$showMsg()
			   this.goodsList = res.message.goods
			     this.total = res.message.total
			}
		}
	}
</script>

<style lang="scss">

</style>
