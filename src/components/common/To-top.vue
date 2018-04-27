<template>
<div id="toTop" @click="goTop">
     <i class="icon-totop"></i>
</div>
</template>
<script>
export default {
    name: 'to-top',
    data() {
        return {
            toTop: false
        }
    },
    methods: {
        goTop() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0
        }
    },
}
</script>
<style lang="less">
#toTop {
    position: fixed;
    right: 0.5rem;
    bottom: 3rem;
    z-index: 1000;
    height: 0.9rem;
    width: 0.9rem;
    border-radius: 50%;
    text-align: center;
    i {
        margin-top: 0.07rem;
    }
}
</style>
