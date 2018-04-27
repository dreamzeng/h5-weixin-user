<template>
    <div>
        <mt-header title="消息中心"></mt-header>
        <div v-for="obj in msgList" class="msgItem"  @click="msgDetail()">
            <div class="msgItemLeft">
                <img :src="headerimg">
            </div>
            <div class="msgItemContent">
                <div class="msgItemContentTop">{{obj.msgTitle}}</div>
                <div class="msgItemContentBottom">{{obj.msgContent}}</div>
            </div>
            <div class="msgItemRight">
                <div class="msgItemRightTop">{{obj.lastUpdateTime.substring(0,10)}}</div>
                <div class="msgItemRightBottom">{{obj.lastUpdateTime.substring(11,19)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'message',
    data: function () {
        return {
            headerimg:"../../../static/images/user_avatar_logined.png",
            msgList:[]
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.headerimg = this.userData.userImages
            this.init();
        });
    },
    computed: {
        ...mapState({
              userData(state){
                return state.userData || {}
            }
        })
    },
    methods: {
        msgDetail(){

        },
        init(){
            console.log("get notice")
           
        },
    }
};
</script>

<style  lang="scss" scoped>
.mint-header {
  background-color: #FFF;
  color:#333;
  border-bottom: 0px solid #DDD;
  position: fixed;
  top:0px;
  width:100%;
}
.msgItem{
    height: 6rem;
    background: #FFF;
    border-bottom: 1px solid #ececec;
    font-size: 1.6rem;
    display:flex;

    .msgItemLeft{
        width:5rem;
        height: 100%;
        padding-top:1.5rem;
        padding-left:1rem;
        img {
            width: 3rem;
            border-radius: 50%;
        }
    }
    .msgItemContent{
        flex:1;
        color:#bbb;
        padding-top:.8rem;
        padding-left:1rem;
        .msgItemContentTop{
            color:#555;
            font-size: 1.4rem;
            line-height:1.8rem;
        }
        .msgItemContentBottom{
            font-size: 1.2rem;
            line-height:1.4rem;
        }
    }
    .msgItemRight{
        width:8rem;
        color:#bbb;
        font-size: 1.3rem;
        padding-top:1.5rem;
        text-align: right;
        padding-right:8px;
        .msgItemRightTop{
            line-height:1.8rem;
        }
        .msgItemRightBottom{
            line-height:1.8rem;
        }
    }
}
</style>