                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   <template                             已kgb>
    <transition name="slide">
    <div class="news_content">
        <div class="content" id="content">
            <vertical-scroll 
                    ref="scroll"
                    :data="comList"
                 	:listen-scroll="true"
                    :scrollbar="scrollbarObj"
                    :probe-type="probeType"
                    :pullUpLoad="pullUpLoadObj"
                    @pullingUp="onPullingUp">
            <div class="wrapper" slot="listContent">
                <div class="list" ref="article">
                    <div class="article-tt">
                        <h2 class="tit">{{arcList.title}}</h2>
                        <div class="sub">
                            <span class="label">{{arcList.categoryName}}</span>
                            <span class="read">阅读
                                <em>{{arcList.readNum}}</em>
                            </span>
                        </div>
                    </div>
                    <div class="con" v-html="arcList.content"></div>
                    <div class="good">
                        <span class="before"  v-show="!arcList.isConcern" @click="addGoods(3)">
                            <i class="icon-goods"></i>
                            <em>{{arcList.concernNum}}</em>
                        </span>
                        <span class="after"  v-show="arcList.isConcern" @click="addGoods(3)">
                            <i class="icon-goods-hover"></i>
                            <em>{{arcList.concernNum}}</em>
                        </span>
                    </div>
                </div>
                <div class="list" ref="service" v-if="!(this.lodash.isEmpty(recomService))">
                    <h4 class="tit">
                        <span>推荐服务</span>
                    </h4>
                    <div class="item service-item">
                        <p>
                            <span>{{recomService.name}}</span>
                            <em>{{recomService.descr}}</em>
                        </p>
                        <a href="javascript:;" class="more" @click="goService(recomService.id)">
                            <span>查看</span>
                        </a>
                    </div>
                </div>
                <div class="list" id="commit">
                    <h4 class="tit">
                        <span>热门评论</span>
                    </h4>
                    <div class="item comitList" >
                        <ul v-if="comList!=''" v-for="(item,index) in comList" :key="index" >
                            <li>
                                <a href="" class="user-img"><img :src="item.logo" /></a>
                                <div class="user-content">
                                    <h6>
                                        <span class="user-name">{{item.commenter}}</span>
                                        <span class="good-nums" v-if="!item.selfThumbUp" @click="onState(item.uuid,item)">
                                            <em>{{item.thumbUpCount}}</em>
                                            <i class="icon-goods"></i>
                                        </span>
                                        <span class="good-nums hover" v-else @click="onState(item.uuid,item)">
                                            <em>{{item.thumbUpCount}}</em>
                                            <i class="icon-goods-hover"></i>
                                        </span>
                                    </h6>
                                    <p @click="userCommit(item.commenter,item.uuid)">{{item.content}}</p>
                                    <div>
                                        <span class="time">{{item.createTime}}</span>
                                        <span class="del" @click="del(item.uuid)" v-if="item.isLoginUserComment">
                                            <a href="javascript:;">删除</a>
                                        </span>
                                    </div>
                                </div>
                                <div class="reply-wrap" v-show="item.replies!=''">
                                    <div class="reply-list">
                                        <div class="reply" v-for="(reply,index) in item.replies" :key="index" >
                                            <div class="info" v-if="!reply.second">
                                                <span>{{reply.commenter}}:</span>{{reply.content}}
                                            </div>
                                            <div class="info"  v-if="reply.second">
                                                <span>{{reply.commenter}}:</span>
                                                <em>回复</em>
                                                <span>{{reply.replyTo}}:</span>{{reply.content}}
                                            </div>
                                        
                                        </div>
                                    </div>
                                    <span class="showreply"  v-if="item.replies.length>2" @click="goCommitList(item.uuid)">
                                        <a href="javascript:;">共{{item.replies.length}}条回复></a>
                                    </span>
                                </div>
                            </li>
                        </ul>
                        <p class="no-data" v-if="comList==''"><i class="no_collect"><em>暂无评论</em></i></p>
                    </div>
                </div>      
            </div>
            </vertical-scroll>
        </div>
        <mt-popup v-show="popupVisible" position="bottom"  :class="popupVisible?' page-tabbar':'commit-area'" popup-transition="popup-fade">
             <div class="bom-left">
                 <input type="text" class="pub" placeholder="发布评论..." value=""  @click="onFocus" >
                <!-- <input class="pub" cols="20" @click="onFocus"  placeholder="发布评论..."  value=""> -->

            </div>
            <div class="bom-right">
                <span>
                    <a href ="javascript:;" class = "go-commit" @click= "goCommit('#commit')"><i class="icon-commit"></i>
                    <em>{{allcount}}</em></a>
                </span>
                <span>
                    <i class="icon-collect" @click="addGoods(6)" v-show="!arcList.isCollect"></i>
                    <i class="icon-collect-hover" @click="addGoods(6)"  v-show="arcList.isCollect"></i>
                </span>
                <!-- <span>
                    <i class="icon-share" @click="showSharebox"></i>
                </span> -->
            </div>
      </mt-popup> 
      <mt-popup  v-show="!popupVisible" position="bottom" class="commit-area"  popup-transition="popup-fade">
           <div class="commit-head"><span class="cancle" ><a href="javascript:;"  @click="hideCommit">取消</a></span><span class="count"><em v-text="formValidate.remnant"></em>/300</span>
           <span class="public" ><a href="javascript:;" @click="publicCommit">发布</a></span></div>
           <div class="commit-input">
            <textarea ref="input" id="textbox" class="textbox" rows="5" cols="52"  autofocus="autofocus" v-focus='focusState' v-model="formValidate.desc" 
             @input="descInput"  placeholder="发布评论..."  :maxlength="300" >
            </textarea>
           </div>
       </mt-popup>

        <!-- </div> -->
        <share-box :show="Sharebox"></share-box>
        <fast-menu bottom="3.4rem"></fast-menu>
        <div class="mask" v-show="modelType" @click="hideCommit"></div>
    </div>
    </transition>
