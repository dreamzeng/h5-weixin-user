<template>
    <div id="pageContainer">
        <!-- <header-bar :title= "'客服与帮助'" :isSearch="false"></header-bar> -->
        <div class="pageContainer-box">
            <div class="items-container"  v-for="item in data" :key="item.index">
                <div class="item-title text-overflow">
                    <span>{{item.title}}</span>
                </div>
                <div class="items">
                    <div class="item text-overflow" v-for="subitem in item.list" @click="skip(subitem.helpCenterId,subitem.title)" :key="subitem.index">
                        <span @click="skip(subitem.helpCenterId,subitem.title)">{{subitem.title}}</span><img src="~@/assets/images/right.png" @click="skip(subitem.helpCenterId,subitem.title)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .pageContainer-box{
        overflow: hidden;
    }
    html{
        background: #f5f5f5;
        overflow-x: hidden;
    }
    body{
        overflow-x: hidden;
    }
    #pageContainer{
        display: none;
    }

    .items{
        background: #ffffff;
        padding: 0 .32rem 0 .32rem;
    }
    .items .item{
        position: relative;
        height: .98rem;
        line-height: .98rem;
    }
    .items .item::before{
        position: absolute;
        width: 200%;
        left: -50%;
        right: 0;
        top:0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaley(.5);
        box-sizing: border-box;
        background-color: #f5f5f5;
    }
    .items .item:first-child::before{
        position: absolute;
        width: 200%;
        left: -50%;
        right: 0;
        left: 0;
        top:0;
        height: 0;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaley(.5);
        box-sizing: border-box;
        background-color: #f5f5f5;
    }

    .items .item span{
        font-size: .32rem;
        color: #333333;
        display: -webkit-box;
    }
    .items .item  img{
        position: absolute;
        width: .09rem;
        height: .16rem;
        top: .42rem;
        right: 0;
    }

    .item-title{
        background: #f5f5f5;
        padding-left: .31rem;
        font-size: .32rem;
        height: .84rem;
        line-height: .84rem;
    }
    .mui-popup-button.mui-popup-button-bold {
        font-weight: normal;
    }

    .text-overflow{
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
<script>
    export default {
        data:function(){
            return {
                data:[]
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
					parentId:that.$route.query.parentId,
				}
				this.Api.lawyer.customerServicet(params).then(result => {
					if (result && result.code == 1) {
						that.data = result.data;
                        $("#pageContainer").show();
                        
					}
				});
            },
            /*链接跳转*/
            skip:function (arg,title) {
                this.$router.push({path:'/customerServicedetail',query:{"id":arg}});
            },

        }
    }
</script>

