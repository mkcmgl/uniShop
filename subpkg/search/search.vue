<template>
	<view>
		<view class="search-box">
		<uni-search-bar :focus="true" @input="input"  placeholder="点击搜索"
		 cancelButton="none"
		 :radius="100"></uni-search-bar>
		 </view>
		 <!-- 搜索建议列表 -->
		 <view class="sugg-list" v-if="searchResults.length!==0">
			 <view class="sugg-item" v-for="(item,i) in searchResults" :key="i"  @click="gotoDetail(item.goods_id)">
			 	<view class="goods-name">
			 		{{item.goods_name}}
			 	</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			 </view>
		 </view>
		 <!-- 搜索历史 -->
		 <view class="history" v-else>
		 	<view class="history-tittle">
		 		<text>搜索历史</text>
				<uni-icons type="trash" size="16"></uni-icons>
		 	</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in history" :key="i"></uni-tag>
			</view>
		 </view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchResults:[],
				history:['a','app','apple']
			}
		},
		methods: {
			input(e){
				clearTimeout(this.timer)
			this.timer=setTimeout(()=>{
				this.kw=e.value
				this.getSearchList()
			},500)
			},
			async getSearchList(){
				if(this.kw === ''){
					this.searchResults=[]
					return
				}else{
				const{data:res}=await uni.$http.get('/api/public/v1/goods/qsearch',{query: this.kw})
				if(res.meta.status!==200) return uni.$showMsg()
				console.log(res)
				this.searchResults=res.message
				}
			},
			gotoDetail(goods_id) {
			  uni.navigateTo({
			    // 指定详情页面的 URL 地址，并传递 goods_id 参数
			    url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			  })
			}
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
.sugg-list{
	padding: 0,5px;
	.sugg-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			    margin-right: 3px;
			
		}
	}
}
.history{
	padding:0 5px;
	.history-tittle{
		display: flex;
		justify-content: space-between;
		height: 40px;
		border-bottom: 1px solid #efefef;
		font-size: 12px;
		align-items: center;
	}
	.history-list{
		display: flex;
		flex-wrap: nowrap;
		.uni-tag{
		margin-top: 5px;
		margin-right: 5px;
		}
	}
}

</style>
