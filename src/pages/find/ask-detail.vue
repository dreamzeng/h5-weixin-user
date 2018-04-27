 <template>
    <div id="pageContainer">
        <div class="SuccessDiv" v-if="!pageObj.isError">
            <div class="ad-detail">
            	<div class="title">
            		<p class="add-text color-3 fs-32">
                   {{pageObj.question}}
	                </p>
	                <p class="fs-24 mt-28">
	                    <span class="color-b0">{{pageObj.createDay}}</span>
	                    <span class="ml-98 color-b0">{{pageObj.readQuantity}}阅读</span>
	                    <span class="f-r color-b0 add-tag">{{pageObj.subCaseName}}</span>
	                </p>
            	</div>
            </div>
            <div class="ad-messge-list">
            	<div class="home-wrapping">
					<vertical-scroll 
						ref="scroll"
						:data="data.list"
						:scrollbar="scrollbarObj"
						:pullUpLoad="pullUpLoadObj"
						@pullingUp="onPullingUp">
						<div slot="listContent" class="ad-messge-content">
							<div v-for="(info,index) in data.list" :class="'ad-message '+(info.userType==1?'adm-l':'adm-r')" :key="index">
		                            <div class="adm-headimg"><img :src="info.userType==2?data.lawyerLogo:data.userLogo" alt=""></div>
		                            <!-- 文本消息 -->
		                            <div class="adm-content" v-if="info.msgType=='3901'||info.msgType=='3898'">{{info.content}}</div>
		                            <!-- 图片消息 -->
		                            <div class="adm-content admc-img" v-if="info.msgType=='3902'"><img src="~@/assets/images/ad-message-img.png" alt=""></div>
		                            <!-- 语音消息 -->
		                            <div class="adm-content admc-voice" v-if="info.msgType=='3903'"></div>
		                             <!-- 文件消息 -->
		                             <div class="adm-content admc-img" v-if="info.msgType=='3904'"><img src="~@/assets/images/ad-message-file.png" alt=""></div>
		                        </div>
						</div>
					</vertical-scroll>
				</div>
            </div>
        </div>
        <fast-menu bottom="1.3rem"></fast-menu>
    </div>
</template>

<script>
export default {
		data(){
			return {
				data:{},
                pageObj:{
                    isError:false,
                    qauuId:2315,
                    pageindex:0,
                    pageRow:10,
                    question:'',
                    createDay:'',
                    readQuantity:'',
                    subCaseName:''
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
		mounted:function(){
			this.$nextTick(()=>{
				var obj=this.$route.query;
				this.pageObj.question=obj.question;
				this.pageObj.createDay=obj.createDay;
				this.pageObj.readQuantity=obj.readQuantity;
				this.pageObj.subCaseName=obj.subCaseName;
				this.pageObj.qauuId=obj.uuid;
	            this.getDataList();
			})
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
        methods:{
            getDataList:function(){
                var _this=this;
                _this.pageObj.pageindex++;
                var ajaxParam={};
                ajaxParam.page=_this.pageObj.pageindex;
                ajaxParam.limit=_this.pageObj.pageRow;
                ajaxParam.qaUuid=this.pageObj.qauuId;
                //开始接口请求
                this.Api.find.askDetail(ajaxParam).then(result=>{
                	if(result.code != 1) return;
                    if(_this.pageObj.pageindex==1){
                        _this.data=result.data;
                    }else if(_this.data.list&&_this.data.list.length>0&&_this.pageObj.pageindex>1){
                        result.data.list.forEach(function(element){
                            _this.data.list.push(element);
                        });
                    }
                	setTimeout(function(){
              	    	$(".home-wrapping").css("top",$('.ad-detail').outerHeight(true)/50+"rem");
                	 },10)
                	if(ajaxParam.page>1){
                	 	if(result.data.list==null||result.data.list.length==0){
							this.$refs.scroll.forceUpdate();
						}
                	 }

                });
            },
            onPullingUp() {
	            this.getDataList();
			},
			rebuildScroll() {
				this.$nextTick(() => {
					this.$refs.scroll.destroy();
					this.$refs.scroll.initScroll();
				})
			},
            initMuiRefresh:function(){
                var _this=this;
                mui.init({
                    pullRefresh: {
                        container: '#pullrefresh',
                        up: {
                            height:50,
                            contentrefresh : "正在加载...",
                            callback:_this.getDataList
                        }								
                    }
                });
            }
        }
        
	}
</script>
<style lang="less" scoped>
.home-wrapping{position: fixed;width: 100%;top:0;bottom: 0;}
@import '~@/assets/less/fycommon.less';
@import '~@/pages/find/ask-detail.less';
</style>