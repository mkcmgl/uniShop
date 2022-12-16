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
				isloding:false
			};
		},
		onLoad(options){
			  this.queryObj.query = options.query || ''
			  this.queryObj.cid = options.cid || ''
			  this.getGoodsList()
		},
		methods:{
			async getGoodsList(cd){
				this.isloding=true
			 const{data:res}=	await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
			 cd&&cd()
			 if(res.meta.status!==200) return uni.$showMsg()
			   this.goodsList = [...this.goodsList,...res.message.goods]
			     this.total = res.message.total
				 this.isloding=false
			}
		},
		onReachBottom(){
			if(this.isloding) return
			if(this.queryObj.pagenum * this.queryObj.pagesize>=this.total) {
				console.log('数据加载完毕')
				return uni.$showMsg('数据加载完毕!')
			}
			this.queryObj.pagenum+= 1       
			this.getGoodsList()
		},
		onPullDownRefresh(){
			this.queryObj.pagenum=1
			this.isloding=false
			this.total=0
			this.goodsList=[]
			
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
