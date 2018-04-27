<template>
    <transition name="slide">
    <div class="news_content">
        <header-bar :title="msg"></header-bar>
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
                <div class="list">
                    <div class="article-tt">
                        <h2 class="tit">{{arcList.title}}</h2>
                        <div class="sub">
                            <span class="label">{{arcList.realName}}</span>
                            <span class="read">阅读
                                <em>{{arcList.readNum}}</em>
                            </span>
                        </div>
                    </div>
                    <div class="con" v-html="arcList.content"></div>
                    <div class="good">
                        <span class="before"  v-if="!arcList.isConcern" @click="addGoods(3,'e6d1e280bafc4c8a9a23893dca9985d7',arcList.concernNum)" v-show="!goods">
                            <i class="icon-goods"></i>
                            <em>{{arcList.concernNum}}</em>
                        </span>
                        <span class="after" v-else @click="addGoods(3,'e6d1e280bafc4c8a9a23893dca9985d7',arcList.concernNum)" v-show="goods">
                            <i class="icon-goods-hover"></i>
                            <em>{{arcList.concernNum}}</em>
                        </span>
                    </div>
                </div>
                <div class="list">
                    <h4 class="tit">
                        <span>推荐服务</span>
                    </h4>
                    <div class="item service-item">
                        <p>
                            <span>{{recomService.name}}</span>
                            <em>{{recomService.descr}}</em>
                        </p>
                        <a href="#" class="more">
                            <span>查看</span>
                        </a>
                    </div>
                </div>
                <div class="list" id="commit">
                    <h4 class="tit">
                        <span>热门评论</span>
                    </h4>
                    <div class="item comitList" >
                        <ul v-for="(item,index) in comList" :key="index" >
                            <li>
                                <a href="" class="user-img"><img :src="item.logo" /></a>
                                <div class="user-content">
                                    <h6>
                                        <span class="user-name">{{item.commenter}}</span>
                                        <span class="good-nums" v-if="!item.selfThumbUp" @click="onState(2)">
                                            <em>{{item.thumbUpCount}}</em>
                                            <i class="icon-goods"></i>
                                        </span>
                                        <span class="good-nums hover" v-else @click="onState(2)">
                                            <em>{{item.thumbUpCount}}</em>
                                            <i class="icon-goods-hover"></i>
                                        </span>
                                    </h6>
                                    <p @click="onFocus(item.commenterUuid)">{{item.content}}</p>
                                    <div>
                                        <span class="time">{{item.createTime}}</span>
                                        <span class="del" @click="del(item)" v-if="item.isLoginUserComment">
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
                                    <span class="showreply"  v-if="item.replies.length>2" @click="goCommitList(item)">
                                        <a href="javascript:;">共{{item.replies.length}}条回复></a>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>      
            </div>
            </vertical-scroll>
        </div>
         
<!-- 
        <div :class="popupVisible?'commit-area':'page-tabbar'">
            <div class="commit-head" v-show="popupVisible">
                <span class="cancle">
                    <a href="javascript:;" @click="hideCommit">取消</a>
                </span>
                <span class="count">
                    <em v-text="formValidate.remnant"></em>/500</span>
                <span class="public">
                    <a href="javascript:;" @click="publicCommit">发布</a>
                </span>
            </div>

            <div class="bom-left">
                <textarea class="textbox" cols="20" v-model="formValidate.desc" @click="onFocus" @input="descInput" :autosize="{minRows: 4,maxRows: 7}" placeholder="发布评论..." :maxlength="300">
                </textarea>

            </div>
            <div class="bom-right" v-show="!popupVisible">
                <span>
                    <i class="icon-commit" @click="goCommit('#commit')"></i>
                    <em>200</em>
                </span>
                <span>
                    <i class="icon-collect" @click="onState(1)" v-show="!collected"></i>
                    <i class="icon-collect-hover" @click="onState(1)" v-show="collected"></i>
                </span>
                <span>
                    <i class="icon-share" @click="showSharebox"></i>
                </span>
            </div>
        </div> -->
        <mt-popup v-show="popupVisible" position="bottom"  :class="popupVisible?' page-tabbar':'commit-area'" popup-transition="popup-fade">
             <div class="bom-left">
                <input class="pub" cols="20" @click="onFocus"  placeholder="发布评论..." >
                </input>

            </div>
            <div class="bom-right">
                <span>
                    <a href ="javascript:;" class = "go-commit" @click= "goCommit('#commit')"><i class="icon-commit"></i>
                    <em>{{arcList.commentNum+arcList.concernNum}}</em></a>
                </span>
                <span>
                    <i class="icon-collect" @click="onState(1)" v-show="!collected"></i>
                    <i class="icon-collect-hover" @click="onState(1)" v-show="collected"></i>
                </span>
                <span>
                    <i class="icon-share" @click="showSharebox"></i>
                </span>
            </div>
      </mt-popup> 
      <mt-popup  v-show="!popupVisible" position="bottom" class="commit-area"  popup-transition="popup-fade">
           <div class="commit-head"><span class="cancle" ><a href="javascript:;"  @click="hideCommit">取消</a></span><span class="count"><em v-text="formValidate.remnant"></em>/500</span>
           <span class="public" ><a href="javascript:;" @click="publicCommit">发布</a></span></div>
           <div class="commit-input">
            <textarea ref="input" class="textbox" rows="5" cols="52" v-focus autofocus="autofocus" v-model="formValidate.desc" 
             @input="descInput"  placeholder="发布评论..."  :maxlength="300" >
            </textarea>
           </div>
       </mt-popup>

        <!-- </div> -->
        <share-box :show="Sharebox"></share-box>
        <div class="mask" v-show="modelType" @click="hideCommit"></div>
    </div>
    </transition>
