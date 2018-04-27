import Ajax from 'lib/Ajax';

export default {
	/**
	 * 律师详情页初始化
	 * @param 律师ID
	 */
	lawyerDteailInit(params) {
		return Ajax({
			url: '/consult/find/lawyer/detail',
			method: 'post',
			data: params
		});
	},

	/**
	 * 获取评论分页数据
	 * @param 
	 */
	lawyerCommonLInit(params) {
		return Ajax({
			url: '/order/comment/lawyer/comments',
			method: 'get',
			params: params
		});
	},

	/**
	 * 获取律师更多服务数据
	 * @param 律师ID
	 */
	lawyerServicelInit(params) {
		return Ajax({
			url: '/lawyer/detail/up-goods-list',
			method: 'get',
			params: params
		});
	},

	/**
	 * 获取企业服务打包列表数据
	 * @param pageNum limit
	 */
	enterpriseServicelistInit(params) {
		return Ajax({
			url: '/service/packages',
			method: 'get',
			params: params
		});
	},

	/**
	 * 填写信息
	 * @param uuid
	 */
	enterpriseServicewrite(params) {
		return Ajax({
			url: '/legal/demand/info',
			method: 'get',
			params: params
		});
	},

	/**
	 * 提交信息
	 * @param uuid
	 */
  	enterpriseServicesub(params) {
		return Ajax({
			url: '/legal/demand/save',
			method: 'post',
			data: params,
			config:{
			isJson:true
			}
		});
  	},

	/**
	 * 意见反馈提交信息
	 * @param imglist phone dec
	 */
	feedback(params) {
		return Ajax({
			url: '/user/feedback',
			method: 'post',
			data: params
		});
	},

	/**
	 * 客服与帮助一级菜单
	 * @param 一级无需传parentId 二级需传parentId
	 */
	customerServicet(params) {
		return Ajax({
			url: '/help/center/findList',
			method: 'get',
			params: params
		});
	},

	/**
	 * 客服与帮助详情
	 * @param id
	 */
	customerServicedetail(params) {
		return Ajax({
			url: '/help/center/getDetail',
			method: 'get',
			params: params
		});
	},

};
