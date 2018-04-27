<template>
    <div id="pageContainer" data-name="pageContainer">
        <!-- <header-bar :title= "'客服与帮助'" :isSearch="false"></header-bar> -->
        <div class="pageContainer-box">
            <div class="items-container" >
                <div class="item text-overflow"  v-for="item in data" @click="oneMenu(item.helpCenterId,item.title)" :key="item.index">
                    <span  :data-track="item.title" @click="oneMenu(item.helpCenterId,item.title)">{{item.title}}</span><img src="~@/assets/images/right.png"  @click="oneMenu(item.helpCenterId,item.title)">
                </div>
            </div>
            <div class="footer" data-name="footer">
                <div class="seek" @click="seek()">
                    <span class="logo"></span>
                    <span>咨询在线客服</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    html{
        background: #f5f5f5;
        overflow-x: hidden;
    }
    body{
        background: #f5f5f5;
        overflow-x: hidden;
    }
    #pageContainer{
        display: none;
    }
    .pageContainer-box{
        overflow: hidden;
    }
    .items-container{
        background: #ffffff;
        padding: 0 .32rem 0 .32rem;
        margin-top: 0.32rem;
    }
    .items-container .item{
        position: relative;
        height: .98rem;
        line-height: .98rem;
    }
    .items-container .item::before{
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
        background-color: #e5e5e5;
    }
    .items-container .item:first-child::before{
        position: absolute;
        left: 0;
        right: 0;
        top:0;
        height: 0;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaley(.5);
        box-sizing: border-box;
        background-color: #e5e5e5;
    }

    .items-container .item span{
        font-size: .32rem;
        color: #333333;
        display: -webkit-box;
    }
    .items-container .item  img{
        position: absolute;
        width: .09rem;
        height: .16rem;
        top: .42rem;
        right: 0;
    }
    .footer{
        text-align: center;
        position: absolute;
        padding: 0 .26rem;
        left: 0;
        right: 0;
        bottom: .5rem;
    }
    .seek{
        color: #ffffff;
        height: .78rem;
        font-size: .32rem;
        line-height: .78rem;
        margin: auto;
        background-color: #00ccb1;
        border-radius: .1rem;
        text-align: center;
        
        .logo{
            display: inline-block;
            vertical-align: -2px;
            width: 0.32rem;
            height: 0.32rem;
            background: url('~@/assets/images/fm-kf2.jpg') no-repeat;
            background-size: contain; 
        }
        
    }

    .ib{
        display: inline-block;
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
                key:"",
                data:[],
                parentId:""
            };
        },
        mounted: function(){
            this.init();
        },
        methods: {
            /*页面数据初始化*/
            init:function  (arg) {
                var that = this;
				this.Api.lawyer.customerServicet().then(result => {
					if (result && result.code == 1) {
						that.data = result.data;
                        $("#pageContainer").show();
                        // lz.util.buriedTrack("data-track");
					}
				});
            },
            /*一级菜单*/
            oneMenu:function (arg,tilte) {
                let parentId = arg;
                this.$router.push({path:'/customerServicesecond',query:{"parentId":parentId}});
            },
            /*咨询客服*/
            seek:function () {
                let rnd =  new Date().getTime();
                location.href="http://www.71chat.com/scsf/phone/visitor.html?cmpcd=142563&rnd="+rnd;
            }
        }
    }
</script>

