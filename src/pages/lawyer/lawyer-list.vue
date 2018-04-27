<template>
	<div id="pageContainer" :class="{matchLawyer:pageObj.goodsId}">
		<header>
			<div class="domain" ref="domainHead" @click="getDomain($event)" v-if="!pageObj.goodsId">{{pageObj.address}}</div>
			<div class="year light-r" ref="year" @click="year($event)">执业年限</div>
			<div class="comment" ref="comment" @click="comment($event)">好评率</div>
			<div class="order" ref="order" @click="order($event)"  v-if="pageObj.goodsId">接单数</div>
		</header>
		<button class="recommend" @click="recommend" v-if="!pageObj.isError">	
			为我推荐
		</button>
		<div class="shade" ref="shade" @click="domain" v-if="!pageObj.goodsId&&!pageObj.isError">				
		</div>
		<div class="domain-list" ref="domain" v-if="!pageObj.goodsId&&!pageObj.isError">
			<ul>
				<li @click="changecaseId('')">不限</li>
				<li v-for="(item,index) in pageObj.domainList" @click="changecaseId(item.name)" :key="index">{{item.name}}</li>					
			</ul>
		</div>
		<div class="home-wrapping">
			<vertical-scroll 
				ref="scroll"
				:data="data"
				:scrollbar="scrollbarObj"
				:pullUpLoad="pullUpLoadObj"
				@pullingUp="onPullingUp">
				<div slot="listContent">
					<lawyer-all :lawyerlist="data"></lawyer-all>
				</div>
			</vertical-scroll>
		</div>
		<fast-menu bottom="2.7rem"></fast-menu>
	</div>
</template>

