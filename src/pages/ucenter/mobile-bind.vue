<template>
	<div class="mobileLogin">
		<div class="title">
			<p>绑定手机</p>
			<p>为例您的账户安全，请绑定手机</p>
		</div>
		<verify type="7"></verify>
		<div class="btn">
			<button :class="btnFlag?'light':''" @click="btnFlag&&testCode()">确 定</button>
		</div>
	</div>
</template>

<script>
import { sStorage } from '@/lib/utils';
const redirectPath = sStorage.get('redirectPath') || '';
export default{
	name:"mobileBind",
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
		//手机验证码预校验
		testCode(){
			let params={
				bizType:7,
				phone:this.$children[0].phoneVal,
				checkCode:this.$children[0].codeVal
			}
			console.log(params);
			this.Api.login.testCode(params).then(res=> {
                if(res.code != 1) return;
				if(res.data){
					if(res.data.registered){
						this.bindPhone(res.data.preCode);
					}else{
						this.$router.push({path:'/setPassword',query:{
							phone:this.$children[0].phoneVal,
							code:res.data.preCode,
						}});
					}
				}
			});
		},
		//绑定手机
		bindPhone(preCode){
			let fyuserData=JSON.parse(sessionStorage.getItem("fywxuserData"));
			console.log(fyuserData);
			let params={
					openid:fyuserData.openid,
					phone:this.$children[0].phoneVal,
					preCode:preCode
				}
			if(fyuserData.unionid){
				params.unionid=fyuserData.unionid;
			}
			this.Api.login.bindPhone(params).then(res=>{
                if(res.code != 1) return;
                this.$store.dispatch("setUserData", res.data);
				this.$store.dispatch("setToken",res.token);
				this.$store.dispatch("setPhone",this.$children[0].phoneVal);

				if(redirectPath){
					sStorage.remove('redirectPath');
					this.$router.push({path:redirectPath});
					return;
				}else{
					this.$router.go(-1);
				}
			});
		}
	}
}
</script>

<style lang="less" scoped>
	.mobileLogin{
		width:100%;
		height:100%;
		background: #fff;
		font-size: 0.26rem;
		padding-top: 0.7rem;
		.title{
			p{
				text-align: center;
				&:nth-child(1){
					font-size: 0.52rem;
					color:#202020;
					font-weight: 900;
					line-height: 0.52rem;
				}
				&:nth-child(2){
					font-size: 0.26rem;
					color:#999;
					line-height: 0.26rem;
					margin-top: 0.16rem;
					margin-bottom: 0.3rem;
				}
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