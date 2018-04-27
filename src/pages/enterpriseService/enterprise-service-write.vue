<template>
	<div id="pageContainer" class="home-wrapping">
		<!-- <header-bar :title= "title" :isSearch="false"></header-bar> -->
		<newbie></newbie>
		<div class="sub-demand">
				<div class="service" v-if="pageObj.topFlag">
					<h2>{{data.servicePackageName}}</h2>
					<p class="project">{{data.servicePackageComb}}</p>
					<div class="content">
						<h4 ref="title" :class="pageObj.openFlag?'':'title'">{{data.servicePackageDescr}}</h4>
						<div v-if="pageObj.showFlag">
							<p :class="pageObj.openFlag?'open':''" @click="open">{{pageObj.openTxt}}</p>
						</div>	
					</div>
				</div>
				<div class="write-demand">
					<h3><span>填写信息</span></h3>
					<div class="explain">
					请完成下列需求填写列表，法义将根据您的需求为您匹配最合适的律师，律师将在三个工作日内与您取得联系，请保持电话畅通。
					</div>
					<div class="item name">
						<div>
							<p class="xue">您的称呼</p>
							<input type="text" placeholder="输入您的称呼"  @input="name()" ref="name" v-model="pageObj.userName"/>
						</div>
						<p class="name-result" ref="userNameResult"></p>
					</div>
					<div class="item phone">
						<div>
							<p class="xue">手机号码</p>
							<input type="text" placeholder="输入您的手机号"  @input="phone()" ref="phone" v-model="pageObj.phoneNum"/>
						</div>
						<p class="phone-result" ref="phoneResult"></p>
					</div>
					<div class="item company">
						<div>
							<p>公司名称</p>
							<input type="text" placeholder="输入您的公司名称" @input="company()" ref="company" v-model="pageObj.companyName"/>
						</div>
						<p class="company-result" ref="companyResult"></p>
					</div>
					<div class="item lawyer">
						<div>
							<p>律师地域</p>
							<input type="text" placeholder="点击选择律师地域" id='showUserPicker' class="mui-btn mui-btn-block" @click="choose()" v-model="pageObj.address"/>
						</div>
						<p class="name-result"></p>
					</div>
					<mt-popup v-model="popupVisible" position="bottom">
						<div class="pick-btn">
							<span @click="closePopup()">取消</span>
							<span @click="confirm()">确认</span>
						</div>
						<mt-picker :slots="slots" @change="oncityChange" :visible-item-count="5" :show-toolbar="false" valueKey="label" ></mt-picker>  
						<div class="cover"></div>
					</mt-popup>
					<div class="item question">
						<p>问题描述</p>
						<textarea  rows="5"  placeholder="简单描述下您的需求" @input="demand($event)"   v-model="pageObj.content"></textarea>
						<p ref="demandResult"></p>
					</div>
					<div class="btn">
						<button :class="pageObj.flag?'gray sub':''" ref="submit" @click="subAjax()">提交</button>
					</div>				
				</div>
			</div>		
	</div>
</template>
<style lang="less" scoped>
	@import '~@/pages/enterpriseService/enterprise-service-write.less';
