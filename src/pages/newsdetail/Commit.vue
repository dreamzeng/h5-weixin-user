<template>
 <transition name="slide">
<div class="page-loadmore">
 <header-bar title="4条回复" :IsRshow='false'></header-bar>
  <div class="content">
    <div class="list">
       <div class="item comitList">
         <ul>
           <li><a href="" class="user-img"><img src="../../assets/images/ad-default-head.png"/></a>
              <div class="user-content"><h6><span class="user-name">李小明</span>
              <span class="good-nums" @click="onState(2)" v-show="!gooded">15<i class="icon-goods"></i></span>
              <span class="good-nums"  @click="onState(2)" v-show="gooded"><em>15</em><i class="icon-goods-hover"></i></span>
              </h6>
              <p>内容很好内容很好内容很好</p>
              <!-- <div><span class="time">23分钟之前</span><span class="del"><a href="">删除</a></span></div> -->
              </div>
              </li>
         </ul>
       </div>
    </div>
    <div class="list">
       <h4 class="tit"><span>全部</span></h4>
       <div class="item comitList">
         <ul>
           <li><a href="" class="user-img"><img src="../../assets/images/ad-default-head.png"/></a>
              <div class="user-content"><h6><span class="user-name">李小明</span>
              <span class="good-nums" @click="onState(2)" v-show="!gooded">15<i class="icon-goods"></i></span>
              <span class="good-nums"  @click="onState(2)" v-show="gooded"><em>15</em><i class="icon-goods-hover"></i></span>
              </h6>
              <p>内容很好内容很好内容很好</p>
              </div>
              </li>
           <li><a href="" class="user-img"><img src="../../assets/images/ad-default-head.png"/></a>
              <div class="user-content"><h6><span class="user-name">李小明</span>
              <span class="good-nums" @click="onState(2)" v-show="!gooded">15<i class="icon-goods"></i></span>
              <span class="good-nums"  @click="onState(2)" v-show="gooded"><em>15</em><i class="icon-goods-hover"></i></span>
              </h6>
              <p><em>回复</em><span class="user-name">张三：</span>内容很好内容很好内容很好</p>
              </div>
              </li>
            <li><a href="" class="user-img"><img src="../../assets/images/ad-default-head.png"/></a>
              <div class="user-content"><h6><span class="user-name">李小明</span>
              <span class="good-nums" @click="onState(2)" v-show="!gooded">15<i class="icon-goods"></i></span>
              <span class="good-nums"  @click="onState(2)" v-show="gooded"><em>15</em><i class="icon-goods-hover"></i></span>
              </h6>
              <p>内容很好内容很好内容很好</p>
              <div><span class="time">23分钟之前</span><span class="del" @click="del(item)"><a href="javascript:;">删除</a></span></div>
              </div>
              </li>
         </ul>
       </div>
    </div>
  </div>
  <div class="page-tabbar">
      <mt-tabbar fixed>
      <span class="bom-left">
        <input type="text" class="bm_text" placeholder="写评论..." value="">
      </span>
      <span class="bom-right">
        <i class="icon-goods" @click="onState(2)" v-show="!gooded"></i>
        <i class="icon-goods-hover" @click="onState(2)" v-show="gooded"></i>
      </span>
    </mt-tabbar>
  </div>
    </div>
  </div>
 </transition>
</template>
<script>
import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
      'gooded':false
      }
    },
    methods:{
      del(item){
        MessageBox({
          title: '',
          message: '是否删除此评论？',
          showCancelButton: true,
          confirmButtonText:'确认删除'
        });
      },
      onState(id){
          console.log(id)
          if(id == 1){
             this.collected = !this.collected;
          }
          else if(id ==2){
             this.gooded = !this.gooded
          } 
        }
    }
  };
</script>

<style lang="less">
 @import "../../assets/less/base.less";
  .content{ margin-top:40px;padding-bottom:1rem;background: #f2f3f5;font-size:.14rem;line-height:.54rem;color:#333;
     h4{line-height:.8rem;padding:0rem .25rem;font-size: .28rem;color:#333;border-bottom:1px solid #e5e5e5}
     .list:nth-child(1){padding:0px}
     .list{margin-bottom:.2rem;background:#fff;
        .good{padding:1rem 0rem; text-align: center; font-size: .3rem;
          span{padding: .3rem 1rem;border-radius: .8rem;border: 1px solid #e5e5e5;
            i{margin-right:.1rem}
          }
        }
        .item{padding:.4rem .25rem;}
        .service-item{padding-bottom: .3rem;
          p,.more{display:inline-block}
          p{width:60%;line-height:.36rem;
            span{font-weight: bold;font-size:.32rem}
            em{display: block;color:#999}
          }
          .more{float: right;
            span{min-width: 52px;padding:8px 24px;border: 1px solid #00ccb1;border-radius: 5px;color: #00ccb1;}
          }
        }
        .comitList{padding:.2rem .25rem;
          li{margin-bottom:.2rem;font-size:.32rem;
            .user-name{color:#509ffa;font-size:.26rem}
            em{color:#999}
            .user-img{ width:50px;height:50px;display:inline-block;
              img{width:100%;height:100%;border-radius: 50%}
            }
            .time,.del{font-size: .22rem}
            .good-nums{font-size: .12rem}
          }
        .user-content{margin-left:.1rem;width:80%;display: inline-block;line-height:.48rem;       
              .good-nums,.del{float:right}
              .time,.del,.good-nums{color:#999}
              .good-nums{
                i{margin-left: .1rem; vertical-align: top}
                em{color:#ff5e5e}
              }
          }
        }
      }
     
   }

  .mint-tabbar.is-fixed{padding:0rem .3rem;height: 1rem;line-height:1rem;display: -webkit-box;display: flex;
    background-color: #FFF;border:1px solid #e5e5e5;font-size: .14rem;
    span{flex:1;text-align: right}
    span.bom-left{text-align: left}
    span.bom-right{max-width: 50px;min-width: 13%;}
    }
   .bm_text{ width:100%; padding-left: .2rem; border-radius: .17rem;background: #f2f3f5; border:none; height: .65rem; font-size: 0.3rem;}
   .slide-enter-active, .slide-leave-active{transition: all 0.3s}
   .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
    }
</style>
