import { asyncComponent } from '@/lib/utils';

const moreServiceList = asyncComponent('pages/service/more-service-list');
const search = asyncComponent('pages/search');
const matchLawyerAsk = asyncComponent('pages/lawyer/match-lawyer-ask');
const caseAnalysis = asyncComponent('pages/information/case-analysis');
const userDatum = asyncComponent('pages/ucenter/user-datum');
const mySubscribeList = asyncComponent('pages/ucenter/my-subscribe-list');
const mySubscribeInfo = asyncComponent('pages/ucenter/my-subscribe-info');

export let r = [
  {
    path: '/service/moreServiceList',
    name: 'moreServiceList',
    component: moreServiceList,
    meta: {
      title: '产品分类'
    }
  },{
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      title: '搜索'
    }
  },{
    path:'/lawyer/matchlawyerask',
    name:'matchLawyerAsk',
    component:matchLawyerAsk,
    meta: {
      title: '匹配律师'
    }
  },{
    path:'/information/caseAnalysis/:uuid',
    name:'caseAnalysis',
    component:caseAnalysis,
    meta:{
      title:'案例分析'
    }
  },{
    path:'/ucenter/userDatum/:uuid',
    name:'userDatum',
    component:userDatum,
    meta:{
      title:'个人资料',
      auth:true,
    }
  },{
    path:'/ucenter/mySubscribeList',
    name:'mySubscribeList',
    component:mySubscribeList,
    meta:{
      title:'我的预约列表',
      auth:true,
    }
  },{
    path:'/ucenter/mySubscribeInfo/:uuid',
    name:'mySubscribeInfo',
    component:mySubscribeInfo,
    meta:{
      title:'我的预约详情'
    }
  }
];
