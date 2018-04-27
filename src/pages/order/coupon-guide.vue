<template>
	<div class="coupon-guide">	
		<div class="title">
			优惠券基本使用说明
		</div>
		<div class="introduce">
			<p>1、优惠券仅限在法义旗下产品使用。</p>
			<p>2、优惠券分两种：满减券、折扣券。</p>
			<p>3、优惠券获得形式： 通过法义旗下产品的买赠、活动等形式获得。</p>
			<p>4、使用满减券、折扣券提交的订单，在订单未支付时取消订单，系统自动返还相应的优惠券。若订单被支付后，取消某一子订单或者取消全部子订单，优惠券均不返还。</p>
			<p>5、使用满减券、折扣券的订单，若发生售后退货，优惠券不予返还。</p>
			<p>6、优惠券不能进行兑换、出售、转让或其他用途。</p>
			<p>7、本规则由法义依据国家相关法律法规及规章制度予以解释。</p>
		</div>
	</div>
</template>

<script>
	export default{
		mounted(){
			this.$store.dispatch("setTitle","优惠券说明");
		}
	}
</script>

<style lang="less" scoped>
p,div{box-sizing: border-box; word-break: break-all;}
/*body{background: #f7f8f9 !important; min-height: 100%;width: 100%;}*/
.coupon-guide{
	width:100%;
	height: 100%;
	padding: 0.44rem 0.6rem;
}
.coupon-guide .title{
	color:#6e6e6e;
	font-size: 0.40rem;
	line-height: 0.44rem;
	margin-bottom: 0.2rem;
	text-align: center;
}
.coupon-guide .introduce{
	color:#b0b0b0;
	font-size:0.30rem;
	line-height: 0.48rem;
}

</style>