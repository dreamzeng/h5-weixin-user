<template>
	<div id="pageContainer">
		<!-- <header-bar :title= "'律师服务'" :isSearch="false"></header-bar> -->
		<div class="lawyer-service-all">
			<div class="fy-border-b-e1" v-for="item in data" :key="item.id">
				<p>{{item.categoryName}}</p>
				<ul>
					<li v-for="value in item.goodsDetailList" :key="value.id">
						<span>{{value.goodsName}}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
  	@import '~@/assets/less/fycommon.less';
	@import '~@/pages/lawyer/lawyer-service.less';
</style>
<script>
	export default {
		data:function(){
			return { 
				data:{},
				appObj:{},
				pageObj:{}
			}
		},
		mounted:function(){
			this.init();
		},
		methods: {
			init:function(){
				var that=this;
				let params={
					lawyerId:that.$route.query.lawyerId
				}
				setTimeout(function(){
					$(".lawyer-service-all").show();
				},10);
			
				this.Api.lawyer.lawyerServicelInit(params).then(result => {
					if (result && result.code == 1) {
						setTimeout(function(){
							$(".article-detail").show();
						},10);
						that.data=result.data;
					}
				});
			}
		}
	}
</script>
