<style lang="less" scoped>
@import '~@/assets/less/var.less';
.main{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
	bottom: 0;
	font-size: 12px;
	.wrapping{
		.row{
			display: -webkit-flex;
			display:flex;
			align-items:center;
			height: 1.28rem;
			background: #fff;
			margin-bottom: .24rem;
			.padding-32px;
			.title{
				font-size: .32rem;
				font-weight: bold;
				color: #333;
			}
			.time{
				font-size: .22rem;
				color: #999999;
				margin-top: .16rem;
			}
		}
	} 
}
</style>
<template>
  <div class="main">
	<b-scroll
		ref="userDatum"
		@scroll="scroll"
		:listen-scroll="listenScroll"
		:probe-type="probeType">
		<div class="wrapping">
			<div class="row" v-if="!isNotData" v-for="(item,i) in dataList" :key="getUuid() + i" @click="$router.push({name:'mySubscribeInfo',params: { uuid: item.uuid }})" >
				<div>
					<h5 class="title">{{item.demandDescr}}</h5>
					<p class="time">{{item.createTime}}</p>
				</div>
			</div>
		</div>
		<no-search v-if="isNotData"></no-search>
	</b-scroll>
  </div>
</template>
<script>
import mixin from '@/lib/mixin';
import noSearch from '@/pages/ucenter/my-subscribe-noSearch';
import {subscribe as subscribeApi} from '@/api/userDatum.api';

export default {
  	name:'mySubscribeList', 
	mixins: [mixin],
	components: {
      noSearch
	},
	data() {
		return {
			isNotData:false,
			dataList:[]
		}
	},
	mounted() {
        this.$nextTick(() => {
            this.$_init();
        });
	},
	methods: {
		$_init(){
			this.getList();
		},
		getList(){
			subscribeApi.list().then((response)=>{
				if(response.code != 1){
					this.isNotData = true;
					return;
				} 
				if(response.data.length < 1) this.isNotData = true;
				this.dataList = response.data;
			},(res)=>{
				this.isNotData = true;
			});
		}
	}
}
</script>

