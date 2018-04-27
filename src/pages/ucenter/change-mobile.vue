<template>
	<div class="changeMobile">
		<div class="title">
			<p>换绑手机号</p>
		</div>
		<verify type="5" phoneFlag="1"></verify>
		<div class="btn">
			<button :class="btnFlag?'light':''" @click="btnFlag&&confirm()">验证后绑定新手机号</button>
		</div>
	</div>
</template>

<script>
export default{
	name:"changeMobile",
	data(){
		return {
			btnFlag:false,
		}
	},
	mounted(){
		this.$nextTick(() => {
	    });
	},
	methods:{
		//跳转绑定新手机号
		confirm(){
			let params={
				bizType:6,
				phone:this.$children[0].phoneVal,
				checkCode:this.$children[0].codeVal
			}
			this.Api.login.testCode(params).then(res=> {
                if(res.code != 1) return;
				this.$router.push({path:'/newMobile',query:{
					phone:this.$children[0].phoneVal,
					code:res.data.preCode,
				}});
			});
		}
	}
}
</script>

<style lang="less" scoped>
	.changeMobile{
		width:100%;
		height:100%;
		background: #fff;
		font-size: 0.26rem;
		padding-top: 0.72rem;
		.title{
			width:100%;
			padding-bottom: 0.68rem;
			p{
				text-align: center;
				font-size: 0.52rem;
				color:#333;
				font-weight: 900;
				line-height: 0.52rem;
			}
		}
		.btn{
			padding: 0 0.62rem;
			margin-top: 1.04rem;
			button{
				outline: none;
				width:100%;
				height:0.96rem;
				border:none;
				background: #ccf5ef;
				border-radius: 0.96rem;
				color:#fff;
				font-size: 0.32rem;
				&.light{
					background: #00ccb1;
				}
			}
		}
		
	}
</style>