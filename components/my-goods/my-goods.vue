 <template>
			<view class="goods-item">
					<!-- 图片 -->
					<view class="goods-item-left">
						<radio @click="radioClickHandler" :checked="goods.goods_state" v-if="redio" color="#c00000"></radio>
						<img :src="goods.goods_small_logo|| defaultPic" class='goods-pic'>
					</view>
					<!-- 右侧 -->
					<view class="goods-item-right">
						<view class="goods-name">
								{{goods.goods_name}}
						</view>
						<view class="goods-info-box">
							<view class="goods-price">
							￥{{goods.goods_price|tofixed}}</view>
							<uni-number-box v-if="showNum" :min="1" :value="goods.goods_count"></uni-number-box>
						</view>
						
					</view>
				</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods:{
				type:Object,
				default:{}
			},
			redio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			tofixed(num){
			 return	Number(num).toFixed(2)
			}
		},
		methods:{
			radioClickHandler(){
				 this.$emit('radio-change', {
				      // 商品的 Id
				      goods_id: this.goods.goods_id,
				      // 商品最新的勾选状态
				      goods_state: !this.goods.goods_state
				    })
			}
		}
		
	}
</script>

<style lang="scss">
	.goods-item-left{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
	flex: 1;

    .goods-name {
      font-size: 13px;
    }
	.goods-info-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-price {
		  font-size: 16px;
		  color: #c00000;
		}
	}

  }
}
</style>