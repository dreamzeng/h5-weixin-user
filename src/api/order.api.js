/* 
   服务相关
*/
import Ajax from 'lib/Ajax';

export default {
  //优惠券列表
  couponList(params) {
    return Ajax({
      url: '/get/coupons',
      method: 'get',
      params: params
    });
  },
  //兑换优惠券
  exchangeCoupon(msg){
    return Ajax({
  	  url: "/exchange/coupon/"+msg,
      method: 'get',
      params: null
    });
  },
  //绑定优惠券
  bindCoupon(params){
  	return Ajax({
  	 url: "/order/order-binding-coupon",
     method: 'post',
     params: params
    });
  },
  //订单列表
  orderList(params,url){
  	return Ajax({
  	 url: url,
     method: 'get',
     params: params,
     config:{
      	loading:false
      }
    });
  },
  //订单操作
  changeOrder(params,url){
  	return Ajax({
  	 url: url,
     method: 'post',
     params: params
    });
  },
  //订单详情
  orderDetail(params){
  	return Ajax({
  	 url: "/order/get-order-details",
     method: 'get',
     params: params
    });
  },
  //获取评价标签
  orderComment(){
  	return Ajax({
  	  url: "/order/comment",
      method: 'get',
      params: null
    });
  },
  //提交评价
  subComment(params){
  	return Ajax({
  	  url: "/order/comment",
      method: 'post',
      data: params
    });
  }
};