<script>
import lawyerAll from './lawyer-all.vue';
export default {
	components: {
	    'lawyer-all': lawyerAll
	  },
	data(){
		return {
			data:[],
        	pageObj:{
        		domainFlag:true,
        		yearFlag:true,
        		commentFlag:true,
        		orderFlag:true,
        		domainList:[],
        		specCombId:'',
        		pageObj:[],
        		goodsId:'',
        		address:'地区',
        		city:'',
        		cityName:'',
        		page:1,
        		limit:20,
        		isError:false,
        		searchType:1,//1 执业年限 2 好评率 3 接单数
        		orderType: 2//排序类型 1 升序  2 降序
        	},
        	items:[],
			scrollbar:false,
			scrollbarFade: true,
			pullUpLoad: true,
			pullUpLoadThreshold: 0,
			pullUpLoadMoreTxt: '加载更多',
			pullUpLoadNoMoreTxt: '没有更多数据了'
		}
	},
	computed: {
		scrollbarObj: function () {
			return this.scrollbar ? {fade: this.scrollbarFade} : false
		},
		pullUpLoadObj: function () {
			return this.pullUpLoad ? {
				threshold: parseInt(this.pullUpLoadThreshold),
				txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
			} : false
		}
	},
	watch: {
		scrollbarObj: {
			handler() {
				this.rebuildScroll();
			},
			deep: true
		},
		pullUpLoadObj: {
			handler(val) {
				const scroll = this.$refs.scroll.scroll
				if (val) {
				scroll.openPullUp();
				} else {
				scroll.closePullUp();
				}
			},
			deep: true
		}
	},
	 mounted(){
	 	this.pageObj.goodsId=this.$route.query.goodsId;
	 	this.pageObj.city=this.$store.getters.cityName;
	 	this.pageObj.specCombId=this.$route.query.specCombId;
	  	if(this.pageObj.goodsId&&this.pageObj.city){
	  		this.getMatchLawyerList();
	  	}else{
	  		this.getLawyerList();
	  	}
    },
    methods: {
    	/*获取匹配律师列表*/
    	getMatchLawyerList(){
    		var that=this;
			var data={
				"specCombId":this.pageObj.specCombId,
				"city":this.pageObj.city,
				"goodsId":this.pageObj.goodsId,
				"searchType":this.pageObj.searchType,
				"orderType":this.pageObj.orderType,
				"page":this.pageObj.page,
				"limit":this.pageObj.limit
			}
			this.Api.service.matchLawyerList(data).then(res=>{
				if(res.code==1){
					if(this.pageObj.page==1){
						that.data=[];
					}
					for(var i=0;i<res.data.length;i++){
						that.data.push(res.data[i]);
					}
					if(res.data.items==null||res.data.items.length==0){
						this.$refs.scroll.forceUpdate();
					}
				}
			});
    	},
    	/* 获取律师列表*/
    	getLawyerList(cityName){
    		var that=this;
			var data={
				"searchType":this.pageObj.searchType,
				"orderType":this.pageObj.orderType,
				"page":this.pageObj.page,
				"limit":this.pageObj.limit
			}
			if(cityName){
				that.pageObj.cityName=cityName;
				data.cityName=cityName;
			}
			console.log(JSON.stringify(data));
			this.Api.service.lawyerList(data).then(res=>{
				if(res.code != 1) return;
				if(this.pageObj.page==1){
					that.data=[];
				}
				for(var i=0;i<res.data.items.length;i++){
					that.data.push(res.data.items[i]);
				}
				if(res.data.items==null||res.data.items.length==0){
					this.$refs.scroll.forceUpdate();
				}
				that.$refs.domain.setAttribute("style","display: none;");
    			that.$refs.shade.setAttribute("style","display: none;");
			});
    	},
    	/*请求擅长领域接口*/
    	getDomain(e){
    		console.log((this.pageObj.domainList).length);
    		if((this.pageObj.domainList).length){
    			this.domain(e);
    		}else{
    			var that=this;
        		this.Api.service.caseTypes().then(res=>{
        			if(res.code != 1) return;
        			that.pageObj.domainList=res.data;
   					that.domain(e);
        		});
    		}
    	},
    	/*点击擅长领域弹出遮罩*/
    	domain(e){
    		if(this.pageObj.domainFlag){
                this.$refs.domainHead.setAttribute("class","domain light");
                this.$refs.domain.setAttribute("style","display: block;");
                this.$refs.shade.setAttribute("style","display: block;");
    			this.pageObj.domainFlag=!this.pageObj.domainFlag;
    			var domscrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	            document.body.className = 'fix';
	            document.body.style.margin = (-domscrollTop) +'px 0 0 0';
    		}else{
                this.$refs.domainHead.setAttribute("class","domain");
                this.$refs.domain.setAttribute("style","display: none;");
                this.$refs.shade.setAttribute("style","display: none;");
    			this.pageObj.domainFlag=!this.pageObj.domainFlag;
    			 document.body.className = '';
				 document.body.style.margin = 0;
				document.body?document.body.scrollTop = domscrollTop:document.documentElement.scrollTop = domscrollTop;
    		}		        		
    	},
    	/* 点击执业年限*/
    	year(e){
    		this.pageObj.page=1;
    		this.pageObj.searchType=1;
    		if(!this.pageObj.goodsId){
    			if(!this.pageObj.domainFlag){
    				this.domain();
    			}
    		}else{
    			this.$refs.order.setAttribute("class","order");
    		}
    		this.$refs.comment.setAttribute("class","comment");
    		if(this.pageObj.yearFlag){
    			this.pageObj.orderType=1;
    			e.target.setAttribute("class","year light-l");
    			this.pageObj.yearFlag=!this.pageObj.yearFlag;
    		}else{
    			this.pageObj.orderType=2;
    			e.target.setAttribute("class","year light-r");
    			this.pageObj.yearFlag=!this.pageObj.yearFlag;
    		}
    		if(this.pageObj.goodsId&&this.pageObj.city){
			  		this.getMatchLawyerList();
			  	}else{
			  		this.getLawyerList();
			  	}
    	},
    	/* 点击好评率*/
    	comment(e){
    		this.pageObj.page=1;
    		this.pageObj.searchType=2;
    		if(!this.pageObj.goodsId){
    			if(!this.pageObj.domainFlag){
    				this.domain();
    			}
    		}else{
    			this.$refs.order.setAttribute("class","order");
    		}
    		this.$refs.year.setAttribute("class","year");
    		if(this.pageObj.commentFlag){
    			this.pageObj.orderType=1;
    			e.target.setAttribute("class","comment light-r");
    			this.pageObj.commentFlag=!this.pageObj.commentFlag;
    		}else{
    			this.pageObj.orderType=2;
    			e.target.setAttribute("class","comment light-l");
    			this.pageObj.commentFlag=!this.pageObj.commentFlag;
    		}
    		if(this.pageObj.goodsId&&this.pageObj.city){
			  		this.getMatchLawyerList();
		  	}else{
		  		this.getLawyerList();
		  	}
    	},
    	/*点击接单数*/
    	order(e){
    		this.pageObj.page=1;
    		this.pageObj.searchType=3;
    		this.$refs.year.setAttribute("class","year");
    		this.$refs.comment.setAttribute("class","comment");
    		if(this.pageObj.orderFlag){
    			this.pageObj.orderType=1;
    			e.target.setAttribute("class","order light-r");
    			this.pageObj.orderFlag=!this.pageObj.orderFlag;
    		}else{
    			this.pageObj.orderType=2;
    			e.target.setAttribute("class","order light-l");
    			this.pageObj.orderFlag=!this.pageObj.orderFlag;
    		}
    		if(this.pageObj.goodsId&&this.pageObj.city){
			  	this.getMatchLawyerList();
		  	}else{
		  		this.getLawyerList();
		  	}
    	},
    	/*选择擅长领域 页面重置*/
    	changecaseId(name){
    		this.pageObj.page=1;
    		this.pageObj.address=name||'地区';
    		this.data=[];
    		this.pageObj.domainFlag=true;
    		this.getLawyerList(name);
    	},
    	onPullingUp() {
			this.pageObj.page++;
    		var that=this;
    		setTimeout(function(){
    			if(that.pageObj.goodsId&&that.pageObj.city){
	    			that.getMatchLawyerList();
	    		}else{
	    			that.getLawyerList(that.pageObj.cityName);		        			
	    		}
    		},500);
		},
		rebuildScroll() {
			this.$nextTick(() => {
				this.$refs.scroll.destroy();
				this.$refs.scroll.initScroll();
			})
		},
		/*点击为我推荐跳转*/
		recommend(){
			let params={
				"kind":0
			}
			if(this.pageObj.goodsId){
				params.goodsId=this.pageObj.goodsId;
				params.bizType=1;
			}
			this.$router.push({path:'/enterpriseServicewrite',query:params});
		},
		/*判断星星*/
		className(val,index){
    		var integer=Math.floor(val/20);
    		var surplus=val%20;
    		if(index<=(integer-1)){
    			return 'light';
    		}else if(index==integer){
    			if(surplus>0&&surplus<=10){
    				return 'ban';
    			}else if(surplus>10){
    				return 'light';
    			}
    		}else{
    			return '';
    		}
    	}
    }
    
}
</script>
<style lang="less" scoped>
.home-wrapping{position: fixed;width: 100%;top:0.8rem;bottom: 0;}
@import '~@/pages/lawyer/lawyer-list.less';
</style>