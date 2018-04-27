<template>
    <div id="pageContainer" class="location">
        <div class="rows-1">
            <div class="row-1">
                <span>当前定位城市</span>
            </div>
            <div class="row-2">
                <img src="~@/assets/images/location.png">
                <router-link :to="{path:'/tab/home',query: {name:pageObj.cityName}}">
                    <span>{{pageObj.cityName}}</span>
                </router-link>
            </div>
            <div class="row-3">
                <span>已开通业务城市</span>
            </div>
            <div class="row-4">
                <ul>
                    <li v-for="(item,index) in pageObj.cityList" :key="index">
                        <router-link :to="{path:'/tab/home',query: {name:item.name}}">
                            <span>{{item.name}}</span>
                        </router-link>
                    </li>
                </ul>

            </div>
            <div class="row-5">
                其他城市服务陆续开通，敬请期待~
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      data: '',
      pageObj: {
        cityName: '深圳市',
        cityList: [
          { name: '北京市', id: 1 },
          { name: '深圳市', id: 2 },
          { name: '重庆市', id: 3 },
          { name: '广州市', id: 4 }
        ],
        isError: false
      }
    };
  },
  computed: {},
  mounted() {
    this.getLocation();
  },
  methods: {
    /*初始化方法*/
    init: function(arg) {},
    /*获取地理位置*/
    getLocation: function() {
      var that = this;
      var myCity = new BMap.LocalCity();
      myCity.get(rs => {
        var cityName = rs.name;
        that.pageObj.cityName = cityName;
      });
    }
  },
  destroyed() {}
};
</script>

<style lang="scss" scoped>
.location {
  background: #ffffff;
  .rows-1 {
    .row-1 {
      background: #f2f3f5;
      color: #999999;
      font-size: 0.32rem;
      padding-left: 0.32rem;
      line-height: 1rem;
    }
    .row-2 {
      font-size: 0.32rem;
      height: 1.04rem;
      padding-left: 0.32rem;
      line-height: 1.04rem;
      img {
        width: 0.18rem;
        margin-right: 0.2rem;
        margin-top: 0.2rem;
      }
    }
    .row-3 {
      background: #f2f3f5;
      font-size: 0.32rem;
      height: 1rem;
      padding-left: 0.32rem;
      line-height: 1rem;
      span {
        color: #999999;
      }
    }
    .row-4 {
      ul {
        font-size: 0.32rem;
        padding-left: 0.32rem;
        li {
          border-bottom: 1px solid #ededed;
          height: 1rem;
          line-height: 1rem;
          a {
            display: block;
            width: 100%;
          }
        }
      }
    }
    .row-5 {
      font-size: 0.32rem;
      padding: 1rem;
      text-align: center;
      color: #999999;
    }
  }
}
</style>