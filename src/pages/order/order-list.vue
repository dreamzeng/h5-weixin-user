<template>
	<div class="mui-content">
		<newbie></newbie>
        <fast-menu bottom="1.3rem"></fast-menu>
        <div id="slider" class="mui-slider mui-fullscreen">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted" v-if="pageObj.type==3">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active"   :index="1" >   
                                                全部
                    </a>
                    <a class="mui-control-item"   :index="2" >
                       	待付款
                    </a>
                    <a class="mui-control-item"   :index="3" >
                                                待交付
                    </a>
 					<a class="mui-control-item"  :index="4" >
                                                待验收
                    </a>
                    <a class="mui-control-item" :index="7">
                                                待评价
                    </a>
                </div>
            </div>
            <div class="mui-slider-group">
                <div id="item1mobile" class="mui-slider-item mui-control-content mui-active">
                    <vertical-scroll 
						ref="scroll"
						:data="data"
						:scrollbar="scrollbarObj"
						:pullUpLoad="pullUpLoadObj"
						@pullingUp="onPullingUp">
						<div slot="listContent">
                            <div class="no-order hide" v-if="pageObj.emptyFlag" style="display: block;">
                                <p>还没有订单消息</p> 
                            </div> 
                            <div class="mui-table-wrap" type=1 v-if="data.length>0">
                                <ul class="mui-table-view " v-for="(item,index) in data" :key="index">
                                	<div class="order-tit">
                                     	<span class="order-date ">{{item.createTime}}</span>
                                     	<span class="order-type wait-pay" v-html="stateVal(item.state.code,item.state.value,item.type.code)" v-if="pageObj.type!=4"></span>
                                     	<span class="order-type wait-pay" v-html="lineStateVal(item.orderStatus)" v-if="pageObj.type==4"></span>
                                	</div>
                                    <li class="order-item" @click="jump(item.orderNo,index)">
                                    	<a href="javascript:;">
		                                    <em class="loading">
		                                    	<i class="mui-spinner"></i>
		                                    	<img class="mui-media-object mui-pull-left" :src="item.goodsImageUrl" v-if="pageObj.type!=4">
		                                    	<img class="mui-media-object mui-pull-left" :src="item.goodsUrl" v-if="pageObj.type==4">
		                                    </em>
	                                    	<p :class="item.specCombDesc?'':'top'">
	                                    		<span>{{item.goodsName}}</span>
	                                    		<span v-if="item.specCombDesc">{{item.specCombDesc}}</span>
	                                    		<span class="mui-icon mui-icon-arrowright" v-html="lawyerSer(item.state.code,item.type.code)" v-if="pageObj.type!=4"></span>
	                                    		<span class="mui-icon mui-icon-arrowright"  v-if="pageObj.type==4"></span>
	                                    		<em>¥{{item.amount}}</em>元
	                                    	</p>
                                    	</a>
                                    </li>
                                    <div class="order-centain" v-if="pageObj.type!=4">
                                    	<a href="javascript:;" class="mui-btn mui-btn-delete" v-if="item.state.code==12||item.state.code==14||item.state.code==20||item.state.code==43||item.state.code==17" @click="toast(item.orderNo,1,index)">删除订单</a>
                                    	<a href="javascript:;" class="mui-btn mui-btn-primary mui-btn-comment" v-if="(item.state.code==12||item.state.code==14)&&!item.commented" @click="submitComment(item.orderNo,item.lawyerId)">评价</a>
                                    	<a href="javascript:;" class="mui-btn mui-btn-cancel" v-if="item.state.code==10||item.state.code==15" @click="toast(item.orderNo,2,index)">取消订单</a>
                                    	<a href="javascript:;" class="mui-btn mui-btn-primary pay" v-if="item.state.code==10||item.state.code==15" @click="pay(item.expireTimeMillis,item.orderNo)">立即支付</a>
                                    	<a href="javascript:;" class="mui-btn mui-btn-primary mui-btn-accept" v-if="(item.state.code==11||item.state.code==13)&&item.type.code!=11&&item.type.code!=13" @click="toast(item.orderNo,3,index)">确认验收</a>
                                    </div>
                                </ul>
                            </div>
                        </div>
					</vertical-scroll>
                </div>
            </div>
        </div>      
	</div>
</template>

