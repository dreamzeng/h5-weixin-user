<template>
	<div class="changePsd">
		<div class="old">
			<input type="password" placeholder="请输入原密码" maxlength="16" @input="psd(3)" @blur="psdTest(3,true)"  v-model="psd3"/>
			<span v-if="flag3" @click="clear(3)"></span>
		</div>
		<ul>
			<li>
				<input type="password" placeholder="请输入新密码" maxlength="16" @input="psd(1)" @blur="psdTest(1,true)"  v-model="psd1"/>
				<span v-if="flag1" @click="clear(1)"></span>
			</li>
			<li>
				<input type="password" placeholder="请再次确认新密码" maxlength="16" @input="psd(2)" @blur="psdTest(2,true)"  v-model="psd2"/>
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
export default{
		name:"setPassword",
		data(){
			return {
				oldPad:"xiao1234",
				psd1:'',
				psd2:'',
				psd3:'',
				flag1:false,
				flag2:false,
				flag3:false,
				btnFlag:false
			}
		},
		mounted(){
			this.$nextTick(()=>{
			})
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
				}else if(type==2){
					length=this.psd2.length;
					if(length>0){
						this.flag2=true;
					}else{
						this.flag2=false;
					}
				}else{
					length=this.psd3.length;
					if(length>0){
						this.flag3=true;
					}else{
						this.flag3=false;
					}
				}
				if(this.psdTest(1)&&this.psdTest(2)&&this.psdTest(3)){
					this.btnFlag=true;
				}else{
					this.btnFlag=false;
				}
				
			},
			clear(type){
				if(type==1){
					this.psd1="";
					this.flag1=false;
				}else if(type==2){
					this.psd2="";
					this.flag2=false;
				}else{
					this.psd3="";
					this.flag3=false;
				}
			},
			psdTest(type,flag){
				var reg=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/
				var val;
				if(type==1){
					val=this.psd1;
				}else if(type==2){
					val=this.psd2;
				}else{
					val=this.psd3;
				}
				if(type==3){
					if(val.length>0){
						return true;
					}else{
						if(flag){
							this.tip("原密码不能为空");
						}
						return false;
					}
				}else{
					if(reg.test(val)){
						return true;
					}else{
						if(flag){
							this.tip("密码长度在6-15位，密码应包含数字、英文字母、特殊字符中的两种或以上");
						}
						return false;
					}
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
		      if(this.psd1==this.psd2){
		      	let params={
		      		user:this.$store.getters.phone,
		      		type:'2',
		      		newPwd:md5.hex_md5(this.psd2),
		      		oldPwd:md5.hex_md5(this.psd3)
		      	}
		      	console.log(params);
		      	this.Api.login.changePsd(params).then(res=>{
                	if(res.code != 1) return;
					this.$router.go(-1);
				});
		      }else{
		      	this.tip("两次密码输入不一致");
		      }
		    }
		}
	}
</script>

<style lang="less" scoped>
	.changePsd{
		width:100%;
		height:100%;
		background: #fff;
		font-size: 0.26rem;
		input{
			width:100%;
			padding:0.22rem 0;
			border:0;
			font-size: 0.26rem;
			color:#333;
			&::-webkit-input-placeholder{
			    color: #ccc;
			}
		}
		.old{
			width: 100%;
			height:1.04rem;
			position:relative;
			padding:0.38rem 0.4rem;
			display: flex;
			justify-content:space-between;
			align-items: center; 
			border-top:0.24rem solid #f2f3f5;
			border-bottom:0.24rem solid #f2f3f5;
			position: relative;
			span{
				position: absolute;
				right:0.4rem;
				display: block;
				width: 0.32rem;
				height:0.32rem;
				background: url(../../assets/images/close.png) no-repeat;
				background-size:0.32rem 0.32rem ;
			}
		}
		ul{
			width: 100%;
			padding:0 0.4rem ;
			li{
				width: 100%;
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
					padding:0.38rem 0;
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