<style>
/* 首次进入提示框 */
.ml-tips-icon{
  width: 1.48rem;
  display: inline-block;
}
.fs-32{
    font-size: 0.32rem;
}
.color-9{
    color: #999;
}
.mui-popup-button{
    color: #00bda4;
}
.mui-popup-button.mui-popup-button-bold {
    font-weight: normal;
}
</style>

<style lang="less" scoped>
@import './match-lawyer-ask.less';
</style>

<template>
    <div class="match-lawyer-ask-main">
      <header-bar :title= "title" :isSearch="false" :key="getUuid()"></header-bar>
      <b-scroll :scrollbar="false">
        <!-- 律师基本信息 -->
        <div class="ml-top-box-container" v-if="matchLawyers.length>0" style="margin-top: 44px;">
            <div class="ml-top-list" id="matchLawyers">
                <div v-for="(item,index) in matchLawyers" :class="'ml-top-box '+(index==0?'':'fy-hide')" :key="getUuid() + index">
                    <span :class="'mltb-right-icon '+(item.className&&item.className!=''?'mltb-ptqy':'mltb-zjpp')">{{item.className&&item.className!=''?item.className:'最佳匹配'}}</span>
                    <div class="mltb-top" @click="lawyerDetail(item.lawyerId)">
                        <div :class="'mltb-top-left '+(item.lawyerAuthType?'layer-name-v':'')">
                            <div class="mltb-headimg"><img @load="reloadImg" :src="item.logo" /></div>
                        </div>
                        <div class="mltb-name">
                            <p class="fs-42 color-20 fw-bold word-wrap">{{item.realName}}</p>
                            <p class="fs-32 color-3 mt-24 word-wrap" v-if="item.commentStar">
                                <i class="ml-icon-star" v-for="(info,index) in getNumber(item.commentStar<=5?(item.commentStar>=0?item.commentStar:0):5)" :key="getUuid() + index"></i>
                                <i class="ml-icon-star-empty" v-for="(info,index) in (5-getNumber(item.commentStar<=5?(item.commentStar>=0?item.commentStar:0):5))" :key="getUuid() + index"></i>
                                <span class="color-9">({{item.commentQuantity}})</span>
                            </p>
                        </div>
                    </div>
                    <div class="mt-40 fy-display-flex" v-if="item.company">
                        <div class="fs-28 mr-20 fy-keep-all">律所</div>
                        <div class="ml-right">
                            <span class="fs-32 color-3 word-wrap" v-cloak>{{item.company}}</span>
                            <span class="fs-20 mltb-rz fy-border-blue-radius" v-if="item.comanyAuthType">已认证律所</span>
                        </div>
                    </div>
                    <p class="ml-nx-cs mt-24 fs-28">
                        <span>执业年限<i class="color-3 ml-20 fs-32 fw-bold-smaller">{{item.workTime}}年</i></span>
                        <span>服务城市<i class="color-3 ml-20 fs-32 ">{{item.city}}</i></span>
                    </p>
                    <!-- 进度圆圈 -->
                    <div class="fy-detail-box ml-other fy-border-t">
                        <div class="ml-other-box">
                            <div class="canvas">
                                <canvas :class="'MLJDS-'+item.id"></canvas>
                                <span class="color-3 fs-26" v-cloak>{{item.orderNum}}</span>
                            </div>
                            <p>接单数</p>
                        </div>
                        <div class="ml-other-box">
                            <div class="canvas">
                                <canvas :class="'MLHPL-'+item.id"></canvas>
                                <span class="color-3 fs-26" v-cloak>{{item.goodCommentRate}}%</span>
                            </div>
                            <p>好评率</p>
                        </div>
                        <div class="ml-other-box">
                            <div class="canvas">
                                <canvas :class="'MLHYD-'+item.id"></canvas>
                                <span class="color-3 fs-30" v-cloak>{{item.activeRate}}</span>
                            </div>
                            <p>活跃度</p>
                        </div>
                    </div>
                    <!-- 擅长领域 -->
                    <div class="fy-detail-box ml-pro fy-border-t" v-if="item.goodAts&&item.goodAts.length>0">
                        <span>擅长领域</span>
                        <ul>
                            <li v-for="(info,index) in item.goodAts" :key="getUuid() + index">{{info.goodAtName}}</li>
                        </ul>
                    </div>
                    <div class="ml-button">
                        <span class="goAsk fs-36 color-f fy-btn-orange" v-if="type==2" @click="linkLawyer(index)">快速咨询(¥{{item.price}}元/次)</span>
                        <span class="goAsk fs-36 color-f fy-btn-orange" v-if="type==1&&!payType" @click="linkLawyer(index)">联系TA</span>
                        <span class="goAsk fs-36 color-f fy-btn-orange" v-if="type==1&&payType" @click="linkLawyer(index)">购买服务</span>
                    </div>
                </div>
            </div>
            <div class="ml-point" v-if="matchLawyers.length>0">
                <ul>
                    <li v-for="(item,index) in matchLawyers" :class="index==0?'active':''" :key="getUuid() + index"></li>
                </ul>
            </div>
            <div class="box-106"></div>
            
        </div>
        <!--没有匹配到律师-->
        <div class="matchLawyerNO" v-else-if="matchLawyers.length==0">
            <ul>
                <li><img src="../../assets/images/noLawyer.png" /></li>
                <li>
                    <span>暂无可提供的律师</span>
                </li>
            </ul>
        </div>
      </b-scroll>
      <div class="mlb-other-lawyer fy-btn-f" @click="otherLawyer">
        <span class="otherLawyer fs-36 color-9">查看其他律师</span>
      </div>
    </div>