</style>
<script>
	import { Toast } from 'mint-ui';
	export default {
		name:"enterpriseWrite",
		data:function(){
			return { 
				data:{},
				pageObj:{
					uuid:'',
					kind:'',
					userName:'',
					phoneNum:'',
					companyName:'',
					tem_address:'',
					address:'',
					content:'',
					flag:false,
					showFlag:false,
					openFlag:false,
					openTxt:'展开',
					topFlag:false,
					locations:[],
					isError:false,
					isPicker:true,
					lawyerId:'',
					bizType:'',
				},
				title : '',
				slots: [
					{
						flex: 1,
						values: [],
						className: 'slot1',
						textAlign: 'center'
					}
				],
				popupVisible:false

				
			}
		},
		mounted:function(){
			this.getInfo();	
		},
		methods: {
			/*获取初始化数据*/
			getInfo:function(){
				var that=this;
				let server="";
				
				that.pageObj.kind = that.$route.query.kind;
				if(that.pageObj.kind==1){
					that.title="提交法律需求";
					that.pageObj.uuid = that.$route.query.goodsId;
					that.pageObj.bizType = that.$route.query.bizType;
					let params={
						servicePackageUuid : that.pageObj.uuid
					}
					this.Api.lawyer.enterpriseServicewrite(params).then(result => {
						if (result && result.code == 1) {
							setTimeout(function(){  
								$(".sub-demand").show();
								if(that.$refs.title){
									var scrollHeight=that.$refs.title.scrollHeight;
									var clientHeight=that.$refs.title.clientHeight;
									console.log(scrollHeight+";"+clientHeight);
									if(scrollHeight==clientHeight){
										that.pageObj.showFlag=false;
									}else if(scrollHeight-clientHeight>10){
										that.pageObj.showFlag=true;
									}
								}
							},10);
							that.data=result.data;
							that.pageObj.userName=result.data.nickName;
							that.pageObj.phoneNum=result.data.phone;
							if(that.pageObj.userName&&that.pageObj.phoneNum){
								that.pageObj.flag=true;
							}
							that.pageObj.locations=result.data.locations;
							if(that.pageObj.uuid){
								that.pageObj.topFlag=true;
							}
						}
					});
				}else{
					that.title="定制服务";
					if(that.$route.query.lawyerId){
						that.pageObj.lawyerId = that.$route.query.lawyerId;
					}
					if(that.$route.query.bizType){
						that.pageObj.bizType = that.$route.query.bizType;
						that.pageObj.uuid = that.$route.query.goodsId;
					}
					this.Api.lawyer.enterpriseServicewrite().then(result => {
						if (result && result.code == 1) {
							$(".sub-demand").show();
							that.data=result.data;
							that.pageObj.userName=result.data.nickName;
							that.pageObj.phoneNum=result.data.phone;
							if(that.pageObj.userName&&that.pageObj.phoneNum){
								that.pageObj.flag=true;
							}
							that.pageObj.locations=result.data.locations;
						}
					});	
				}	
				that.$store.dispatch("setTitle",that.title);
			},
			/*校验用户名*/
			name:function(sub){
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
					if(value.length>=16){
						if(!sub){
							this.$refs.userNameResult.innerHTML="最多可输16个字符";
						}
						this.pageObj.userName=str.substring(0,16);
						this.$refs.name.blur();
						return true;
					}else{
						if(!sub){
						this.$refs.userNameResult.innerHTML="";
						}
						this.pageObj.userName=value;
						return true;
					}	 
				}
			},
			/*校验手机号*/
			phone:function(sub){
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
							console.log("等于11");	
							if(!sub){
							this.$refs.phoneResult.innerHTML="请输入正确的电话号码";
							}
							this.$refs.phone.blur();
							return false;
						}else if(value.length>11){
							console.log("大于11");	
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
							console.log("小于11");
							if(!sub){
							this.$refs.phoneResult.innerHTML="";
							}
							return false;
						}	        			
					}
				}
				
			},
			/*校验公司名称*/
			company:function(sub){
				if(!sub){
				this.submit();		        			
				}
				var value=this.$refs.company.value;
				var str=this.pageObj.companyName;
				if(!value){
					if(!sub){
						this.$refs.companyResult.innerHTML="";
					}
					return false;
				}else{
					if(value.length>=30){
						if(!sub){
							this.$refs.companyResult.innerHTML="最多可输30个字符";
						}
						this.pageObj.companyName=str.substring(0,30);
						this.$refs.company.blur();	        					
						return true;
					}else{
						if(!sub){
							this.$refs.companyResult.innerHTML="";		        					
						}
						return true;
					}	 
				}
			},
			/*校验需求*/
			demand:function(e){
				var value=e.target.value;
				var str=this.pageObj.content;
				if(value.length>=300){
					console.log("大于300");
					this.pageObj.content=str.substring(0,300);
					this.$refs.demandResult.innerHTML="最多可输300个字符";
					e.target.blur();
				}else{
					console.log("小于300");
					this.$refs.demandResult.innerHTML="";
				}
			},
			/*展开收起判断*/
			open:function(){
				if(this.pageObj.openFlag){
					this.pageObj.openTxt='展开';
					this.pageObj.openFlag=!this.pageObj.openFlag;
				}else{
					this.pageObj.openTxt='收起';
					this.pageObj.openFlag=!this.pageObj.openFlag;
				}
				
			},
			/*选择律师地域*/
			oncityChange:function(picker, values) {	
				let that = this;		
				if (values[0] > values[1]) {
					picker.setSlotValue(1, values[0]);
				}
				that.pageObj.tem_address = values[0];	
			},
			/*提交按钮*/
			submit:function(){
				if(this.name("sub")&&this.phone("sub")){
					this.pageObj.flag=true;
				}else{
					this.pageObj.flag=false;
				}
			},			
			choose:function(e){
				/*唤起选择律师地域*/
				let that = this;
				for(let i=0;i<that.pageObj.locations.length;i++){
					that.slots[0].values.push(that.pageObj.locations[i].name);
				}
				that.popupVisible = true;
			},
			closePopup:function(){
				/*关闭popup*/
				let that = this;
				that.popupVisible = false;
			},
			confirm:function(){
				// 确认城市
				let that = this;
				that.pageObj.address = that.pageObj.tem_address
				that.popupVisible = false;

			},
			/*提交数据*/
			subAjax:function(){	
				let that = this;
				let params={
					nickName : that.$refs.name.value,
					userMobile:that.$refs.phone.value,
					serviceId:that.pageObj.uuid,
					companyName:that.$refs.company.value,
					city:that.pageObj.address,
					demandDescr:that.pageObj.content,
					source:0
				}
				if(that.pageObj.bizType){
					params.bizType=that.pageObj.bizType;
				}
				if(that.pageObj.lawyerId){
					params.lawyerId=that.pageObj.lawyerId;
				}
				this.Api.lawyer.enterpriseServicesub(params).then(result => {
					if (result && result.code == 1) {
						this.$router.push({path:'/subSuccess'});
					}else{
						Toast({
							message: result.msg,
							position: 'bottom',
							duration: 3000
						});
					}
				});
				
			}
		},
	}
</script>
