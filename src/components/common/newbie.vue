<template>
	<div class="newbie" v-if="$store.getters.couponMoney&&flag">
		<div class="shadow" @click="close"></div>
		<div class="content">
			<p>新人有礼</p>
			<p>恭喜您获得{{$store.getters.couponMoney}}元新人礼金</p>
			<p>¥<span>{{$store.getters.couponMoney}}</span></p>
			<p @click="toPage">查看</p>
			<p @click="close"></p>
		</div>
	</div>
</template>

<script>
export default{
		name:"newbie",
		data(){
			return {
				flag:true
			}
		},
		mounted(){
			let isShow=localStorage.getItem("isShow");
			if(this.$store.getters.couponMoney){
				if(isShow){
					this.flag=false;
				}else{
					localStorage.setItem("isShow","true");
				}
			}
		},
		methods:{
			close(){
				this.flag=false;
			},
			toPage(){
				this.$router.push({path:'/myCoupon'});
			}
		}
	}
</script>

<style lang="less" scoped>
.newbie{
	width:100%;
	height:100%;
	position: fixed;
	top:0;
	z-index: 1000;
	.shadow{
		width:100%;
		height:100%;
		background: rgba(0,0,0,.4);
		position: fixed ;
		top:0;
		bottom:0;
		z-index: 1000;
	}
	.content{
		width:7.04rem;
		height:6.58rem;
		background: url(~@/assets/images/newbie.png) no-repeat;
		background-size:contain ;
		z-index: 1001;
		position: absolute;
		top:0;
		left:0;
		bottom: 0;
		right:0;
		margin: auto;
		color:#fff;
		padding-top: 0.76rem;
		p:nth-of-type(1){
			font-size: 0.64rem;
			font-weight: 600;
			line-height: 0.64rem;
			text-align: center;
		}
		p:nth-of-type(2){
			font-size: 0.34rem;
			line-height: 0.34rem;
			text-align: center;
			margin-top: 0.36rem;
		}
		p:nth-of-type(3){
			font-size: 0.44rem;
			line-height: 0.44rem;
			text-align: center;
			color:#fa3d69;
			margin-top: 1.24rem;
			span{
				font-size: 0.86rem;
				font-weight: 600;
			}
		}
		p:nth-of-type(4){
			width: 100%;
			height:1.1rem;
			background:url(~@/assets/images/button.png) no-repeat center;
			background-size:4.98rem 1.1rem ;
			font-size: 0.34rem;
			line-height: 1.1rem;
			text-align: center;
			margin-top: 1.08rem;
		}
		p:nth-of-type(5){
			width:100%;
			height:0.52rem;
			background:url(~@/assets/images/close-1.png) no-repeat center;
			background-size:0.52rem 0.52rem;
			margin-top: 0.74rem;
		}
	}
}
</style>