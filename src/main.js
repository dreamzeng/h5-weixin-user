// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/less/base.less';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from 'store';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import FastClick from 'fastclick';

import 'vueg/css/transition-min.css';
import './lib/aui-scroll.js';
import './lib/callApp.js';

const { UCenterPlugins } = require('./plugins/index');
Vue.use(UCenterPlugins);

Vue.use(MintUI);

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
const swiperCfg = {};
Vue.use(VueAwesomeSwiper,swiperCfg);

import { vueCompsInstall } from '@/components/common';
vueCompsInstall(Vue);

//import vueWaves from './directive/waves';// 水波纹指令
//Vue.use(vueWaves);

Vue.config.productionTip = false;

// fastclick,解决移动端300ms延迟
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

top.vueRoot = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
