/* 
   登录 API
*/
import Ajax from 'lib/Ajax';

export default {
  //微信登录
  wexinLogin(params) {
    return Ajax({
      url: '/oauth2/wx-interface-login',
      method: 'post',
      data: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //查询用户信息
  userInfo() {
    return Ajax({
      url: '/user/user-info',
      method: 'get',
      params:null,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //注册用户信息并登录
  register(params){
    return Ajax({
      url: '/oauth2/wx-interface-third-register',
      method: 'post',
      data: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //手机验证码预校验
   testCode(params){
    return Ajax({
      url: '/user/validate-code',
      method: 'post',
      data: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //获取手机验证码
  getCode(params){
    return Ajax({
      url: '/user/verifiedSendSms',
      method: 'get',
      params: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      },
      config:{
      	loading:false
      }
    });
  },
  //更新手机号
  updatePhone(params){
    return Ajax({
      url: '/user/update-phone',
      method: 'post',
      data: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //修改密码
  changePsd(params){
    return Ajax({
      url: '/user/pass',
      method: 'post',
      data: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //绑定手机号
  bindPhone(params){
  	return Ajax({
      url: 'oauth2/wx-bind-platform-account',
      method: 'post',
      data: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //获取 JS-SDK使用权限签名
  jssdk(params){
  	return Ajax({
      url: 'wx-mp/jssdk-sgin',
      method: 'get',
      params: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //校验图像码
  checkImageCode(params){
  	return Ajax({
      url: 'user/checkCodeAndSendSms',
      method: 'get',
      params: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  },
  //解绑账号
  unbind(params){
  	return Ajax({
      url: 'oauth2/unbind-thirdAccount',
      method: 'post',
      data: params,
      headers:{
      	"Fy-System-Agent":"H5_User"
      }
    });
  }
};
