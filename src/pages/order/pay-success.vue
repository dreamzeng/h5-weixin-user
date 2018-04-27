<template>
	<div id="pageContainer" class="lop-content">
            <img src="~@/assets/images/pay-result-suc.png" alt="">
            <p class="fs-32 color-3">您已成功支付</p>
            <p class="fs-32 color-3 mt-42">¥<span class="fs-52 fw-bold payMoney">{{this.amount}}</span>元</p>
            <p class="lop-btn mt-92" @click="toOrderDetail">完成</p>
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