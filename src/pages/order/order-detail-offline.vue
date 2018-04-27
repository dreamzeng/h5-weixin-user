<template>
	<div >
		<call-app></call-app>
        <fast-menu bottom="1.3rem"></fast-menu>
	    <header>
	        <div>
	            <span v-html="state" class="state"></span>
	        </div>
	        <p class="roll-l">        	
	        </p>
	        <p class="roll-r">        	
	        </p>
	    </header>
	    <section class="section1 scaley-a">
	        <div class="scaley-b-b">
	            <label>服务名称</label>
	            <div class="text-overflow" id="text-overflow" @click="goodsName"> 
	            	<img :src="data.goodsUrl" alt="" class="goodsName"/>
	            	<div>
	            		<p v-html="data.goodsName" :class="{service:!data.specCombDesc}"></p>
						<p v-if="data.specCombDesc">{{data.specCombDesc}}</p>
	            	</div>
	            </div>
	        </div>
	        <div class="scaley-b-b">
	            <span class="price">服务价格</span>
	            <span class="text-overflow"  v-html="'¥'+(data.amount*1).toFixed(2)"></span>
	        </div>
	        <div class="scaley-b-b guanfei" v-if="data.govermentPrice>0">
	            <label>官费</label>
	            <span class="text-overflow"  v-html="'¥'+data.govermentPrice"></span>
	        </div>
			
		   <div class="shifu-d"  v-if="data.couponAmount&&data.state.code!=10">
	            <label class="shifu-l">优惠券</label>
	            <span class="yhj text-overflow">¥{{data.couponAmount}}</span>
	        </div>
	      <div class="shifu-d"  v-if="data.couponAmount&&data.state.code!=10">
	            <label class="shifu-l">实付</label>
	            <span class="yhj text-overflow">¥{{data.totalPrice}}</span>
	        </div>
	
	    </section>
	    <section class="section2 scaley-b">
	        <div class="scaley-a-b" @click="lawyerUrl()">
	            <div class="scaley-b-b">
	                <span>服务提供方</span>
	            </div>
	            <div>
	                <img :src="data.logo">
	                <div>
	                    <span v-html="data.serverNickname"></span>
	                    <span v-html="data.lawyerCompany"></span>
	                </div>
	            </div>
	        </div>
	    </section>
	    <section class="section3">
	    	<div >
	    		 <label>订单编号:</label>
	            <span v-html="data.orderNo"></span>
	    	</div>
	    	<div v-if="data.createTime">
	            <label>订单生成时间:</label>
	            <span v-html="data.createTime"></span>
	        </div>
	        <div v-if="data.payTime">
	            <label>支付时间:</label>
	            <span v-html="data.payTime"></span>
	        </div>
	        <div v-if="data.userSureTime">
	            <label>交付时间:</label>
	            <span v-html="data.userSureTime"></span>
	        </div>
	    </section>
	</div>

</template>

<script>
	export default{
		 data(){
            return {
                data:{},
            };
            },
        computed:{
            /*订单状态显示*/
            state:function () {
              switch(this.data.orderStatus){
              	case 1:
              	return '待付款'
              		break;
              	case 2:
              	return	'已付款'
              		break;
                case 3:
              	return	'交易完成'
              		break;
              	case 4:
              	return	'交易关闭'
              		break;
              }
            },
        },
        mounted(){
        	this.data=JSON.parse(localStorage.getItem("item"));
        	console.log(this.data);
        },
         methods: {       
            /*服务详情*/
            goodsName:function () {
                console.log("--服务详情----------");
               	var goodsId= this.data.goodsId;
                if(this.data.type.code!=11&&this.data.type.code!=13){
                 this.$router.push({path:"/serviceDetail",query:{
	         		'goodsinfoId':goodsId,
	         		}});
               }
            },
            /*律师详情*/
            lawyerUrl:function () {
                this.$router.push({path:"/lawyerDetail",query:{
	         		'lawyerId':this.data.lawyerId,
                    'orderNo':this.data.orderNo
	         	}});
			}
        }
	}
</script>
<style>
.mui-popup-button{
  	color:#00ccb1;
  }
.mui-checkbox label, .mui-radio label{
	float: left;
}
</style>
<style lang="less" scoped>
@import "~@/pages/order/order-detail.less";
</style>