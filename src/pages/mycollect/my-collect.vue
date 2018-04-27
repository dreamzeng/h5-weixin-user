<template>
    <div>
        <!-- <header-bar title="我的收藏"></header-bar> -->
        <div class="collect-list" :class="{ 'collect-bg' :colList=='' }" >
            <vertical-scroll 
				ref="scroll"
				:data="colList"
				:scrollbar="scrollbarObj"
				:pullDownRefresh="pullDownRefreshObj"
				:pullUpLoad="pullUpLoadObj"
				@pullingDown="onPullingDown"
				@pullingUp="onPullingUp">
            <ul slot="listContent">
             <mt-cell-swipe  v-for="(item,index) in colList" :key="index" :right="[
                 {
                 content: '<i class='+'icon-collect-del'+'></i>',
                 style: { background: '#f2f3f5'},
                 handler:()=>deleteBtn(item)
                }]">
             <li>
                <!-- 法律服务 1 -->
                <div class="list-first" v-if="item.favoriteType == 1">
                    <div  @click="serviceDetail(item.id)">
                    <h4 >{{item.title}}</h4>
                    <div class="content">{{item.subtitle}}</div>
                    <div class="price"><span>￥{{item.price}}</span><em><item class="pricePrefix">{{item.pricePrefix}}</item></em></div>
                    </div>
                </div>
                 <!--  资讯  2 -->
                <div class="list-third" v-if="item.favoriteType == 2" >
                    <span class="img" > <img  :src="item.pic"></span>
                    <div class="left-content">
                        <h4 @click="newsDetail(item.uuid,item.contentUuid)">{{item.title}}</h4>
                        <div class="item-last"><span class="time">{{item.relativeTime}}</span><em class="read-num">{{item.readQuantity}}阅读</em><span class="label"><em>{{item.categoryName}}</em></span></div>
                    </div>
                </div>
                <!-- 案例 4 -->
                <div class="list-four" v-if="item.favoriteType == 4" >
                    <div @click="caseDetail(item.uuid)">
                    <div class="item-w">
                    <i class="icon-question"></i>
                    <div class="tit">{{item.title}}</div>
                    </div>
                    <div class="item-w">
                    <i class="icon-answer"></i>
                    <div class="content" v-text="item.subtitle">
                    </div>
                    </div>
                    <div class="item-w">
                    <div class="item-last"><span class="time">{{item.relativeTime}}</span><em class="read-num">{{item.readQuantity}}阅读</em><span class="label"><em>{{item.categoryName}}</em></span></div>
                    </div>
                    </div>
                </div> 
                 <!-- 快速咨询 6 -->
                <div class="list-five" v-if="item.favoriteType == 6" >
                    <div @click="consultDetail(item.uuid,item.question,item.createDay,item.readQuantity,item.subCaseName)">
                    <div class="tit"><a href="javascript:;" class="logo"><img :src="item.userLogo"></a>{{item.userName}}</div>    
                    <div class="content">{{item.title}}</div>
                    <div class="item-last"><span class="time">{{item.relativeTime}}</span><em class="read-num">{{item.readQuantity}}阅读</em><span class="label"><em>{{item.categoryName}}</em></span></div>
                    </div>
                </div>  
                
            </li>
            </mt-cell-swipe>
            </ul>
            </vertical-scroll>
             <p class="no-data" v-if="colList==''"><i class="no_collect"><em>暂无收藏</em></i></p>
        </div>   
    </div>
</template>

<script>
import * as type from "../../store/index.js";
import { MessageBox,Toast} from "mint-ui";
export default {
    name: '',
    data: function () {
        return {
            colList:[],
            todopage: {
                total: 1,
                limit:20,  
                page:1
            },
            formDada:{
              uuid:''
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
    mounted() {
        this.$nextTick(function() {
            this.getSource();
        });
    },
    methods: {
        getSource(page,limit){
             let _this = this,
                params = {
                    page: _this.todopage.page,
                    limit:_this.todopage.limit
                };
            _this.Api.collect.collectList(params).then(resp => {
                if(resp.code != 1) return;
                let res = resp.data || {};
                if(res.items.length > 0){
                    _this.dataReq = res.items;
                    _this.dataLen = res.total;
                    let data = res.items;
                    _this.colList = []
                    data.forEach(g => {
                        _this.colList.push(g);
                        
                    });
                    console.log(_this.colList)
                }else{
                    _this.$refs.scroll.forceUpdate();
                }
                
            });

        },
        showSharebox() {
            this.$store.commit(type.SHOWSHAREBOX, !this.Sharebox);
            console.log(this.media_info);
        },
      	onPullingDown() {
			// 下拉更新数据
            console.log('pulling down and load data');
            let _this = this;
            _this.loading = true;
            _this.todopage.page = 1;
            _this.todopage.limit= _this.todopage.limit;
			_this.getSource( _this.todopage.page,_this.todopage.limit)
		},
		onPullingUp() {
			//上拉 更新数据
			console.log('pulling up and load data');
			if (this._isDestroyed) {
				return
            }
            let _this = this;
            _this.loading = true;
            _this.todopage.page = _this.todopage.page + 1;
            _this.todopage.limit= _this.todopage.limit;
			_this.getSource( _this.todopage.page,_this.todopage.limit)
			
		},
		rebuildScroll() {
			this.$nextTick(() => {
				this.$refs.scroll.destroy();
				this.$refs.scroll.initScroll();
			})
        },
        deleteBtn(item){
             let _this = this
             let deluuid = item.uuid
             MessageBox({
                title: "",
                message: "是否删除此收藏？",
                showCancelButton: true,
                confirmButtonText: "确认删除"
            },function(action) {
                console.log(action)
                 let params = {
                     uuid:deluuid
                 }
                 if(action == 'confirm'){
                    _this.Api.collect.delCollect(params).then(resp => {
                        if(resp.code = 1){
                            _this.getSource()
                            Toast(resp.msg)
                        }
                    
                    });
                }
                
                console.log('callback:', deluuid);
            });
        },
        newsDetail(id,uuid){
            let parmas ={
                 id:id,
	             articleId:uuid
             }
             this.$router.push({ name: 'NewsDetail' ,params:parmas});
        },
        serviceDetail(id){
            let params = {
               goodsId:id
            } 
            this.$router.push({'path':'/serviceDetail','query':params});
        },
        caseDetail(uuid){
            this.$router.push({ name: 'caseAnalysis' ,params:{'uuid':uuid}});
        },
        consultDetail(uuid,question,createDay,readQuantity,subCaseName){
            let params={
                uuid:uuid,
                question:question,
                createDay:createDay,
                readQuantity:readQuantity,
                subCaseName:subCaseName
            }
            this.$router.push({path:'/askDetail',query:params});

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
        $route: function() {
            this.$store.commit(type.SHOWSHAREBOX, false);
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
    }
};
</script>
<style >
.list-wrapper{background: none!important}
a{margin: auto}
.mint-cell{margin-bottom:.25rem!important}
.mint-cell-wrapper{display:-webkit-box;line-height: inherit;padding:0}
.mint-cell-title,.mint-cell-value{flex:auto;-webkit-box-flex:initial}
.mint-cell-swipe-buttongroup,.mint-cell-right{background: #f2f3f5}
.mint-cell-swipe-button{line-height: 1.88rem;}
</style>
<style lang="less">
@import './my-collect';
</style>
