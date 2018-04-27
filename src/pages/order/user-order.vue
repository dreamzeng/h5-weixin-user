<template>
	<div class="order-type">
		<ul>
			<li class="fy-border-b" @click="orderList(1)">咨询订单</li>
			<!--<li class="fy-border-b" @click="orderList(2)">问答订单</li>-->
			<li class="fy-border-b" @click="orderList(3)">法律服务订单</li>
			<li @click="orderList(4)">线下服务订单</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		mounted(){
		},
		methods:{
			orderList(type){
				this.$router.push({path:'/orderList',query:{type:type}});
			}
		}
	}
</script>

<style scoped>
.order-type{
	background: #fff;
	padding:0 0.32rem 0 0.84rem ;
	overflow: hidden;
}
.order-type li{
	font-size:0.32rem;
	line-height: 0.32rem;
	height:0.68rem;
	margin-top: 0.36rem;
	color:#333;
	background:url(~@/assets/images/right.png) no-repeat top right;
	background-size:0.12rem 0.22rem ;
	position: relative;
}
.order-type li:after{
	content: '';
	position: absolute;
	top:-0.1rem;
	left:-0.6rem;
	width:0.5rem;
	height:0.5rem;
	background: url(~@/assets/images/seek-1.png) no-repeat;
	background-size:0.5rem  0.5rem;
}
.order-type li:nth-child(2):after{
	background: url(~@/assets/images/ask.png) no-repeat;
	background-size:0.5rem  0.5rem;
}
.order-type li:nth-child(3):after{
	background: url(~@/assets/images/lawyer-service.png) no-repeat;
	background-size:0.5rem  0.5rem;
}
.order-type li:nth-child(4):after{
	background: url(~@/assets/images/offline.png) no-repeat;
	background-size:0.5rem  0.5rem;
}
</style>