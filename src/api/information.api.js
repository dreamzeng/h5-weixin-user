import Ajax from 'lib/Ajax';

//案例详情
export const caseAnalysis = {
	getAnalysis(query) {
		return Ajax({
			url: '/cases/analysis/'+query.uuid,
			method: 'get'
		});
	},
	addFavorite(params,isloading = false){
		return Ajax({
			url : `/collect/favorite/${params.favoriteType}/${params.contentUuid}/${params.status}`,
			method : 'post',
			config:{
				loading:isloading
			}
		});
	}
};