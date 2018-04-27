<template>
	<div class="setPsd">
		<div class="title">设置登录密码</div>
		<ul>
			<li>
				<input type="password" placeholder="请输入密码" maxlength="16" @input="psd(1)" @blur="psdTest(1,true)"  v-model="psd1"/>
				<span v-if="flag1" @click="clear(1)"></span>
			</li>
			<li>
				<input type="password" placeholder="请再次输入密码" maxlength="16" @input="psd(2)" @blur="psdTest(2,true)"  v-model="psd2"/>
				<span v-if="flag2" @click="clear(2)"></span>
			</li>
			<p>提示：长度在6-15位，密码应包含数字、英文字母、特殊字符中的两种或以上</p>
		</ul>
		<div class="btn">
			<button :class="btnFlag?'light':''" @click="btnFlag&&toPage()">确 定</button>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import md5 from "@/lib/md5";
import { sStorage } from '@/lib/utils';
const redirectPath = sStorage.get('redirectPath') || '';
export default{
		name:"setPassword",
		data(){
			return {
				psd1:'',
				psd2:'',
				flag1:false,
				flag2:false,
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
			psd(type){
				var length;
				if(type==1){
					length=this.psd1.length;
					if(length>0){
						this.flag1=true;
					}else{
						this.flag1=false;
					}
				}else{
					length=this.psd2.length;
					if(length>0){
						this.flag2=true;
					}else{
						this.flag2=false;
					}
				}
				if(this.psdTest(1)&&this.psdTest(2)){
					this.btnFlag=true;
				}else{
					this.btnFlag=false;
				}
				
			},
			clear(type){
				if(type==1){
					this.psd1="";
					this.flag1=false;
				}else{
					this.psd2="";
					this.flag2=false;
				}
			},
			psdTest(type,flag){
				var reg=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/
				var val;
				if(type==1){
					val=this.psd1;
				}else{
					val=this.psd2;
				}
				if(reg.test(val)){
					if(flag){
//						this.tip("密码正确");
					}
					return true;
				}else{
					if(flag){
						this.tip("密码长度在6-15位，密码应包含数字、英文字母、特殊字符中的两种或以上");
					}
					return false;
				}
			},
			//弹窗提示
			tip(val){
				Toast({
				  message: val,
				  position: 'bottom',
				  duration: 1000
				});
			},
			toPage(index){
			  let fyuserData=JSON.parse(sessionStorage.getItem("fywxuserData"));
		      if(this.psd1==this.psd2){
		      	let params={
		      		openid:fyuserData.openid,
		      		phone:this.phone,
		      		password:md5.hex_md5(this.psd1),
		      		preCode:this.code,
		      		nickName:fyuserData.nickname,
		      		logo:fyuserData.headimgurl,
		      		sex:fyuserData.sex,
		      		city:this.$store.getters.cityName,
		      		province:fyuserData.province
		      	}
		      	if(fyuserData.unionid){
		      		params.unionid=fyuserData.unionid;
		      	}
		      	console.log(params);
		      	this.Api.login.register(params).then(res=>{
                	if(res.code != 1) return;
                	this.$store.dispatch("setUserData", res.data);
					this.$store.dispatch("setToken",res.token);
					this.$store.dispatch("setPhone",this.phone);
					if(res.data.couponMoney){
        				this.$store.dispatch('setCouponMoney',res.data.couponMoney);
					}
					if(redirectPath){
						sStorage.remove('redirectPath');
						this.$router.push({path:redirectPath});
						return;
					}else{
						this.$router.go(-2);
					}
				});
		      }else{
		      	this.tip("两次密码输入不一致");
		      }
		    }
		}
	}
</script>

<style lang="less" scoped>
	.setPsd{
		width:100%;
		height:100%;
		background: #fff;
		font-size: 0.26rem;
		padding-top: 0.7rem;
		.title{
			font-size: 0.52rem;
			color:#202020;
			font-weight: 900;
			line-height: 0.52rem;
			text-align: center;
			margin-bottom: 0.72rem;
		}
		ul{
			padding: 0 0.4rem;
			li{
				height:1.04rem;
				position:relative;
				padding:0.38rem 0;
				display: flex;
				justify-content:space-between;
				align-items: center; 
				&:after{
					content:"";
					height:1px;
					width:100%;
					position:absolute;
					bottom:0;
					left:0;
					-webkit-transform:scaleY(0.5);
					-moz-transform:scaleY(0.5);
					-ms-transform:scaleY(0.5);
					-o-transform:scaleY(0.5);
					transform:scaleY(0.5); 
					box-sizing:border-box;
					background-color:#E5E5E5;
				}
				input{
					width:100%;
					padding:0.38rem 0;
					border:0;
					font-size: 0.26rem;
					color:#333;
					&::-webkit-input-placeholder{
					    color: #ccc;
					}
				}
				p{
					color:#00ccb1;
				}
				span{
					position: absolute;
					right:0;
					display: block;
					width: 0.32rem;
					height:0.32rem;
					background: url(../../assets/images/close.png) no-repeat;
					background-size:0.32rem 0.32rem ;
				}
			}
			p{
				font-size:0.24rem;
				color:#999;
				line-height: 0.36rem;
				margin-top: 0.22rem;
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