<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item  v-for="(item,index) in imgList" :key="item.id">
				<view class="swiper-item">
					<img :src="item.image" >
				</view>
			</swiper-item>
？ latst one day with out
		</swiper>
		
		<view class="nav-list">
		  <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
		    <image :src="item.image_src" class="nav-img"></image>
		  </view>
		</view>
		
		<!-- 楼层区域 -->
		<!-- 楼层的容器 -->
		<view class="floor-list">
		  <!-- 每一个楼层的 item 项 -->
		  <view class="floor-item" v-for="(item, i) in floorList" :key="i">
		    <!-- 楼层的标题 -->
		    <image :src="item.floor_title.image_src" class="floor-title"></image>
		    <!-- 楼层的图片区域 -->
		    <view class="floor-img-box">
		      <!-- 左侧大图片的盒子 -->
		      <navigator class="left-img-box" :url="item.product_list[0].url">
		        <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
		      </navigator>
		      <!-- 右侧 4 个小图片的盒子 -->
		      <view class="right-img-box">
		        <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
		          <image :src="item2.image_src" :style="{width: item2.image_width + 'rpx'}" mode="widthFix"></image>
		        </navigator>
		      </view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	 import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		data() {
			return {
				imgList:{},
				// 分类导航的数据列表
				navList: [],
				// 楼层的数据
				floorList: []
			};
		},
		onLoad() {
			this.gitSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
		async gitSwiperList(){
			console.log('????????????')
			const res=await	uni.$http.get('/slides')
			console.log(res)
			if(res.statusCode !==200){
				return uni.showToast({
					title:'数据请求失败',
					duration:1500,
					icon:'none'
				})
			}
				this.imgList=res.data
			},
			async getNavList() {
			  const { data: res } = await uni.$http.get('/catitems')
			  if (res.meta.status !== 200) return uni.$showMsg()
			  this.navList = res.message
			},
			navClickHandler(item) {
			  if (item.name === '分类') {
			    uni.switchTab({
			      url: '/pages/cate/cate'
			    })
			  }
			},
			// 获取首页楼层数据的方法
			async getFloorList() {
			  const { data: res } = await uni.$http.get('/floordata')
			  if (res.meta.status !== 200) return uni.$showMsg()
			
			  // 对数据进行处理
			  res.message.forEach(floor => {
			    floor.product_list.forEach(prod => {
			      prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
			    })
			  })
			  this.floorList = res.message
			},
			gotoSearch() {
			  uni.navigateTo({
			    url: '/subpkg/search/search'
			  })
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height:330rpx;
	.swiper-item,image{
		width: 100%;
		height: 100%;
	}
}

</style>
