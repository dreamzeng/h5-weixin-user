<template>
<div id="pageContainer">
			<div v-if="!pageObj.topFlag">
				<call-app></call-app>
			</div>
		 	<div class="si-top-menu fy-border-b-e1 fixed" v-if="pageObj.topFlag">
                <ul :class="'si-top-bar '+((data.bizFaq&&data.bizFaq.length>0)?'':'si-top-bar-li-50')">
                    <li class="active" @click="changeTopBarActive(0)">服务</li>
                    <li @click="changeTopBarActive(1)">详情</li>
                    <li v-if="data.bizFaq&&!isNoString(data.bizFaq)" @click="changeTopBarActive(2)">常见问题</li>
                </ul>
                <div :class="'si-top-bar-underline '+(data.bizFaq&&!isNoString(data.bizFaq)?'':'si-top-bar-underline-50')"></div>
            </div>
            <!-- 头部菜单 -->
            <div :class="pageObj.topFlag?'si-top-menu fy-border-b-e1 hide':'si-top-menu fy-border-b-e1'" id="top-menu" >
                <ul :class="'si-top-bar '+((data.bizFaq&&data.bizFaq.length>0)?'':'si-top-bar-li-50')">
                    <li class="active" @click="changeTopBarActive(0)">服务</li>
                    <li @click="changeTopBarActive(1)">详情</li>
                    <li v-if="data.bizFaq&&!isNoString(data.bizFaq)" @click="changeTopBarActive(2)">常见问题</li>
                </ul>
                <div :class="'si-top-bar-underline '+(data.bizFaq&&!isNoString(data.bizFaq)?'':'si-top-bar-underline-50')"></div>
            </div>
            <!--<div class="box-84"></div>-->
            <!-- 服务 -->
            <div class="si-content mb-110">
                <!-- 服务基本信息 -->
                <div class="fy-detail-box">
                    <h1 class="fs-44 color-20 mt-24 fw-bold word-wrap">{{data.name}}</h1>
                    <p class="fs-24 color-9 mt-40">
                        <span class="color-price-red mr-10"><i class="fs-26 color-price-red">¥</i><i class="fs-36 color-price-red">{{pageObj.newPrice}}</i>{{pageObj.newPriceUnit}}</span>
                        <span class="mr-40 color-b0">{{data.pricePrefix}}</span>
                        <span class="fy-del-line mr-10 color-9">¥<i class="fs-28 color-9">{{data.originalPrice}}</i></span>
                        <span class="color-b0">市场价</span>
                    </p>
                    <ul class="si-case-box mt-20" v-if="data.specs&&data.specs.length>0">
                        <li v-for="(info,index) in data.specs">
                            <div class="si-case-name">{{info.specName}}</div>
                            <ul class="si-service-case">
                                <li v-for="item in info.specAttrs" :id="index+'-'+item.symbol" ref="serviceCase">{{item.specAttrName}}</li>
                            </ul>
                        </li>
                    </ul>
                    <p class="fs-28 mt-20 mb-24 word-wrap" v-if="data.descr&&data.descr.length>0">{{substrText(data.descr,100,true)}}</p>
                </div>
                <!-- 平台担保 -->
                <div class="fy-detail-box fy-border-t-e1 si-ptdb-box" @click="showBox('sib-ptdb')">
                    <p class="si-ptdb fy-right-arrow fs-22">
                        <span>平台担保</span>
                        <span>服务保障</span>
                        <span>先行赔付</span>
                    </p>
                </div>
                <!-- 服务内容 -->
                <div class="fy-detail-split-bar" v-if="pageObj.newContent&&!isNoString(pageObj.newContent)"></div>
                <div class="fy-detail-box" v-if="pageObj.newContent&&!isNoString(pageObj.newContent)">
                    <h2 class="fs-32 color-3 fw-bold mt-16">服务内容</h2>
                    <div class="fy-detail-box-content fs-28 mt-40 mb-20" v-html="pageObj.newContent"></div>
                </div>
                <!-- 服务时间 -->
                <div class="fy-detail-split-bar" v-if="pageObj.newServiceTimeDesc&&!isNoString(pageObj.newServiceTimeDesc)"></div>
                <div class="fy-detail-box" v-if="pageObj.newServiceTimeDesc&&!isNoString(pageObj.newServiceTimeDesc)">
                    <h2 class="fs-32 color-3 fw-bold mt-16">服务时间</h2>
                    <div class="fy-detail-box-content fs-28 mt-40 mb-20" v-html="pageObj.newServiceTimeDesc"></div>
                </div>
                <!-- 服务流程 -->
                <div class="fy-detail-split-bar"></div>
                <div class="si-fwlc">
                    <h2 class="fs-32 color-3 fw-bold mt-16">服务流程</h2>
                    <div class="si-fwlc-content fs-28 mt-40 mb-20">
                       <img src="~@/assets/images/si-fwlc.png" alt="">
                    </div>
                </div>
                <!-- 统计 -->
                <div class="fy-detail-split-bar"></div>
                <div class="fy-detail-box fy-border-t-e1 fy-display-flex">
                    <div><img class="si-logo" src="~@/assets/images/si-logo.png" alt=""></div>
                    <ul class="si-count">
                        <li>
                            <div>
                                <p>
                                    <span class="fs-40 color-3">10</span>
                                    <span class="color-3">万+</span>
                                </p>
                                <p class="fs-24 word-nowrap">累计服务数</p>
                            </div>
                           
                        </li>
                        <li>
                            <div>
                                <p>
                                    <span class="fs-40 color-3">8</span>
                                    <span class="color-3">亿+</span>
                                </p>
                                <p class="fs-24 word-nowrap">累计为用户节省费用</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 详情 -->
            <div class="si-content mb-110 fy-hide">
                <!-- 提交材料 -->
                <div class="fy-detail-box" v-if="pageObj.newSubmitInformation&&!isNoString(pageObj.newSubmitInformation)">
                    <h2 class="fs-32 color-3 fw-bold mt-10">提交材料</h2>
                    <div class="fy-detail-box-content fs-28 mt-30" v-html="pageObj.newSubmitInformation"></div>
                </div>
                <div class="fy-detail-split-bar" v-if="pageObj.newSubmitInformation&&!isNoString(pageObj.newSubmitInformation)"></div>
                <!-- 免责声明 -->
                <div class="fy-detail-box" v-if="data.disclaimer&&!isNoString(data.disclaimer)">
                    <h2 class="fs-32 color-3 fw-bold mt-10">免责声明</h2>
                    <div class="fy-detail-box-content fs-28 mt-30" v-html="data.disclaimer"></div>
                </div>
                <div class="fy-detail-split-bar" v-if="data.disclaimer&&!isNoString(data.disclaimer)"></div>
                <!-- 售后保障 -->
                <div class="fy-detail-box" v-if="data.afterSaleService&&!isNoString(data.afterSaleService)">
                    <h2 class="fs-32 color-3 fw-bold mt-10">售后保障</h2>
                    <div class="fy-detail-box-content fs-28 mt-30" v-html="data.afterSaleService"></div>
                </div>
            </div>  
            <!-- 常见问题 -->
            <div class="si-content mb-110 fy-hide">
                <div class="sic-questions" v-html="data.bizFaq"></div>
            </div>
            <!-- 底部菜单 -->
            <ul class="si-footer">
            	<li :class="data.collectionState?'collected':''" @click="collect">
            		<div>收藏</div>
            	</li>
                <li class="fs-24 bg-c-f fy-border-l-e1">
                    <span class="color-price-red fs-26">¥</span>
                    <span class="fs-38 color-price-red">{{pageObj.newPrice}}</span>
                    <span class="color-price-red">{{pageObj.newPriceUnit}}</span>
                </li>
                <li class="fs-36 bg-c-bottom-orange color-f fy-btn-orange" @click="matchLawyer">
                    <span class="si-match-lawyer-btn">匹配律师</span>
                </li>
            </ul>
            <!-- 平台担保底部弹层 -->
			<div class="service-introduce-basic fy-border-t-e1 sib-ptdb">
                <h3>基础服务</h3>
                <div class="sib-content">
                    <ul>
                        <li>
                            <h5>平台担保</h5>
                            <p>支付费用，平台担保，服务满意后将款项支付给律师</p>
                        </li>
                        <li>
                            <h5>服务保障</h5>
                            <p>平台对律师信息核实认证，对律师服务给予监督，确保服务质量</p>
                        </li>
                        <li>
                            <h5>保险赔付</h5>
                            <p>因律师或平台的不当行为导致了用户的经济或名誉损失，太平洋保险将在限额内进行赔付。</p>
                        </li>
                    </ul>
                </div>
                <div class="button">
                    <button class="compbtn" @click="closeBox">完成</button>
                </div>
            </div>
            <!-- 灰色遮罩 -->
            <div class="graybox" @click="closeBox"></div>
            <fast-menu bottom="3.4rem"></fast-menu>
            <newbie></newbie>
          </div>
   
