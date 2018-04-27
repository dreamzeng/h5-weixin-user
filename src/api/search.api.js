/* 
   搜索
*/
import Ajax from 'lib/Ajax';

export default {
  //高频搜索记录
  searchLog(params) {
    return Ajax({
        url: '/legal/service/search-log',
        method: 'get',
        params
    });
  },
  //搜索结果页面
  serviceList(params,isloading = true) {
    return Ajax({
        url: '/legal/service/service-list',
        method: 'get',
        params,
        config:{
            loading:isloading
        }
    });
  }
};
