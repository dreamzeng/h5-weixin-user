<template>
	<ul>
		<li>
			<input type="text" placeholder="请输入手机号码" maxlength="11" @input="phone()" ref="phone" v-model="phoneVal" v-if="!phoneFlag"/>
			<input type="text" disabled  ref="input" v-if="phoneFlag"/>
			<p @click="codeFlag&&getCode()">{{codeText}}</p>
			<span v-if="flag" @click="clear()"></span>
		</li>
		<li>
			<input type="text" placeholder="请输入验证码" @input="code()" ref="code" v-model="codeVal"/>
		</li>
		<div class="shadow" v-if="boxFlag"></div>
		<div class="imgBox" v-if="boxFlag">
			<p>请按照图形输入验证码</p>
			<div id="changeImg">
				<input type="text" @input="imgCodeIn()" v-model="imgCode" maxlength="4" v-focus/>
				<img :src="imgSrc" alt="" @click="getVerifyCode()"/>
			</div>
		</div>
	</ul>
</template>

<script>
import { Toast } from 'mint-ui';
import {getURL} from '@/lib/Ajax';
export default {
	name:"verify",
	props:{
	   type:{
	   		type:String,
	   		default:''
	   },
	   phoneFlag:{
	   		type:String,
	   		default:''
	   }
	},
	data(){
		return {
			flag:false,
			codeText:'获取验证码',
			lengthOld:0,
			codeFlag:true,
			codeVal:'',
			phoneVal:'',
			imgCode:'',
			imgSrc:'',
			boxFlag:false
		}
	},
	directives: {
	    focus: {
	        // 指令的定义
	        inserted: function (el) {
	            el.focus()
	        }
	    }
	 },
	mounted(){
	 	console.log(getURL());
		if(this.phoneFlag){
			this.$refs.input.value=this.$store.getters.phone.substring(0,3)+"****"+this.$store.getters.phone.substring(7);
			this.phoneVal=this.$store.getters.phone;
		}
	},
	methods:{
		//校验图形码
		imgCodeIn(){
			if(this.imgCode.length==4){
				this.checkImageCode();
			}
		},
		//校验手机号
		phone(flag,type){
			if(this.phoneFlag){
				return true;
			}
			if(!flag){
				this.sub();
			}
			var length=this.phoneVal.length;
			if(length>this.lengthOld){
				if(length===3||length===8){
					this.phoneVal+="";
				}
			}
			this.lengthOld=length;
			var value=this.phoneVal;
			var phonereg=/^1[3|4|5|8|7][0-9]{9}$/;
			if(length>0){
				this.flag=true;
				if(length==11){
					value=value.replace(/\s+/g, "");
					if(phonereg.test(value)){
						return true;
					}else{
						this.tip("请输入正确的手机号");
						return false;
					}
				}else{
					if(type=="code"){
						this.tip("手机号必须为11位");
						return false;
					}
				}
			}else{
				this.flag=false;
				this.tip("手机号不能为空");
				return false;
			}
		},
		//校验验证码是否为空  
		code(flag){
			if(!flag){
				this.sub();
			}
			var value=this.$refs.code.value;
			if(value.length>0){
				return true;
			}else{
				return false;
			}
		},
		//校验手机号和验证码
		sub(){
			console.log(this.code(true))
			if(this.phone(true)&&this.code(true)){
				this.$parent.btnFlag=true;
			}else{
				this.$parent.btnFlag=false;
			}
		},
		//弹窗提示
		tip(val){
			Toast({
			  message: val,
			  position: 'bottom',
			  duration: 2000
			});
		},
		//清除输入框
		clear(){
			this.phoneVal='';
			this.flag=false;
			this.$parent.btnFlag=false;
		},
		//获取图形验证码
		getVerifyCode(){
			var that=this;
			if(this.phone(true,'code')){
				this.boxFlag=true;
				var url=getURL()+"/getVerifyCode?key="+this.phoneVal+"&count=4";
	            var xhr = new XMLHttpRequest();
	            xhr.open("get", url, true);
	            xhr.responseType = "blob";
	            xhr.onload = function() {
	                if (this.status == 200) {
	                    var blob = this.response;
	                    that.imgSrc= window.URL.createObjectURL(blob);
	                } };
	            xhr.send();
			}
            
		},
		//校验图像码
		checkImageCode(){
			let param={
				user:this.phoneVal,
				code:this.imgCode,
				type:this.type
			}
			
			this.Api.login.checkImageCode(param).then(res=>{
				if(res.code!=1) return;
				this.getCode();
				this.boxFlag=false;
				this.time();
			})
		},
		time(){
			let that=this;
			let time=60;
			this.codeText="60 s";
			var timer=setInterval(function(){
				if(time<=0){
					clearInterval(timer);
					that.codeText="重新获取";
					that.codeFlag=true;
					return;
				}else{
					that.codeFlag=false;
				}
				time-=1;
				that.codeText=time+" s";
			},1000);
		},
		//获取验证码
		getCode(){
			let that=this;
			if(that.phone(true,'code')){
				let params={
					user:this.phoneVal,
					type:this.type
				}
				console.log(params);
				this.Api.login.getCode(params).then(res=> {
					if(res.code== -1){
						this.getVerifyCode();
					}else if(res.code==1){
						this.time();
					}
			    });
			}
		}
	}
}
</script>

<style lang="less" scoped>
	ul{
		z-index: 1;
		width:100%;
		padding: 0 0.4rem;
		position: relative;
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
				width:70%;
				padding:0.38rem 0;
				border:0;
				font-size: 0.26rem;
				color:#333;
				background:#fff;
				&::-webkit-input-placeholder{
				    color: #ccc;
				}
			}
			p{
				color:#00ccb1;
			}
			span{
				position: absolute;
				right:1.8rem;
				display: block;
				width: 0.32rem;
				height:0.32rem;
				background: url(../../assets/images/close.png) no-repeat;
				background-size:0.32rem 0.32rem ;
			}
		}
		.shadow{
			width:100%;
			height:100%;
			background: rgba(0,0,0,0.4);
			position: fixed;
			top:0;
			left:0;
			bottom:0;
			z-index: 1;
		}
		.imgBox{
			width:5rem;
			height:2.5rem;
			background: #fff;
			border-radius: 0.1rem;
			position: fixed;
			top:0;
			bottom: 0;
			left:0;
			right: 0;
			margin: auto;
			z-index:2;
			padding: 0.4rem 0.5rem;
			p{
				color:#666;
				font-size: 0.3rem;
				text-align: center;
			}
			#changeImg{
				width:100%;
				height:0.6rem;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 0.4rem;
				img{
					width:40%;
					height:100%;
				}
				input{
					color:#666;
					width:40%;
					height:100%;
					background: #e5e5e5;
					border:0;
					padding-left: 0.1rem;
				}
			}
		}
	}
</style>