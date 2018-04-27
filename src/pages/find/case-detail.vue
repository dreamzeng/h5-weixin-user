<template>
	<div class="case-detail">
		<call-app></call-app>
			<div class="table-wrap">
				<div class="case-table">
					<div class="header" v-html="data.title">
					</div>
					<div class="tr">
						<span>案由</span>
						<span v-html="data.cause"></span>
					</div>
					<div class="tr">
						<span>裁判时间</span>
						<span v-html="data.judgeTime"></span>
					</div>
					<div class="tr">
						<span>案号</span>
						<span v-html="data.causeNo"></span>
					</div>
					<div class="tr">
						<span>审理程序</span>
						<span v-html="data.proceeding"></span>
					</div>
					<div class="tr">
						<span>审理法院</span>
						<span v-html="data.trialCourt"></span>
					</div>
					<div class="tr">
						<span>案例来源</span>
						<span v-html="data.caseSource"></span>
					</div>
				</div>
			</div>
			<section class="section1">
				<h1>案例要旨</h1>
				<p v-html="data.caseGist"></p>
			</section>
			<section class="section2">
				<h1>案情简述</h1>
				<p v-html="data.caseBrief"></p>
			</section>
			<section class="section3">
				<h1>裁判结果</h1>
				<p v-html="data.judgment"></p>
			</section>
		<fast-menu bottom="2.7rem"></fast-menu>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				data:{},
				uuid:''
			}
		},
		mounted:function(){
			this.$store.dispatch("setTitle","真实案例");
			this.uuid=this.$route.query.uuid;
	      	this.getCaseInfo();
	    },
		methods:{
        	/*初始化*/
        	getCaseInfo:function(){
        		var that=this;
   				this.Api.find.caseDetail(this.uuid).then(res=>{
                	if(res.code != 1) return;
   					that.data=res.data;
   				});
        	}
        }
	}
</script>

<style lang="less" scoped>
@import '~@/pages/find/case-detail.less';
</style>