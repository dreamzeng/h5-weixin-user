<template>
	<div class="fywx-fast-menu-box">
                <div :class="!isShowTip?'show fywx-bg':'fywx-bg'" :style="!isShowTip?'background-color:rgba(0,0,0,0.7);':'background-color:rgba(0,0,0,0.5);'" @click="changeFastMenu"></div>
                <div :class="!isShowTip?'show fywx-fast-menu':'fywx-fast-menu'" :style="'bottom:'+bottom">
                    <div v-if="!isShowTip" @click="changeFastMenu" class="fm-first-tips"><img src="~@/assets/images/fm-cover-bg.png" alt=""></div>
                    <div class="fm-left" @click="changeFastMenu"></div>
                    <div class="fm-right">
                        <ul>
                            <li class="fmr-home fy-btn-white" @click="goUrl('/tab/home')">首页</li>
                            <li class="fmr-ls fy-btn-white" @click="goUrl('/lawyerList')">找律师</li>
                            <li class="fmr-fx fy-btn-white" @click="goUrl('/tab/find')">发现</li>
                            <li class="fmr-kf fy-btn-white" @click="goUrl('http://www.71chat.com/scsf/phone/visitor.html')">客服</li>
                        </ul>
                    </div>
                </div>
            </div>
</template>

<script>
	export default{
		name:"fast-menu",
		props:{
		   bottom:{
		   		type:String,
		   		default:''
		   }
		},
	    data(){
	        return{
	            isShowTip:false,
	        }
	    },
	    mounted(){
	        this.isShowTip=localStorage.getItem('isShowTip');
	    },
	    methods:{
	        changeFastMenu(){
	            if(!this.isShowTip){
	                 localStorage.setItem('isShowTip',true);
	                 this.isShowTip=true;
	            }
	            $(".fm-first-tips").remove();
	            if(!$(".fywx-fast-menu").hasClass('show')){
	                $(".fywx-bg").addClass("show");
	                $(".fywx-fast-menu").addClass("show");
	            }else{
	                $(".fywx-bg").removeClass("show");
	                $(".fywx-fast-menu").removeClass("show");
	            }
	        },
	        goUrl(url){
	            if(url=='http://www.71chat.com/scsf/phone/visitor.html'){
	                window.location.href='https://www.71chat.com/scsf/phone/visitor.html?cmpcd=142563';
	                return ;
	            }
	            this.$router.push({path:url});
	        }
	    }
	}
</script>

<style>
	/* 快捷菜单 */
.fywx-fast-menu{position:fixed;width:100%;z-index:3;right:0;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transform:translate(4.3rem,0);-moz-transform:translate(4.3rem,0);-ms-transform:translate(4.3rem,0);-o-transform:translate(4.3rem,0);transform:translate(4.3rem,0);-webkit-transition:transform .3s;-moz-transition:transform .3s;-ms-transition:transform .3s;-o-transition:transform .3s;transition:transform .3s;justify-content: flex-end;}
.fywx-fast-menu.show{z-index:9999; -webkit-transform:translate(0,0);-moz-transform:translate(0,0);-ms-transform:translate(0,0);-o-transform:translate(0,0);transform:translate(0,0);}
.fm-left{width:0.9rem;height:1rem;overflow:hidden;}
.fywx-fast-menu>.fm-left{background:url('~@/assets/images/fm-left-close.png') no-repeat center center;background-size:0.9rem auto;}
.show>.fm-left{background:url('~@/assets/images/fm-left-open.png') no-repeat center center;background-size:0.9rem auto;}
.fm-right{background-color:#fff;}
.fm-right>ul{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;overflow:hidden;}
.fm-right>ul>li{width:1.075rem;text-align:center;padding-top:0.56rem;line-height:0.44rem;font-size:0.2rem;color:#666;overflow:hidden;}
.fmr-home{background:url('~@/assets/images/fm-home.png') no-repeat center 0.16rem;background-size:0.44rem auto;}
.fmr-ls{background:url('~@/assets/images/fm-ls.png') no-repeat center 0.16rem;background-size:0.44rem auto;}
.fmr-fx{background:url('~@/assets/images/fm-fx.png') no-repeat center 0.16rem;background-size:0.44rem auto;}
.fmr-kf{background:url('~@/assets/images/fm-kf.png') no-repeat center 0.16rem;background-size:0.44rem auto;}

/* 灰色遮罩 */
.fywx-bg{position:fixed;opacity:0;visibility:hidden; width:100%;height:100%;top:0;left:0;z-index:9998;-webkit-transition:all .3s;-moz-transition:all .3s;-ms-transition:all .3s;-o-transition:all .3s;transition:all .3s;}
.fywx-bg.show{visibility:visible;opacity:1;}

/* 白色块点击效果 */
.fy-btn-white:active,.fy-btn-white:focus{background-color: rgba(0,0,0,0.1);}

/* 首次进页面提示 */
.fm-first-tips{position:absolute;width:100%;text-align:center;top:-3.8rem;right:-50%;-webkit-transform:translate(-50%,0);-moz-transform:translate(-50%,0);-ms-transform:translate(-50%,0);-o-transform:translate(-50%,0);transform:translate(-50%,0);}
.fm-first-tips>img{width:5.7rem;}
</style>