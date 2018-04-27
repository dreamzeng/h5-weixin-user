<template>
	<div id="my-coupon" v-if="container" class="my-coupon">
		<newbie></newbie>
		<div>
			<div class="couponGuide" @click="toGuide">优惠券说明</div>
			<div class="exchange">
				<input type="text" placeholder="请输入兑换码，领取优惠券" class="code" @input="input" v-model="msg"/>				
				<p id="exchange-btn" @click="exchange">兑换</p>
				<div class="clear" v-show="clearFlag" @click="clear"></div>			
			</div>
			<div class="line"></div>
		</div>
		<div class="wrapper">
			<div v-if="!empty">
				<coupon-list  :list="couponList" ></coupon-list>
			</div>
		<div class="failure" v-if="!empty&&useCoupons">
			<div class="failure-btn" v-if="btnFlag" @click="changeFlag">查看失效券</div>	
			<div class="failured" v-if="!btnFlag">已失效的优惠券</div>
			<ul class="couponList"  v-if="!btnFlag">
				<li :class="item.useStatus==3||item.useStatus==1?'overdue':'used'" v-for="item in couponList" v-if="item.usable==false">
					<div class="price" v-if="item.fixMoney">¥<span v-cloak>{{item.fixMoney}}</span></div>
					<div class="price" v-if="!item.fixMoney"><span v-cloak>{{item.discountRate}}折</span></div> 
					<div class="info" >
						<p class="title">优惠券</p>
						<p>
							<span v-if="item.fixMoney" v-cloak><span v-html="item.limitMoney?'满'+item.limitMoney+'元可用':'无使用条件限制'"></span></span>
							<span v-if="item.discountRate"><span v-html="item.maxDiscountMoney?'最大抵扣'+item.maxDiscountMoney+'元':'无使用条件限制'"></span></span>								
						</p>
						<p class="service" v-cloak>可适用服务：{{item.serverNames}}</p>
						<p v-cloak>有效期：{{item.validityPeriod}}</p>
					</div>
				</li>				
			</ul>
			</div>
		</div>
		<div class="empty" v-if="empty" >
			暂无优惠券~
		</div>
	</div>	
</template>

<script>
import { Toast } from 'mint-ui';
import couponList from './couponList.vue';
	export default {
		components: {
	    'coupon-list': couponList
	    },
		data(){
            return { 
            	btnFlag:true,
				msg:"",
				clearFlag:false,
				couponList:[],
				debug:"",
				userId:"",
				empty:false,
				container:false,
				useCoupons:false,
				isError:false
            }
        },
        mounted(){
        	this.getCoupons();
        },
        methods: {
        	changeFlag(){
				this.btnFlag=!this.btnFlag;
			},
			//获取优惠券列表
			getCoupons(){	
   				var that=this;
   				this.Api.order.couponList().then(res=>{
                	if(res.code != 1) return;
   					that.container=true;   				
					that.couponList=res.data;
					console.log(that.couponList.length);
					if(that.couponList.length<=0){
						that.empty=true;
					}else{
						that.empty=false;
						for(var i=0;i<that.couponList.length;i++){
							if(that.couponList[i].usable==false){
								that.useCoupons=true;
								return;  
							}else{
							 	that.useCoupons=false;
							}
						}  							
					}
   				});
   			},
			//兑换优惠券
   			exchange(){
   				var that=this;
   				if(that.msg){
   					this.Api.order.exchangeCoupon(that.msg).then(res=>{
                		if(res.code != 1) return;
   						that.input();
   						that.couponList.unshift(res.data);	
   						that.changeFlag();	 
   						if(that.couponList.length<=0){
							that.empty=true;
  						}else{
  							that.empty=false;	  														
  						}
   					});
   				}else{
   					this.tip("请输入兑换码");
   				}
   				
   			},
			input(){
				if(this.msg.length>=1){
					this.clearFlag=true;
				}else{
					this.clearFlag=false;
				}
			},
			//清空输入框
			clear(){
				this.msg="";
				this.input();
			},
			//弹窗提示
			tip(val){
				Toast({
				  message: val,
				  position: 'bottom',
				  duration: 1000
				});
			},
			toGuide(){
				console.log("优惠券说明")
				this.$router.push({path:'/couponGuide'});
			}
        },
    
	}
</script>

<style lang="less" scoped>
@import "~@/pages/order/my-coupon.less";
</style>