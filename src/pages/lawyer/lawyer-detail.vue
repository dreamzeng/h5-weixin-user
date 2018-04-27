<template>
  	<div id="pageContainer" class="fy-hide">
		<!-- <header-bar :title= "'律师详情'" :isSearch="false"></header-bar> -->
		<div class="ml-lawyer" v-if="data.code==1">
			<div class="ml-content pb-106">
				<div class="ml-top"></div>
				<!-- 律师基本信息 -->
				<div class="ml-top-box-container">
					<div class="ml-top-box">
						<div class="mltb-top">
							<div :class="'mltb-top-left '+(data.data.lawyerAuthType?'layer-name-v':'')"><div class="mltb-headimg"><img @load="reloadImg" :src="data.data.logo"/></div></div>
							<div class="mltb-name">
								<p class="fs-46 color-20 fw-bold word-wrap">{{data.data.realName}}</p>
								<p class="fs-32 color-3 mt-20 word-wrap">{{data.data.position}}</p>
							</div>
						</div>
						<div class="mt-40 fy-display-flex" v-if="data.data.company">
							<div class="fs-28 mr-20 fy-keep-all">律所</div>
							<div style="display:flex">
								<span class="fs-32 color-3 word-wrap" v-cloak>{{data.data.company}}</span>
								<span class="fs-20 mltb-rz fy-border-blue-radius" v-if="data.data.comanyAuthType">律所认证</span>
							</div>
						</div>
						<p class="ml-nx-cs mt-30 fs-28">
							<span>执业年限<i class="color-webmain ml-20 fs-32 fw-bold-smaller">{{data.data.workTime}}年</i></span>
							<span>服务城市<i class="color-webmain ml-20 fs-32 ">{{data.data.city}}</i></span>
						</p>
					</div>
				</div>
				<!-- 进度圆圈 -->
				<div class="fy-detail-box ml-other">
					<div class="ml-other-box">
						<div class="canvas"><canvas id="MLJDS"></canvas><span class="color-3 fs-26" v-cloak>{{data.data.orderNum}}</span></div>
						<p>接单数</p>
					</div>
					<div class="ml-other-box">
						<div class="canvas"><canvas id="MLHPL"></canvas><span class="color-3 fs-26" v-cloak>{{data.data.goodCommentRate}}%</span></div>
						<p>好评率</p>
					</div>
					<div class="ml-other-box">
						<div class="canvas"><canvas id="MLHYD"></canvas><span class="color-3 fs-30" v-cloak>{{data.data.activeRate}}</span></div>
						<p>活跃度</p>
					</div>
				</div>
				<!--律师服务-->
				<div class="fy-detail-split-bar" v-if="data.data.goodsList&&data.data.goodsList.length>0"></div>
				<div class="lawyer-service" v-if="data.data.goodsList&&data.data.goodsList.length>0">
					<div class="service-top fy-border-b">
						<p>律师服务</p>
						<p @click="serviceMore">更多</p>
					</div>
					<div class="service-list">
						<div class="fy-detail-box ml-pro" v-for="item in data.data.goodsList" :key="item.id">
							<span>{{item.categoryName}}</span>
							<ul>
								<li v-for="info in item.goodsDetailList" :key="info.id">{{info.goodsName}}</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 擅长领域 -->
				<div class="fy-detail-split-bar" v-if="data.data.goodAts&&data.data.goodAts.length>0"></div>
				<div class="fy-detail-box ml-pro" v-if="data.data.goodAts&&data.data.goodAts.length>0">
					<span>擅长领域</span>
					<ul>
						<li v-for="info in data.data.goodAts" :key="info.id">{{info.goodAtName}}</li>
					</ul>
				</div>
				<div class="fy-detail-split-bar"></div>
				<!-- 底部菜单 -->
				<div class="ml-bottom-menu-box">
					<div class="ml-bottom-menu fy-border-b-e1">
						<ul class="ml-bottom-bar">
							<li class="active">教育经历</li>
							<li>工作经验</li>
							<li>用户评价</li>
						</ul>
						<div class="ml-bottom-bar-underline"></div>
					</div>
				</div>
				<!-- 教育经历 -->
				<ul class="mlbc-education ml-bottom-content" v-if="data.data.eduList&&data.data.eduList.length>0">
					<li v-for="info in data.data.eduList" :key="info.id">
						<div class="fy-border-b-e1 fs-26">
							<p class="fs-30 color-3 word-wrap">{{info.name}}</p>
							<p class="word-wrap">{{info.position}}</p>
							<p>{{getDataFormat(info.beginTime,'yyyy-MM-dd')}}~{{info.endTime?getDataFormat(info.endTime,'yyyy-MM-dd'):'至今'}}</p>
						</div>
					</li>
				</ul>
				<div class="ml-bottom-content fy-nolist" v-if="data.data.eduList==undefined||data.data.eduList.length==0">
					<img src="~@/assets/images/lawyer/ml-empty.png" alt="">
					<p>暂无教育经历</p>
				</div>
				<!-- 工作经历 -->
				<ul class="mlbc-education ml-bottom-content fy-hide" v-if="data.data.jobList&&data.data.jobList.length>0">
					<li v-for="info in data.data.jobList" :key="info.id">
						<div class="fy-border-b-e1 fs-26">
							<p class="fs-30 color-3 word-wrap">{{info.name}}</p>
							<p>{{getDataFormat(info.beginTime,'yyyy-MM-dd')}}~{{info.endTime?getDataFormat(info.endTime,'yyyy-MM-dd'):'至今'}}</p>
						</div>
					</li>
				</ul>
				<div class="ml-bottom-content fy-nolist fy-hide" v-if="data.data.jobList==undefined||data.data.jobList.length==0">
					<img src="~@/assets/images/lawyer/ml-empty.png" alt="">
					<p>暂无工作经历</p>
				</div>
				<!-- 用户评价 -->
				<ul class="mlbc-comments ml-bottom-content fy-hide" v-if="data.data.commentList&&data.data.commentList.length>0">
					<li class="fy-border-b-e1" v-for="info in data.data.commentList" :key="info.id">
						<p>
							<span class="fs-28">评价：</span>
							<i class="ml-icon-star" v-for="item in getNumber(info.stars)" :key="item.id"></i>
							<i class="ml-icon-star-empty" v-for="item in (5-getNumber(info.stars))" :key="item.id"></i>
							<span class="f-r fs-24 color-b0">{{getDataFormat(info.commentTime,'yyyy-MM-dd')}}</span>
						</p>
						<p class="mt-10">
							<span class="mlbc-sign fy-border-webmain-radius" v-for="item in info.labels" :key="item.id">{{item.name}}</span>
						</p>
						<p class="fs-28 mt-26">
							<span>服务：</span>
							<span class="color-3">{{info.goodsName}}</span>
							<span class="f-r color-3">{{info.commenterName}}</span>
						</p>
					</li>
					<li class="mlbc-comments-more">
						<span class="de-txt">正在加载...</span>
					</li>
				</ul>
				<div class="ml-bottom-content fy-nolist fy-hide" v-if="data.data.commentList==undefined||data.data.commentList.length==0">
					<img src="~@/assets/images/lawyer/ml-empty.png" alt="">
					<p>暂无评价</p>
				</div>
			</div>
			<!-- 不分来源 -->
			<div class="ml-bottom fy-border-t">
				<p class="mlb-other-ask-price fy-btn-orange" @click="linkLawyer">
					<span class="fs-36 color-f">预约TA</span>
				</p>
			</div>
		</div>
		<!-- <errwrap :isshow="pageObj.isError" msg="网络异常" :isreload="true"></errwrap> -->
  	</div>	
