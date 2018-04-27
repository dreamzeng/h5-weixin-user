<style lang="less" scoped>
.wrappping_loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  .bg-loadding {
    position: absolute;
    z-index: 1;
    background: #f2f3f5;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
}
</style>

<template>
  <div class="wrappping_loading">
    <mt-spinner :type="$store.getters.loadingParam.type" :color="$store.getters.loadingParam.color" :size="$store.getters.loadingParam.size" class="spinner"></mt-spinner>
    <div class="bg-loadding" id="bg-loadding"></div>
  </div>
</template>

<script>
import { Spinner } from 'mint-ui';
const sname = Spinner['name'];
export default {
  name: 'loading-spinner',
  components: { sname: Spinner },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$_init();
      }, 20);
    });
  },
  methods: {
    $_init() {
      this.initBg();
    },
    initBg() {
      const recalc = () => {
        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;
        $('#bg-loadding').css({ width: clientWidth, height: clientHeight });
      };
      recalc();
      if (!document.addEventListener) return;
      let resizeEvt =
        'orientationchange' in window ? 'orientationchange' : 'resize';
      window.addEventListener(resizeEvt, recalc, false);
      document.addEventListener('DOMContentLoaded', recalc, false);
    }
  },
  watch: {}
};
</script>