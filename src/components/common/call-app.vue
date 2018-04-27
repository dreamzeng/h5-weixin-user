<template>
	<div ref="head" v-if="flag">
			<header >
				<div class="header-l">
					<img src="~@/assets/images/closed.png" class="closed" @click="closed($event)"/>
					<div class="logo"></div>
					<div><p>法义-您的贴身律师</p><p>立即领取APP新人专享666元礼包</p></div>
				</div>				
				<a class="open" id="bu">打开</a>
			</header>
		</div>
</template>

<script>
export default {
	name:"call-app",
	data(){
		return {
			flag:true
		}
	},
	methods:{
		closed(){
			this.flag=false;
		}
	},
	mounted(){
		var iosRoot="http://uat_iosuser.fy13322.com";
		new lz.util.link({
            button: document.querySelector("#bu"),// 按钮
            androidLink: 'fyscheme://fyapp/open/article',// 安卓的打开链接
            androidDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.hhly.lawyeru",// 安卓的下载链接
            androidYyb: false,// android 是否开启应用宝下载
         	iosLink:'http://iosuser.fy13322.com/h5user/share/openApp.html',// ios 打开链接
            ios9Link:'http://iosuser.fy13322.com/h5user/share/openApp.html',// ios 的Universal Link
            iosDownloadUrl: "https://itunes.apple.com/cn/app/id1144040243?mt=8", // ios 的下载链接
            iosUniversalLinkEnabled: true, // 是否开启 Universal Link
            iosYyb: true,// ios 是否开启应用宝下载
            yybDownloadUrl: "https://itunes.apple.com/cn/app/id1144040243?mt=8",// 应用宝下载链接
            autoLaunchApp: false, // 是否打开页面就唤起APP
            autoRedirectToDownloadUrl: true,// 是否自动跳转到下载页面
       });
	}
	}
</script>

<style>
header{
	/*position: fixed;
	top:0;*/
	z-index: 9997;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height:0.98rem;
	color:#fff;
	font-size: 0.26rem;
	background: rgba(47,47,48,0.7);
	padding-left: 0.24rem;
	padding-right: 0.26rem;
}
header .header-l{
	display: flex;
	align-items: center;
	/*padding-right: 0.3rem;*/
}
header .header-l p{
	color:#fff;
	font-size: 0.26rem !important;
	margin-bottom: 0 !important;
}
.header-l .closed{
	width: 0.32rem;
	height:0.32rem;
}
.header-l .logo{
	width: 0.66rem;
	height:0.66rem;
	border-radius:0.14rem ;
	margin-left: 0.24rem;
	margin-right: 0.16rem;
	background: url(~@/assets/images/logo.png) no-repeat;
	background-size:0.66rem 0.66rem ;
}
header .open{
	color:#fff;
	width: 1.4rem;
	height:0.54rem;
	background: #00ccb1;
	text-align: center;
	line-height: 0.54rem;
	text-decoration: none;
}
</style>