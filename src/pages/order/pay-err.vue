<template>
	<div id="pageContainer" class="lop-content">
            <img src="~@/assets/images/pay-result-fail.png" alt="">
            <p class="fs-32 color-3">支付失败，请重新支付</p>
            <p class="lop-btn lop-btn-webmain mt-86" @click="toOrderDetail">重新支付</p>
            <p class="lop-btn mt-32" @click="toOrderDetail">查看订单</p>
        </div>
</template>

<script>
export default{
	data(){
		return {
			orderNo:'',
			amount:''
		}
	},
	mounted(){
		this.$store.dispatch("setTitle","支付失败");
	},
	methods:{
		toOrderDetail(){
			this.$router.push({path:"/orderDetail",query:{orderNo:this.orderNo}});
		}
	}
}
</script>

<style lang="less">
@import '~@/assets/less/fycommon.less';
@import '~@/pages/order/pay-success.less';
</style>