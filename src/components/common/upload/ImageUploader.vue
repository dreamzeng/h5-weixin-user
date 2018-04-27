<template>
    <div>
        <div class="imgUploaderBox" @click="picSelect()">
            <input type="file" id="_file" accept="image/jpeg,image/jpg,image/png" style="display: none;"/>
            <div></div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    name: 'image-uploader',
    data: function () {
        return {
            carImages:[],
            status:1,
            hisUrl:"/orderDetail"
        }
    },
    methods: {
        picSelect(){
            console.log("upload")
            $('input[type=file]').trigger('click');
        }
    }
};
</script>

<style lang="scss">
.imgUploaderBox{
    width:100%;
    height:100%;
}
</style>