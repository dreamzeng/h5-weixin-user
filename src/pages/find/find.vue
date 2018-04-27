<template>
	<div id="pageContainer">
		<div class="ml-bottom-menu fy-border-b-e1 fy-fixed" v-show="isFixed" ref="menu">
			<ul class="ml-bottom-bar">
				<li class="active" @click="bindClickEvent(0)">热门文章</li>
				<li @click="bindClickEvent(1)">快速咨询</li>
				<li @click="bindClickEvent(2)">案例分析</li>
			</ul>
			<div class="ml-bottom-bar-underline"></div>
		</div>
		<div class="quick-seek"  @click="seek" v-if="pageObj.seekFlag">  
		</div>
		<vertical-scroll 
				ref="scroll"
				:data="data"
				@scroll="scroll"
            	:listen-scroll="true"
				:scrollbar="scrollbarObj"
				:pullUpLoad="pullUpLoadObj"
				@pullingUp="onPullingUp">
				<div class="find" slot="listContent">
					<call-app></call-app>
					<img src="~@/assets/images/demand.png" alt="" class="top-bg"/>
					<div class="ml-bottom-menu fy-border-b-e1">
						<ul class="ml-bottom-bar">
							<li class="active" @click="bindClickEvent(0)">热门文章</li>
							<li @click="bindClickEvent(1)">快速咨询</li>
							<li @click="bindClickEvent(2)">案例分析</li>
						</ul>
						<div class="ml-bottom-bar-underline"></div>
					</div>
					
					<div class="article" v-if="pageObj.index==0">
						<ul>
							<li v-for="(item,index) in data" @click="articleDetail(item.id,item.uuid)" :key="index">
								<div class="left">
									<p>{{item.title}}</p>
									<div>
										<span>{{item.relativeTime}}</span>
										<span>{{item.readQuantity}}阅读</span>
										<span>{{item.categoryName}}</span>
									</div>
								</div>
								<img :src="item.pic" alt=""/>
							</li>
						</ul>
					</div>
					<div class="seek" v-if="pageObj.index==1">
						<ul>
							<li v-for="(item,index) in data" @click="askDetail(item.uuid,item.question,item.createDay,item.readQuantity,item.subCaseName)" :key="index">
								<div class="lawyer">
									<div class="logo"><img :src="item.userLogo"/></div>
									<p>{{item.userName}}</p>
								</div>
								<p class="title">{{item.question}}</p>
								<div class="foot">
									<span>{{item.createDay}}</span>
									<span>{{item.readQuantityDesc}}阅读</span>
									<span>{{item.subCaseName}}</span>
								</div>
							</li>
						</ul>
					</div>
					<div class="case" v-if="pageObj.index==2" >
						<ul>
							<li v-for="(item,index) in data" @click="caseStudy(item.uuid)" :key="index">
								<div class="title">
									<p>{{item.title}}</p>
								</div>
								<div class="analyze">
									<div class="analyze-icon"></div>
									<p class="legal">{{item.legalAnalysis}}</p>
								</div>
								<div class="foot">
									<span>{{item.relativeTime}}</span>
									<span>{{item.readQuantity}}阅读</span>
									<span>{{item.categoryName}}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</vertical-scroll>
	</div>
	
</template>