</template>
<script>
import * as type from "../../store/index.js";
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
export default {
    name:'newsDetail',
    data() {
        return {
            arcList: {},
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
            gooded: false,
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
            this.$refs['input'].focus()
        });
    },
    methods: {
        setFocus(seclet) {
            document.querySelector(seclet).focus();
            //判断是否为苹果
            let isIPHONE =
                navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
            if (isIPHONE) {
                document.querySelector(seclet).focusin();
            }
        },
        loseFocus(seclet) {
            document.querySelector(seclet).blur();
              let isIPHONE =
                navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
            if (isIPHONE) {
                document.querySelector(seclet).focusout();
            }
        },
        init() {
            //处理ios键盘事件
            let _this = this
            $("body").on("focusout", ".textbox", function() {
                if(_this.formValidate.desc ==''){
                   _this.popupVisible = true
                  }
            });
            $("body").on("click",'.pub', function() {
                $(".textbox").focus();

            });
            _this.newsDetail();
            _this.commitList();
            _this.recommendService();
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
                    _this.arcList = resp.data;
                    _this.msg = resp.msg;
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
                    let data = res.items;
                    data.forEach(g => {
                        _this.comList.push(g);
                        
                    });
                }else{
                    console.log('scollllll')
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
        addGoods(type,id, num) {
            num++;
            let _this = this;
            let params = {
                type: type,
                articleId:_this.articleId
            };
            _this.Api.news.addGood(params).then(resp => {
                if (resp.code == 1) {
                    _this.goods = !this.goods;
                    _this.init();
                } else if (resp.code == 0) {
                    // this.$Message.warning(resp.msg);
                }
            });
        },
        publicCommit(articleId, fatherId) {
            let _this = this,
                params = {
                    articleId: articleId,
                    content: _this.formValidate.desc,
                    fatherId: fatherId
                };
            _this.Api.addReply(params).then(resp => {
                if (resp.code == 1) {
                    _this.init();
                } else if (resp.code == 0) {
                    // this.$Message.warning(resp.msg);
                }
            });
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
        onState(id) {
            if (id == 1) {
                this.collected = !this.collected;
            } else if (id == 2) {
                this.gooded = !this.gooded;
            }
        },

        descInput() {
            let txtVal = this.formValidate.desc.length;
            this.formValidate.text = this.formValidate.desc;
            this.formValidate.remnant = txtVal;
        },
        goCommit(selector) {
            // let anchor = this.$el.querySelector('go-commit')
            // document.body.scrollTop = anchor.offsetTop;
            // document.documentElement.scrollTop = anchor.offsetTop;
          
            // let aHref = $('.go-commit').attr('href')
            // console.log(aHref)
            // if(aHref == 'javascript:;'|| aHref == '#content'){
            //      $('.go-commit').attr('href','#commit')
            // }
            
            let $root = $("html, body");
            $root.animate(
                {
                    scrollTop: $(selector).offset().top
                    
                }, 500
            );
            return false;
        },
        goCommitList(id) {
            let params = {
                uuid: id
            };
            //  this.$router.push({name:'order-detail',params});
            this.$router.push({ name: "CommitList" });
        },
        showSharebox() {
            this.$store.commit(type.SHOWSHAREBOX, !this.Sharebox);
            console.log(this.media_info);
        },
        del(item) {
            MessageBox({
                title: "",
                message: "是否删除此评论？",
                showCancelButton: true,
                confirmButtonText: "确认删除"
            });
        },
        onFocus(commenterUuid) {
            // this.notouch()
            this.modelType = true;
            this.popupVisible = false;
            //  $(".pub").blur();
            //  $(".textbox").focusin();
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
            inserted: function (el) {
            el.focus()
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
