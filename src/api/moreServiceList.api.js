import Ajax from 'lib/Ajax';

/* 
  聚合服务  
*/
export default {
    //聚合服务菜单
    getCategory(params) {
        return Ajax({
            url: '/legal/service/goods-category',
            method: 'get',
            params: params
        });
    },
    getIntegrationInfo(params,isloading = true) {
        return Ajax({
            url: '/legal/service/integration-info/'+params.code,
            method: 'get',
            params: params,
            config:{
                loading:isloading
            }
        });
    },
}