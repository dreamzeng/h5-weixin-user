import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const SET_USER_DATA = 'SET_USER_DATA'
export const SHOWSHAREBOX = 'SHOWSHAREBOX'
let modules = {}
let requireContext = require.context('./', false, /\.store.js$/)
requireContext.keys().forEach(path => {
    let apiObject = requireContext(path).default
    let key = path.match(/\.\/(\w+).store/)[1]
    modules[key] = apiObject
});

export default new Vuex.Store({
    state:{
        userData:JSON.parse(sessionStorage.getItem('fyuserData')),
        Sharebox: false,       //shareBox组件是否显示
    },
    mutations: {
        [SET_USER_DATA](state, userData){
            state.userData = userData
        },
         //shareBox分享框是否展示
        [SHOWSHAREBOX](state, sign) {
            state.Sharebox = sign;
        },
    },
    actions:{
    	setUserData({commit},userData){
    		sessionStorage.setItem('fyuserData', JSON.stringify(userData));
    		commit(SET_USER_DATA,userData);
    	}
    },
    getters:{
       userData: state => state.userData,
       Sharebox: state => state.Sharebox
    },
    modules
})