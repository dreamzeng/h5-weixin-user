/* 
   服务相关
*/
import Ajax from 'lib/Ajax';

export default {
  //优惠券列表
  collectList(params) {
    return Ajax({
      url: '/collect/favorite',
      method: 'get',
      params: params
    });
  },
  //删除收藏
  delCollect(params) {
    return Ajax({
      url: '/collect/favorite/'+params.uuid,
      method: 'DELETE',
      // params: params
    });
  },
  
};
