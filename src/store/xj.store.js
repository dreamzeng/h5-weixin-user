export default {
  state: {
    couponMoney:JSON.parse(sessionStorage.getItem('couponMoney')),//发放优惠券金额
    couponInfo:JSON.parse(sessionStorage.getItem('couponInfo')),//优惠券信息
    phone:JSON.parse(sessionStorage.getItem('phone')),//绑定的手机号
		token:JSON.parse(sessionStorage.getItem('token')) || ''
  },
  mutations: {
    setCouponMoney(state, couponMoney) {
      state.couponMoney = couponMoney;
    },
    setToken(state, token) {
      state.token = token;
    },
    setCouponInfo(state, couponInfo) {
      state.couponInfo = JSON.parse(couponInfo);
    },
    setTitle(state, title) {
    	document.title=title;
    },
    setPhone(state, phoneVal) {
    	state.phone = phoneVal;
    }
  },
  actions: {
    setCouponMoney({ commit }, couponMoney) {
    	sessionStorage.setItem("couponMoney",JSON.stringify(couponMoney));
      commit('setCouponMoney', couponMoney);
    },
    setToken({commit}, token) {
    	sessionStorage.setItem("token",JSON.stringify(token));
      commit('setToken', token);
    },
    setCouponInfo({commit}, couponInfo) {
    	sessionStorage.setItem("couponInfo",JSON.stringify(couponInfo));
      commit('setCouponInfo', couponInfo);
    },
    setTitle({commit}, title) {
      commit('setTitle', title);
    },
    setPhone({commit}, phone) {
    	sessionStorage.setItem("phone",JSON.stringify(phone));
      commit('setPhone', phoneVal);
    }
  },
  getters: {
    couponMoney: state => {
      return state.couponMoney;
    },
    token: state => {
      return state.token;
    },
    couponInfo:state=>{
    	return state.couponInfo;
    },
    phone:state=>{
    	return state.phone;
    }
  }
};
