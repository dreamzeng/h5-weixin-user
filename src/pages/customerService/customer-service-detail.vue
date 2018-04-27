<template>
    <div id="pageContainer">
        <!-- <header-bar :title= "title" :isSearch="false"></header-bar> -->
        <div class="helpdetail-box" v-html="data"></div>
    </div>
</template>
<style lang="less" scoped>
    #pageContainer{
        height: 100%;
        background-color: #fff;
    }
    .helpdetail-box{
        padding: 0.3rem;
        overflow: hidden;
        font-size: 0.32rem;
    }
</style>
<script>
    export default {
        data:function(){
            return {
                data:"",
                title:""
            };
        },
        mounted: function(){
            this.init();
            
        },
        methods: {
            /*页面数据初始化*/
            init:function  (arg) {
                var that = this;
                let params={
					helpCenterId:that.$route.query.id,
				}
				this.Api.lawyer.customerServicedetail(params).then(result => {
					if (result && result.code == 1) {
                        that.data = result.data.answer;
                        this.$store.dispatch("setTitle",result.data.title);
                        $("#pageContainer").show();
					}
				});
            }

        }
    }
</script>

