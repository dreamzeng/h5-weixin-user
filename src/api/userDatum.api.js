import Ajax from 'lib/Ajax';

//案例详情
export const userCenter = {
	userInfo(query) {
		return Ajax({
			url: '/user/user-info',
			method: 'get'
		});
	},
	editUserInfo(param){
		return Ajax({
			url: '/user/user-info',
			method: 'post',
			data:param
		});
	}
};

//我的预约
export const subscribe = {
	list(query){
		return Ajax({
			url:'/wx/api/demand/list',
			method:'get',
			isTips:false
		});
	},
	info(query){
		return Ajax({
			url:`/wx/api/demand/${query.uuid}`,
			method:'get'
		})
	}
}