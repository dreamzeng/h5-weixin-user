export default {
  state: {
    cityName: JSON.parse(sessionStorage.getItem('cityName')) || '深圳市' //城市名字
  },
  mutations: {
    changeCityName(state, cityName) {
      state.cityName = cityName;
    }
  },
  actions: {
    changeCityName({ commit }, cityName) {
      sessionStorage.setItem('cityName', JSON.stringify(cityName));
      commit('changeCityName', cityName);
    }
  },
  getters: {
    cityName: state => {
      return state.cityName;
    }
  }
};
