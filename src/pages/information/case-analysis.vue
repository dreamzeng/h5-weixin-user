<style lang="less" scoped>
@import './case-analysis.less';
</style>

<template>
  <div class="case-main">
        <b-scroll
            ref="caseAnalysis"
            @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType">
            <div class="wrapping">
                <div class="row title fy-border-b">
                    <div class="icon"></div>
                    <div class="right">
                        <div v-ellipsis="{lineNum: 3, text: dataList.title,isShowAll:isShowAll,vm:this}"></div>
                        <div class="spread-more" @click="isShowAll = true" v-show="isShowText">展开</div>
                    </div>
                </div>
                <div class="row info">
                    <div class="answers">
                        <div class="icon"></div>
                        <div class="right">
                            <div class="description">
                                <h2>法律分析</h2>
                                <p v-html="dataList.legalAnalysis"></p>
                            </div>
                            <div class="description">
                                <h2>行动建议</h2>
                                <p v-html="dataList.actionProposal"></p>
                            </div>
                            <div class="description">
                                <h2>相关法律</h2>
                                <p v-html="dataList.relevantLaws"></p>
                            </div>
                        </div>
                    </div>
                    <div class="star default" :class="{'default': isStar === false, 'active': isStar}" @click="changeStar">
                        <div class="icon"></div><span>收藏</span>  
                    </div>
                </div>
                <div class="row case" @click="$router.push({ path: '/serviceDetail',query:{'goodsId':dataList.serviceUuid}})">
                    <div class="fu icon"></div>
                    <div class="right"><div class="name">{{dataList.serviceName}}</div><div class="all"></div></div>
                </div>
                <div class="row case">
                    <div class="fa icon"></div>
                    <div class="right">
                        <div class="name">
                            {{dataList.lawTitle}}
                            <p>{{dataList.lawSubtitle}}</p>
                        </div>
                    </div>
                </div>
                <div class="row case"  @click="dataList.basicInfoUuid && $router.push({ path: '/caseDetail',query:{'uuid':dataList.uuid}})">
                    <div class="an icon"></div>
                    <div class="right">
                        <div class="name"> 
                            {{dataList.caseTitle}}
                        <p>{{dataList.caseSubtitle}}</p>
                        <p class="page-footer">法义大数据平台提供数据支持</p>
                        </div>
                        <div class="all" v-if="dataList.basicInfoUuid"></div>
                    </div>
                </div>
                <div class="recommend-lawyer" v-if="recommendLawyerList.length > 0">
                    <div class="top">推荐律师</div>
                    <div class="content">
                            <swiper :options="swiperOption">
                                <swiper-slide class="card" v-for="(item,index) in recommendLawyerList" :key="index + getUuid()">
                                    <div  @click="$router.push({ path: '/lawyerDetail',query:{'lawyerId':item.lawyerId}})">
                                        <div class="card-info">
                                            <span class="logo">
                                                <img :src="item.logo">
                                            </span>
                                            <span class="right">
                                                <p><i class="name">{{item.realName}}</i><i class="job">律师</i></p>
                                                <p class="company">{{item.company}}</p>
                                            </span>
                                        </div>
                                        <p class="address">
                                            <i class="serve-city">服务城市</i>
                                            <i class="city">{{item.serviceCity}}</i>
                                            <i class="years">执业年限</i>
                                            <i class="years-name">{{item.workTime}}年</i>
                                        </p>
                                        <p class="stars">
                                            <i v-for="(info,index) in (item.goodsCommentRate >=5 ? 5 : parseInt(item.goodsCommentRate))" :key="getUuid() + index" class="star-active"></i>
                                            <i v-for="(info,index) in (5-item.goodsCommentRate > 0 ? 5-item.goodsCommentRate : 0)" :key="getUuid() + index" class="star-default"></i>
                                            <i>({{item.sumQuantity}})</i>
                                        </p>
                                    </div>
                                    
                                </swiper-slide>
                            </swiper>
                    </div>
                </div>
            </div>
        </b-scroll>
  </div>
</template>

<script>
import mixin from '@/lib/mixin';
import { Toast } from 'mint-ui';
import {getCss} from '@/lib/utils';
const lodash = require('lodash');
import {caseAnalysis as caseAnalysisApi } from '@/api/information.api';

export default {
    mixins: [mixin],
    name:'caseAnalysis',
    data() {
        return {
            dataList:{},
            isStar:false,
            isShowAll:false,
            isShowText:false,
            recommendLawyerList:[],
            swiperOption: {
                slidesPerView: 'auto',
                freeMode: true
            }
        }
    },
    directives: {
        //省略指令
        ellipsis(el, binding, vnode){
            if(!binding.value) {
                return false
            }
            let vm = binding.value.vm;
            let text = binding.value.text || '';
            if(!text) return;
            if(binding.value.isShowAll){
                el.innerHTML = text ;
                vm.isShowText = false;
                return;
            }
            let lineNum = binding.value.lineNum;
            el.style['overflow-y'] = 'auto';
            setTimeout(() => {
                let lineHeight = parseInt(getCss(el, 'lineHeight'));
                let width = parseInt(getCss(el, 'width'));
                let fontSize = parseInt(getCss(el, 'fontSize'));
                
                let boxHeight = 0;
                let textLength = text.length;
                let maxHeight = lineHeight * (lineNum+1);
                let len = 0;
                let isBreak = false;
                while(textLength-- ){
                    let char = text.substring(0, len+1);
                    el.innerHTML = char;
                    boxHeight = el.scrollHeight;
                    if(boxHeight >= maxHeight){
                        textLength = 0;
                        isBreak = true;
                        break;
                    }
                    ++len;
                }
                if(isBreak){
                    text = text.substring(0, len-5);
                    text = text + '...';
                    vm.isShowText = true;
                }
                el.innerHTML = text ;
            }, 20);
        }
    },
    computed: {
        uuid() {
            return this.$route.params.uuid || '';
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$_init();
        });
    },
    methods: {
        $_init(){
            this.getAnalysis();
        },
        getAnalysis(){
            caseAnalysisApi.getAnalysis({uuid:this.uuid}).then((response)=>{
                if(response.code != 1) return;
                let res = response.data;
                this.dataList = res|| {};
                this.recommendLawyerList = res.recommendLawyerList || [];
                //this.scrollTo('caseAnalysis'); //这个记忆浏览有点bug
            });
        },
        changeStar(){
            let status = this.isStar ? '0' : '1';
            caseAnalysisApi.addFavorite({favoriteType:4,contentUuid:this.uuid,status}).then((response)=>{
                if(response.code != 1) return;
                let res = response.data;
                this.isStar = !this.isStar;
                this.isStar && Toast('已收藏');
                this.isStar === false && Toast('已取消收藏');
            });
        },
        handleMore(){

        },
        debounce:lodash.debounce((vm)=>{
            vm.isStar = !vm.isStar;
            vm.isStar && Toast('已收藏');
            vm.isStar === false && Toast('已取消收藏');
        },1000)
    }
}
</script>
