<style lang="less" scoped>
@import './home-index.less';
</style>

<template>
    <div class="home-main">
        <b-scroll
            ref="homeIndex"
            @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType">
            <div class="home-wrapping" >
                <div class="row-wrapping home-header" ref="listGroup1">
                    <div class="search" ref="search">
                        <div class="item stable" @click="serviceAddList">
                            <span class="">{{$store.getters.cityName}}</span>
                            <span class="directing down"></span>
                        </div>
                        <div class="item change" @click="$router.push({ name: 'search'})">
                            <span class="s-search">
                                <div class="s-icon">合同</div>
                            </span>
                        </div>
                    </div>
                    <div class="scroll">
                        <b-slide ref="slide" class="sub-slide">
                            <div v-for="slideItem in slideData" :key="slideItem.id">
                                <a :href="slideItem.url">
                                    <img :src="slideItem.pic">
                                </a>
                            </div>
                        </b-slide>
                    </div>
                    <div class="items">
                        <div class="item" @click="topage(1)">
                            <img src="../../assets/icon/fwdz_logo.png" alt="服务定制" >服务定制
                        </div>
                        <div class="item" @click="topage(2)">
                            <img src="../../assets/icon/zlv_logo.png" alt="找律师" >找律师

                        </div>
                        <div class="item" @click="topage(3)">
                            <img src="../../assets/icon/fx_logo.png" alt="发现" >发现
                        </div>
                        <div class="item" @click="topage(4)">
                            <img src="../../assets/icon/fwfl_logo.png" alt="服务分类" >服务分类
                        </div>
                    </div>
                </div>
                <div class="row-wrapping legal-services " ref="listGroup2">
                    <div class="headering clearfix">
                        <div class="left">
                            <span class="green-color"></span>法律服务
                        </div>
                        <div class="right" @click="$router.push({ name: 'moreServiceList'})">
                            更多服务
                            <span class="directing more"></span>
                        </div>
                    </div>
                    <div class="content clearfix">
                        <div class="item">
                            <div class="c-wrapping">
                                <div class="c-left" @click="topage(5)">
                                    <div class="ii ii-1">企业服务</div>
                                    <div class="ii ii-2">需求量身，定制随心</div>
                                </div>
                                <div class="c-right">
                                    <img src="../../assets/icon/service-packag.png">
                                </div>
                            </div>
                            <div class="hot"></div>
                        </div>
                        <div class="item" v-for="(item , index) in serviceGoods" :key="getUuid() + index" @click="topage(6,item.goodsId)">
                            <div class="item">
                                <div class="c-wrapping clearfix">
                                    <div class="c-left">
                                        <div class="ii ii-1">{{item.name}}</div>
                                        <div class="ii ii-2">{{item.goodsDesc}}</div>
                                    </div>
                                    <div class="c-right">
                                        <img :src="item.logo">
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div class="foot">
                        <span v-for="(item,index) in recommendGoods" :key="getUuid()+index" :class="{active:recommendGoodsActive == index+1}" @click="$router.push({ path: '/serviceDetail',query:{'goodsId':item.goodsId}})">{{item.name}}</span>
                    </div>
                </div>
                <div class="row-wrapping recommend" ref="listGroup3">
                    <div class="headering clearfix">
                        <div class="left">
                            <span class="green-color"></span>找推荐
                        </div>
                        <div class="right" @click="topage(2)">
                            更多律师
                            <span class="directing more"></span>
                        </div>
                    </div>
                    <div class="lawyer" v-for="item  in lawyerList" :key="item.lawyerId" @click="topage(7,item.lawyerId)">
                        <div class="lawyer-left">
                            <img :src="item.logo" :alt="item.userName">
                        </div>
                        <div class="lawyer-right">
                            <div class="info">
                                <span class="info-name">
                                    {{item.userName | ellipsis(4)}}<span class="info-job">律师</span>
                                    <span class="info-level">
                                        <i v-for="(item,index) in item.commentStar >=5 ? 5 : item.commentStar" :key="getUuid()+index" class="star-active"></i>
                                        <i v-for="(item,index) in (5-item.commentStar > 0 ? 5-item.commentStar : 0)" :key="getUuid()+index" class="star"></i>
                                    </span>
                                </span>
                                <span class="number">（{{item.commentQuantity || '0'}}）</span>
                            </div>
                            <div class="address">{{item.company}}</div>
                            <div class="experience">
                                <span>执业年限</span>
                                <span class="highlight">{{item.workTime}}年</span>
                                <span>服务城市</span>
                                <span class="highlight">{{item.city | ellipsis(4)}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row-wrapping information">
                    <div class="tabs">
                        <div class="item" :class="{'active': articleActive == 1}" @click="getHomeContent(1,1)">热门文章</div>
                        <div class="item" :class="{'active': articleActive == 2}" @click="getHomeContent(2,1)">快速咨询</div>
                        <div class="item" :class="{'active': articleActive == 3}" @click="getHomeContent(3,1)">案例分析</div>
                    </div>
                    <div class="content">
                        <ul v-if="articleActive == 1">
                            <li class="article" v-for="item in articleList" :key="item.uuid" @click="goArticle(item.id,item.uuid)">
                                <div class="left">
                                    <p>{{item.title}}</p>
                                    <div class="other">
                                        <span class="time">{{item.relativeTime}}</span>
                                        <span class="read">{{item.readQuantity}}阅读</span>
                                        <span class="other-contract">{{item.categoryName}}</span>
                                    </div>
                                </div>
                                <div class="right">
                                    <img :src="item.pic" :alt="item.title">
                                </div>
                            </li>
                        </ul>
                        <ul v-if="articleActive == 2">
                            <li class="consult" v-for="item in articleList" :key="item.uuid" @click="toAskDetail(item)">
                                <div class="top">
                                    <span class="icon">
                                        <img :src="item.userLogo">
                                    </span>
                                    <span class="name">{{item.userName}}</span>
                                </div>
                                <div class="info">{{item.question}}</div>
                                <div class="bottom">
                                    <span class="time">{{item.publishDate}}</span>
                                    <span class="read">{{item.readQuantityDesc}}阅读</span>
                                    <span class="other-contract">{{item.subCaseName}}</span>
                                </div>
                            </li>
                        </ul>
                        <ul v-if="articleActive == 3">
                            <li class="legal-case" v-for="item in articleList" :key="item.uuid" @click="$router.push({name:'caseAnalysis',params: { uuid: item.uuid }})">
                                <div class="case-item top">
                                    <div class="icon">
                                        <img src="../../assets/icon/question-icon.png">
                                    </div>
                                    <div class="info">
                                        {{item.title}}
                                    </div>
                                </div>
                                <div class="case-item centre">
                                    <div class="icon">
                                        <img src="../../assets/icon/answers-icon.png">
                                    </div>
                                    <div class="info">
                                        <div class="legalAnalysis">
                                            {{item.legalAnalysis | filterHTMLTag}}
                                        </div>
                                        <div class="bottom">
                                            <span class="time">{{item.relativeTime}}</span>
                                            <span class="read">{{item.readQuantity}}阅读</span>
                                            <span class="other-contract">{{item.categoryName}}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class=" more" @click="topage(3)">
                        更多
                        <span class="directing"></span>
                    </div>
                </div>
            </div>
            <!-- fixed -->
            <div class="home-wrapping">
                <div class="row-wrapping home-header">
                    <div class="search fixed" ref="fixedSearch">
                        <div class="item stable" @click="serviceAddList">
                            <span class="">{{$store.getters.cityName}}</span>
                            <span class="directing down"></span>
                        </div>
                        <div class="item change" @click="$router.push({ name: 'search'})">
                            <span class="s-search">
                                <div class="s-icon">合同</div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="row-wrapping information " >
                    <div class="tabs fixed" v-show="isFixedInformation" ref="fixedInformation">
                        <div class="item" :class="{'active': articleActive == 1}" @click="getHomeContent(1,1)">热门文章</div>
                        <div class="item" :class="{'active': articleActive == 2}" @click="getHomeContent(2,1)">快速咨询</div>
                        <div class="item" :class="{'active': articleActive == 3}" @click="getHomeContent(3,1)">案例分析</div>
                    </div>
                </div>    
            </div>
        </b-scroll>
        <div class="bg-tips">
            我是有底线的
        </div>
    </div>
</template>
<script >

import { getLocation, filterHTMLTag ,uuid, sStorage} from '@/lib/utils';
const COMPONENT_NAME = 'homeIndex';
const scrollYList = sStorage.get('scrollYList') || {};

export default {
    name:COMPONENT_NAME,
    data() {
        return {
            slideData: [], //轮播图
            serviceGoods: [], //法律服务
            recommendGoods: [], //推荐位服务（融资顾问 企业人事顾问 劳动合同）
            lawyerList: [], //推荐律师
            articleList: [], //文章,咨询，案件
            articleActive: 1,
            recommendGoodsActive:1,

            listenScroll:true,
            probeType:3,
            scrollY: -1,
            isFixedInformation:false
        };
    },
    filters: {
        filterHTMLTag(value) {
            if (!value) return '';
            return filterHTMLTag(value);
        },
        ellipsis(value,len = 1){
            if(value.length > len){
                return value.substring(0, len) + '...';
            }
            return value;
        }
    },
    watch: {
        slideData() {
            this.$refs.slide.update();
        },
        scrollY(newY) {
            //记录滚动位置
            scrollYList[COMPONENT_NAME] = newY;
            sStorage.set('scrollYList',JSON.stringify(scrollYList));

            const listHeight = this._calculateHeight();
            let fixedSearch = this.$refs.fixedSearch;
            let fixedInformation = this.$refs.fixedInformation;
            // 当滚动到顶部，newY>0111
            if (newY > 0) {
                this.currentIndex = 0;
                fixedSearch.style.display = 'none';
            }else{
                fixedSearch.style.display = '';
            }
            let _sum = listHeight.reduce((preValue,curValue)=>{
                return preValue += curValue;
            }, 0);
            if( _sum <  Math.abs(newY) ){
                this.isFixedInformation = true;
            }else{
                this.isFixedInformation = false;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$_init();
        });
    },
    methods: {
        $_init() {
            this.$store.dispatch('changeCityName', getLocation(this));
            let slideData = sStorage.get('slideData');
            let homePage = sStorage.get('homePage');
            let articleList = sStorage.get('articleList');
            if(!slideData){
                this.getAdvertCenter();
            }else{
                this.slideData = slideData;
            }
            if(!homePage){
                this.gethomePage();
            }else{
                this.lawyerList = homePage.lawyerList || [];
                this.serviceGoods = homePage.serviceGoods || [];
                this.recommendGoods = homePage.recommendGoods || [];
            }
            this.getHomeContent(1);
        },
        getAdvertCenter() {
            this.Api.home
            .getAdvertCenter({
                advertType: 8,
                count: 10
            })
            .then(response => {
                if(response.code != 1) return;
                let res = response.data;
                this.slideData = res;
                sStorage.set('slideData',res);
            });
        },
        gethomePage() {
            this.Api.home.gethomePage().then(response => {
                if(response.code != 1) return;
                let res = response.data;
                this.lawyerList = res.lawyerList || [];
                this.serviceGoods = res.serviceGoods || [];
                this.recommendGoods = res.recommendGoods || [];
                sStorage.set('homePage',res);
            });
        },
        getHomeContent(type) {
            this.articleActive = type;
            let homeIndex = sStorage.get('homeIndexArticleList') || {};
            const _s = ()=>{
                setTimeout(()=>{
                    let _wrapping = this.$el.getElementsByClassName('home-wrapping')[0];
                    let _wrappingHeight = _wrapping.clientHeight;
                    let tf = _wrapping.style.transform.match(/\(([^()]+)\)/g);
                    let tl = (tf[0]).split(',');
                    let n = tl[1].replace(/[\s]|[px)]/g,'');

                    if(Math.abs(scrollYList[COMPONENT_NAME])  > _wrappingHeight - this.$el.clientHeight){
                        this.isFixedInformation = false;
                    }else{
                        //滚动到指定位置
                        //this.$refs.homeIndex.scrollTo(0,scrollYList[COMPONENT_NAME] || 0);
                    }
                },50);
            };
            if(homeIndex[type]){
                this.articleList = homeIndex[type+''];
                 _s();
                return ;
            }
            this.Api.home.getHomeContent({ type }).then(response => {
                if(response.code != 1) return;
                let res = response.data;
                this.articleList = res.items || [];
                homeIndex[type] = res.items;
                sStorage.set('homeIndexArticleList', homeIndex);
                _s();
            });
        },
        serviceAddList() {
            this.$router.push({ name: 'serviceAddList' });
        },
        goArticle(id,uuid){
             let parmas ={
                id:id,
                articleId:uuid
             }
             this.$router.push({ name: 'NewsDetail' ,params:parmas});
        },
        scroll(pos){
            this.scrollY = pos.y
        },
        _calculateHeight() {
            let listHeight = [];
            let list = [this.$refs.listGroup1,this.$refs.listGroup2,this.$refs.listGroup3];
             for (let i = 0; i < list.length; i++) {
                let item = list[i];
                listHeight.push(item.clientHeight);
            }
            return listHeight;
        },
        getUuid(){
            return uuid();
        },
        topage(index,id){
        	console.log(index);
        	switch (index) {
		        case 1:
		          this.$router.push({ path: '/enterpriseServicewrite',query:{"kind":0}});
		          break;
		        case 2:
		          this.$router.push({ path: '/lawyerList'});
		          break;
		        case 3:
		          this.$router.push({ path: '/tab/find'});
		          break;
		        case 4:
		          this.$router.push({ name: 'moreServiceList'});
		          break;
		        case 5:
		          this.$router.push({ path: '/enterpriseServiceList'});
		          break;
		        case 6:
		          this.$router.push({ path: '/serviceDetail',query:{'goodsId':id}});
		          break;
		        case 7:
		          this.$router.push({ path: '/lawyerDetail',query:{'lawyerId':id}});
		          break;
		      }
        },
        toAskDetail(item){
        	console.log(item);
    		var params={
				uuid:item.uuid,
				question:item.question,
				createDay:item.publishDate,
				readQuantity:item.readQuantity,
				subCaseName:item.subCaseName
			}
			this.$router.push({path:'/askDetail',query:params});
        }
    }
};
</script>

