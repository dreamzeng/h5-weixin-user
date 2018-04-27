<template>
	<div class="user-coupon">
		<div>
			<div class="couponGuide" @click="toGuide">优惠券说明</div>
			<div class="exchange">
				<input type="text" placeholder="请输入兑换码，领取优惠券" class="code" @input="input" v-model="pageObj.msg"/>				
				<p id="exchange-btn" @click="exchange">兑换</p>
				<div class="clear" v-show="pageObj.clearFlag" @click="clear"></div>		
			</div>
			<div class="line"></div>		
		</div>
			
		<div class="wrapper">
			<ul class="section">
				<li v-for="(item,index) in list" v-if="item.usable" ref="coupon" @click="check(index,item.couponType,item.maxDiscountMoney,item.receiveUuid,item.couponCode)">
					<div class="price" v-if="item.fixMoney">¥<span v-cloak ref="price">{{item.fixMoney}}</span></div>
					<div class="price" v-if="!item.fixMoney"><span v-cloak ref="price">{{item.discountRate}}</span>折</div> 
					<div class="info">
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
		<div class="empty">
			暂无可用的优惠券~
		</div>
	</div>	
</template>

<script>
import { orderDetail } from '../../data/orderDetail.js';
import { exchange } from '../../data/exchange.js';
import { Toast } from 'mint-ui';
	export default{
		data(){
			return {
				list:[],
            	appObj:{},
            	pageObj:{
            		msg:'',
            		orderNo:'',
            		orderMoney:'',
            		serverId:'',
					clearFlag:false,
            		priceStart:'',
            		type:null
            	},
            	index:''
			}
		},
		mounted:function(){
			this.pageObj.orderNo=this.$route.query.orderNo;
			this.pageObj.orderMoney=this.$route.query.orderMoney;
			this.pageObj.serverId=this.$route.query.serverId;
			this.index=this.$route.query.index;
	      	this.init();
        },
        methods: {
        	init:function(){
        		var that=this;
	   			var data={orderNo:this.pageObj.orderNo}
	   			var res=orderDetail;
//	   			this.Api.order.orderDetail(data).then(res=>{
					if(res.code != 1) return;
	   				that.pageObj.priceStart=res.data.amount*1;
	   				that.pageObj.type=res.data.type.code;
	   				if(res.data.coupons&&res.data.coupons.length>=1){
	   					$(".empty").hide();
	   					that.list=res.data.coupons;
	   					setTimeout(function(){
	   						if(typeof  that.index !="undefined"&& that.index!==""){
						    	$(".section li").eq( that.index).addClass("item-active");
						    	$(".section li").eq( that.index).siblings().removeClass("item-active");
						    }else{
						    	$(".section li").removeClass("item-active");
						    }	
	   					},10)
	   					
	   				}else{
	   					$(".empty").show();
	   				}
//	   			});
			},
			//兑换优惠券
   			exchange:function(){
	           var data={
	           		orderMoney:this.pageObj.orderMoney,
	           		serverId:this.pageObj.serverId,
	           		orderType:this.pageObj.type
	           }
   				var that=this;
   				if(that.pageObj.msg){
   					that.msg="";
   					var res=exchange;
// 					this.Api.order.exchangeCoupon(data,this.pageObj.msg).then(res=>{
						if(res.code != 1) return;
   						that.input();
   						if(res.data.usable){
   							that.list.unshift(res.data);
   							$(".empty").hide();
   							if(typeof that.index !="undefined"&& that.index!==""){
		   					 	 that.index+=1;
		   					 }
   							console.log(that.index);
   							setTimeout(function(){
		   						if(typeof  that.index !="undefined"&& that.index!==""){
							    	$(".section li").eq(that.index).addClass("item-active");
							    	$(".section li").eq(that.index).siblings().removeClass("item-active");
							    }else{
							    	$(".section li").removeClass("item-active");
							    }	
		   					},10)
   						}else{
							mui.alert('优惠券兑换成功，但该优惠券不可用于此订单，您可在“个人中心-优惠券”查看此优惠券', '提示', function(){});
   						}
// 					});
   				}else{
   					this.layer("请输入兑换码");
   				}
   				
   			},
   			check:function(num,couponType,maxDiscountMoney,couponId,couponNo){
   				var that=this;
   				this.index=num;
   				var className=this.$refs.coupon[ this.index].getAttribute("class");
				$(".section li").removeClass("item-active");
   				if(className==""||typeof className=="undefined"||className==null){
   					this.$refs.coupon[ this.index].setAttribute("class","item-active");
   					var obj={
   						index: this.index,
   						couponId:couponId,
   						couponNo:couponNo,
   						flag:true
   					}
   					var couponPrice=this.$refs.price[ this.index].innerHTML;
   					if(couponType==1){	
						obj.couponNum=this.pageObj.priceStart-(this.pageObj.priceStart*couponPrice)/10;
						console.log("原价"+this.pageObj.priceStart+"优惠钱："+obj.couponNum+"最大抵扣： "+maxDiscountMoney);
						if((obj.couponNum*1)>(maxDiscountMoney*1)){		   						
							obj.couponNum=maxDiscountMoney;
						}						
					}else{
						obj.couponNum=couponPrice;
						
					}
					obj.price=(this.pageObj.priceStart-obj.couponNum).toFixed(2);
					that.$store.dispatch('setCouponInfo',JSON.stringify(obj));
   					setTimeout(function(){
						that.$router.go(-1);
					},500)		    	
					return ;
   				}else{
   					var obj={
   						index:'',
   						couponId:'',
   						couponNo:'',
   						flag:false,
   						couponNum:'有可用的优惠券'
   					};
					that.$store.dispatch('setCouponInfo',JSON.stringify(obj));
   				}
   			},
			input:function(){
				if(this.pageObj.msg.length>=1){
					this.pageObj.clearFlag=true;
				}else{
					this.pageObj.clearFlag=false;
				}
			},
			//清空输入框
			clear:function(){
				this.pageObj.msg="";
				this.input();
			},
			//弹出框
			layer:function(content){
				Toast({
				  message: content,
				  position: 'bottom',
				  duration: 1000
				});
			},
			toGuide(){
				console.log("优惠券说明")
				this.$router.push({path:'/couponGuide'});
			}
        }
	}
</script>

<style lang="less" scoped>
@import '~@/pages/order/order-coupon.less';
</style>