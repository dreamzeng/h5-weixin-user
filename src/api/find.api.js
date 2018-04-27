/* 
   发现页相关
*/
import Ajax from 'lib/Ajax';

export default {
  //发现页
  find(params,url) {
    return Ajax({
      url: url,
      method: 'get',
      params: params,
      config:{
      	loading:false
      }
    });
  },
  //真实案例
  caseDetail(uuid){
  	return Ajax({
  	  url: "/cases/analysis/basic-info/"+uuid,
      method: 'get',
      params: null
  	})
  },
  //咨询详情
  askDetail(params){
  	return Ajax({
  	  url: '/user/qa/chat-records',
      method: 'get',
      params: params,
      config:{
      	loading:false
      }
  	})
  }
};