</template>
<style lang="less" scoped>
  	.ml-bottom>p{line-height:1.06rem;}
	.mlb-other-ask-price>span{margin-top:0;padding-left:0;}
	.mlb-other-ask>span{padding-left:0;}
	.de-txt{font-size: 0.3rem}
	.fy-nolist>img{margin: 0 auto;}
	.pb-106{padding-bottom: 1.06rem;}
	@import '~@/assets/less/fycommon.less';
  	@import '~@/pages/lawyer/lawyer-detail.less';
</style>
<script>
	export default {
		data:function(){
			return{
				data:{code:"",data:{}},
				pageObj:{
					commentFlag:false,
					//channelCode:'',//app下载渠道code
					tloffsetTop:0,
					tlHight:0,
					otherOffsetTop:0,
					flag:false,
					isError:false,
					pageIndex:0,
					noMoreData:false,
					token:""
				},
				appObj:{
					lawyerId:"",
					goodsId:"",
					payType:-1,
					orderNo:-1,
					goodsId:-1,
					specCombId:-1
				}
			}
		},
		mounted:function(){
			//获取匹配到的律师信息
			this.getAppParam();
			//this.getChannel();
		},
		methods:{
			//获取律师app参数
			getAppParam:function(){
				var _this=this;
				_this.getdataInfo();
			},
			//获取律师信息
			getdataInfo:function(){
				var that = this;
				var ajaxParam={};
				that.appObj.lawyerId=that.$route.query.lawyerId;
				that.appObj.goodsId=that.$route.query.goodsId;
				ajaxParam.id=that.appObj.lawyerId;
				//debugger;
				this.Api.lawyer.lawyerDteailInit(ajaxParam).then(result => {
					if (result && result.code == 1) {
						//设置初始化时标题栏颜色
						result.data.commentList=[];
						that.data=result;
						//console.log("-------"+that.data.data);
						//dom更新
						that.$nextTick(function(){
							that.pageInit();
						});
						$('#defaultFix').hide();
					}
				});
			},
			
			//获取评论分页数据
			getCommonList:function(){
				var that = this;
				that.pageObj.pageIndex++;
				if(that.pageObj.pageIndex==1){
					that.pageObj.commentFlag=true;
				}else{
					that.pageObj.commentFlag=false;
				}
				var ajaxParam={
					lawyerUuid:that.appObj.lawyerId,
					type:0,
					page:this.pageObj.pageIndex,
					limit:10
				};
				
				this.Api.lawyer.lawyerCommonLInit(ajaxParam).then(result => {

					if(!result){
						return ;
					} 

					if(!that.data.data.commentList){
						that.data.data.commentList=[];
					}
					if(result.code==1&&result.data&&result.data.items&&result.data.items.length>0){
						result.data.items.forEach(function(ele){
							that.data.data.commentList.push(ele);
						});
						that.pageObj.commentFlag=true;
					}else{
						that.pageObj.noMoreData=true;
						$(".mlbc-comments-more>span").text("评论加载完毕");
					}
				});
			},
				
			//页面初始化要执行的方法
			pageInit:function(){
				$("#pageContainer").removeClass("fy-hide");
				this.pageObj.isError=false;
									
				//点击事件延迟处理
				//FastClick.attach(document.body);

				if(this.data.code==1){
					//底部选项卡事件绑定
					this.bindClickEvent();
					//底部选项卡滑动到顶部后固定
					this.introFixtl();
					//开始绘制圆圈进度条
					this.drawHPLBegin();	
				}
				//获取评论
				this.getCommonList();
			},
			//更多律师服务
			serviceMore:function(){
				//location.href="lawyer-service.html";
				this.$router.push({path:'/lawyerService',query:{'lawyerId':this.appObj.lawyerId}});
			},
			//联系他
			linkLawyer:function(){
				var that=this;
				//防重复点击拦截
				if(that.pageObj.flag) {
					return;
				}
				that.pageObj.flag=true;
				this.$router.push({path:'/writeInfo',query:{'lawyerId':this.appObj.lawyerId,"goodsId":this.appObj.goodsId}});
			},
			//动态绘制圆圈
			drawHPLBegin:function(){
				var _this=this;
				if(_this.data.code==1||_this.data.code=='1'){
					var t=1,f=1,y=1;
					//好评率
					var theTime=setInterval(function(){
						if(t>=_this.data.data.goodCommentRate) {
							clearInterval(theTime);
						}
						_this.drawHPL("MLHPL",t);
						t++;
					},1);
					//活跃度
					var theTime2=setInterval(function(){
						if(f>=90) {
							clearInterval(theTime2);
						}
						_this.drawHPL("MLHYD",f);
						f++;
					},1);
					//接单数
					var theTime3=setInterval(function(){
						if(f>=95) {
							clearInterval(theTime3);
						}
						_this.drawHPL("MLJDS",f);
						f++;
					},1);
				}
			},
			//进度圆圈
			drawHPL:function(id,val1){
				var canvas = document.getElementById(id);
				var canvasDom=$("#"+id);
				var context = canvas.getContext('2d');
				canvas.width=canvasDom.width()*2;
				canvas.height=canvasDom.height()*2;
				var centerX = canvas.width/2;
				var centerY = canvas.height/2;
				var rad = Math.PI*2/100;
				var clientWidth = document.documentElement.clientWidth;
				
				//灰色圆圈
				context.lineWidth = Math.floor(clientWidth/750*12);
				context.strokeStyle = "#e7e7e7";
				context.beginPath();
				context.arc(centerX, centerY, (centerX-context.lineWidth)/1.2 , 0, Math.PI*2, false);
				context.stroke();
				context.closePath();
				
				//黄色进度圈
				context.strokeStyle = "#fdb65b"; 
				context.beginPath(); 
				context.arc(centerX, centerY, (centerX-context.lineWidth)/1.2 , -Math.PI/2, -Math.PI/2 +val1*rad, false);
				context.stroke(); 
				context.closePath();
			},
			//菜单选中效果
			changeTopBarActive:function(i) {
				var $dom=$(event.target);//目标元素
				var $domBarUnderline=$(".ml-bottom-bar-underline");//滑动条
				var domOffsetLeft=event.target.offsetLeft;//当前元素离父元素的左边距离
				//添加选中文字效果
				$dom.parent().children().removeClass("active");
				$dom.addClass("active");
				//底部选中条滚动效果
				$domBarUnderline.css("left",domOffsetLeft+"px");
				//显示对应内容区域
				$(".ml-content>.ml-bottom-content").addClass("fy-hide");
				$(".ml-content>.ml-bottom-content").eq(i).removeClass("fy-hide");
				//当页面底部菜单已经固定到顶部，菜单切换时，默认滚动到内容区域的顶部
				var domscrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
				if(domscrollTop>=this.pageObj.tloffsetTop){
					window.scrollTo(0,this.pageObj.tloffsetTop-1);
				}
			},
			//底部选项点击事件绑定
			bindClickEvent:function(){
				var _this=this;
				$(".ml-bottom-bar>li").each(function(i){
					$(this).bind("click",function(){
						_this.changeTopBarActive(i);
					});
				});
			},
			//图片大小reload
			reloadImg:function(){
				var img=$(".mltb-headimg>img");
				var W=parseInt(img.width());
				var H=parseInt(img.height());
				if(W>H){
					img.css({"height":"100%","width":"auto"});
				}else{
					img.css({"width":"100%","height":"auto"});
				}
			},
			/*页面滚动事件监听*/
			introFixtl:function(){
				var _this=this;
				_this.pageObj.tloffsetTop = $('.ml-bottom-menu').offset().top;//底部菜单距离页面顶部的距离
				_this.pageObj.tlHight=$('.ml-bottom-menu').height();//底部菜单的高度
				_this.pageObj.otherOffsetTop=$(".ml-other").offset().top;//进度圆圈区域离顶部的距离
				new auiScroll({
					listen:true,
					distance:0
				},function(ret){
					//当页面滚动到底部菜单时，菜单固定在顶部
					if(ret.scrollTop>=_this.pageObj.tloffsetTop){
						$('.ml-bottom-menu').addClass("fy-fixed");
					}else{
						$('.ml-bottom-menu').removeClass('fy-fixed');
					}
					//当页面滚动到进度圆圈位置，改变app标题栏的颜色
					if(ret.isToBottom&&!($(".mlbc-comments").hasClass("fy-hide"))&&!_this.pageObj.noMoreData&&_this.pageObj.commentFlag){
						_this.getCommonList();
					}
				});
			},
			//获取数字格式
			getNumber:function(val){
				return parseInt(val);
			},
			//获取时间格式
			getDataFormat:function(val,fmt){
				val=val.replace(/\-/g, "/");
                var newData=new Date(val);
                var o = {
                    "M+" : newData.getMonth()+1,                 //月份
                    "d+" : newData.getDate(),                    //日
                    "h+" : newData.getHours(),                   //小时
                    "m+" : newData.getMinutes(),                 //分
                    "s+" : newData.getSeconds(),                 //秒
                    "q+" : Math.floor((newData.getMonth()+3)/3), //季度
                    "S"  : newData.getMilliseconds()             //毫秒
                };
                if(/(y+)/.test(fmt)) {
                    fmt=fmt.replace(RegExp.$1, (newData.getFullYear()+"").substr(4 - RegExp.$1.length));
                }
                for(var k in o) {
                    if(new RegExp("("+ k +")").test(fmt)){
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                    }
                }
                return fmt;
			}
		}
	}
</script>
