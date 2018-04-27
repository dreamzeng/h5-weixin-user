<template>
	<div class="make-comments">
		<div class="star">
			<div class="star-list" >
				<div class="light" ref="star" v-for="(item,index) in pageObj.starList" @click="starChoose(index,$event)" ></div>
			</div>
			<div class="level" v-html="levelText">
			</div>
		</div>
		<div class="service-process">
			<h3>服务过程</h3>
			<div class="process-comments" >
				<p v-for="(item,index) in data.processCommentLabels" @click="choosed(item.uuid,$event,'process')">{{item.name}}</p>
			</div>
		</div>
		<div class="service-manner">
			<h3>律师服务态度</h3>
			<div class="manner-comments">
				<p v-for="(item,index) in data.attitudeCommentLabels" @click="choosed(item.uuid,$event,'manner')">{{item.name}}</p>
			</div>
		</div>
		<label class="demo--label">
	        <input class="demo--radio" type="checkbox" name="demo-checkbox3" checked @change="check">
	        <span class="demo--radioInput"></span>匿名评价
	    </label>
		<div class="submit">
			<p  ref="submit" @click="submit()">提交</p>
		</div>
	</div>	
</template>

<script>
	export default{
		data(){
			return {
				value:[],
				data:{},
            	pageObj:{
            		starList:[1,2,3,4,5],
					starLevel:4,
					processChoosed:[],
					mannerChoosed:[],
					anonymous:"0",
					isError:false,
					orderUuid:'',
					lawyerUuid:''
            	}	
			}
		},
		 computed:{
	         levelText:function(){
				if(this.pageObj.starLevel==4){
					return "非常满意";
				}else if(this.pageObj.starLevel==3){
					return "满意";
				}else if(this.pageObj.starLevel==2){
					return "一般";
				}else if(this.pageObj.starLevel==1){
					return "差";
				}else{
					return "非常差";
				}
			}
        },
		mounted(){
			this.$store.dispatch("setTitle","订单评价");
			this.pageObj.orderUuid=this.$route.query.orderUuid;
			this.pageObj.lawyerUuid=this.$route.query.lawyerUuid;
			this.getList();
		},
		methods:{
        	/*星级评价*/
			starChoose:function(index,e){
				this.pageObj.starLevel=index;
				for(var i=0;i<=4;i++){
					if(i>index){
						(this.$refs.star)[i].setAttribute("class","grey");
					}else{
						(this.$refs.star)[i].setAttribute("class","light");
					}						
				}					
			},
			/* 获取标签列表*/
			getList:function(){
   				this.Api.order.orderComment().then(res=>{
                	if(res.code != 1) return;
   					this.data=res.data;
   				});
			},
			/*选中、取消选中判断*/
			choosed:function(uuid,e,type){					
				var className=e.target.getAttribute("class");
				if(className=="choosed"){
					e.target.setAttribute("class","");
					if(type=="process"){
						var index=this.pageObj.processChoosed.indexOf(uuid);
						this.pageObj.processChoosed.splice(index,1);
					}else{
						var index=this.pageObj.mannerChoosed.indexOf(uuid);
						this.pageObj.mannerChoosed.splice(index,1);
					}						
				}else{							
					if(type=="process"){
						console.log(this.pageObj.processChoosed.length);
						if(this.pageObj.processChoosed.length<5){
							this.pageObj.processChoosed.push(uuid);
							e.target.setAttribute("class","choosed");
						}else{
							mui.toast('最多只能选五个',{ duration:1000, type:'div' })
						}
					}else{
						if(this.pageObj.mannerChoosed.length<5){
							this.pageObj.mannerChoosed.push(uuid);
							e.target.setAttribute("class","choosed");
						}else{
							mui.toast('最多只能选五个',{ duration:1000, type:'div' })
						}
					}
				}
			},
			/* 提交评价*/
			submit:function(){
				console.log("pageObj.processChoosed:"+this.pageObj.processChoosed);
				console.log("pageObj.mannerChoosed:"+this.pageObj.mannerChoosed);
				var btnArray = ['取消', '确认'];
				var that=this;
				mui.confirm('', '提交评价', btnArray, function(e) {
					if (e.index == 1) {
						console.log("确认");								
						that.comment();															  
					} else {
						console.log("取消");
					}
				})	
			},
			/* 请求评价接口*/
			comment:function(){
				var that=this;
				var process=that.pageObj.processChoosed.join(",");
				var attitude=that.pageObj.mannerChoosed.join(",");
				var star=(that.pageObj.starLevel)+1;
				var anonymous=that.pageObj.anonymous;
				var data={
					"star":star,
					"process":process,
					"attitude":attitude,
					"anonymous":anonymous,
					"orderUuid":that.pageObj.orderUuid,
					"lawyerUuid":that.pageObj.lawyerUuid
				}
				console.log(data)
				this.Api.order.subComment(data).then(res=>{
					if(res.code != 1) return;
					mui.toast('评价已提交，感谢您的使用',{ duration:1000, type:'div' });
					this.$router.go(-1);
				})
			},
			/* 判断是否匿名评论*/
			check:function(){
				if(this.pageObj.anonymous=="1"){
					this.pageObj.anonymous="0";
				}else{
					this.pageObj.anonymous="1";
				}
			}
        }
	}
</script>
<style>
.mui-checkbox label, .mui-radio label{
	float:left;
}
</style>
<style lang="less" scoped>
@import "~@/pages/order/order-comment.less";
</style>