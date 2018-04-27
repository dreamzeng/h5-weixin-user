<template>
	<div id="pageContainer">
		<call-app></call-app>
		<div class="write-info">
			<div class="explain">
			律师收到您的信息后会及时主动联系您，与您沟通需求，为您提供满意服务。
			</div>
			<div class="item name">
				<p>您的称呼</p>
				<input type="text" placeholder="输入您的称呼"  @input="name()" ref="name" v-model="pageObj.userName"/>
				<p class="name-result" ref="userNameResult"></p>
			</div>
			<div class="item phone">
				<p>手机号</p>
				<input type="text" placeholder="输入您的手机号"  @input="phone()" ref="phone" v-model="pageObj.phoneNum"/>
				<p class="phone-result" ref="phoneResult"></p>
			</div>
			<div class="btn">
				<button :class="pageObj.flag?'gray sub':''" ref="submit" @click="subAjax">提交</button>
			</div>				
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				data:[],
            	appObj:{},
            	pageObj:{
            		userName:'',
            		phoneNum:'',
            		flag:false
            	}
			}
		},
		methods: {
        	/*校验用户名*/
        	name(sub){
        		if(!sub){
        		this.submit();		        			
        		}
        		var value=this.$refs.name.value;
        		var str=this.pageObj.userName;
        		if(!value){
        			if(!sub){
        				this.$refs.userNameResult.innerHTML="";
        			}
        			return false;
        		}else{
        			if(value.length>=11){
        				if(!sub){
    						this.$refs.userNameResult.innerHTML="最多可输11个字符";
        				}
    					this.pageObj.userName=str.substring(0,11);
						this.$refs.name.blur();
        				return true;
        			}else{
        				if(!sub){
        				this.$refs.userNameResult.innerHTML="";
        				}
        				return true;
        			}	 
        		}
        	},
        	/*校验手机号*/
        	phone(sub){
        		if(!sub){
        		this.submit();		        			
        		}
        		var value=this.$refs.phone.value;
        		var phonereg=/^1[3|4|5|8|7][0-9]{9}$/;
        		var str=this.pageObj.phoneNum;
        		if(!value){
        			return false;
        		}else{
        			if(phonereg.test(value)){
        				if(!sub){
    					this.$refs.phoneResult.innerHTML="";
    					}
						this.$refs.phone.blur();
    					return true;
	        		}else{
	        			if(value.length==11){
        					if(!sub){
	        				this.$refs.phoneResult.innerHTML="请输入正确的电话号码";
	        				}
							this.$refs.phone.blur();
	        				return false;
	        			}else if(value.length>11){
        					if(!sub){
	        					this.$refs.phoneResult.innerHTML="最多可输11个字符";
	        				}
        					this.pageObj.phoneNum=str.substring(0,11);
							this.$refs.phone.blur();
							if(phonereg.test(this.pageObj.phoneNum)){
	        					return true;
			        		}else{
	        					return false;
			        		}
	        			}else{
        					if(!sub){
	        				this.$refs.phoneResult.innerHTML="";
	        				}
        					return false;
	        			}	        			
	        		}
        		}
        		
        	},
        	/*提交按钮*/
        	submit(){
        		if(this.name("sub")&&this.phone("sub")){
        			this.pageObj.flag=true;
        		}else{
        			this.pageObj.flag=false;
        		}
        	},
        	/*提交数据*/
        	subAjax(){
        		var name=this.$refs.name.value;
        		var phone=this.$refs.phone.value;
        		var goodsId=this.$route.query.goodsId;
        		var lawyerId=this.$route.query.lawyerId;
        		var data={
        			nickName:name,
        			userMobile:phone,
        			source:0
        		}
        		if(goodsId){
        			data.goodsId=goodsId;
        		}
        		if(lawyerId){
        			data.lawyerId=lawyerId;
        		}
   				this.Api.lawyer.enterpriseServicesub(data).then(res=>{
                	if(res.code != 1) return;
   					this.$router.push({path:"/subSuccess"});
   				})
        	}
        }
	}
</script>

<style lang="less" scoped>
@import '~@/pages/enterpriseService/write-info.less';;
</style>