<template>
	<view>
		<my-search  @click='goToSearch' ></my-search>
		<view class="scroll-view-container">
			<!-- 左侧 -->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'px'}">
				<block v-for="(item,index) in cateList" :key="item.cat_id">
					<view :class="['left-scroll-view-item',index===active?'active':'']  " @click="activeChange(index)">
						{{item.cat_name}}</view>
				</block>

			</scroll-view>
			<!-- 右侧 -->
			<scroll-view scroll-y="true" :style="{height:wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-leve" v-for="(item2, i2) in cateLeveList" :key="i2">
					<view class="cate-leve-title">/ {{item2.cat_name}} /</view>
					<view class="cate-leve-list">
						<view class="cate-leve-item" v-for="(item3,i3) in item2.children" :key="i3"
						@click="goToGoodsList(item3)">
							<img :src="item3.cat_icon" >
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				cateList: [],
				active: 0,
				cateLeveList: [],
				scrollTop:0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight-50
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.cateLeveList = res.message[0].children
				console.log(this.cateLeveList, 'sadsa')
			},
			activeChange(val) {
				this.active = val
				this.cateLeveList = this.cateList[val].children
				this.scrollTop=this.scrollTop==0?1:0
			},
			goToGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			},
			goToSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll-view {
			width: 120px;
		}


		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				background-color: #ffff;
				position: relative;

				&::before {
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}

		.cate-leve-title {
			font-size: 12px;
			text-align: center;
			font-weight: bold;
			padding: 15px 0;
		}
		.cate-leve-list{
			display: flex;
			flex-wrap: wrap;
			.cate-leve-item{
				width: 33.3%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-top: 10px;
				image{
					width:60px ;
					height: 60px;
				}
				text{
				font-size: 12px;
				}
			}
		}
	}
</style>
