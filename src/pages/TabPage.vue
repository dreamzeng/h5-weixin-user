<template>
    <div class="tab">
        <!-- 路由页 -->
        <router-view class="tab-view"></router-view>
        <!-- 底部tab -->
        <vv-tabbar v-model="selected">
            <vv-tab-item :id='tabs[0].id' :to="tabs[0].href">
                <img src="../assets/images/icon/home_tab_home.png" alt="" slot="icon" v-if="tabs[0].id!=selected">
                <img src="../assets/images/icon/home_tab_home2.png" alt="" slot="icon" v-if="tabs[0].id==selected">{{tabs[0].name}}
            </vv-tab-item>
            <vv-tab-item :id='tabs[1].id' :to="tabs[1].href">
                <img src="../assets/images/icon/home_tab_discover.png" alt="" slot="icon" v-if="tabs[1].id!=selected">
                <img src="../assets/images/icon/home_tab_discover2.png" alt="" slot="icon" v-if="tabs[1].id==selected">{{tabs[1].name}}
            </vv-tab-item>
            <vv-tab-item :id='tabs[2].id' :to="tabs[2].href">
                <img src="../assets/images/icon/home_tab_me.png" alt="" slot="icon" v-if="tabs[2].id!=selected">
                <img src="../assets/images/icon/home_tab_me2.png" alt="" slot="icon" v-if="tabs[2].id==selected">{{tabs[2].name}}
            </vv-tab-item>
        </vv-tabbar>
    </div>
</template>

<script>
import { tabs } from '../data/index.js';
export default {
  name: 'tab',
  data: function() {
    return {
      tabs: tabs,
      selected: tabs[0].id
    };
  },
  watch: {
    $route() {
      for (let i = 0; i < tabs.length; i++) {
		if (this.$route.path.indexOf(tabs[i].href) != -1) {
			this.selected = tabs[i].id;
			return;
		}
      }
    }
  },
  methods: {},
  created: function() {
    for (let i = 0; i < tabs.length; i++) {
      if (this.$route.path.indexOf(tabs[i].href) != -1) {
        this.selected = tabs[i].id;
        return;
      }
    }
  }
};
</script>

<style lang="scss">
@import '~@/assets/scss/_variables.scss';
.tabbar {
  background-color: $color-white;
  border-top: border($color-greyD);
  border-bottom: border($color-greyD);
}
.tab-view {
  /* padding-top:2rem;*/
  /*padding-bottom: 3rem;*/
}
</style>