<script>
	export default {
		data() {
            return { 
            	data:[],
            	appObj:{},
            	pageObj:{
            		tloffsetTop:0,
					index:0,
					page:1,
					limit:20,
					tloffsetLeft:0,
					topHeight:0,
					seekFlag:false,
					isHead:true,
					head:0
            	},
            	isFixed:false,
            	items:[],
				scrollbar:false,
				scrollbarFade: true,
				pullUpLoad: true,
				pullUpLoadThreshold: 0,
				pullUpLoadMoreTxt: '加载更多',
				pullUpLoadNoMoreTxt: '没有更多数据了'
            }
        },
        mounted(){
			this.$store.dispatch("setTitle","发现");
    		this.pageObj.topHeight=-($('.ml-bottom-menu').eq(1).offset().top);
    		this.pageObj.head=this.$children[0].$children[0].$refs.head.offsetHeight;
        	this.getData(0);
        	//底部选项卡事件绑定
			//底部选项卡滑动到顶部后固定
        },
        watch:{
        	isFixed(){
        		this.changeTopBarActive(this.pageObj.index);
        	},
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
        methods: {
        	//获取后台数据
        	getData:function(type){
        		var url,that=this;
        		if(type==0){
        			url="/user/article/hot-article";
        		}else if(type==1){
        			url="/user/get-interlocutions";
        		}else{
        			url="/cases/analysis/hot-cases";
        		}
        		var data={
        			"page":that.pageObj.page,
        			"limit":that.pageObj.limit
        		}
        		this.Api.find.find(data,url).then(res=>{
                	if(res.code != 1) return;
//      			if(that.isFixed&&(that.pageObj.page==1)){
//      				if(!that.$children[0].$children[0].flag&&that.pageObj.isHead){
//      					that.pageObj.topHeight+=that.pageObj.head;
//      					that.pageObj.isHead=false;
//      				}
//						this.$refs.scroll.scrollTo(0,that.pageObj.topHeight);
//					}
        			setTimeout(function(){
   						$(".legal").each(function(){
   							var val=$(this).text().replace(/<[^>]+>/g,"");
	        				$(this).html(val);
	        			});
	        			$(".find").css("opacity","1");
        			},10);
        			if(that.pageObj.page==1){
        				that.data=[];
        			}
        			for(var i=0;i<res.data.items.length;i++){
   						that.data.push(res.data.items[i]);
   					}
        			
        			if(res.data.items==null||res.data.items.length==0){
						this.$refs.scroll.forceUpdate();
        			}
        		});
        	},
        	//菜单选中效果
			changeTopBarActive:function(i) {
				var that=this,$dom;
				if(that.isFixed){
					$dom=$(".ml-bottom-bar").eq(0).find("li").eq(i);
				}else{
					$dom=$(".ml-bottom-bar").eq(1).find("li").eq(i);
				}
				var $domBarUnderline=$(".ml-bottom-bar-underline");//滑动条
				//添加选中文字效果
				$dom.parent().children().removeClass("active");
				$dom.addClass("active");
				//底部选中条滚动效果
				$domBarUnderline.css("left",that.pageObj.tloffsetLeft+"px");
			},
			//tab选项点击事件绑定
			bindClickEvent:function(i){
				var that=this;
				if(that.isFixed){
					$(".find").css("opacity","0");
					that.isFixed=false;
					this.$refs.scroll.scrollTo(0,0);
				}
				if(i==1){
					that.pageObj.seekFlag=true;
				}else{
					that.pageObj.seekFlag=false;
				}
				that.data=[];
				that.pageObj.page=1;
				that.pageObj.index=i;
				that.getData(i);
				that.pageObj.tloffsetLeft=event.target.offsetLeft;
				that.changeTopBarActive(i);
			},
			scroll(pos){
				var that=this;
				that.pageObj.tloffsetTop = $('.ml-bottom-menu').eq(1).offset().top;//底部菜单距离页面顶部的距离
				if(that.pageObj.tloffsetTop<=0){
			     	that.isFixed=true;
			     	that.$children[0].$children[0].flag=false;
				}else{
			     	that.isFixed=false;
				}
			},
			onPullingUp() {
				var that=this;
        		setTimeout(function(){
        			that.pageObj.page++;
        			that.getData(that.pageObj.index);
        		},500);
			},
			rebuildScroll() {
				this.$nextTick(() => {
					this.$refs.scroll.destroy();
					this.$refs.scroll.initScroll();
				})
			},
			/* 跳转到文章详情*/
			articleDetail(id,uuid){
				let parmas ={
	                id:id,
	                articleId:uuid
	             }
                this.$router.push({ name: 'NewsDetail' ,params:parmas});
			},
			/*跳转到案例分析详情*/
			caseStudy(uuid){
				this.$router.push({ name: 'caseAnalysis' ,params:{'uuid':uuid}});
			},
			/*跳转快速咨询详情*/
			askDetail(uuid,question,createDay,readQuantity,subCaseName){
				var params={
					uuid:uuid,
					question:question,
					createDay:createDay,
					readQuantity:readQuantity,
					subCaseName:subCaseName
				}
				this.$router.push({path:'/askDetail',query:params});
			},
			/*点击快速咨询*/
			seek(){
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
			}
        }
	}
</script>

<style lang="less" scoped>
#pageContainer{position: fixed;width: 100%;top:0;bottom: 0;}
@import '~@/assets/less/fycommon.less';
@import '~@/pages/find/find.less';
</style>