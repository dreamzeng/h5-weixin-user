/**
 * 函数去抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * [异步组件加载函数]
 * @param  {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */
export const asyncComponent = name => {
  return resolve => require([`@/${name}`], resolve);
};

export const getHost = function(url) {
  //获取 host
  var host = 'null';
  if (typeof url == 'undefined' || null == url) url = window.location.href;
  var regex = /.*\:\/\/([^\/|:]*).*/;
  var match = url.match(regex);
  if (typeof match != 'undefined' && null != match) {
    host = match[1];
  }
  if (typeof host != 'undefined' && null != host) {
    var strAry = host.split('.');
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + '.' + strAry[strAry.length - 1];
    }
  }
  return host;
};

export const cookieTools = {
  // cookie操作
  get: function(name) {
    var arr = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    );
    if (arr != null) {
      return unescape(arr[2]);
    }
    return '';
  },
  set: function(name, value, days, domain) {
    if (typeof days == 'undefined') {
      domain = domain ? domain : getHost();
      //document.cookie = name + "=" + escape(value) + "; path=/; domain="+domain;
      document.cookie = name + '=' + escape(value) + ';';
    } else {
      var expdate = new Date();
      var msecs = typeof days === 'number' ? days * 24 * 60 * 60 * 1000 : 0;
      expdate.setTime(expdate.getTime() + msecs);
      //document.cookie = name + "=" + escape(value) + "; path=/; domain="+tools.getHost()+"; expires=" + expdate.toUTCString();
      document.cookie =
        name + '=' + escape(value) + '; expires=' + expdate.toUTCString();
    }
  },
  del: function(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - 1000);
    this.set(name, '', expdate);
  }
};

import store from '@/store';
/* 
  loadding
  params: {
    type: 'fading-circle',
    color: '#26a2ff',
    size: 30
  }
*/
export const loading = (status, params = {}) => {
  store.dispatch('changeLoadingStatus', status);
  store.dispatch('changeLoadingParam', params);
};

/*获取地理位置*/
export const getLocation = context => {
  const that = context;
  let cityName = that.$route.query.name;
  if (cityName) {
    return cityName;
  }
  cityName = '深圳市';
  //根据IP获取城市
  let filterCity = ['北京', '重庆', '深圳', '广州'];
  var localCity = new BMap.LocalCity();

  localCity.get(rs => {
    let _cityName = rs.name;
    for (let i = 0, l = filterCity.length; i < l; i++) {
      if (_cityName.match(filterCity[i])) {
        cityName = _cityName;
      }
    }
  });
  return cityName;
};

/* 
  过滤 html 标签
*/
export const filterHTMLTag = html => {
  html = html.replace(/<\/?[^>]*>/gi, ''); //去除HTML Tag
  html = html.replace(/&nbsp;/gi, ''); //去掉nbsp
  html = html.replace(/[|]*\n/, ''); //去除行尾空格
  return html;
};

/* 
  生成唯一的 uuid
*/
export const uuid = () =>{
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; 
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
                                                      
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

const storage = {
  type:'localStorage',
  get: function(key) {
      var value = window[this.type].getItem(key);
      if (value) {
          try {
              var value_json = JSON.parse(value);
              if (typeof value_json === 'object') {
                  return value_json;
              } else if (typeof value_json === 'number') {
                  return value_json;
              }
          } catch(e) {
              return value;
          }
      } else {
          return false;
      }
  },
  set: function(key, value) {
    if(typeof value === 'object') value = JSON.stringify(value);
    window[this.type].setItem(key, value);
  },
  remove: function(key) {
    window[this.type].removeItem(key);
  },
  clear: function() {
    window[this.type].clear();
  }
};


// 批量保存，data是一个字典
storage.setList = function(data) {
  for (var i in data) {
    window[this.type].setItem(i, data[i]);
  }
};

// 批量删除，list是一个数组
storage.removeList = function(list) {
  for (var i = 0, len = list.length; i < len; i++) {
    window[this.type].removeItem(list[i]);
  }
};

const lodash = require('lodash');
const sStorage =  lodash.cloneDeep(storage);
sStorage.type = 'sessionStorage';

export {
  storage,
  sStorage
} ;

export const drawHPL =  (elementClass, val1,color={default:'#e7e7e7',active:'#fdb65b'}) =>{
  var canvas = document.querySelector('.' + elementClass);
  var canvasDom = $('.' + elementClass);
  var context = canvas.getContext('2d');
  canvas.width = canvasDom.width() * 2;
  canvas.height = canvasDom.height() * 2;
  var centerX = canvas.width / 2;
  var centerY = canvas.height / 2;
  var rad = Math.PI * 2 / 100;
  var clientWidth = document.documentElement.clientWidth;

  //灰色圆圈
  context.lineWidth = Math.floor(clientWidth / 750 * 12);
  context.strokeStyle =color.default;
  context.beginPath();
  context.arc(
    centerX,
    centerY,
    (centerX - context.lineWidth) / 1.2,
    0,
    Math.PI * 2,
    false
  );
  context.stroke();
  context.closePath();

  //黄色进度圈
  context.strokeStyle =color.active;
  context.beginPath();
  context.arc(
    centerX,
    centerY,
    (centerX - context.lineWidth) / 1.2,
    -Math.PI / 2,
    -Math.PI / 2 + val1 * rad,
    false
  );
  context.stroke();
  context.closePath();
}

export const getCss = (curEle,attr) =>{
  let val = null;
  let reg = null;
  if(/MSIE (6|7|8)/.test(navigator.userAgent)){
      if(attr==="opacity"){
          val = curEle.currentStyle["filter"];
          //把获取到的结果剖析，获取里面的数字，让数字除以100才和标准浏览器保持一致
          reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
          val = reg.test(val)?reg.exec(val)[1]/100:1

      }else{
          val = curEle.currentStyle[attr];
      }        
  }else{
      //如果传递进来的结果是opacity，说明我想获得的是透明度，但是在IE6-8下获取透明度需要使用filter
      val = window.getComputedStyle(curEle,null)[attr];
  }
  return val;        
};