<template>
 <!-- <transition name="slide"> -->
<div class="commit-page">
    <vertical-scroll 
            ref="scroll"
            :data="repliesList"
            :listen-scroll="true"
            :scrollbar="scrollbarObj"
            :probe-type="probeType"
            :pullUpLoad="pullUpLoadObj"
            @pullingUp="onPullingUp">
  <div class="content"  slot="listContent">
    <div class="list">
       <div class="item comitList">
         <ul>
           <li><a href="" class="user-img"><img :src="comList.logo"/></a>
              <div class="user-content"><h6><span class="user-name">{{comList.commenter}}</span>
              <span class="good-nums"  v-show="!comList.selfThumbUp" @click="onState(comList.uuid,comList)" ><em>{{comList.thumbUpCount}}</em><i class="icon-goods"></i></span>
              <span class="good-nums hover"  v-show="comList.selfThumbUp" @click="onState(comList.uuid,comList)"><em>{{comList.thumbUpCount}}</em><i class="icon-goods-hover"></i></span>
              </h6>
              <p>{{comList.content}}</p>
              <div v-if="comList.isLoginUserComment"><span class="time">{{comList.createTime}}</span>
              <span class="del"  @click="del(comList.uuid)"><a href="javascript:;">删除</a></span></div>
              </div>
              </li>
         </ul>
       </div>
    </div>
    <div class="list">
       <h4 class="tit"><span>全部</span></h4>
       <div class="item comitList">
         <ul>
           <li v-for="(item,index) in repliesList" :key="index"><a href="" class="user-img"><img :src="item.logo"/></a>
              <div class="user-content"><h6><span class="user-name">{{item.commenter}}</span>
              <span class="good-nums " v-if="!item.selfThumbUp"  @click="onState(item.uuid,item)" ><em>{{item.thumbUpCount}}</em><i class="icon-goods"></i></span>
              <span class="good-nums hover" v-else @click="onState(item.uuid,item)"><em>{{item.thumbUpCount}}</em><i class="icon-goods-hover"></i></span>
              </h6>
              
               <p v-if="item.second" @click="userCommit(item.commenter,item.uuid)"><em>回复</em><span class="user-name">{{item.replyTo}}</span> : {{item.content}}</p>
               <p v-else @click="userCommit(item.commenter,item.uuid)">{{item.content}}</p>
               <div><span class="time">{{item.createTime}}</span><span class="del" @click="del(item.uuid)" v-if="item.isLoginUserComment"><a href="javascript:;">删除</a></span></div>
              </div>
              </li>
         </ul>
       </div>
    </div>
  </div>
    </vertical-scroll>
  <div class="page-tabbar">
      <mt-tabbar v-show="popupVisible" fixed>
      <span class="bom-left">
        <input type="text" class="bm_text" placeholder="写评论..." value=""  @click="onFocus" >
      </span>
      <span class="bom-right">
        <i class="icon-goods" v-show="!comList.selfThumbUp" @click="onState(comList.uuid,comList)"></i>
        <i class="icon-goods-hover" v-show="comList.selfThumbUp" @click="onState(comList.uuid,comList)"></i>
      </span>
    </mt-tabbar>
     <mt-popup  v-show="!popupVisible" position="bottom" class="commit-area"  popup-transition="popup-fade">
           <div class="commit-head"><span class="cancle" ><a href="javascript:;"  @click="hideCommit">取消</a></span><span class="count"><em v-text="formValidate.remnant"></em>/300</span>
           <span class="public" ><a href="javascript:;" @click="publicCommit">发布</a></span></div>
           <div class="commit-input">
            <textarea ref="input" class="textbox" rows="5" cols="52" autofocus="autofocus" v-focus='focusState' v-model="formValidate.desc" 
             @input="descInput"  placeholder="发布评论..."  :maxlength="300" >
            </textarea>
           </div>
       </mt-popup>
       <div class="mask" v-show="modelType" @click="hideCommit"></div>
  </div>
    </div>
  </div>
 <!-- </transition> -->
</template>
<script>
import { MessageBox,Toast} from "mint-ui";
  export default {
    data() {
      return {
       focusState:false,
       dataReq: "1",
       comList: [],
       repliesList:[],
       todopage: {
            total: 1,
            limit: 5,  
            page:1
        },
        popupVisible: true,
        modelType: false,
        rules: {
            desc: [{ required: true, message: "评论内容不能为空", trigger: "blur" }]
        },
        formValidate: {
            text: "",
            desc: "",
            remnant: 0
        },
        scrollbar:false,
        scrollbarFade: true,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多数据了'
      }
    },
    mounted() {
        this.$nextTick(function() {
            this.commitList()
            this.init()
        });
    },
    methods:{
        init(){
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
        },
       commitList(page, limit){
        let _this = this
        let params = {
          articleId:this.$route.params.articleId,
          commentUuid:this.$route.params.uuid,
          page: _this.todopage.page,
          limit:_this.todopage.limit
        }
        _this.Api.news.commitList(params).then(resp => {
            if(resp.code != 1) return;
            let res = resp.data || {};
              _this.loading = false;
            if(res.items.length > 0){
                _this.dataReq = res.items[0]
                _this.comList = res.items[0]
                let data = res.items[0].replies;
                _this.repliesList =[]
                data.forEach(g => {
                    _this.repliesList.push(g)
                    
                });
            }else{
                _this.$refs.scroll.forceUpdate();
            }
            
        });
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
      del(uuid) {
            let _this = this
            MessageBox({
                title: "",
                message: "是否删除此评论？",
                showCancelButton: true,
                confirmButtonText: "确认删除"
            },function(action) {
                 let params = {
                     commentUuid:uuid
                 }
                 if(action === 'confirm'){
                    _this.Api.news.delCommit(params).then(resp => {
                        if(resp.code = 1){
                            _this.commitList()
                            Toast(resp.msg)
                        }
                    
                    });
                }
            });
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
                    item.selfThumbUp =false
                    Toast(resp.msg) 
                    tip = 0
                }else{
                    Number(item.thumbUpCount++)
                    item.selfThumbUp =true
                    Toast(resp.msg) 
                    tip = 1
                }
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
      publicCommit(articleId, fatherId) {
            let _this = this,
                params = {
                    articleId: _this.$route.params.articleId,
                    content: _this.formValidate.desc,
                    fatherId: _this.commenterIds || _this.comList.uuid
                };
            _this.Api.news.addReply(params).then(resp => {
                if(resp.code == 1) {
                    Toast(resp.msg)
                    _this.formValidate.desc =''
                    _this.commitList()
                    _this.hideCommit();
                }
            });
      },
      descInput() {
            let txtVal = this.formValidate.desc.length;
            this.formValidate.text = this.formValidate.desc;
            this.formValidate.remnant = txtVal;
      },
      hideCommit() {
            this.popupVisible = true;
            this.modelType = false;
      },
      onFocus() {
        this.modelType = true;
        this.popupVisible = false;
        $('textarea').attr('placeholder','');
        this.focusState = true
      },
    },
     created() {
      this.probeType = 3
      this.listenScroll = true
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
    }
  };
</script>

<style lang="less" scoped>
 @import 'commit-list.less';
</style>
