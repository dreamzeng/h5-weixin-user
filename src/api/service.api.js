/* 
   服务相关
*/
import Ajax from 'lib/Ajax';

export default {
  //服务详情
  serviceDetail(goodsId) {
    return Ajax({
      url: '/legal/service/'+goodsId,
      method: 'get',
      params: null
    });
  },
  //匹配律师列表
  matchLawyerList(params){
    return Ajax({
  	  url: '/user/goods-lawyer-list',
      method: 'get',
      params: params,
      config:{
      	loading:false
      }
    });
  },
  //律师列表
  lawyerList(params){
  	return Ajax({
  	  url: '/consult/find/lawyer',
      method: 'get',
      params: params,
      config:{
      	loading:false
      }
  	})
  },
  //擅长领域
  caseTypes(params){
  	return Ajax({
  	  url: '/user/find-city',
      method: 'get',
      params: params
  	})
  },
  //收藏
  collect(params){
  	return Ajax({
  	  url: '/collect/favorite/1/'+params.goodId+'/'+params.status,
      method: 'post',
      data: null,
    });
  }
};