</template>

<script>
import {drawHPL,uuid} from 'lib/utils';
const MAXCARD = 20;
export default {
  name:'matchLawyerAsk',
  data() {
    return {
      code: '',
      matchLawyers: [],
      type:1,//咨询类型 1：服务咨询，2：快速咨询
			goodCommentRate:90,//好评率
			activeRate:"高",//活跃度
			payType:0,//是否直接购买
    };
  },
  mounted: function() {
    this.$nextTick(() =>{
      this.getdataInfo();
    });
  },
  computed: {
    title() {
      return this.$route.meta.title;
    }
  },
  methods: {
    //获取律师信息
    getdataInfo: function() {
      let _this = this;
      _this.code = 1;
      _this.Api.matchLawyerAsk.findLawyer().then((response)=>{
        if(response.code != 1) return;
        let res = response.data;
        _this.matchLawyers = res.items || [];
        setTimeout(()=>{
          _this.pageInit();
        },20)
      });
    },
    //页面初始化要执行的方法
    pageInit: function() {
      var _this = this;
      if (!localStorage.getItem('isSee')) {
        _this.alertTips();
      }
      if (
        _this.code == 1 &&
        _this.matchLawyers &&
        _this.matchLawyers.length > 0
      ) {
        //开始绘制圆圈进度条
        _this.drawHPLBegin(_this.matchLawyers[0].id);
      }
      var allCard = document.querySelectorAll('.ml-top-box');
      for (var i = 0; i < allCard.length; i++) {
        _this.addTouchEvent(allCard[i], i);
      }
    },
    //联系他
    linkLawyer: function(lawyerIndex) {},
    //其他律师
    otherLawyer: function() {},
    //跳转到律师详情页
    lawyerDetail: function(id) {
      var _this = this;
    },
    //动态绘制圆圈
    drawHPLBegin: function(id) {
      var _this = this;
      if (_this.code == 1 || _this.code == '1') {
        var t = 1,
          f = 1,
          y = 1;
        //好评率
        var theTime = setInterval(function() {
          if (t >= _this.goodCommentRate) {
            clearInterval(theTime);
          }
          _this.drawHPL('MLHPL-' + id, t);
          t++;
        }, 1);
        //活跃度
        var theTime2 = setInterval(function() {
          if (f >= 90) {
            clearInterval(theTime2);
          }
          _this.drawHPL('MLHYD-' + id, f);
          f++;
        }, 1);
        //接单数
        var theTime3 = setInterval(function() {
          if (f >= 95) {
            clearInterval(theTime3);
          }
          _this.drawHPL('MLJDS-' + id, f);
          f++;
        }, 1);
      }
    },
    //进度圆圈
    drawHPL: function(elementClass, val1,color={default:'#e7e7e7',active:'#fdb65b'}) {
      drawHPL(elementClass, val1,color={default:'#e7e7e7',active:'#fdb65b'});
    },
    //图片大小reload
    reloadImg: function() {
      var img = $('.mltb-headimg>img');
      var W = parseInt(img.width());
      var H = parseInt(img.height());
      if (W > H) {
        img.css({ height: '100%', width: 'auto' });
      } else {
        img.css({ width: '100%', height: 'auto' });
      }
    },
    //获取数字格式
    getNumber: function(val) {
      return parseInt(val);
    },
    //弹出左右滑动提示框
    alertTips: function() {
      var title =
        '<img class="ml-tips-icon" src="static/images/ml-tips-icon.png" alt=""><p class="color-9 fs-32">左右滑动查看更多律师</p>';
      mui.alert('', title, '确定', function() {
        localStorage.setItem('isSee', 1);
      });
    },
    //添加触摸事件监听
    addTouchEvent: function(element, index) {
      var _this = this;
      var firstTouchx, firstTouchy, newElement;
      element.addEventListener(
        'touchstart',
        function(event) {
          _this.setTransform(element, 0);
          _this.setNewElementCalss(index);
          var touchMoveObj = event.changedTouches[0];
          firstTouchx = touchMoveObj.clientX;
          firstTouchy = touchMoveObj.clientY;
        },
        false
      );

      element.addEventListener(
        'touchmove',
        function(event) {
          _this.setNewElementCalss(index);
          var newIndex = index;
          var touchMoveObj = event.changedTouches[0];
          var movex = touchMoveObj.clientX - firstTouchx;
          var movey = touchMoveObj.clientY - firstTouchy;

          var direction = _this.getDirection(movex, movey);
          if (direction == 'right' && index >= 1) {
            newIndex--;
          } else if (
            direction == 'left' &&
            index < _this.matchLawyers.length - 1
          ) {
            newIndex++;
          }

          if (newIndex >= 0 && newIndex < MAXCARD && newIndex != index) {
            newElement = document.querySelectorAll('.ml-top-box')[newIndex];
            newElement.classList.remove('fy-hide');
            newElement.classList.add('show');
            element.classList.add('scroll');
            _this.setTranslate(element, movex + 'px');
          }
        },
        false
      );

      element.addEventListener(
        'touchend',
        function(event) {
          var newIndex = index;
          var touchMoveObj = event.changedTouches[0];
          var movex = touchMoveObj.clientX - firstTouchx;
          var movey = touchMoveObj.clientY - firstTouchy;

          var direction = _this.getDirection(movex, movey);
          if (direction == 'right' && index >= 1) {
            newIndex--;
          } else if (
            direction == 'left' &&
            index < _this.matchLawyers.length - 1
          ) {
            newIndex++;
          }

          if (newIndex >= 0 && newIndex < MAXCARD && newIndex != index) {
            newElement = document.querySelectorAll('.ml-top-box')[newIndex];
            newElement.classList.remove('fy-hide');
            element.classList.add('scroll');
            _this.drawHPLBegin(_this.matchLawyers[newIndex].id);
            _this.setTransform(element, 1000);
            _this.setTranslate(element, direction == 'left' ? '-120%' : '120%');
            document
              .querySelectorAll('.ml-point>ul>li')
              .forEach(function(element) {
                element.classList.remove('active');
              });
            document
              .querySelectorAll('.ml-point>ul>li')
              [newIndex].classList.add('active');
          } else {
            _this.setNewElementCalss(index);
          }
        },
        false
      );
    },
    //添加动画效果事件设置
    setTransform: function(el, value) {
      el.style.webkitTransitionDuration = el.style.transitionDuration =
        value + 'ms';
    },
    //添加移动效果
    setTranslate: function(el, value) {
      if (el)
        el.style.webkitTransform = el.style.transform =
          'translate3d(' + value + ',0,0)';
    },
    //获取移动方向
    getDirection: function(x, y) {
      if (x === y) {
        return '';
      }
      if (Math.abs(x) >= Math.abs(y)) {
        return x > 0 ? 'right' : 'left';
      } else {
        return y > 0 ? 'down' : 'up';
      }
    },
    //清除移动样式
    setNewElementCalss: function(index) {
      var _this = this;
      var allCard = document.querySelectorAll('.ml-top-box');
      for (var i = 0; i < allCard.length; i++) {
        if (i != index) {
          allCard[i].classList.add('fy-hide');
        }
        _this.setTranslate(allCard[i], 0);
        allCard[i].classList.remove('scroll');
        allCard[i].classList.remove('show');
      }
    },
    getUuid(){
      return uuid();
    }
  }
};
</script>
