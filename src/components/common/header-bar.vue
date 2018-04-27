<template>
<mt-header :title= "title">
  <div @click="back" slot="left">
       <mt-button icon="back" v-show="IsLshow"></mt-button>
  </div>
  <div slot="right">
   <!-- <i class="icon-star-hover"></i> <i class="icon-star-hover" ></i> -->
   <i class="s-icon" v-if="isSearch"  @click="$router.push({ name: 'search'})"></i>
  </div>
</mt-header>
</template>

<script>
export default {
  name: 'header-bar',
  data(){
     return {
         vuegConfig: {
                forwardAnim: 'fadeIn'
            }
     }
  },
  props:{
     title:{
         type: String,
         default: ''
     },
     IsLshow: {
        type: Boolean,
        default: true
     },
    IsRshow: {
        type: Boolean,
        default: true
    },
    isSearch:{
        type:Boolean,
        default:false
    }
   },
   methods:{
      back() {
        this.$router.back()
      }
   }
};
</script>
<style lang="less" scoped>
.s-icon{
    display: inline-block;
    background: url(~@/assets/icon/search.png);
    background-size: 0.32rem 0.32rem;
    width: 0.32rem;
    height: 0.32rem;
    vertical-align: middle;
    margin-right: .1rem;
    margin-top: -0.05rem;
}
</style>
<style lang="scss">
.mint-header {
    min-height:44px;
    width: 100%;
    line-height:44px;
    position: fixed;
    background: #fff;
    padding: 0 .32rem;
    font-size: .32rem;
    color:#333;
    border-bottom: 1px solid #e5e5e5;
    left: 0;
    top: 0;
    text-align: center;
    z-index: 999;
}
</style>