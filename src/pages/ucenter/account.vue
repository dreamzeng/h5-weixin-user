<template>
		<div class="account">
			<newbie></newbie>
			<ul>
				<li @click="toPage(2)">修改账号密码</li>
				<li @click="toPage(1)">
					<p>更改手机号</p>
					<p>{{phone}}</p>
				</li>
			</ul>
			<div class="socia">
				<p>社交账号绑定</p>
			</div>
			<div class="weixin">
				<p>微信</p>
				<p @click="unbind">已绑定</p>
			</div>
		</div>
</template>

<script>
export default{
		name:"account",
		data(){
			return {
				phone:''
			}
		},
		mounted(){
			this.phone=this.$store.getters.phone.substring(0,3)+"****"+this.$store.getters.phone.substring(7);
			if(!this.$store.getters.token){
				this.$router.push({path:'/mobileBind'});
			}
		},
		methods:{
			toPage(index){
		        switch (index){
		          case 1:
		            this.$router.push({path:'/changeMobile'});
		            break
		          case 2:
		            this.$router.push({path: '/changePassword'});
		            break
		        }
		   },
		   unbind(){
		   	this.Api.login.unbind({
		   		thirdType:0
		   	}).then(res=>{
		   		localStorage.clear();
		   		sessionStorage.clear();
		   	})
		   }
		}
	}
</script>

<style lang="less" scoped>
	.account{
		width:100%;
		height:100%;
		background: #f2f3f5;
		font-size: 0.3rem;
		padding-top: 0.24rem;
		ul{
			background: #fff;
			padding: 0 0.32rem;
			color:#333;
			li{
				line-height: 1.04rem;
				background: url(../../assets/images/right.png) no-repeat center right;
				background-size:0.1rem 0.2rem ;
				position: relative;
				&:nth-child(1):after{
					content:"";
					height:1px;
					width:100%;
					position:absolute;
					bottom:0;
					left:0;
					-webkit-transform:scaleY(0.5);
					-moz-transform:scaleY(0.5);
					-ms-transform:scaleY(0.5);
					-o-transform:scaleY(0.5);
					transform:scaleY(0.5); 
					box-sizing:border-box;
					background-color:#E5E5E5;
				}
				&:nth-child(2){
					display: flex;
					justify-content: space-between;
				}
				&:nth-child(2) p:nth-child(2){
					margin-right: 0.3rem;
				}
			}
		}
		.socia{
			padding-left: 0.32rem;
			height:0.68rem ;
			p{
				line-height: 0.8rem;
				font-size: 0.26rem;
				color:#999;
			}
		}
		.weixin{
			height: 0.96rem;
			background: #fff;
			line-height: 0.96rem;
			padding:0 0.32rem;
			display: flex;
			justify-content: space-between;
			p:nth-child(1){
				background: url(../../assets/images/weixin.png) no-repeat center left;
				background-size:0.38rem 0.38rem ;
				padding-left: 0.5rem;
				
			}
		}
	}
</style>