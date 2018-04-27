<template>
	<div >
		<call-app></call-app>
        <fast-menu bottom="1.3rem"></fast-menu>
	    <header>
	        <div>
	            <span v-if="orderState.code!=11" v-html="state" :class="{color:orderState.code!=11}"></span>
	            <span v-if="orderState.code==11" v-html="state"></span>
	        </div>
	        <p class="roll-l">        	
	        </p>
	        <p class="roll-r">        	
	        </p>
	    </header>
	    <section class="section1 scaley-a">
	        <div class="scaley-b-b">
	            <label>服务名称</label>
	            <div class="text-overflow" id="text-overflow" @click="goodsName"> 
	            	<img :src="data.goodsImageUrl" alt="" class="goodsName"/>
	            	<div>
	            		<p v-html="data.goodsName" :class="{service:!data.specCombDesc}"></p>
						<p v-if="data.specCombDesc">{{data.specCombDesc}}</p>
	            	</div>
	            </div>
	        </div>
	        <div class="scaley-b-b">
	            <span class="price">服务价格</span>
	            <span class="text-overflow"  v-html="'¥'+(data.amount*1-data.govermentPrice*1).toFixed(2)"></span>
	        </div>
	        <div class="scaley-b-b guanfei" v-if="data.govermentPrice>0">
	            <label>官费</label>
	            <span class="text-overflow"  v-html="'¥'+data.govermentPrice"></span>
	        </div>
	       <div class="scaley-b-b coupon" @click="flag&&yhj()" v-if="orderState.code==10&&couponFlag">
	            <label>优惠券</label>
	            <span class="yhj text-overflow" id="yhj">{{$store.getters.couponInfo?$store.getters.couponInfo.couponNum:couponAmount}}  <img v-if="flag" src="~@/assets/images/Arrow.png"></span>
	        </div>
			
		   <div class="shifu-d" @click="" v-if="data.couponAmount&&orderState.code!=10">
	            <label class="shifu-l">优惠券</label>
	            <span class="yhj text-overflow">¥{{data.couponAmount}}</span>
	        </div>
	      <div class="shifu-d" @click="" v-if="data.couponAmount&&orderState.code!=10">
	            <label class="shifu-l">实付</label>
	            <span class="yhj text-overflow">¥{{data.totalPrice}}</span>
	        </div>
	    </section>
	    <section class="section2 scaley-b" v-if="data.lawyerName">
	        <div class="scaley-a-b" @click="lawyerUrl()">
	            <div class="scaley-b-b">
	                <span>服务提供方</span>
	            </div>
	            <div>
	                <img :src="data.lawyerImageUrl">
	                <div>
	                    <span v-html="data.lawyerName"></span>
	                    <span v-html="data.lawyerCompany"></span>
	                </div>
	              	<p class="call" @click.stop="seek()" v-if="(orderState.code==11||orderState.code==13)&&data.type.code==11">
						联系他
					</p>
	            </div>
	        </div>
	    </section>
		<!--<section :class="data.type.code==13?'service-box top':'service-box'" v-if="orderState.code==10">
			<h3>支付方式</h3>
			<form class="mui-input-group">
				<div class="mui-input-row mui-radio">
					<label>微信支付</label>
					<input name="radio1" type="radio" value="weixin" checked @click="payCheck($event)">
				</div>
				<div class="mui-input-row mui-radio">
					<label>支付宝支付</label>
					<input name="radio1" type="radio" value="Alipay" @click="payCheck($event)">
				</div>
				<div class="mui-input-row mui-radio">
					<label>银行卡支付</label>
					<input name="radio1" type="radio" value="tonglian" @click="payCheck($event)">
				</div>
			</form>
		</section>-->
	    <section class="section3">
	    	<div >
	    		 <label>订单编号:</label>
	            <span v-html="data.orderNo"></span>
	    	</div>
	    	<div v-if="data.createTime">
	            <label>订单生成时间:</label>
	            <span v-html="data.createTime"></span>
	        </div>
	    	<div v-if="(orderState.code>10)&&data.channelType">
	    		 <label>支付方式:</label>
	            <span v-html="data.channelType.value"></span>
	    	</div>
	        
	        <div v-if="data.payTime">
	            <label>支付时间:</label>
	            <span v-html="data.payTime"></span>
	        </div>
	        <div v-if="data.userSureTime">
	            <label>交付时间:</label>
	            <span v-html="data.userSureTime"></span>
	        </div>
	        <div v-if="data.expireTimeMillis">
	            <span v-html="expireTime" class="expireTime" v-if="data.type.code!=11"></span>
	            <span v-html="time" v-if="data.type.code==11" class="expireTime"></span>
	        </div>
	    </section>
	    <section id="section4" class="section4" >
	        <div class="imgs" id="imgsList">
	
	        </div>
	    </section>
	    <section class="section5" v-if="!data.commented&&orderState.code==14" >
	        <div @click="submitComment()" :class="{urgebcolor:orderState.code==9}">
	            <span>评价</span>
	        </div>
	    </section>
	  	<section class="section5" v-if="orderState.code==14||orderState.code==17||orderState.code==20" >
	        <div @click="deleteOrder()" :class="{urgebcolor:orderState.code==9}">
	            <span>删除</span>
	        </div>
	    </section>
	      <div class="accept" id="section6" v-if="(orderState.code==11||orderState.code==13)&&data.type.code!=11&&data.type.code!=13">
			<div @click="seek()"><img src="~@/assets/images/service.png" alt="" /><span>咨询</span></div>
			<div disabled @click="check($event)">确认验收</div>
		</div>
	    <div class="submitBtn" id="section6" v-if="orderState.code==10||orderState.code==15">
			<p>合计：<span>¥{{$store.getters.couponInfo&&$store.getters.couponInfo.flag?$store.getters.couponInfo.price:paid}}</span></p>
			<div id="submitBtn" type="submit" @click="orderExchange()" ref="pay">
				<span>立即支付</span>		
			</div>
		</div>
		<div class="first-order" v-if="firstOrder">
			<div class="content">
				<h1>首单返利</h1>
				<div class="number">恭喜你获得 <span>{{data.couponMoney}}</span> 元首单返利礼金</div>
				<div class="guide">
					<p>¥<span>{{data.couponMoney}}</span></p>
					<p>首单返</p>
				</div>
				<button class="look" @click="toPage">查 看</button>
				<p class="close" @click="close"></p>
			</div>
		</div>
	</div>
