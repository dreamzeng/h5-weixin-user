const Merge = require('@/lib/merge').default;

export default {
  state: {
    loadingTitle: '',
    loadingStatus: false,
    loadingParam: {
      type: 'fading-circle',
      color: '#00ccb1',
      size: 30
    }
  },
  mutations: {
    changeStatus(state, status) {
      state.loadingStatus = status;
    },
    changeLoadingParam(state, loadingParam) {
      let temp = JSON.stringify(state.loadingParam);
      temp = JSON.parse(temp);
      state.loadingParam = Merge(temp, loadingParam);
    }
  },
  actions: {
    changeLoadingStatus({ commit }, status) {
      commit('changeStatus', status);
    },
    changeLoadingParam({ commit }, loadingParam) {
      commit('changeLoadingParam', loadingParam);
    }
  },
  getters: {
    loadingStatus: state => {
      return state.loadingStatus;
    },
    loadingTitle: state => {
      return state.loadingTitle;
    },
    loadingParam: state => {
      return state.loadingParam;
    }
  }
};
