<template>
    <div>
        <mt-header title="设置">
            <router-link to="/tab/mine" slot="left">  
                <mt-button><img src="../../assets/images/back_b.png" height="20" width="20" slot="icon"></mt-button>  
            </router-link>
        </mt-header>
        <div class="cellBox" @click="toPage(1)">
            <div class="cellName">用户协议</div>
            <div class="cellIcon"><img src="../../assets/images/rightA.png"></div>
        </div>
      <div class="cellBox" @click="toPage(1)">
            <div class="cellName">用户协议</div>
            <div class="cellIcon"><img src="../../assets/images/rightA.png"></div>
        </div>
        <div class="cellBox" @click="toPage(1)">
            <div class="cellName">用户协议</div>
            <div class="cellIcon"><img src="../../assets/images/rightA.png"></div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'userInfo',
    data: function () {
        return { }
    },
    methods: {
        toPage(index){
        switch (index) {
          case 1:
            this.$router.push({path: '/userAgreement'})
            break
          case 2:
            this.$router.push({path: '/feedback'})
            break
          case 3:
            this.$router.push({path: '/aboutUs'})
            break
          case 4:
            this.$router.push({path: '/helpCenter'})
            break
        }
      }
    }
};
</script>

<style lang="scss" scoped >
.mint-header {
  background-color: #FFF;
  color:#333;
  border-bottom: 0px solid #DDD;
  width:100%;
}
.cellBox {
  display: flex;
  justify-content: space-between;
  margin-top: 0rem;
  font-size: 1.4rem;
  border: {
    top: 0px solid #dedede;
    bottom: 1px solid #dedede;
  }
  height: 4rem;
  width: 100%;
  background: #fff;
  div {
    line-height: 4rem;
  }
  .cellName {
    position: relative;
    left: .7rem;
    width:100px;
  }
  .cellIcon {
    img {
      position: relative;
      top: .4rem;
      width: 1.5rem;
    }
  }
  .cellInfo{
    position: relative;
    right: 0.5rem;
    width:80%;
    color:#BBB;
    text-align:right;
    font-size: 1.3rem;
  }
  .cellIconBox{
    display: flex;
    align-items: center;
    img{
      width:2.3rem;
      padding-left:.8rem;
    }
  }
}
</style>