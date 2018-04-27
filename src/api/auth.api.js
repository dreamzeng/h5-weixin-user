import Ajax from 'lib/Ajax';

export default {
  /**
   * 图片上传
   * @param {*} params
   */
  imageUpload(params) {
    return Ajax({
      url: '/xxx',
      method: 'POST',
      data: params
    });
  },

  /**
   * 微信登录
   *
   */
  weixinLogin(params) {
    return Ajax({
      url: '/xxx',
      method: 'POST',
      data: params
    });
  },

  mobiBind(params) {
    return Ajax({
      url: '/xxx',
      method: 'POST',
      data: params
    });
  },
  indexData(params) {
    return Ajax({
      url: '/wx/api/index',
      method: 'get',
      params: params
    });
  }
};
