import {asyncComponent} from '@/lib/utils'
const mobileBind=asyncComponent('pages/ucenter/mobile-bind');//绑定手机
const account=asyncComponent('pages/ucenter/account.vue');//账号与安全
const setPassword=asyncComponent('pages/ucenter/set-password');//设置密码
const changePassword=asyncComponent('pages/ucenter/change-password');//修改密码
const changeMobile=asyncComponent('pages/ucenter/change-mobile');//验证原手机
const newMobile=asyncComponent('pages/ucenter/new-mobile');//手机换绑
const serviceDetail=asyncComponent('pages/service/service-detail');//服务详情
const lawyerList=asyncComponent('pages/lawyer/lawyer-list');//律师列表
const caseDetail=asyncComponent('pages/find/case-detail');//真实案例
const askDetail=asyncComponent('pages/find/ask-detail');//咨询详情
const myCoupon=asyncComponent('pages/order/my-coupon');//我的优惠券
const orderComment=asyncComponent('pages/order/order-comment');//订单评价
const userOrder=asyncComponent('pages/order/user-order');//用户订单
const orderList=asyncComponent('pages/order/order-list');//订单列表
const orderDetail=asyncComponent('pages/order/order-detail');//订单详情
const orderDetailOffline=asyncComponent('pages/order/order-detail-offline');//线下订单详情
const paySuccess=asyncComponent('pages/order/pay-success');//支付成功
const payErr=asyncComponent('pages/order/pay-err');//支付失败
const orderCoupon=asyncComponent('pages/order/order-coupon');//订单优惠券
const writeInfo=asyncComponent('pages/enterpriseService/write-info');//提交信息
const couponGuide=asyncComponent('pages/order/coupon-guide');//优惠券说明
export let r = [
    {
        path: '/mobileBind',
        name: 'mobileBind',
        component: mobileBind,
        meta:{
        	title:'绑定手机'
        }
    },
    {
        path: '/account',
        name: 'account',
        component: account,
        meta:{
        	title:'账号与安全',
        	auth:true,
        }
    },
    {
        path: '/setPassword',
        name: 'setPassword',
        component: setPassword,
        meta:{
        	title:'设置登录密码'
        }
    },
    {
        path: '/changePassword',
        name: 'changePassword',
        component: changePassword, 
        meta:{
        	title:'修改密码'
        }
    },
    {
        path: '/changeMobile',
        name: 'changeMobile',
        component: changeMobile,
        meta:{
        	title:'换绑手机号'
        }
    },
    {
        path: '/newMobile',
        name: 'newMobile',
        component: newMobile,
        meta:{
        	title:'换绑手机号'
        }
    },
    {
        path: '/serviceDetail',
        name: 'serviceDetail',
        component: serviceDetail,
        meta:{
        	title:'服务详情'
        }
    },
    {
        path: '/lawyerList',
        name: 'lawyerList',
        component: lawyerList,
        meta:{
        	title:'律师列表'
        }
    },
    {
        path: '/caseDetail',
        name: 'caseDetail',
        component: caseDetail,
        meta:{
        	title:'真实案例'
        }
    },
    {
        path: '/askDetail',
        name: 'askDetail',
        component: askDetail,
        meta:{
        	title:'咨询详情'
        }
    },
    {
        path: '/myCoupon',
        name: 'myCoupon',
        component: myCoupon,
        meta:{
        	title:'我的优惠券',
        	auth:true,
        }
    },
    {
        path: '/orderComment',
        name: 'orderComment',
        component: orderComment,
        meta:{
        	title:'订单评价',
        	auth:true,
        }
    },
    {
        path: '/userOrder',
        name: 'userOrder',
        component: userOrder,
        meta:{
        	title:'我的订单',
        	auth:true,
        }
    },
    {
        path: '/orderList',
        name: 'orderList',
        component: orderList,
        meta:{
        	title:'',
        	auth:true,
        }
    },
    {
        path: '/orderDetail',
        name: 'orderDetail',
        component: orderDetail,
        meta:{
        	title:'订单详情',
        	auth:true,
        }
    },
    {
        path: '/orderDetailOffline',
        name: 'orderDetailOffline',
        component: orderDetailOffline,
        meta:{
        	title:'订单详情',
        	auth:true,
        }
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: paySuccess,
        meta:{
        	title:'支付成功'
        }
    },
    {
        path: '/payErr',
        name: 'payErr',
        component: payErr,
        meta:{
        	title:'支付失败'
        }
    },
    {
        path: '/orderCoupon',
        name: 'orderCoupon',
        component: orderCoupon,
        meta:{
        	title:'优惠券',
        	auth:true,
        }
    },
    {
        path: '/writeInfo',
        name: 'writeInfo',
        component: writeInfo,
        meta:{
        	title:'填写资料'
        }
    },
    {
        path: '/couponGuide',
        name: 'couponGuide',
        component: couponGuide,
        meta:{
        	title:'优惠券说明'
        }
    }
]