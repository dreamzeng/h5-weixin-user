import { asyncComponent } from '@/lib/utils';

const login = asyncComponent('pages/ucenter/Login');
const regist = asyncComponent('pages/ucenter/Regist');

const accountManager = asyncComponent('pages/ucenter/AccountManager');
const carInfo = asyncComponent('pages/ucenter/CarInfo');
const kefu = asyncComponent('pages/ucenter/Kefu');
const orderCenter = asyncComponent('pages/ucenter/OrderCenter');

//服务地址列表
const serviceAddList = asyncComponent('pages/home/ServiceAddList');

//服务列表
const serviceList = asyncComponent('pages/service/ServiceList');
//订单信息详细
const orderInfo = asyncComponent('pages/service/OrderInfo');

//添加车辆
const carAdd = asyncComponent('pages/service/CarAdd');

//用户设置
const userInfo = asyncComponent('pages/ucenter/UserInfo');
//昵称编辑
const displayNameEdit = asyncComponent('pages/ucenter/DisplayNameEdit');
//手机绑定
const mobiBind = asyncComponent('pages/ucenter/MobiBind');
//设置
const settings = asyncComponent('pages/settings/Settings');
//设置 - 用户协议
const userAgreement = asyncComponent('pages/ucenter/UserAgreement');
//设置 - 用户反馈
const feedback = asyncComponent('pages/ucenter/Feedback');
//设置 - 关于我们
const aboutUs = asyncComponent('pages/ucenter/AboutUs');
//设置 - 帮助中心
const helpCenter = asyncComponent('pages/ucenter/HelpCenter');

//充值
const deposit = asyncComponent('pages/ucenter/Deposit');
//优惠券
const coupon = asyncComponent('pages/ucenter/Coupon');

//绑定手机
const bindMobi = asyncComponent('pages/ucenter/BindMobi');

//支付确认
const payCheck = asyncComponent('pages/service/PayCheck');

//支付密码设置
const payPassword = asyncComponent('pages/ucenter/payPassword');

//评价
const evaluate = asyncComponent('pages/service/Evaluate');
export let r = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/regist',
    name: 'regist',
    component: regist
  },
  {
    path: '/accountManager',
    name: 'accountManager',
    component: accountManager
  },
  {
    path: '/carInfo',
    name: 'carInfo',
    component: carInfo
  },
  {
    path: '/kefu',
    name: 'kefu',
    component: kefu
  },
  {
    path: '/orderCenter/:status',
    name: 'orderCenter',
    component: orderCenter
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: userInfo
  },
  {
    path: '/userAgreement',
    name: 'userAgreement',
    component: userAgreement
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: feedback
  },
  {
    path: '/aboutUs',
    name: 'aboutUs',
    component: aboutUs
  },
  {
    path: '/helpCenter',
    name: 'helpCenter',
    component: helpCenter
  },
  {
    path: '/settings',
    name: 'settings',
    component: settings
  },
  {
    path: '/displayNameEdit',
    name: 'displayNameEdit',
    component: displayNameEdit
  },
  {
    path: '/mobiBind',
    name: 'mobiBind',
    component: mobiBind
  },
  {
    path: '/deposit',
    name: 'deposit',
    component: deposit
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: coupon
  },
  {
    path: '/serviceAddList',
    name: 'serviceAddList',
    component: serviceAddList
  },
  {
    path: '/serviceList',
    name: 'serviceList',
    component: serviceList
  },
  {
    path: '/orderInfo',
    name: 'orderInfo',
    component: orderInfo
  },
  {
    path: '/carAdd',
    name: 'carAdd',
    component: carAdd
  },
  {
    path: '/mobiBind',
    name: 'mobiBind',
    component: mobiBind
  },
  {
    path: '/payCheck',
    name: 'payCheck',
    component: payCheck
  },
  {
    path: '/payPassword',
    name: 'payPassword',
    component: payPassword
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: evaluate
  }
];
