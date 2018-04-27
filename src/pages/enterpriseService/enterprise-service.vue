<template>
	<div id="pageContainer" class="home-wrapping">
		<!-- <header-bar :title= "'企业服务'" :isSearch="false"></header-bar> -->
		<vertical-scroll 
			ref="scroll"
			:data="data.servicePackages"
			:scrollbar="scrollbarObj"
			:pullDownRefresh="pullDownRefreshObj"
			:pullUpLoad="pullUpLoadObj"
			@pullingDown="onPullingDown"
			@pullingUp="onPullingUp">
			<div slot="listContent" class="section-box">
				<section class="section">
					<div class="cross-line"></div>
					<div class="tab-area">
						<div class="tab-box" v-for="item in data.recommends" :key="item.index" :data-id="item.id" @click="j_service_d($event.currentTarget)">
							<p class="head"><em class="logo"></em><em>{{item.name}}</em></p>
							<p class="txt">{{item.descr}}</p>
						</div>
					</div>
				</section>
				<section class="section noheight">
					<div class="list-head">
						<p>服务组合</p>
					</div>
					<div class="list-box">
						<ul>
							<li v-for="item in data.servicePackages" :key="item.index" :serviceId="item.uuid" @click="j_service_w($event.currentTarget)">
								<div class="img-box">
									<img :src="item.servicePackageImages">
								</div>
								<div class="p-box">
									<p class="title">{{item.servicePackageName}}</p>
									<p class="zh">{{item.servicePackageComb}}</p>
									<p class="detail">{{item.servicePackageDescr}}</p>
								</div>
							</li>
						</ul>
					</div>
				</section>
			</div>
		</vertical-scroll>
		<div class="base-box">
			<div class="flex-box" @click="j_service_wd">没有找到合适的？试试定制<em></em></div>
		</div>
		
	</div>
</template>
<style lang="less" scoped>
	.home-wrapping{position: fixed;width: 100%;top: 0;bottom: 0;padding-bottom:1.05rem;}
	.list-wrapper{background-color: #f2f3f5!important;}
	.section:first-child{margin-top:0.24rem;}
	.section-box{overflow: hidden;}
	.tab-area{width:100%;}
	@import '~@/pages/enterpriseService/enterprise-service.less';
</style>
<script>
	const lodash = require('lodash');
	export default {
		
		data:function(){
			return { 
				data:{
					recommends:[],
					servicePackages:[]
				},
				appObj:{},
				pageObj:{
					pageNum:1,
					limit:20
				},
				scrollbar:false,
				scrollbarFade: true,
				pullDownRefresh: true,
				pullDownRefreshThreshold: 90,
				pullDownRefreshStop: 40,
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
			pullDownRefreshObj: function () {
				return this.pullDownRefresh ? {
					threshold: parseInt(this.pullDownRefreshThreshold),
					stop: parseInt(this.pullDownRefreshStop)
				} : false
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
			pullDownRefreshObj: {
				handler(val) {
					const scroll = this.$refs.scroll.scroll
					if (val) {
					scroll.openPullDown();
					} else {
					scroll.closePullDown();
					}
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
		mounted:function(){
			this.init();
		},
		methods: {
			init:function(){
				var that=this;

				let params={
					page:that.pageObj.pageNum,
					limit:that.pageObj.limit
				}			
				this.Api.lawyer.enterpriseServicelistInit(params).then(result => {
					if (result && result.code == 1) {
						that.data.recommends=result.data.recommends;
						that.data.servicePackages = result.data.servicePackages;
					}
				});
			},
			// onPullingDown() {
			// 	// 下拉更新数据
			// 	console.log('pulling down and load data');
			// 	if (this._isDestroyed) {
			// 		return
			// 	}
			// 	this.Api.lawyer.enterpriseServicelistInit({
			// 		page:1,
			// 		limit:20
			// 	},false).then(response=>{
			// 		if(response.code != 1) return;
			// 		let res = response.data.servicePackages;
			// 		// 如果有新数据
			// 		if(res){
						
			// 			this.data.servicePackages.splice(0,20);
			// 			this.data.servicePackages.unshift(...res);
			// 		}else{
			// 			this.$refs.scroll.forceUpdate();
			// 		}
			// 	});
			// },
			// onPullingUp() {
			// 	//上拉 更新数据
			// 	console.log('pulling up and load data');
			// 	if (this._isDestroyed) {
			// 		return
			// 	}
			// 	this.Api.lawyer.enterpriseServicelistInit({
			// 		page:this.pageObj.pageNum,
			// 		limit:this.pageObj.limit
			// 	},false).then(response=>{
			// 		if(response.code != 1) return;
			// 		let res = response.data.servicePackages;
			// 		// 如果有新数据
			// 		if(res){
			// 			this.data.servicePackages =  this.data.servicePackages.concat(res);
			// 			this.pageObj.pageNum++;
			// 		}else{
			// 			this.$refs.scroll.forceUpdate();
			// 		}
			// 	});
			// },
			onPullingDown() {
				// 下拉更新数据
				console.log('pulling down and load data');
				let vm = this;		
				if (vm._isDestroyed) {
					return
				}
				this.debounce(vm,'down');
			},
			onPullingUp() {
				//上拉 更新数据
				console.log('pulling up and load data');
				let vm = this;
				if (vm._isDestroyed) {
					return
				}
				vm.page =2;
				vm.limit=20;
				this.debounce(vm,'up');
			},
			debounce:lodash.debounce((vm,type = 'up')=>{
				let page = vm.page,
					limit = vm.limit;
				if(type != 'up'){
					page = 1,
					limit = 20;
				}	
				vm.Api.lawyer.enterpriseServicelistInit({page,limit},false).then(response=>{
					if(response.code != 1) return;
					let res = response.data.servicePackages;
					// 如果有新数据
					console.log('-------'+vm);
					if(res){
						if(type == 'up'){
							vm.data.servicePackages =  vm.data.servicePackages.concat(res);
							vm.page++;
						}else{
							vm.data.servicePackages.splice(0,20);
							vm.data.servicePackages.unshift(...res);
						}
					}else{
						vm.$refs.scroll.forceUpdate();
					}
				});
			},1500),
			rebuildScroll() {
				this.$nextTick(() => {
					this.$refs.scroll.destroy();
					this.$refs.scroll.initScroll();
				})
			},
			j_service_d(e){//跳服务详情
				let goodsId = e.getAttribute("data-id");
				this.$router.push({path:'/serviceDetail',query:{'goodsId':goodsId}});

			},
			j_service_w(e){//跳填写信息(提交法律需求)
				let goodsId = e.getAttribute("serviceId");
				
				this.$router.push({path:'/enterpriseServicewrite',query:{'goodsId':goodsId,"kind":1,'bizType':2}});
				
				
			},
			j_service_wd(){//跳填写信息(定制服务)
				
				this.$router.push({path:'/enterpriseServicewrite',query:{"kind":0}});
					
			}

		}
	}
</script>
