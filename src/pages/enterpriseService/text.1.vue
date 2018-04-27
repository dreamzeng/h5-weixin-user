<template>
    <div id="pageContainer">
        <!-- <header-bar :title= "'意见反馈'" :isSearch="false"></header-bar> -->
        <section class="w-bg">
            <div class="txt-box">
                <textarea maxlength="300" placeholder="请输入问题描述，至少5字" v-model="pageObj.dec" @input="descInput()"></textarea>
                <span class="fnum"><em>{{pageObj.fontNum}}</em>/300</span>
            </div>
            <div class="img-box">
                <div class="img-list">
                    <ul>
                        <li v-for="(item,index) in imgList" :key="index">
                            <div class="close" @click="remove($event.currentTarget)" :data-index="index"></div>
                            
                            <img :src="item.url"  @click="$photoswipe.open(index, imgList)" class="preview-img-item">
                        </li>
                        <div class="upimg"  id="filePicker" v-show="pageObj.imgnum<9">+</div>
                    </ul>
                </div>
                <p class="tips">图片（可选项，提供问题截图，最多9张）</p>
            </div>
        </section>
        <div class="subBtn" @click="submit" :class="pageObj.decflag ? 'ableclick':''">提交</div>
        <!-- 上传图片 -->
        <vue-upload
			ref="uploader"
			uploadButton="#filePicker"
			multiple
            method ="POST"
            @fileChange="fileChange"
            @success="onSuccess"
            @filestart="filestart"
            @complete ="complete"
            @uploadError = "uploadError"
        ></vue-upload>
        
        <!-- 放大图片 -->
        <!--<big-img v-if="bigshowImg" @clickit="viewImg" :imgSrc="bigimgSrc"></big-img> -->
    </div>
</template>
<style lang="less" scoped>
    @import '~@/pages/enterpriseService/feedback.less';
    .preview-img-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .preview-img-item {
        margin: 5px;
        max-width: 100px;
        max-height: 100px;
    }
</style>
<style lang="less">
    .mint-indicator-wrapper{
        width: 2rem;
        padding:0.1rem!important;
    }
    .mint-indicator-text{
        margin-top:0;
        padding-bottom:0.2rem;
    }
</style>


<script>
    import { Toast } from 'mint-ui';
    import { Indicator } from 'mint-ui';
    import vueUpload from '@/components/upload/upload.vue';
    
    // import BigImg from '@/components/upload/bigImg.vue';
    export default {
        
        data:function(){
            return{
                pageObj:{
                    fontNum:0,
                    dec:"",
                    decflag:false,
                    imgnum:0,
                    phoneNum:'',
                    btnableflag:true,
                },
                imgList:[],
                bigshowImg:false,
　　　　　　     bigimgSrc: ''
            }
        },
        mounted:function(){
            setTimeout(function () {
                mui.previewImage();
            },20);
		},
        props: ['pagedata'],
        components: {
            vueUpload,
            
            // 'big-img':BigImg
        },
        methods:{
            descInput:function(){
                let that = this;
                that.pageObj.fontNum = that.pageObj.dec.length;
                if(that.pageObj.fontNum>9){
                    that.pageObj.decflag=true;
                }else{
                    that.pageObj.decflag=false;
                }
                if(that.pageObj.fontNum===300){
                    Toast({
                        message: '最多输入300个字',
                        position: 'middle',
                        duration: 3000
                    });
                }
            },
            fileChange(file) {
                //选择图片
                if (!file.size) return;
            },
            onSuccess (file, response) {
                // 上传成功获取链接渲染页面
                let that =this;
                let imgs=[];
                
                that.imgList.push(response.data);
                console.info(that.imgList);
                that.pageObj.imgnum++;
                Toast({
                    message: '上传成功',
                    position: 'middle',
                    duration: 2000
                });
            },
            uploadError(file){
                Toast({
                    message: '上传失败',
                    position: 'middle',
                    duration: 2000
                });
            },
            filestart(file){
                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                });
            },
            complete(file){
                Indicator.close();
            },
            remove(e) {
                // 删除上传图片
                let that = this;
                let index = e.getAttribute("data-index");
                that.imgList.splice(index, 1);
                that.pageObj.imgnum--;
            },
            // clickImg(e) {
            //     //点击放大图片
            //     let that = this;
            //     that.bigshowImg = true;
            //     // 获取当前图片地址
            //     that.bigimgSrc = e.currentTarget.src;
            //     console.log(that.bigimgSrc)
            // },
            // viewImg(){
            //     let that = this;
            //     that.bigshowImg = false;
            // },
            submit(){
                //提交反馈
                let that = this;
                let fimgList="";
                for(let i=0;i<that.imgList.length;i++){
                    if(that.imgList.length==1){
                        fimgList=that.imgList[0].url
                    }else{
                        fimgList+=","+that.imgList[i].url;
                    }
                }
                if(that.imgList.length!=1){
                    fimgList = fimgList.slice(1);
                }
                if(!that.pageObj.btnableflag){
                    Toast({
                        message: '请稍后在点',
                        position: 'middle',
                        duration: 2000
                    });
                    return false;
                }
                if(that.pageObj.decflag && that.pageObj.btnableflag){
                    that.pageObj.btnableflag =false;//防止连续点击
                    
                    let params={
                        imgUrls:fimgList,
                        content:that.pageObj.dec,
                        type:2
                    }			
                    this.Api.lawyer.feedback(params).then(result => {
                        if (result && result.code == 1) {
                            Toast({
                                message: result.msg,
                                position: 'middle',
                                duration: 2000
                            });
                            setTimeout(()=>{
                                this.$router.push({path:'tab/mine'});
                            },3000);
                            
                        }else{
                            Toast({
                                message: result.msg,
                                position: 'middle',
                                duration: 2000
                            });
                        }
                        that.pageObj.btnableflag =true;
                    });

                }else{
                    if(!that.pageObj.decflag){
                        Toast({
                            message: '反馈内容不得少于10个字',
                            position: 'middle',
                            duration: 2000
                        });
                    }                    
                }
            }
            
        }
    }
</script>
