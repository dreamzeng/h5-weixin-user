import axios from 'axios';
import { Toast } from 'mint-ui';
import CONFIG_API,{EnvPreURL} from '@/api/config';
import { loading } from '@/lib/utils';
import store from 'store';

let qs = require('qs');
const Merge = require('./merge').default;

/**
 * tips
 */
const tips = (msg = '操作失败') => {
  Toast({
    message: msg,
    position: 'bottom',
    duration: 2000
  });
};

let BASE_API_URL = CONFIG_API[process.env.NODE_ENV.toUpperCase()+'_API_URL'];
if(process.env.NODE_ENV == 'production'){
  BASE_API_URL = window['BASE_URL'] || '';
}
export const API_URL = BASE_API_URL;

/**
 * 提供外部获取API地址
 * @param {*} envPreURL 环境配置 参考@EnvPreURL前缀
 */
export const getApiURL = (envPreURL = 'base') => {
	
  let host = API_URL;
  let prefixUrl = EnvPreURL[envPreURL.toUpperCase()+'_URL'];
  //开发环境
  if(process.env.NODE_ENV == 'development'){
		prefixUrl = "";
		host = (envPreURL !=='base') ? CONFIG_API[envPreURL.toUpperCase()+'_URL'] : API_URL;
	}
  return `${host}${prefixUrl}`;
}

/**
 * 根据打包命令配置，生成对应的请求环境地址
 * @param {*} config  axios配置
 */
export const getURL = (config={})=>{
    let url = `${getApiURL(config.envPreURL)}`;
    return url;
}

// 创建axios实例
const Ajax = axios.create({
  baseURL: CONFIG_API.DEVELOPMENT_API_URL, // api的base_url
  timeout: 30000, // 请求超时时间
  //withCredentials: true, //跨域设置
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  }
});

/* 
  请求方法过滤
*/
const filterMethod = method => {
  let _list = ['post'];
  return _list.indexOf(method) !== -1;
};

// request拦截器
Ajax.interceptors.request.use(
  config => {
    config.baseURL = getURL(config);
    let isLoading = true;
    if(config.config && config.config.loading === false){
      isLoading = false;
    }
    loading(isLoading);
    if (store.getters.token) {
         config.headers['token'] = store.getters.token; // 让每个请求携带token--['token']为自定义key
    }
    let isJson = false;
    if(config.config && config.config.isJson === true){
      config.headers['Content-Type'] = 'application/json';
      config.data =JSON.stringify(config.data);
    }else{
      config.data =qs.stringify(config.data);
    }
    return config;
  },
  error => {
    loading(false);
    tips('请求出错了，请重试');
    console.log(error); 
    Promise.reject(error);
  }
);

// respone拦截器
Ajax.interceptors.response.use(
  response => {
    loading(false);
    let body = response.data;
    if(body && ( body.code !== 1 && body.code !== 62 )){
      let isTips = true;
      if(response.config.isTips === false){
        isTips = false;
      }
      isTips && body.msg && tips(body.msg);
    }
    if(body && body.code === 10){
      //未登录
      let isLogin = false;
      if(response.config.isLogin === true){
        isLogin = true;
      }
      setTimeout(()=>{
        isLogin && top.vueRoot.$router.push({ path: '/mobileBind' });
      },1500);
    }
    return body;
  },
  error => {
    loading(false);
    console.log(error);
    if (
      error.code == 'ECONNABORTED' &&
      error.message.indexOf('timeout') != -1
    ) {
      tips('请求超时，请刷新重试');
    }
    return Promise.reject(error);
  }
);

export default Ajax;
