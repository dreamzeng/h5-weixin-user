<template>
  <div class="no-search-main">
    <img src="./no-search.png">
    <p>暂时未找到相关内容</p>
  </div>
</template>
<script>
  const COMPONENT_NAME = 'no-search';

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
	img{
		width: 5.86rem;
		height: 3.96rem;
		display: block;
		margin: 1.46rem auto .64rem auto;
	}
}
</style>
