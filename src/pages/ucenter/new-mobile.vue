<template>
	<div class="newMobile">
		<div class="title">
			<p>换绑手机号</p>
		</div>
		<verify type="6"></verify>
		<div class="btn">
			<button :class="btnFlag?'light':''" @click="btnFlag&&updatePhone()">确认绑定</button>
		</div>
	</div>
</template>

<script>
export default{
	name:"newMobile",
	data(){
		return {
			btnFlag:false,
			phone:'',
			code:''
		}
	},
	mounted(){
		this.$nextTick(() => {
			this.phone=this.$route.query.phone;
			this.code=this.$route.query.code;
	    });
	},
	methods:{
		confirm(){
			let params={
				bizType:6,
				phone:this.$children[0].phoneVal,
				checkCode:this.$children[0].codeVal
			}
			this.Api.login.testCode(params).then(res=> {
                if(res.code != 1) return;
				this.updatePhone();
			});
		},
		updatePhone(){
			let params={
				phoneOld:this.phone,
				phoneNew:this.$children[0].phoneVal,
				checkCode:this.$children[0].codeVal,
				preCode:this.code
			}
			this.Api.login.updatePhone(params).then(res=> {
                if(res.code != 1) return;
				this.$store.dispatch("setPhone",this.$children[0].phoneVal);
				this.$router.go(-2);
			});
		}
		
	}
}
</script>

<style lang="less" scoped>
	.newMobile{
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