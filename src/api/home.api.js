/* 
    首页 API
*/
import Ajax from 'lib/Ajax';

export default {
  //banner图
  getAdvertCenter(params) {
    return Ajax({
      url: '/get-advert-center',
      method: 'get',
      params: params
    });
  },
  //快捷入口，法律服务，找推荐
  gethomePage(params) {
    return Ajax({
      url: '/legal/service/home-page',
      method: 'get',
      params: params
    });
  },
  //热门文章 快速咨询 案例分析
  getHomeContent(params) {
    return Ajax({
      url: '/user/home-content/' + params.type,
      method: 'get',
      config:{
        loading:true
      }
    });
  }
};
