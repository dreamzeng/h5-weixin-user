<style lang="less" scoped>
@import './user-datum.less';
</style>
<style  lang="less">

</style>

<template>
    <div class="main">
        <newbie></newbie>
        <b-scroll
            ref="userDatum"
            @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType">
            <div class="wrapping">
                <div class="icon">
                    <div class="avatar fy-border-f8-radius" @click.stop="uploadImg">
                        <img :src="headerimg">
                        <i class="camera"></i>
                    </div>
                </div>
                <div class="datum">
                    <div class="row fy-border-b">
                        <div class="label">昵称</div>
                        <div class="field">
                            <input :class="{ 'default': !param.realName , 'act':param.realName }" placeholder="您的昵称" maxlength="32" v-model="param.realName">
                            <span class="item-error" :class="{'item-error-show' : validateState.realName,'item-error-hied' : !validateState.realName}"></span>
                        </div>
                    </div>
                    <!-- <div class="row fy-border-b">
                        <div class="label">邮箱</div>
                        <div class="field">
                            <input :class="{ 'default': !param.mail , 'act':param.mail }" placeholder="您的邮箱" maxlength="32" v-model="param.mail">
                            <span class="item-error" :class="{'item-error-show' : validateState.mail,'item-error-hied' : !validateState.mail}"></span>
                        </div>
                    </div> -->
                    <div class="row fy-border-b">
                        <div class="label">性别</div>
                        <div class="field" @click="popupVisible = true">
                            <span :class="{ 'default': !param.sex , 'act':param.sex }">{{param.sex || '请选择性别'}}</span>
                        </div>
                    </div>
                    <div class="row fy-border-b">
                        <div class="label">年龄</div>
                        <div class="field" @click="popupVisiblePicker = true">
                            <span :class="{ 'default': !param.age , 'act':param.age }">{{param.age || '请选择年龄'}}</span>
                        </div>
                    </div>
                    <div class="row fy-border-b">
                        <div class="label">居住地</div>
                        <div class="field">
                            <div class="field" @click="popupVisiblePickerCity = true">
                                <span :class="{ 'default': !param.province , 'act':param.province }">{{param.province + '/'+ param.city || '' || '请选择您的居住地'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="foot">
                    <div class="submit" @click="handleEdit">提交</div>
                </div>
            </div>
        </b-scroll>
        <mt-popup
            v-model="popupVisible"
            position="bottom"
            class="popupVisible">
            <div class="selectSex">
                <div class="label fy-border-b" @click="selectSex('男')">男</div>
                <div class="label fy-border-b" @click="selectSex('女')">女</div>
                <div class="label fy-border-b" @click="selectSex('')">取消</div>
            </div>
        </mt-popup>
        <mt-popup v-model="popupVisiblePicker" position="bottom" class="mint-popup-picker">
            <mt-picker :slots="dateSlots" @change="onYearChange"></mt-picker>
        </mt-popup>
        <mt-popup v-model="popupVisiblePickerCity" position="bottom" class="mint-popup-picker">
            <mt-picker :slots="addressSlots"  @change="onAddressChange"></mt-picker>
        </mt-popup>

    </div>
</template>

<script>
import mixin from '@/lib/mixin';
const lodash = require('lodash');
import { Toast } from 'mint-ui';
import {userCenter as userCenterApi} from '@/api/userDatum.api';
import {upload as uploadApi} from '@/api/upload.api';
import {address} from '@/data/city';


export default {
    name:'userDatum', 
    mixins: [mixin],
    data() {
        return {
            popupVisible:false,
            popupVisiblePicker:false,
            popupVisiblePickerCity:false,
            headerimg: 'static/images/edit-user-avatar.png',
            param:{
                realName:'',
                mail:'',
                sex:'男',
                age:'18',
                province:'',//	省份	
                city:''	//	城市
            },
            rules:{
                'realName':[{ required: true, message: '请输入您的昵称'}],
                'mail':[
                    { required: false, message: '请输入您的邮箱'},
                    {test:/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,message:'邮箱格式不正确'}]
            },
            validateState:{'realName':false,'mail':false},
            dateSlots: [{
                flex: 1,
                values: (()=>{
                    let temp = [];
                    for (let index = 18; index <= 100; index++) {
                        temp.push(index);
                    }
                    return temp;
                })()
            }],
            addressSlots: [
                {
                    flex: 1,
                    values: Object.keys(address),
                    className: 'slot1',
                    textAlign: 'center'
                }, {
                    divider: true,
                    content: '-',
                }, {
                    flex: 1,
                    values: ['北京市'],
                    textAlign: 'center'
                },{
                    divider: true,
                    content: '-',
                },{
                    flex: 1,
                    values: ["东城区", "西城区", "朝阳区","丰台区","石景山区", "海淀区","门头沟区","房山区","通州区","顺义区","昌平区","大兴区", "怀柔区","平谷区","密云县","延庆县"],
                    textAlign: 'center'
                }
            ]
        };
    },
    watch:{
        'param.realName': {
           deep: true,
           handler(newValue, oldValue){
               this.checkParam(newValue,'realName',this);
           } 
        },
        'param.mail': {
           deep: true,
           handler(newValue, oldValue){
               this.checkParam(newValue,'mail',this);
           } 
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.$_init();
        });
    },
    methods: {
        $_init(){
            userCenterApi.userInfo().then(response=>{
                if(response.code != 1) return;
                let res = response.data;
                this.param.realName = res.realName;
                this.param.sex = res.sex && res.sex.value;
                this.param.age = res.age || '0';
                this.param.province = res.province || '';
                this.param.city = res.city || '';
                this.headerimg = res.logo;
            });
        },
        uploadImg(){
            let vm = this;
            wx.ready(()=>{
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success (res) {
                        let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        vm.localIds = localIds;
                        vm.headerimg = localIds[0];
                        vm.wxuploadImage(localIds[0]);
                    },
                    fail (res) {     
                        Toast('chooseImage操作失败');
                    }
                });
            })
        },
        wxuploadImage(localId) {
            let vm = this;
            wx.uploadImage({
                localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success (res) {                                     
                    let serverId = res.serverId;                    
                    vm.wxdownloadImage(serverId);
                    console.log(serverId);
                },
                fail (res) {
                    console.log(res);
                    Toast('wxuploadImage操作失败');
                }
            });  
        },
        wxdownloadImage(serverId){
            let vm = this;
            wx.downloadImage({
                serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                isShowProgressTips: 1, // 默认为1，显示进度提示
                success (res) {
                    let localId = res.localId; // 返回图片下载后的本地ID
                    vm.wxgetLocalImgData(localId);
                },
                fail (res) {
                    console.log(res);      
                    Toast('wxdownloadImage操作失败');
                }
            });
        },
        wxgetLocalImgData(localId){
            let vm = this;
            wx.getLocalImgData({
                localId: localId, // 图片的localID
                success: function (res) {                   
                    let localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                    console.log(localData);
                    vm.headerimg = localData;
                    localData = localData.replace(/(data:image\/)[\w]+(\;base64\,)/ig, '');                                            

                     uploadApi.uploadByBase64Code({base64Code:localData}).then((response)=>{
                        if(response.code != 1) return;
                        let res = response.data;
                        vm.param.logo = res.url;
                    }) 
                }
            });
            
        },
        selectSex(value){
            this.popupVisible = false;
            if(!value) return;
            this.param.sex = value;
           
        },
        onYearChange(picker, values) {
            this.param.age = values[0];
        },
        onAddressChange(picker, values) {
            let temp = address[values[0]],val1 = [],val2 = [];
            for(let i = 0,l=temp.length;i<l;i++){
                for (const key in temp[i]) {
                    val1.push(key);
                    if(key == values[1]){
                        val2 =  temp[i][key];
                    }
                }
            }
            picker.setSlotValues(1, val1);
            picker.setSlotValues(2, val2);
            this.param.province = values[1];//	省份	
            this.param.city = values[2]	//	城市
        },
        handleEdit(){
            for (let k in this.param) {
                 if(this.rules[k]){
                    let _arg =  this.rules[k];
                    for(let i = 0 ,l = _arg.length;i<l;i++){
                        if(_arg[i].test && this.param[k]){
                            let patt = new RegExp(_arg[i].test);
                            if(!patt.test(this.param[k])){
                                Toast(_arg[i].message);
                                this.validateState[k] = true;
                                return ;
                            }
                        }
                        if(_arg[i].required && !this.param[k]){
                            Toast(_arg[i].message);
                            this.validateState[k] = true;
                            return ;   
                        }
                    }
                }
            }
          
           let param = lodash.cloneDeep(this.param);
           userCenterApi.editUserInfo(param).then(response=>{
                if(response.code != 1) return;
                Toast(response.msg);
                this.$_init();
           });
        },
        checkParam: lodash.debounce((newName,validateType,vm)=>{
            let _arg =  vm.rules[validateType];
            if(_arg){
               for(let i = 0 ,l = _arg.length;i<l;i++){
                   let patt = new RegExp(_arg[i].test);
                    if(_arg[i].required && !newName){
                        vm.validateState[validateType] = true;
                        return ;
                    }else if(!_arg[i].required || newName){
                        vm.validateState[validateType] = false;
                        return ;
                    }
                }
           }
        },200)
    }
}
</script>
