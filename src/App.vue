<template>
  <div id="app">
    <router-view v-transition></router-view>
    <loading-spinner v-show="$store.getters.loadingStatus"></loading-spinner>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {};
  },
  watch: {
    $route() {
      //设置网页头信息
      this.$store.dispatch('setTitle',this.$route.meta && this.$route.meta.title || '法义用户端');
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$_init();
    });
  },
  methods: {
    $_init() {
      //菊花图状态
      this.$store.dispatch('changeLoadingStatus', false);
    }
  }
};
</script>

<style>

</style>
