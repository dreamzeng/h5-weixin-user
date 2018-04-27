<style lang="less" scoped>
@import '~@/assets/less/var.less';
.slide-enter-active, .slide-leave-active{
    transition: all 0.3s
 }
.slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
 }
.main{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
	bottom: 0;
	font-size: 12px;
    background: #fff;
    .wrapping{
        .row{
            display: -webkit-flex;
			display:flex;
			align-items:center;
			height: 1.04rem;
			background: #fff;
            .padding-32px;
            font-size: .3rem;
            color: #333;
            .label{
                flex: 0 0 2.14rem;
                width: 2.14rem;
            }
            .field{
                flex: 1;
                line-height: .44rem;
            }
        }
    }
}
</style>

<template>
    <transition name="slide">
        <div class="main">
            <b-scroll
                ref="userDatum"
                @scroll="scroll"
                :listen-scroll="listenScroll"
                :probe-type="probeType">
                <div class="wrapping">
                    <div class="row fy-border-b-e1" v-if="dataList.nickName">
                        <div class="label">姓名</div>
                        <div class="field">{{dataList.nickName}}</div>
                    </div>
                    <div class="row fy-border-b-e1" v-if="dataList.userMobile">
                        <div class="label">手机号码</div>
                        <div class="field">{{dataList.userMobile}}</div>
                    </div>
                    <div class="row fy-border-b-e1" v-if="dataList.companyName">
                        <div class="label">公司名称</div>
                        <div class="field">{{dataList.companyName}}</div>
                    </div>
                    <div class="row fy-border-b-e1" v-if="dataList.city">
                        <div class="label">律师地址</div>
                        <div class="field">{{dataList.city}}</div>
                    </div>
                    <div class="row fy-border-b-e1" v-if="dataList.demandDescr">
                        <div class="label">需求描述</div>
                        <div class="field">{{dataList.demandDescr}}</div>
                    </div>
                </div>
            </b-scroll>    
        </div>
    </transition>
</template>

<script>
import mixin from '@/lib/mixin';
import {subscribe as subscribeApi} from '@/api/userDatum.api';

export default {
  	name:'mySubscribeInfo', 
    mixins: [mixin],
    data(){
        return {
            dataList:[]
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.$_init();
        });
    },
    methods: {
		$_init(){
			this.getInfo();
		},
		getInfo(){
            let uuid = this.$route.params.uuid;
			subscribeApi.info({uuid}).then((response)=>{
				if(response.code != 1) return;
				this.dataList = response.data;
			});
		}
	}

}
</script>