</template>
<script>
import * as type from "../../store/index.js";
import { mapGetters } from "vuex";
import { MessageBox,Toast} from "mint-ui";
export default {
    name:'newsDetail',
    data() {
        return {
            focusState:false,
            arcList: {},
            allcount:'',
            articleId:this.$route.params.articleId,
            comList: [],
            msg: "",
            list: [],
            row: 1,
            dataReq: "1",
            loading: false,
            collected: false,
            goods: false,
            collect: false,
            commitbox: false,
            modelType: false,
            formValidate: {
                text: "",
                desc: "",
                remnant: 0
            },
            recomService: {},
            popupVisible: true,
            rules: {
                desc: [{ required: true, message: "评论内容不能为空", trigger: "blur" }]
            },
            todopage: {
                total: 1,
                limit: 20,  
                page:1
            },
            commenterIds:'',
            scrollbar:false,
            scrollbarFade: true,
            pullUpLoad: true,
            pullUpLoadThreshold: 0,
            pullUpLoadMoreTxt: '加载更多',
            pullUpLoadNoMoreTxt: '没有更多数据了'
        };
    },
     created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
        this.$nextTick(function() {
            this.init();
            //  this.$refs('input').focus()
        });
    },
    methods: {
        setFocus(seclet) {
            document.querySelector(seclet).focus();
            console.log( document.querySelector(seclet))
            //判断是否为苹果
            let isIPHONE =
                navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
            if (isIPHONE) {
                document.querySelector(seclet).focus();
            }
        },
        loseFocus(seclet) {
            document.querySelector(seclet).blur();
              let isIPHONE =
                navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
            if (isIPHONE) {
                document.querySelector(seclet).focus();
            }
        },
        init() {
            //处理ios键盘事件
            let _this = this
            $("body").on("focusout", ".textbox", function() {
                 console.log('focusout')
                if(_this.formValidate.desc ==''){
                   _this.popupVisible = true
                   _this.modelType = false
                   _this.focusState =false
                  }
            });
            _this.newsDetail();
            _this.commitList();
            _this.recommendService();
        },
        goService(id){
            let params = {
               goodsId:id
            } 
            this.$router.push({'path':'/serviceDetail','query':params});
        },
		onPullingUp() {
			//上拉 更新数据
			if (this._isDestroyed) {
				return
            }
            let _this = this;
            _this.loading = true;
            _this.todopage.page = _this.todopage.page + 1;
            _this.todopage.limit= _this.todopage.limit;
            _this.commitList( _this.todopage.page,_this.todopage.limit)
		},
        newsDetail() {
            let _this = this,
                params = { articleId: _this.articleId};
            _this.Api.news.newsDetail(params).then(resp => {
                if (resp.code == 1) {
                    _this.arcList = resp.data
                    _this.allcount = _this.arcList.commentNum
                    _this.msg = resp.msg
                    if (resp.data.isConcern) {
                        _this.goods = resp.data.isConcern;
                    }
                    if (resp.data.isCollect) {
                        _this.collect = resp.data.isCollect;
                    }
                    console.log(resp.data);
                } else if (resp.code == 0) {
                    // this.$Message.warning(resp.msg);
                }
            });
        },
        commitList(page, limit) {
            let _this = this,
                params = {
                    articleId: _this.articleId,
                    page: _this.todopage.page,
                    limit:_this.todopage.limit
                };
            _this.Api.news.commitList(params).then(resp => {
                if(resp.code != 1) return;
                let res = resp.data || {};
                 _this.loading = false; 
                if(res.items.length > 0){
                    _this.dataReq = res.items;
                    _this.dataLen = res.total;
                    _this.comList =[]
                    let data = res.items;
                    data.forEach(g => {
                        _this.comList.push(g);
                        
                    });
                }else{
                    _this.$refs.scroll.forceUpdate();
                }  
            });
        },
        recommendService() {
            let _this = this,
                params = {
                    id: _this.$route.params.id,
                    articleId: _this.articleId,
                };
            _this.Api.news.recommendService(params).then(resp => {
                if(resp.code != 1) return;
                if(resp.data){
                  this.recomService = resp.data;
                }
            });
        },
        addGoods(type) {
            let _this = this;
            let params = {
                type: type,
                articleId:_this.articleId
            };
            _this.Api.news.addGood(params).then(resp => {
                if (resp.code == 1) {
                    Toast(resp.msg)
                    _this.newsDetail();
                }
            });
        },
        publicCommit(articleId, fatherId) {
            let _this = this,
                params = {
                    articleId: _this.articleId,
                    content: _this.formValidate.desc,
                    fatherId: _this.commenterIds || ''
                };
            _this.Api.news.addReply(params).then(resp => {
                if(resp.code == 1) {
                    Toast(resp.msg)
                    _this.formValidate.desc =''
                    _this.init()
                    _this.hideCommit()
                }
            });
        },
        userCommit(name,id){
            let _this = this
            $('textarea').attr('placeholder',"@"+name);
            _this.modelType = true;
            _this.popupVisible = false;
            _this.commenterIds = id
        },
        hide() {
            //判断是否为苹果
            let isIPHONE =
                navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
            if (isIPHONE) {
                $(".textbox").blur();
                this.hideCommit();
            }
        },
        notouch() {
            $(document).on("touchstart", function(e) {
                e.preventDefault();
            });
        },
        hideCommit() {
            this.popupVisible = true;
            this.commitbox = false;
            this.modelType = false;
        },
        onState(id,item) {
            let _this = this,tip = '',state = item.selfThumbUp,params = {commentId:id}
                if(state == true){
                    tip = 1
                }else{
                    tip = 0
                }
             _this.Api.news.userGood(params).then(resp => {
                if (resp.code == 1) {
                    if(tip == 1){
                        Number(item.thumbUpCount--)
                        item.selfThumbUp = false
                        Toast(resp.msg) 
                        tip = 0
                    }else{
                        Number(item.thumbUpCount++)
                        item.selfThumbUp = true
                        Toast(resp.msg) 
                        tip = 1
                    }
              }
            });
        },
        descInput() {
            let txtVal = this.formValidate.desc.length;
            this.formValidate.text = this.formValidate.desc;
            this.formValidate.remnant = txtVal;
        },
        goCommit(selector) {
             let topHeight = this.$refs.article.clientHeight + this.$refs.service.clientHeight 
             this.$refs.scroll.scrollTo(0,-topHeight);
             return false;
        },
        goCommitList(uuid) {
            let params = {
                articleId:this.articleId,
                uuid: uuid
            };
             this.$router.push({name:'CommitList',params:params});
        },
        showSharebox() {
            this.$store.commit(type.SHOWSHAREBOX, !this.Sharebox);
            console.log(this.media_info);
        },
        del(uuid) {
            let _this = this
            MessageBox({
                title: "",
                message: "是否删除此评论？",
                showCancelButton: true,
                confirmButtonText: "确认删除"
            },function(action) {
                console.log(action)
                 let params = {
                     commentUuid:uuid
                 }
                 if(action === 'confirm'){
                    _this.Api.news.delCommit(params).then(resp => {
                        if(resp.code = 1){
                            _this.init()
                            Toast(resp.msg)
                        }
                    
                    });
                }
            });
        },
        onFocus() {
            this.modelType = true;
            this.popupVisible = false;
            $('textarea').attr('placeholder','');
            this.focusState = true
        },
        rebuildScroll() {
			this.$nextTick(() => {
				this.$refs.scroll.destroy();
				this.$refs.scroll.initScroll();
			})
		},
    },
    directives: {
        focus: {
            update: function (el,{value}) {
            if(value){
                el.focus()
                }
            }
        }
    },
    computed: {
        ...mapGetters(["Sharebox"]),
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
        $route: function() {
            this.$store.commit(type.SHOWSHAREBOX, false);
        },
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
    }
};
</script>
<style lang="less">
@import 'news-detail.less';
.slide-enter-active,.slide-leave-active {transition: all 0.3s}
.slide-enter,.slide-leave-to {transform: translate3d(100%, 0, 0)}
</style>
