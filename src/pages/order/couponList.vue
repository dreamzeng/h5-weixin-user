<template>
	<ul class="couponList">
		<li v-for="(item,index) in list" v-if="item.usable" :key="index">
			<div class="price" v-if="item.fixMoney">¥<span v-cloak>{{item.fixMoney}}</span></div>
			<div class="price" v-if="!item.fixMoney"><span v-cloak>{{item.discountRate}}折</span></div> 
			<div class="info">
				<p class="title">优惠券</p>
				<p >
					<span v-if="item.fixMoney" v-cloak><span v-html="item.limitMoney?'满'+item.limitMoney+'元可用':'无使用条件限制'"></span></span>
					<span v-if="item.discountRate"><span v-html="item.maxDiscountMoney?'最大抵扣'+item.maxDiscountMoney+'元':'无使用条件限制'"></span></span>
				</p>
				<p class="service" v-cloak>可适用服务：{{item.serverNames}}</p>
				<p v-cloak>有效期：{{item.validityPeriod}}</p>
			</div>
		</li>
	</ul>
</template>

<script>
	export default{
		props:{
		   list:{
		   	   type: Array,
		       require:true
		   }
		}
	}
</script>

<style lang="less" scoped>
.couponList li{
	width:6.6rem;
	height:2.1rem;
	margin-left: 0.44rem;
	margin: 0 auto;
	background: url(~@/assets/images/coupon-no.png) no-repeat center;
	background-size:100%;
	margin-bottom: 0.24rem;
}
li{
	list-style: none;
}
.couponList .item-active{
	background: url(~@/assets/images/coupon-choose.png) no-repeat center ;
	background-size:6.6rem 2.1rem;
}
.couponList li .price{
	float: left;
	color: #FF655F;
	line-height: 2.1rem;
	font-size: 0.34rem;
	/*margin-left: 0.42rem;*/
	width:1.96rem;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.couponList li .price span{
	font-size: 0.42rem;
	color: #FF655F;
}
.couponList li .info{
	float: right;
	margin-right: 0.2rem;
}
.couponList li .info p{
	font-size: 0.24rem;
	color:#CCCCCC;
	width:4.2rem;
}
.couponList li .info p:nth-child(4){
	line-height: 0.28rem !important;
}
.couponList li .info .title{
	font-size: 0.4rem;
	color: #666666;
	margin-top: 0.2rem;
	/*line-height: 0.54rem;*/
}
.couponList li .info .service{
	font-size: 0.24rem;
	line-height: 0.3rem;
	height:0.58rem;
	margin-bottom: 0.02rem;
	overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2; 
	margin-top: 0.05rem;
}
@media all and (max-width:320px){
	.couponList li{
		height:2.4rem !important;
		background-size:6.6rem 2.4rem !important;
	}
	.couponList li .price{
		line-height: 2.4rem !important;
	}
}
</style>