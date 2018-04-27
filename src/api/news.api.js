import Ajax from 'lib/Ajax';

export default {
  /**
   * 资讯详情
   *
   */
  newsDetail(params) {
    return Ajax({
      url: '/lawyer/information/find-article',
      method: 'get',
      params: params,
      config:{
        loading:false
      }
    });
  },

  /**
   * 资讯评论列表
   *
   */
  commitList(params) {
    return Ajax({
      url: '/lawyer/information/get-comment-list',
      method: 'get',
      params: params,
      config:{
        loading:false
      }
    });
  },
    /**
   * 推荐服务
   *
   */
  recommendService(params) {
    return Ajax({
      url: '/lawyer/information/pushService',
      method: 'get',
      params: params,
      isTips:false
    });
  },
  /**
   * 增加评论回复
   *
   */
  addReply(params) {
    return Ajax({
      url: '/lawyer/information/save-comment',
      method: 'post',
      data: params,
      isLogin:true
    });
  },
  /**
   * 文章点赞收藏
   *
   */
  addGood(params) {
    return Ajax({
      url: '/lawyer/information/operator',
      method: 'post',
      data: params,
      isLogin:true,
      config:{
        loading:false
      }
    });
  },
  /**
   * 删除评论
   *
   */
  delCommit(params) {
    return Ajax({
      url: '/lawyer/information/delSelfComment',
      envPreURL:'platform',
      data:params,
      isLogin:true,
      method:'post'
    });
  },
  /**
   * 用户点赞或取消点赞
   *
   */
  userGood(params) {
    return Ajax({
      url: '/lawyer/information/commentThumUp',
      envPreURL:'platform',
      data:params,
      isLogin:true,
      method:'post'
    });
  },


};
