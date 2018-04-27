<template>
  <div class="no-search-main">
    <div class="bg"></div>
    <p>暂时未有预约</p>
    <div class="bottom" @click="$router.push({path:'/enterpriseServicewrite',query:{kind:0}})">去预约</div>
  </div>
</template>
<script>
  const COMPONENT_NAME = 'my-subscribe-noSearch';
  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="less" scoped>
.no-search-main{
	background: #fff;
	width: 100%;
	height: 100%;
	position: relative;
	top: 0;
	bottom: 0;
	font-size: .28rem;
	color: #666;
	margin: 0 auto;
    text-align: center;
    padding-top: 1.46rem;
    .bg{
        background: url(~@/assets/images/no-goods.png)  no-repeat;
        background-size:5.86rem 3.96rem;
        width: 5.86rem;
        height: 3.96rem;
        margin: 0 auto;
    }
    p{
        margin: .64rem 0 .40rem 0;
        font-size: .28rem;
        color: #666;
    }
    .bottom{
        width: 1.9rem;
        height: .64rem;
        line-height: .64rem;
        text-align:center;
        font-size: .32rem;
        color:#01cdb1;
        border:1px #01cbd1 solid; 
        margin: 0 auto;
        border-radius: .3rem; 
    }
}
</style>
