<template>
<transition name="slide">
    <div id="share" v-show="show">
        <div class="mask"  @click="hiddenShare"></div>
        <div class="share-box">
            <p>分享至</p>
            <ul>
                <li class="shareItem"><a href="javascript:;"  class="icon-weixin"></a>微信好友</li>
                <li class="shareItem"><a href="javascript:;"  class="icon-friends"></a>朋友圈</li>
                <li class="shareItem"><a href="javascript:;"  class="icon-qq"></a>QQ</li>
                <li class="shareItem"><a href="javascript:;"  class="icon-que"></a>QQ空间</li>
            </ul>
            <div class="quxiao" @click="hiddenShare">取消</div>
        </div>
    </div>
</transition>
</template>
<script>
import * as type from '../../store/index.js'
import {mapGetters} from 'vuex'
export default {
    name: 'share-box',
    data: function () {
        return {
           blackBg:true
        }
    },
    methods: {
        hiddenShare() {
            this.$store.commit(type.SHOWSHAREBOX, false)
            this.blackBg = false
        }
    },
    computed: {
        ...mapGetters([
            'Sharebox'
        ])
    },  
    props:{
        'show': Boolean
    }
}
</script>
<style lang = "less" scoped>
 @import "../../assets/less/base.less";
#share {position: fixed;left: 0; bottom: 0; width: 100%; font-size: 0; 
   .mask{position: fixed;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,.5);z-index: 0}
   .share-box{position: relative;z-index: 10; border-top: 1px solid #e5e5e5; background: #f2f3f5;
    .quxiao {width: 100%;height: 40px;line-height: 40px;text-align: center;font-size: .3rem; border-top: 1px solid #e5e5e5;background: #fff}
    p{ position: relative;height: 30px;line-height: 60px;font-size: 14px;text-align: center; color: #333;}
    p:before, p:after { content: '';position: absolute;width:38%;height: 1px;top: 94%;background: #e5e5e5;}
    p:before{ left: 3%}
    p:after { right: 3%}
    .shareItem {display: inline-block;width: 25%;color: #333;text-align: center;font-size:.24rem;margin-bottom:.8rem;
    a {display: block;height: .6rem;line-height: 2rem;width: 1rem; margin:.8rem .4rem .2rem .4rem;text-align: center;    }
    }
}

}

.slide-enter-active, .slide-leave-active{
    transition: all .2s ease;
}
.slide-enter, .slide-leave-active{
    transform: translateY(230px);
    opacity: 0;
}

</style>