</template>

<script>
import { orderDetail } from '../../data/orderDetail.js';
	export default{
		data(){
			return {
				url:'',
                debug:'',
                imgId:0,
                data:'',
                couponState:'',
                paid:'',
                couponAmount:'',
                couponList:[],
                couponNo:'',
                couponId:'',
                couponState2:'',
                totalPrice:'',
                index:'',
                couponFlag:false,
                flag:true,
                clickFlag:true,
                time:'',
                orderNo:'',
                firstOrder:false,
                orderState:'',
                orderType:''
			}
		},
		computed:{
            /*剩余时间*/
            expireTime() {
                console.log("---------expireTime-------------");
                var shijiancha = this.data.expireTimeMillis;
                if(!shijiancha){
                    return "";
                }               
                	var days    = shijiancha / 1000 / 60 / 60 / 24;  
                    var daysRound   = Math.floor(days);
                    var hours    = shijiancha/ 1000 / 60 / 60 - (24 * daysRound);
                    var hoursRound   = Math.floor(hours);
                    var minutes   = shijiancha / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
                    var minutesRound  = Math.floor(minutes);
                    var seconds   = shijiancha/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
                    var str="";                 
                    if(daysRound>0){
                        str+= "剩余"+daysRound+"天";
                    }
                    if(hoursRound>0){
                        str+=hoursRound+"小时";
                    }
                    if(minutesRound>0){
                        if(daysRound&&hoursRound){

                        }else if(hoursRound){
                            str+=minutesRound+"分钟";
                        }else{
                            str+=minutesRound+"分钟";
                        }
                    }
                    if(!!str){
                        str+="自动关闭";
                    }
                    console.log(str,"============",shijiancha);
                    return str;
            },
            /*订单状态显示*/
            state() {
                var str=this.orderState.value||"状态异常";
                return str;
            },
            /*底部按钮名称显示*/
            btnText() {
                if(this.data.state.code==10){
                    return "确认支付";
                }else if(this.data.state.code==9){
                    return "等待律师确认价格";
                }else if(this.data.state.code==11){
                    return "确认验收";
                }else if(this.data.state.code==13){
                    return "确认验收";
                }else {
                    return "删除订单";
                }
            },
            /*价格*/
            price() {
                this.data.unit = "";
                if(this.data.state.code==9){
                    var str =  "￥"+this.data.priceStart+"-"+"￥"+this.data.priceEnd;
                    return str+"<span style='color: #333333'>元"+this.data.unit+"</span>";
                }else if(this.data.state.code==20){
                    if(this.data.priceConfirm==0){
                        return "￥"+this.data.priceStart+"<span style='color: #333333'>元"+this.data.unit+"</span>";
                    }else if(this.data.priceConfirm==1){
                        var str =  "￥"+this.data.priceStart+"-"+"￥"+this.data.priceEnd;
                        return str+"<span style='color: #333333'>元"+this.data.unit+"</span>";
                    }
                }else{
                    return "￥"+this.data.priceStart+"<span style='color: #333333'>元"+this.data.unit+"</span>";
                }
            }
        },
        mounted(){
        	this.$nextTick(()=>{
				this.$store.dispatch("setTitle","订单详情");
        		this.orderNo=this.$route.query.orderNo;
        		this.init();    
        	})
        },
        methods: {    
           	/*页面数据初始化*/
            init(arg) {
                var that = this;
                /*订单状态:9.待确定价格; 10.待付款; 11.已付款; 12.用户确认交付; 13.律师确认交付; 14.已完成(交易成功), 15.支付失败; 16.已评价; 20.已取消(交易失败)*/
                var data = {
                    orderNo:this.orderNo
                };
//             data=orderDetail;
                this.Api.order.orderDetail(data).then(data=>{
					if(data.code != 1) return;
                	that.couponState2=data.data.couponState;
                    if(data.code == 1){                        	
                        if(data.data.couponMoney){
                        	//首单
                        	this.firstOrder=true;
                       	}else{
                        	this.firstOrder=false;
                       	}
                        that.$data.data = data.data;
                        that.orderState=data.data.state;
                        that.orderType=data.data.type;
                        that.couponList=data.data.coupons;
                        that.totalPrice=data.data.amount*1;
	                    that.timer();
	                    //是否显示优惠券
//                      if(data.data.type.code==9||data.data.type.code==10||data.data.type.code==11||data.data.type.code==12||data.data.type.code==13){
//                      	that.couponFlag=true;
//                      }else{
//                      	that.couponFlag=false;
//                      }        
                        if(data.data.couponState==1){
                        	that.flag=false;
                        	that.couponAmount='¥'+data.data.couponAmount;                        	
                        	that.paid=(that.totalPrice-data.data.couponAmount).toFixed(2);
                        	if(that.paid<0){
                        		that.paid=0;
                        	}
                        }else if(data.data.couponState==3){                            	
                        	that.couponAmount="有可用优惠券";
                        	that.paid=that.totalPrice;
                        }else if(data.data.couponState==4){
                        	
                        	that.couponAmount="";
                        	that.paid=that.totalPrice;
                        }else if(data.data.couponState==2){
                        	that.couponAmount='-¥'+data.data.couponAmount;
                        	that.paid=(that.totalPrice-data.data.couponAmount).toFixed(2);
                        	if(that.paid<0){
                        		that.paid=0;
                        	}
                        }else{
                        	that.couponAmount="";
                        	that.paid=that.totalPrice;
                        }
                        if(that.$data.data.lawyerFiles&&that.$data.data.lawyerFiles.length>0){
                            for(var i=0;that.$data.data.lawyerFiles[i];i++){
                                that.allImg(that.$data.data.lawyerFiles[i]);
                            }
                        }
                        if(that.$data.data.memberFiles&&that.$data.data.memberFiles.length>0) {
                            for (var i = 0; that.$data.data.memberFiles[i]; i++) {
                                that.allImg(that.$data.data.memberFiles[i]);
                            }
                        }
                    }
                })
            },
            close(){
            	this.firstOrder=false;
            },
            toPage(){
				this.$router.push({path:'/myCoupon'});
			}, 
             /*咨询订单支付倒计时*/
           	timer(){
           		var that=this,minutes,seconds;
           		var allTime=that.data.expireTimeMillis;	
           		if(!allTime){
           			return ;
           		}					
           		minutes=Math.floor(allTime/1000/60);
				seconds=Math.floor(allTime/1000%60);
				that.time="剩"+minutes+":"+seconds+"分钟自动关闭";
           		var timer=setInterval(function(){
					if(allTime<1000){
						clearInterval(timer);
						mui.alert("支付超时","信息提示",function(){
							location.reload();
						})
					}else{
						allTime-=1000;		
						minutes=Math.floor(allTime/1000/60);
						seconds=Math.floor(allTime/1000%60);
						if(minutes<=0){
							minutes=0;
						}
						if(seconds<=0){
							seconds=0;
						}						
						that.time="剩"+minutes+":"+seconds+"分钟自动关闭";
						}
					},1000)
           	},
            /*服务详情*/
            goodsName () {
                console.log("--服务详情----------");
                var goodsId= this.data.goodsId;
                if(this.data.type.code!=11&&this.data.type.code!=13){
                 this.$router.push({path:"/serviceDetail",query:{
	         		'goodsId':goodsId,
	         		}});
               }
            },
            /*律师详情*/
            lawyerUrl() {
                this.$router.push({path:"/lawyerDetail",query:{
	         		'lawyerId':this.data.lawyerId,
                    'orderNo':this.data.orderNo
	         	}});
			},
            /*所有图片*/
            allImg(obj) {
                console.log("--所有图片----------");
                var base64 =obj.url;
                var id = obj.id;
                var html = '<div class="imgs-item"><div style="display: inline-block;"><img  class="img"  src="'+base64+'" data-id="'+id+'" data-preview-src="" data-preview-group="1"></div></div>';
                setTimeout(function () {
                    $("#imgsList").prepend(html);
                    mui.previewImage();
                },10);
            },
            /*发送所有状态请求*/
            send() {
                console.log("----发送请求------------"+this.data.state.code);
                var that = this,url,data;       
                if(this.data.state.code==14||this.data.state.code==20){
                    /*删除订单*/
                    url ="/order/delete-order"
                    data = {
                        orderNo:this.data.orderNo
                    };
                }else if(this.data.state.code==11||this.data.state.code==13){
                    /*待交付，待验收*/
                    console.log("---------确认验收------------");
                    url = "/order/user-finish-order"
                    data = {
                        orderNo:this.data.orderNo,
                    };
                }
                this.Api.order.changeOrder(data,url).then(res=>{
                	if(res.code != 1) return;
                	this.$router.push({path:"/orderList",query:{orderNo:this.data.orderNo}});
                })
            },
            /*删除订单*/
            deleteOrder() {
                var that = this;
                var btnArray = ['取消', '确认'];
				 mui.confirm('你确认要删除订单吗？', '', btnArray, function(e) {
                    if (e.index == 1) {
                        that.data.cancleOrder=1;
                        console.log("确认删除");
                        that.send();
                    } else {
                        that.data.cancleOrder=2;
                        console.log("取消删除");
                    }
                });
	        }, 
	        /*跳转评价页面*/
	        submitComment(){
	         	this.$router.push({path:"/orderComment",query:{
	         		orderUuid:this.data.orderNo,
	         		lawyerUuid:this.data.lawyerId
	         	}})
	         },
            /*支付金额小于0跳转*/
            paySucc(){
           	var that=this;
           		var params={
				'orderNo':that.data.orderNo,
				'amount':0,
				}
           		this.$router.push({path:'/paySuccess',query:params})
           },
           /*点击立即支付*/
           	orderExchange(){
           		mui.confirm('','抱歉~目前只支持APP内支付，可打开APP去支付',['取消', '确认'],function(e){
					if(e.index==1){
					lz.util.openApp({
			            button: document.querySelector(".mui-popup-button-bold"),// 按钮
			            androidLink: 'fyscheme://fyapp/open/article',// 安卓的打开链接
			            androidDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.hhly.lawyeru",// 安卓的下载链接
			            androidYyb: false,// android 是否开启应用宝下载
			         	iosLink:'http://iosuser.fy13322.com/h5user/share/openApp.html',// ios 打开链接
			            ios9Link:'http://iosuser.fy13322.com/h5user/share/openApp.html',// ios 的Universal Link
			            iosDownloadUrl: "https://itunes.apple.com/cn/app/id1144040243?mt=8", // ios 的下载链接
			            iosUniversalLinkEnabled: true, // 是否开启 Universal Link
			            iosYyb: true,// ios 是否开启应用宝下载
			            yybDownloadUrl: "https://itunes.apple.com/cn/app/id1144040243?mt=8",// 应用宝下载链接
			            autoLaunchApp: false, // 是否打开页面就唤起APP
			            autoRedirectToDownloadUrl: true,// 是否自动跳转到下载页面
			     	},false);
					}
				});
//         		var that=this; 
//         		 (that.$refs.pay).setAttribute("class","btn-pay");
//              setTimeout(function(){
//              	(that.$refs.pay).setAttribute("class","");
//              },300)
//              var data={
//              	orderNo:that.data.orderNo,
//              	couponCode:that.couponNo,
//              	couponReceiveUuid:that.couponId
//              };
//              if(that.couponState2==1){
//              	if(that.paid>0){
//              		that.pay();
//              	}else{
//              		that.paySucc();               		
//              	}                    	
//              }else{     
//              	if(that.data.orderNo&&that.$store.getters.couponInfo.flag&&that.clickFlag){
//              		this.Api.order.bindCoupon(data).then(res=>{
//              			if(res.code != 1) return;
//              			that.flag=false;
//	                		that.clickFlag=false; 
//	                    	console.log("绑定成功");
//	                    	if(res.data.totalPrice>0){
//	                			console.log("支付金额大于0 进去支付页面"); 
//	                			that.pay();
//		                	}else{
//		                		console.log("支付金额小于0");
//		                		that.paySucc();			                
//		                	}  
//              		});
//              	}else{
//              		if(that.paid>0){
//              			that.pay();
//                  	}else{
//                  		that.paySucc();
//                  	}  
//              	}	                    	
//              }                   
           	},
           	 /*调支付接口*/
            pay() {
                var that = this;
                console.log("---------立即支付-------------"+that.couponState2);                  
                var type = that.data.type;
                var orderNo = that.data.orderNo;
                var createTime = that.data.createTime;
                var userName=that.data.lawyerName;
                var logo=that.data.lawyerImageUrl;
                var lawyerId=that.data.lawyerId;
                var playType=that.playType;
                var targetRoleType=that.data.targetRoleType;
                var amount ;
                if(that.$store.getters.couponInfo&&that.$store.getters.couponInfo.flag){
                	amount=that.$store.getters.couponInfo.price;
                }else{
                	amount=that.paid;
                }
                var params={
                		'orderNo':orderNo,
                		"amount":amount,
                		"type":type,
                		"createTime":createTime,
                		'userName':userName,
                		'logo':logo,
                		"lawyerId":lawyerId,
                		"targetRoleType":targetRoleType
                	}
            },
            /*确认交付，确认验收*/
            check(e) {
                console.log("---------确认验收-------------");
                var that = this;
                var btnArray = ['取消', '确认'];
                e.target.setAttribute("class","btn-touch");
                setTimeout(function(){
                	e.target.setAttribute("class","");
                },300)
                mui.confirm('你确认要验收吗？', '', btnArray, function(e) {
                    if (e.index == 1) {
                        that.data.cancleOrder=1;
                        console.log("确认确认验收");
                        that.send();
                    } else {
                        that.data.cancleOrder=2;
                        console.log("取消确认验收");
                    }
                });
            },
            /*咨询*/
            seek() {
                /*调原生咨询接口*/
               mui.confirm('','快速咨询功能暂时只在APP开发，是否打开APP?',['取消', '确认'],function(e){
					if(e.index==1){
					lz.util.openApp({
			            button: document.querySelector(".mui-popup-button-bold"),// 按钮
			            androidLink: 'fyscheme://fyapp/open/article',// 安卓的打开链接
			            androidDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.hhly.lawyeru",// 安卓的下载链接
			            androidYyb: false,// android 是否开启应用宝下载
			         	iosLink:'http://iosuser.fy13322.com/h5user/share/openApp.html',// ios 打开链接
			            ios9Link:'http://iosuser.fy13322.com/h5user/share/openApp.html',// ios 的Universal Link
			            iosDownloadUrl: "https://itunes.apple.com/cn/app/id1144040243?mt=8", // ios 的下载链接
			            iosUniversalLinkEnabled: true, // 是否开启 Universal Link
			            iosYyb: true,// ios 是否开启应用宝下载
			            yybDownloadUrl: "https://itunes.apple.com/cn/app/id1144040243?mt=8",// 应用宝下载链接
			            autoLaunchApp: false, // 是否打开页面就唤起APP
			            autoRedirectToDownloadUrl: true,// 是否自动跳转到下载页面
			     	},false);
					}
				});
            },
            /*优惠券*/
            yhj() {
            	var that=this;
                if(this.data.couponState==3||this.data.couponState==4){
                	var couponList=JSON.stringify(this.couponList);
                	var priceStart=this.data.priceStart;
                	var params={
                		'orderNo':that.data.orderNo,
                		'index':that.$store.getters.couponInfo.index,
                		'orderMoney':that.totalPrice,
                		'serverId':that.data.goodsId
						};
                	console.log(params);
                	this.$router.push({path:"/orderCoupon",query:params});
                }
            }
        }
	}
</script>
<style>
.mui-popup-button{
  	color:#00ccb1;
  }
.mui-checkbox label, .mui-radio label{
	float: left;
}
</style>
<style lang="less" scoped>
@import "~@/pages/order/order-detail.less";
</style>