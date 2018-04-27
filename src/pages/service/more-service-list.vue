<style lang="less" scoped>
@import './more-service-list.less';
</style>

<template>
<div class="main">
	<header-bar :title= "'产品分类'" :isSearch="true"></header-bar>
	<div class="home-wrapping">
		<div class="left-wrapping">
			<b-scroll :scrollbar="false">
				<ul class="items">
					<li class="item"  
						v-for="(item,index) in goodsCategory"  
						:class="{active : goodsCategoryActive == index}" 
						:key="getUuid()+ index" 
						@click="getInfo(item.code,index)">{{item.name}}</li>
				</ul>
			</b-scroll>
		</div>
		
		<div class="right-wrapping">
			<vertical-scroll 
				ref="scroll"
				:data="items"
				:scrollbar="scrollbarObj"
				:pullDownRefresh="pullDownRefreshObj"
				:pullUpLoad="pullUpLoadObj"
				@pullingDown="onPullingDown"
				@pullingUp="onPullingUp">
				<ul class="items" slot="listContent">
					<li class="item" v-for="(item,index) in items" :key="getUuid()+index" @click="$router.push({ path: '/serviceDetail',query:{'goodsId':item.goodsId}})">
						<div class="title">{{item.goodsName}}</div>
						<div class="content">{{item.goodsDesc}}</div>
						<div class="price">
							<span class="p1"><i>￥</i>{{item.price}}<i>{{item.unit||''}}</i></span>
							<span class="p2">{{item.pricePrefix}}</span>
						</div>
					</li>
				</ul>
			</vertical-scroll>
		</div>
	</div>
</div>
</template>

<script>
import { uuid } from '@/lib/utils';
const lodash = require('lodash');

export default {
  name:'moreServiceList',
  data() {
		return {
			goodsCategory:[],
			goodsCategoryActive:1,
			goodsCategoryCode:null,
			page:1,
			limit:5,

			items:[],
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
	mounted() {
        this.$nextTick(() => {
            this.$_init();
        });
    },
	methods: {
		$_init(){
			this.getCategory();
		},
		getCategory(){
			this.Api.moreServiceList.getCategory().then(response => {
                if(response.code != 1) return;
				let res = response.data;
				this.goodsCategory = res;
				res && this.getInfo(res[0].code,0);
            });
		},
		getInfo(code,index){
			this.goodsCategoryActive = index;
			this.goodsCategoryCode = code;
			this.page = 1;
			this.limit = 5;
			this.rebuildScroll();
			this.Api.moreServiceList.getIntegrationInfo({
				code,
				page:this.page,
				limit:this.limit
			}).then(response=>{
				if(response.code != 1) return;
				let res = response.data;
				this.items = res || [];
				if(res) this.page++;
			})
		},
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
			this.debounce(vm,'up');
		},
		debounce:lodash.debounce((vm,type = 'up')=>{
			let code = vm.goodsCategoryCode,
				page = vm.page,
				limit = vm.limit;
			if(type != 'up'){
				page = 1,
				limit = 5;
			}	
			vm.Api.moreServiceList.getIntegrationInfo({code,page,limit},false).then(response=>{
				if(response.code != 1) return;
				let res = response.data;
				// 如果有新数据
				if(res){
					if(type == 'up'){
						vm.items =  vm.items.concat(res);
						vm.page++;
					}else{
						vm.items.splice(0,5);
						vm.items.unshift(...res);
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
		getUuid(){
			return uuid();
		}  
	}
}
</script>