<style lang="less" scoped>
@import './search.less';

</style>

<template>
  <div class="search-main">
        <div class="row header">
            <div class="left">
                <input type="text" v-model="question" v-focus>
                <i class="s-icon"></i>
                <i class="del-icon" v-show="question" @click="clear(1)"></i>
            </div>
            <div class="right" @click="$router.back()">取消</div>
        </div>
       <vertical-scroll
            ref="scroll"
            :data="serviceList"
            :scrollbar="scrollbarObj"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp"
            v-show="!isGoodsName && !isNotData">
            <div class="goods-wrapping" slot="listContent">
                <ul ref="listGroup">
                    <li v-for="(items,index) in serviceList" :key="getUuid()+index">
                        <h2 class="items-name">{{items.name}}</h2>
                        <ul class="g-items">
                            <li class="g-item" v-for="(item,i) in items.legalServiceList" :key="getUuid()+i">
                                <div class="title">{{item.name}}</div>
                                <div class="content">{{item.descr}}</div>
                                <div class="price">
                                    <span class="p1"><i>￥</i>{{item.priceStart}}</span>
                                    <span class="p2">{{item.pricePrefix}}</span>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </vertical-scroll>
        <b-scroll :scrollbar="false" v-show="isGoodsName">
            <div class="wrapping">
                <div class="row hot">
                    <div class="title">热门搜索</div>
                    <ul class="items clearfix">
                        <li class="item" v-for="(item,index) in hotList" :key="getUuid()+index" @click="question = item.goodsName">{{item.goodsName}}</li>
                    </ul>
                </div>
                <div class="row old" v-show="oldList.length > 0">
                    <div class="top clearfix">
                        <div class="left">历史搜索</div>
                        <div class="right" @click="clear(2)">清除记录</div>
                    </div>
                    <div class="content">
                        <ul class="items clearfix">
                            <li class="item" v-for="(item,index) in oldList" :key="getUuid()+index" @click="question = item">{{item}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </b-scroll>
        <no-search v-show="isNotData"></no-search>
  </div>
</template>

<script>
import { storage,uuid} from '@/lib/utils';
const lodash = require('lodash');  
import noSearch from '@/components/search/no-search.vue';

export default {
   name:'search',
   components: {
      noSearch
    },
    data() {
        return {
            question:'',
            hotList:[],
            oldList:[],
            isGoodsName:true,
            serviceList:[],
            isNotData:false,

            scrollbar:false,
			scrollbarFade: true,
			pullDownRefresh: true,
			pullDownRefreshThreshold: 90,
			pullDownRefreshStop: 40,
			pullUpLoad: true,
			pullUpLoadThreshold: 0,
			pullUpLoadMoreTxt: '加载更多',
            pullUpLoadNoMoreTxt: '没有更多数据了',
            
            page:1,
            limit:10,
            
            scrollY: -1,
            diff: -1
        }
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function (el) {
                el.focus()
            }
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
        question: function (newQuestion, oldQuestion) {
            this.getAnswer(newQuestion,this);
        },
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
    mounted(){
        this.$nextTick(() => {
            this.$_init();
            this.listHeight = [];
        });
    },
    methods: {
        $_init(){
            this.getSearchLog();
            this.oldList = storage.get('searchOldList') || []; 
        },
        getSearchLog(){
            this.Api.search.searchLog().then(response => {
                if(response.code != 1) return;
                let res = response.data;
                this.hotList = res || [];
            });
        },
        getAnswer: lodash.debounce((newQuestion,vm)=>{
            if (!newQuestion){
                vm.isGoodsName = true;
                return;
            } 
            let searchOldList = storage.get('searchOldList') || []; 
            if(searchOldList.indexOf(newQuestion) == -1){
                searchOldList.unshift(newQuestion);
                storage.set('searchOldList',JSON.stringify(searchOldList));
                vm.oldList = searchOldList;
            }
           
           vm.isGoodsName = false;
           vm.page = 1;
           vm.serviceList = [];
           vm.rebuildScroll();
           
           vm.Api.search.serviceList({
               name:newQuestion,
               page:1,
               limit:10
           }).then((response)=>{
                if(response.code != 1) return;
                let res = response.data;
                vm.serviceList = res || [];
                
                if(vm.serviceList.length == 0){
                    vm.isNotData = true;
                }else{
                    vm.isNotData = false;
                    vm.page = 2;
                }
               
           });
        },1000),
        onPullingDown() {
			// 下拉更新数据
			let vm = this;		
			if (vm._isDestroyed) {
				return
			}
			this.pullingDebounce(vm,'down');
		},
		onPullingUp() {
            //上拉 更新数据
            let vm = this;
			if (vm._isDestroyed) {
				return
			}
			this.pullingDebounce(vm,'up');
        },
        pullingDebounce:lodash.debounce((vm,type = 'up')=>{
            let name = vm.question,
                page = vm.page,
                limit = vm.limit;
            if(type != 'up'){
                page = 1,
                limit = 10;
            }	
            vm.Api.search.serviceList({name,page,limit},false).then(response=>{
                if(response.code != 1) return;
                let res = response.data;
                // 如果有新数据
                if(res){
                    if(type == 'up'){
                        vm.serviceList =  vm.serviceList.concat(res);
                        vm.page++;
                    }else{
                        vm.serviceList.splice(0,10);
                        vm.serviceList.unshift(...res);
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
        scroll(pos) {
            this.scrollY = pos.y;
        },
        clear(type){
            if(type == 1){
                this.question = '';
                this.isNotData = false;
                return;
            }
            if(type == 2){
                storage.remove('searchOldList');
                this.oldList = [];
                return;
            }
        },
        getUuid(){
            return uuid();
        }
    }
}
</script>

