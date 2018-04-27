import Ajax from 'lib/Ajax';

//上传
export const upload = {
	uploadByStream(param) {
		return Ajax({
			url: '/common/uploadByStream',
            method: 'post',
            data:param
		});
	},
	uploadByBase64Code(param) {
		return Ajax({
			url: '/common/uploadByBase64Code',
            method: 'post',
            data:param
		});
	}
};