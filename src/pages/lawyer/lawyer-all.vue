=<template>
	<div class="lawyer-list">
		<ul class="wrapper">
			<li v-for="(item,index) in lawyerlist" :key="index" @click="toLawyer(item.lawyerId)">
				<div class="img lawyerInfo" :lawyerId="item.lawyerId" >
					<img :src="item.logo" alt="" />
				</div>
				<div class="info lawyerInfo" :lawyerId="item.lawyerId">
					<div class="name">{{item.realName}} 律师</div>
					<div class="company">{{item.company}}</div>
					<div class="year">执业年限 {{item.workTime}}年 &nbsp;&nbsp;&nbsp;<span> 服务城市 {{item.city}}</span></div>
					<div class="level">
						<span v-for="(value,index) in [1,2,3,4,5]" :class="className(item.commentStar ,index)"></span>
						({{item.commentQuantity}})
					</div>
				</div>
				<button class="btn" @click.stop="demand(item.lawyerId)">预约他</button>
			</li>			
		</ul>
	</div>
</template>

<script>
export default {
	props:{
	   lawyerlist:{
	   	   type: Array,
	       require:true
	   }
	},
    methods:{
    	/*星星显示判断*/
    	className(val,index){
    		var integer=Math.floor(val/1);
    		var surplus=val%1;
    		if(index<=(integer-1)){
    			return 'light';
    		}else if(index==integer){
    			if(surplus>0){
    				return 'ban';
    			}else{
    				return '';
    			}
    		}else{
    			return '';
    		}			
    	},
    	toLawyer(lawyerId){
    		this.$router.push({path:'/lawyerDetail',query:{'lawyerId':lawyerId,'goodsId':this.$route.query.goodsId}});

    	},
    	/*点击联系他跳转填写资料*/
    	demand(lawyerId){
    		let goodsId=this.$route.query.goodsId;
    		this.$router.push({path:'/writeInfo',query:{'lawyerId':lawyerId,'goodsId':goodsId,'bizType':1}});
    	}
	}
	}
</script>

<style>
.lawyer-list{
	width:100%;
	padding: 0 0.32rem;
	background: #fff;
}
.lawyer-list li{
	width:100%;
	height:2.2rem;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	    -ms-flex-align: center;
	        align-items: center;
	position: relative;
}
.lawyer-list li:after{
	position: absolute;
    right: 0;
    bottom:0;
    height: 1px;
    width: 5.4rem;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaley(.5);
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    background-color: #e1e1e1;
}
.lawyer-list .img{
	width:1.28rem;
	height:1.28rem;
	border-radius:1.28rem ;
	overflow: hidden;
}
.lawyer-list .img img{
	width:1.28rem;
	height:1.28rem;
}
.lawyer-list .info{
	-webkit-box-flex: 1;
	    -ms-flex-positive: 1;
	        flex-grow: 1;
	margin-left: 0.18rem;
	color:#999;
	font-size: 0.24rem;
	line-height: 0.4rem;
	margin-top: 0.2rem;
}
.lawyer-list .info .name{
	font-size: 0.36rem;
	color:#666;
}
.lawyer-list .info .company{
	min-height: 0.36rem;
}
.lawyer-list .level span{
	display: inline-block;
	width: 0.19rem;
	height: 0.16rem;
	background: url(~@/assets/images/star1.png);
	background-size:cover ;
	margin-right: 0.1rem;
}
.lawyer-list .level .light{
	background: url(~@/assets/images/star.png);
	background-size:cover ;
}
.lawyer-list .level .ban{
	background: url(~@/assets/images/ban.png);
	background-size:cover ;
}
.lawyer-list .btn{
	width: 1.48rem;
	height: 0.6rem;
	background: #00ccb1;
	border:0;
	color:#fff;
	text-align: center;
	font-size: 0.24rem;
	border-radius: 0.3rem 0.3rem;
}
button:enabled:active{
    background-color: #00ab94!important;
    color:#fff !important;
}
</style>