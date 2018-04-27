<template>
  	<div id="pageContainer">
        <div>
            <div class="download">
                <p>提交成功</p>
                <p>法小义已火速为您联系律师，律师会在三个工作日内与您联系，保持电话畅通哦~</p>
                <div class="code">
                    <img src="~@/assets/images/code.jpg" alt="" />
                </div>
                <p><span>下载法义APP，随时随地掌握最新进展</span></p>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
 *, :after, :before{
	-webkit-box-sizing: border-box;
	        box-sizing: border-box; 
	word-break: break-all;
	padding: 0;
    margin: 0;
}
#pageContainer{
    height:100%;
    background: #fff!important;
}
.download{
	width:100%;
	height:100%;
	font-size:0.28rem ;
	background: url('~@/assets/images/success.png') no-repeat center 0.6rem;
	background-size: 2.4rem 2rem;
	text-align: center;
	color:#999;
	padding: 0.6rem 0.68rem 0;
	line-height: 0.4rem;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-ms-flex-wrap: wrap;
	    flex-wrap: wrap;
	-webkit-box-pack: center;
	    -ms-flex-pack: center;
	        justify-content: center;
}
.download p:nth-child(1){
	font-size:0.32rem ;
	margin-top: 2.2rem;
	margin-bottom: 0.1rem;
}
.download .code{
	width: 2.18rem;
	height:2.18rem;
	border:0.04rem solid #1b1b1f;
	margin-top: 0.82rem ;
	margin-bottom: 0.42rem;

}
.download .code img{
	width: 2.1rem;
	height:2.1rem;
}
.download p:nth-child(5) span{
	display: inline-block;
	width:3.66rem;
}
</style>