<script>
	export default{
		data(){
			return{
				data:[],
            	appObj:{},
            	pageObj:{
            		status:1,
            		page:1,
            		limit:20,
            		data_len1:0,
            		oldTime:'',
            		isError:false,
            		type:'',
            		emptyFlag:false,
            		self:'',
            	},
				scrollbar:false,
				scrollbarFade: true,
				pullUpLoad: true,
				pullUpLoadThreshold: 0,
				pullUpLoadMoreTxt: '加载更多',
				pullUpLoadNoMoreTxt: '没有更多数据了'
			}
		},
		computed: {
			scrollbarObj: function () {
				return this.scrollbar ? {fade: this.scrollbarFade} : false
			},
			pullUpLoadObj: function () {
				return this.pullUpLoad ? {
					threshold: parseInt(this.pullUpLoadThreshold),
					txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
				} : false
			}
		},
		watch: {
			scrollbarObj: {
				handler() {
					this.rebuildScroll();
				},
				deep: true
			},
			pullUpLoadObj: {
				handler(val) {
					const scroll = this.$refs.scroll.scroll
					if (val) {
					scroll.openPullUp();
					} else {
					scroll.closePullUp();
					}
				},
				deep: true
			}
		},
		mounted(){
			let title;
			this.pageObj.type=this.$route.query.type;
			switch(this.$route.query.type*1){
        		case 1:
        		  title="咨询订单";
        		  break;
        		case 2:
        		  title="问答订单";
        		  break;
        		case 3:
        		  title="法律服务订单";
        		  break;
        		case 4:
        		  title="线下服务订单";
        		  break;
        	}
			this.$store.dispatch("setTitle",title);
        	this.getList(1);
		},
		 methods: {
        	/*获取数据列表*/
        	getList:function(status,index){
      			mui('.mui-slider').slider().setStopped(true);
        		var that=this;
        		that.pageObj.status=status;
        		var url;
        		var data={
        			page:that.pageObj.page,
        			limit:that.pageObj.limit
        		}
        		if(that.pageObj.type==4){
        			url="/order/find-offline-order-list";
        		}else{
        			url="/order/find-order-list-user";
        			data.status=status;
        			if(that.pageObj.type==3){
        				data.type="3";
        			}else if(that.pageObj.type==1){
        				data.type="2";
        			}else if(that.pageObj.type==2){
        				data.type="1";
        			}
        		}
        		this.Api.order.orderList(data,url).then(res=>{
        			if(res.code != 1) return;
        			var that=this;
        			that.pageObj.oldTime=Math.floor(new Date().getTime()/1000);
   					var arr=res.data.items;
   					if(arr.length>0){
   						$('#item1mobile .mui-pull-caption-nomore').show();
   					}
   					setTimeout(function(){
   						mui(".mui-scroll").off("tap").on("tap",".mui-control-item",function(){
							var index=$(this).attr("index");
							that.tab(index);
						});
   					},10);
   					if(that.pageObj.page==1){
   						if(arr.length==0||!arr){
   							that.pageObj.emptyFlag=true;
   							that.pullUpLoad=false;
   						}else{
   							that.pageObj.emptyFlag=false;
   							that.pullUpLoad=true;
   						}
   					}
   					if(arr&&arr.length){
	                    that.pageObj.data_len1 = arr.length;
	               }
					for(var i=0;i<arr.length;i++){
						that.data.push(arr[i]);
					}
					if(arr==null||arr.length==0){
						this.$refs.scroll.forceUpdate();
					}
        		})
        	},
        	/*请求后台接口*/
        	send:function(orderNo,type,index){
        		var url;
        		if(type==1){
        			url="/order/delete-order";
        		}else if(type==2){
   					url="/order/cancel-order";
        		}else{
        			url="/order/user-finish-order";
        		}
    			var data={
    				'orderNo':orderNo
    			}
    			var that=this;
    			this.Api.order.changeOrder(data,url).then(res=>{
    				if(res.code != 1) return;
    				if(type==1){
    					that.data.splice(index,1);
    				}else{
    					that.pageObj.page=1;
        				that.data=[];
    					that.getList(that.pageObj.status);
    				}
    			});
        	},
        	/*mui弹框*/
        	toast:function(orderNo,type,index){
        		var btnArray=['取消','确认'];
        		var that=this,text;
        		if(type==1){
        			text='你确认要删除订单吗?';
        		}else if(type==2){
        			text='你确认要取消订单吗?';
        		}else{
        			text='你确认要验收吗?';
        		}
				mui.confirm(text,'',btnArray,function(e){
					if(e.index==1){
						that.send(orderNo,type,index);
					}else{
						console.log('取消');
					}
				})		
        	},
        	/*线下订单状态显示*/
        	lineStateVal:function(stateCode){
        		switch(stateCode){
        			case 1:
	        			return "待付款";
	        			break;
        			case 2:
	        			return "已付款";
	        			break;
        			case 3:
	        			return "交易完成";
	        			break;
        			case 4:
	        			return "交易关闭";
	        			break;
        		}
        	},
        	/*不同状态显示*/
        	stateVal:function(stateCode,stateValue,typeCode){
				if(stateCode==9||stateCode==10||stateCode==15){
					return  "待付款";
				}else if(stateCode==11&&typeCode!=11&&typeCode!=13){
					return  "待交付";
				}else if(stateCode==12||stateCode==14){
					return  "交易成功";
				}else if(stateCode==13&&typeCode!=11&&typeCode!=13){
					return  "待验收";
				}else if((stateCode==13&&typeCode==11)||(stateCode==11&&typeCode==13)||(stateCode==13&&typeCode==13)){
					return  "已付款";
				}else if(stateCode==20||stateCode==43){
					return  "交易关闭";
				}else if(stateCode==17||stateCode==16||(stateCode == 11&&typeCode==11)){
					return  stateValue;
				}else{
					return "";
				}
        	},
        	/*律师是否完成任务*/
        	lawyerSer:function(stateCode,typeCode){
        		if(stateCode==11&&typeCode!=11){
        			return "等待律师完成任务";
        		}else if(stateCode==13&&typeCode!=11){
        			return "律师已完成任务";
        		}else{
        			return "";
        		}
        	},
        	/*选项切换*/
        	tab:function(status){
        		this.pageObj.page=1;
        		this.data=[];
        		this.getList(status);
        	},
        	/*跳转到订单详情*/
        	jump:function(orderNo,index){
        		var that=this;
        		var params,path;
        		if(that.pageObj.type==4){
        			localStorage.setItem("item",JSON.stringify(that.data[index]));
        			path='/orderDetailOffline';
        		}else{
        			params={
        				'orderNo':orderNo
        			}
        			path='/orderDetail';
        		}
        		this.$router.push({path:path,query:params})
        	},
        	/*跳转评价页面*/
             submitComment:function(orderNo,lawyerId){
             	this.$router.push({path:"/orderComment",query:{orderUuid:orderNo,lawyerUuid:lawyerId}});
            },
            /*立即支付*/
//          pay:function(expireTimeMillis,orderNo){
//         		lz.device.LYUIHandle.hideHUD();
//         		var that=this;
//         		var newTime=Math.floor(new Date().getTime()/1000);
//				var difftime=newTime-that.pageObj.oldTime;
//      		$(that).addClass("btn-touch");
//      		setTimeout(function(){
//      			$(that).removeClass("btn-touch");
//      		},10);
//              var expireTimeMillis = Math.floor((expireTimeMillis)/1000); 
//              console.log(that.pageObj.oldTime+" "+newTime+" "+expireTimeMillis);
//              if(expireTimeMillis>difftime){
//              	if(lz.util.appJs()){
//	                    LYRouterHandle.openUrl(JSON.stringify({
//	                 		'type':'push',
//	                 		'url'lz.core.userRoot+'/user-order-details.html',
//	                 		'params':{
//	                 			'orderNo':orderNo
//	                 			}
//	                 		}));
//	                }else{                       				
//	                	window.location.href='user-order-details.html?orderNo='+orderNo;
//	                }
//              }else{
//              	mui.alert("支付超时","信息提示",function(){
//              		location.reload();
//              	})
//              }
//          },
			pay:function(){
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
			},
            onPullingUp() {
            	var that=this;
        		that.pageObj.page++;
        		setTimeout(function(){
        			that.getList(that.pageObj.status);
        		},500);
			},
			rebuildScroll() {
				this.$nextTick(() => {
					this.$refs.scroll.destroy();
					this.$refs.scroll.initScroll();
				})
			}
        }
	}
</script>
<style>
  .mui-popup-button{
  	color:#00ccb1;
  }
  .mui-slider .mui-slider-group .mui-slider-item img{
  	width:20px;
  }
</style>
<style lang="less" scoped>
@import "~@/assets/less/fycommon.less";
@import "~@/pages/order/order-list.less";
</style>