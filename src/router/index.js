import Vue from 'vue';
import Router from 'vue-router';
import { asyncComponent ,sStorage } from '@/lib/utils';
import vueg from 'vueg';
import Api from '@/api/index';
import store from 'store';
const PageNotFound = asyncComponent('components/common/404');
const tab = asyncComponent('pages/TabPage');
import {SET_USER_DATA} from 'store';

Vue.use(Router);

const wxappid = window['IS_PROD'] ? "wx9c47ca388453317d" :"wx9c47ca388453317d"

const registerRouter = requireContext => {
  let rMap = [];
  requireContext.keys().forEach(comp => {
    let vueComp = requireContext(comp);
    let rList = vueComp.r || [];
    for (let i = 0, l = rList.length; i < l; i++) {
      rMap.push(rList[i]);
    }
  });
  return rMap;
};

const constantRouterMap = [
  {
    path: '/',
    redirect: '/tab/home',
    component: tab
  },
  {
    path: '/tab',
    name: 'tab',
    component: tab,
    children: registerRouter(require.context('./', false, /\.route.tab.js$/))
  }
];

const asyncRouterMap = registerRouter(
  require.context('./', false, /\.route.js$/)
);

const otherRoterMap = [
  {
    //404
    path: '*',
    component: PageNotFound
  }
];

const routes = constantRouterMap.concat(asyncRouterMap, otherRoterMap);

const router = new Router({
  // mode: 'history',
  base: '/',
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

//
const getUrlQueryParams = (url)=>{
  var params = {},
      results = null,
      url = url || location.href;
  var regex = /[?&]([\w]+)=([^&#]*)/g;
  while( (results = regex.exec( url ) ) != null ){
    params[decodeURIComponent(results[1])]=decodeURIComponent(results[2]);
  }
  return params;
}


// 登录态处理

router.beforeEach(({ meta,fullPath }, from, next) => {
  if(meta.auth === true && store.getters.token === ''){
    sStorage.set('redirectPath',fullPath);
    next({ path: '/mobileBind' });
    return;
  }
   next();
    let wxredirecthost = "";
    let wxredirecturl = "";
    // let appid = appid;
    if(window['IS_PROD']){//生产环境配置 
      wxredirecthost = "";
      wxredirecturl = "http://"+wxredirecthost+"/";
      // appid = wxappid;
    }else{
      let localHost = process.env.NODE_ENV=="production" ? "h5userrelease" : process.env.LOCAL_HOST //测试环境和本地开发授权回调地址
      wxredirecthost = "wxdev.fy13322.com";
      wxredirecturl = "http://"+wxredirecthost+"/"+localHost+"/";
      // appid = wxappid;
    }
    let parm = getUrlQueryParams(location.href);
    if(parm.code && parm.code.length>0){//微信回调返回，获取code
    	let jssdkConfig=sessionStorage.getItem("jssdkConfig");
    	if(!jssdkConfig){
    		let param = {
	        "code":parm.code
	      };
	      let data={
	      		"url":window.location.href.split("#")[0]//"http://wxdev.fy13322.com/"+process.env.LOCAL_HOST+"/"
	      }
	      	Api.login.wexinLogin(param).then(res=>{
	      		if(res.code!=62&&res.code!=1) return;
	      		if(res.code== 1){
	      			Api.login.userInfo().then(res=>{
	      				if(res.code!=1) return;
	      				store.dispatch("setUserData", res.data);
	      			})
	      			store.dispatch("setToken",res.token);
	      			store.dispatch("setPhone",res.data.phone);
	      		}else if(res.code== 62){
	      			let userData = res.data;
	      			sessionStorage.setItem('fywxuserData', JSON.stringify(userData));
	      		}
	      	});
	      	Api.login.jssdk(data).then(res=>{
	      		let config={
	          	debug: false,
	          	appId: wxappid,
	          	jsApiList: ["chooseImage","uploadImage","getLocalImgData","downloadImage","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"]
	          }
	      		config=Object.assign(res.data,config);
	          sessionStorage.setItem('jssdkConfig', JSON.stringify(config));
	          wx.config(config);
	      	});
    	}
    }else{
      let wxurl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+wxappid+'&redirect_uri='+encodeURIComponent(wxredirecturl).toLowerCase()+'&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect';;
      window.location.href = wxurl;
    }
     
});

router.afterEach(() => {

});

// vueg 转场动画
const options = {
  forwardAnim: 'fadeInRight', //前进动画，默认为fadeInRight
  backAnim: 'fadeInLeft', //后退动画，默认为fedeInLeft
  duration: 0.2,
  disable: true
};
Vue.use(vueg, router, options);

export default router;
