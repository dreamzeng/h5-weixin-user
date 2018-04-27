<style lang="less" scoped>
@import './mine.less';
</style>

<template>
    <div class="mine-main">
	  <newbie></newbie>
      <b-scroll :scrollbar="false">
        <div class="wrapping">
          <div class="datum">
            <div class="userInfo">
              <div class="login" v-show="!isLogin">
                <div class="cellName" @click="toPage(1)">注册/登录</div>
                <div class="cellIcon"><img src="../../assets/icon/directing.png"></div>          
              </div>
              <div class="memberName" v-show="isLogin">{{userData.realFogyyName}}</div>
              <div class="avatar" @click="$router.push({ name: 'userDatum',params:{uuid:'sfda'}})">
                <img :src="headerimg">
              </div>
            </div>
            <div class="bannerBox">
              <div class="bannerItem" @click="toPage(2)">
                <img src="../../assets/icon/icon_my_order.png">
                我的订单
              </div>
              <div class="bannerItem" @click="$router.push({name:'mySubscribeList'})">
                <img src="../../assets/icon/make-icon.png">
                我的预约
              </div>
              <div class="bannerItem" @click="toPage(3)">
                <img src="../../assets/icon/icon_my_coupon.png">
                优惠券
              </div>
            </div>
          </div>
          <div class="items">
            <div class="cellBox" @click="toPage(4)">
              <div class="cellIconBox"><img src="../../assets/icon/star-blue-icon.png"></div>
              <div class="cell-info">
                <div class="cellName">我的收藏</div>
                <div class="cellIcon"><img src="../../assets/icon/directing.png"></div>
              </div>
            </div>
            <div class="cellBox" @click="toPage(5)">
              <div class="cellIconBox"><img src="../../assets/icon/helpservice.png"></div>
              <div class="cell-info">
                <div class="cellName">客服与帮助</div>
                <div class="cellIcon"><img src="../../assets/icon/directing.png"></div>
              </div>
            </div>
            <div class="cellBox" @click="toPage(6)">
              <div class="cellIconBox"><img src="../../assets/icon/number-security-icon.png"></div>
              <div class="cell-info">
                <div class="cellName">账号与安全</div>
                <div class="cellIcon"><img src="../../assets/icon/directing.png"></div>
              </div>
            </div>
            <div class="cellBox cellBoxbn" @click="toPage(7)">
              <div class="cellIconBox"><img src="../../assets/icon/feedback-icon.png"></div>
              <div class="cell-info">
                <div class="cellName">意见反馈</div>
                <div class="cellIcon"><img src="../../assets/icon/directing.png"></div>
              </div>
            </div>
          </div>
        </div>
      </b-scroll> 
  </div>
</template>

<script>
export default {
  name: 'mine',
  data() {
    return {
      isLogin:false,
      headerimg: 'static/images/user_avatar_logined.png',
      userData:{}
    };
  },
  created() {},
  mounted: function() {
    this.$nextTick(function() {
      this.init();
    });
  },
  computed: {
   
  },
  methods: {
    init() {
      this.userData = this.$store.getters.userData || {};
      console.log(this.userData)
      if(this.userData.logo){
        this.headerimg = this.userData.logo;
        this.isLogin = true;
      }
    },
    toPage(index) {
      switch (index) {
        case 1:
          this.$router.push({ path: '/mobileBind'});
          break;
        case 2:
          this.$router.push({ path: '/userOrder'});
          break;
        case 3:
          this.$router.push({ path: '/myCoupon'});
          break;
        case 4:
          this.$router.push({ path: '/MyCollect'});
          break;
        case 5:
          this.$router.push({ path: '/customerServicetop'});
          break;
        case 6:
          this.$router.push({ path: '/account'});
          break;
        case 7:
          this.$router.push({ path: '/usefeedback'});
          break;
      }
    }
  }
};
</script>