</template>
<script>
import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
      	data:[],
      	pageObj:{
      		tloffsetTop:'',
      		topFlag:false,
	        goodsId:0,//服务id
	        location:"",//定位城市
	        sltSymbols:[],//已选组合
	        sltCombinationId:0,//已选组合id
	        newPrice:'',//服务价格（没有组合时显示服务基础价格，有组合时显示组合价格）
	        newPriceUnit:"",//服务价格单位（没有组合时显示服务基础价格单位，有组合时显示组合价格单位）
	        newContent:'',//服务内容
	        newServiceTimeDesc:'',//服务时间
	        newSubmitInformation:'',//服务提交资料
	        flag:false,//防止重复提交标识
	        collectState:0,//收藏状态
	        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZWFsTmFtZSI6IuiClui_sOadvuOAgiIsInBob25lIjoiMTU5MTQxMDQ1MjAiLCJzZXgiOiJNYWxlIiwid2FzTG9naW4iOnRydWUsImxvZ28iOiJodHRwOi8vcmVzb3VyY2UuaGFvMTMzMjIuY29tL3VzZXIvdXNlci5wbmciLCJpZCI6MTkyNSwidXNlck5hbWUiOiIxNTkxNDEwNDUyMCIsInR5cGUiOiJVc2VyIiwiZXhwIjoxNTE0NDQ3OTE0MjcyfQ.Kz7JRaMFz0E_6Feo8ManHIFBS2hj0agZidxwY0Ou7J8'
	    }
      }
    },
     mounted:function(){
        this.pageObj.goodsId =this.$route.query.goodsId;
        this.pageObj.location=this.$store.getters.cityName;
        this.getDataInfo();
        this.introFixtl();
    },
    methods: {
        // 获取服务详情
        getDataInfo:function(){
            var _this=this;
            this.Api.service.serviceDetail(this.pageObj.goodsId).then(result=>{
                if(result.code != 1) return;
            	//保存服务详情数据
                _this.data=result.data;
                _this.pageObj.newPriceUnit=_this.data.priceUnit?_this.data.priceUnit:"";
                _this.pageObj.newPrice=_this.data.priceConfirm?(parseInt(_this.data.priceStart)+"~"+parseInt(_this.data.priceEnd)):parseInt(_this.data.priceStart);
                _this.pageObj.newContent=_this.data.content;
                _this.pageObj.newServiceTimeDesc=_this.data.serviceTimeDesc;
                _this.pageObj.newSubmitInformation=_this.data.submitInformation;
				if(_this.data.collectionState){
	        		_this.pageObj.collectState=0;
	        	}else{
	        		_this.pageObj.collectState=1;
	        	}
                //dom节点更新执行的事件
                _this.$nextTick(function(){
                    _this.pageInit();
                })
            });
        },
        //网页初始化要执行的事件
        pageInit:function(){
            var _this=this;

            //处理ios没有按钮点击效果
            document.body.addEventListener('touchstart', function () {});



              //初始化已选组合数组长度
            if(_this.data.specs&&_this.data.specs.length>0){
                _this.pageObj.sltSymbols=new Array(_this.data.specs.length);
            }

            //获取第一个组合的数据
            if(_this.data.specCombs!=null&&_this.data.specCombs.length>0){
                _this.pageObj.sltSymbols=_this.data.specCombs[0].specAttrsComb.split(',');
            }

             //置灰不可选组合
            _this.pageObj.sltSymbols.forEach(function(item,index){
                _this.setDisabledCase(index+'-'+item);
            })

            //获取选择组合的服务详情
            if(_this.pageObj.sltSymbols&&_this.pageObj.sltSymbols.length>0){
                 _this.getCombinationDetail();
            }

            //服务组合点击事件绑定
            $(".si-service-case>li").each(function(){
                $(this).bind("click",function(event){
                    _this.changeSltCase(event.currentTarget);
                });
            })

            //为已选节点添加选中效果
            _this.pageObj.sltSymbols.forEach(function(item,index){
                $("#"+index+"-"+item).addClass("active");
            })
        },
        /*页面滚动事件监听*/
        introFixtl:function(){
            var _this=this;
            _this.pageObj.tloffsetTop = $('#top-menu').offset().top;//距离页面顶部的距离
            new auiScroll({
                listen:true,
                distance:document.body.scrollHeight
            },function(ret){
            	if(ret.scrollTop>=_this.pageObj.tloffsetTop){
            		_this.pageObj.topFlag=true;
            	}
            });
        },
        /*匹配律师*/
        matchLawyer:function(){
            var param={};
            param.goodsId=this.pageObj.goodsId;
            param.city=this.pageObj.location;
            param.specCombId=this.pageObj.sltCombinationId;
			this.$router.push({path:'/lawyerList',query:param});
        },
        //tab选中效果切换
        changeActive:function(obj){
            var obj=$(obj);
            var objParent=obj.parent();
            objParent.children().removeClass("active");
            obj.addClass("active");
        },
        //更改选中组合
        changeSltCase:function(obj){
            var $targetDom=$(obj);//当前选中节点
            var seletedID=$targetDom.attr("id");
            var seletedIDs=seletedID.split('-');
            var index=seletedIDs[0];//当前选中节点是第几个属性
            var theSymbol=seletedIDs[1];//当前选中节点的编码值
            //添加选中样式
            this.changeActive(obj);
            //保存选中属性的编码
            this.pageObj.sltSymbols[index]=theSymbol;
            //设置不可选case节点
            this.setDisabledCase(seletedID);
            //更新选中组合详情和价格
            this.getCombinationDetail();
        },
        //置灰不可选的组合
        setDisabledCase:function(seletedID){
            var _this=this;
            seletedID=seletedID.split('-');
            var index=seletedID[0];
            var theSymbol=seletedID[1];
            var newSltSymbols;
            for(var i=parseInt(index)+1;i<_this.data.specs.length;i++){
                for(var j=0;j<_this.data.specs[i].specAttrs.length;j++){
                    var theCase=_this.data.specs[i].specAttrs[j];
                    var domID=i+"-"+theCase.symbol;
                    //根据遍历节点得到新组合
                    newSltSymbols=_this.pageObj.sltSymbols.slice(0,_this.pageObj.sltSymbols.length);
                    newSltSymbols[i]=theCase.symbol;
                    //不存在于组合中，置灰，如果刚好置灰项是用户已选节点则移除用户已选数据
                    if(!_this.isInCombination(newSltSymbols,i)){
                        $("#"+domID).removeClass("active").addClass("disabled").unbind("click").removeAttr("onclick");
                        if(_this.pageObj.sltSymbols[i]==theCase.symbol){
                            _this.pageObj.sltSymbols[i]=0;
                        }
                    }else{
                        if($("#"+domID).hasClass("disabled")){
                            $("#"+domID).removeClass("disabled").bind("click",function(event){
                                _this.changeSltCase(event.currentTarget);
                            });
                        }
                    }
                }
                //若用户已选节点被置灰则默认帮用户选择第一个可选项
                if(_this.pageObj.sltSymbols[i]==0){
                    var iDomList=$(".si-service-case>li[id^='"+i+"-']")
                    for(var k=0;k<iDomList.length;k++){
                        var theObj=$(iDomList[k]);
                        if(!theObj.hasClass("disabled")){
                            theObj.addClass("active");
                            _this.pageObj.sltSymbols[i]=theObj.attr("id").split("-")[1];
                            break;
                        }
                    }
                }
            }
        },
        //当前组合是否存在于服务组合列表中
        isInCombination:function(newSltSymbols,index){
            var _this=this;
            newSltSymbols=newSltSymbols.slice(0,parseInt(index)+1).join(",");
            var reg=new RegExp(newSltSymbols+'(,\\w+)*','g');
            for(var i=0;i<_this.data.specCombs.length;i++){
                var theCombination=_this.data.specCombs[i].specAttrsComb;
                if(theCombination.match(reg)){
                    return true;
                }
            }
            return false;
        },
        //获取组合详情
        getCombinationDetail:function(){
            var _this=this;
            for(var i=0;i<_this.data.specCombs.length;i++){
                var theCombination=_this.data.specCombs[i];
                if(theCombination.specAttrsComb==_this.pageObj.sltSymbols.join(",")){
                    //保存选中后的组合id
                    _this.pageObj.sltCombinationId=theCombination.specCombId;
                    //组合后的价格和单位
                    _this.pageObj.newPriceUnit=theCombination.priceUnit?theCombination.priceUnit:"";
                    _this.pageObj.newPrice=!theCombination.amountConfirm?(parseInt(theCombination.amountMin)+"~"+parseInt(theCombination.amountMax)):parseInt(theCombination.amountMin);
                    _this.pageObj.newContent=_this.isNoString(theCombination.content)?_this.data.content:theCombination.content;
                    _this.pageObj.newServiceTimeDesc=_this.isNoString(theCombination.serviceTimeDesc)?_this.data.serviceTimeDesc:theCombination.serviceTimeDesc;
                    _this.pageObj.newSubmitInformation=_this.isNoString(theCombination.submitInformation)?_this.data.submitInformation:theCombination.submitInformation;
                    break;
                }
            }
        },
        //修改顶部选中效果
        changeTopBarActive:function(i) {
            var $dom=$(event.target);//目标元素
            var $domBarUnderline=$(".si-top-bar-underline");//滑动条
            var domOffsetLeft=event.target.offsetLeft;//当前元素离父元素的左边距离
            $dom.parent().children().removeClass("active");
            $dom.addClass("active");
            $domBarUnderline.css("left",domOffsetLeft+"px");
            $("#pageContainer>.si-content").addClass("fy-hide")
            $("#pageContainer>.si-content").eq(i).removeClass("fy-hide");
        },
        //显示弹层
        showBox:function(className){
            var _this=this;
            $('.service-introduce-basic').removeClass("show");
            $('.'+className).addClass("show");
            $('.graybox').addClass("show");
            //弹层后禁止body滑动
            $("#pageContainer").addClass("fy-close-touch-move");
        },
        //隐藏弹层
        closeBox:function(){
            $('.service-introduce-basic').removeClass("show");
            $('.graybox').removeClass("show");
            //弹层关闭后移除禁止body滑动
            $("#pageContainer").removeClass("fy-close-touch-move");
        },
        //截取字符的指定字符长度
        substrText:function(str,len,ellipsis){
            if(!str) return "";
            if(str.length>Number(len)){
                return str.substr(0,Number(len))+(ellipsis?"......":"");
            }else{
                return str;
            }
        },
        //判断字符串内容是否为空
        isNoString:function(val){
            return !val||val=='<p></p>'||val.length==0||val==' ';
        },
        //收藏
        collect(){
        	let params={
        		goodId:this.pageObj.goodsId,
        		status:this.pageObj.collectState
        	}
        	this.Api.service.collect(params).then(res=>{
        		if(res.code!=1&&res.code!=10) return ;
        		if(res.code==10&&this.$store.getters.token === ''){
        			setTimeout(()=>{
        				this.$router.push({path: '/mobileBind'});
        			},1000)
        		}else{
        			if(this.pageObj.collectState){
	        			this.pageObj.collectState=0;
	        			$(".si-footer>li").eq(0).addClass("collected");
	        			this.tip("收藏成功");
	        		}else{
	        			this.pageObj.collectState=1;
	        			$(".si-footer>li").eq(0).removeClass("collected");
	        			this.tip("取消收藏成功");
	        			
	        		}
        		}
        		
        	})
        },
    	tip(val){
			Toast({
			  message: val,
			  position: 'bottom',
			  duration: 1000
			});
		}
    }
   
  };
</script>
<style lang="less" scoped>
@import "~@/assets/less/fycommon.less";
@import "~@/pages/service/service-detail.less";
</style>
